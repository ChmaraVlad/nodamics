import * as Match from "mathjs";
import {IMatchManagerObject, INumberVariable, ISpreadsheetRowsData} from "../../../interface";
import {GraphNodeManager} from "../NodeManager";
import {GraphDatasetDatafieldNode, GraphTagManager} from "../GraphNodes";
import {GraphMatchNodeAdapter} from "./GraphMatchNodeAdapter";


export class GraphMatchManager {

    private readonly nodeManager: GraphNodeManager
    private readonly tagManager: GraphTagManager

    constructor(nodeManager: GraphNodeManager, tagManager: GraphTagManager) {
        this.nodeManager = nodeManager
        this.tagManager = tagManager
    }

    datasetData({datasetTag}: { datasetTag: string }): GraphDatasetDatafieldNode | undefined {
        return this.nodeManager.getNodeByTag({tag: datasetTag}) as GraphDatasetDatafieldNode
    }

    getDatasetRowsByTags({tags}: { tags: string[] }) {
        const rowsPerTag: { [tag: string]: ISpreadsheetRowsData } = {}
        const datasetPerTag: { [tag: string]: IMatchManagerObject } = {}
        for (const tag of tags) {
            const dataset = this.datasetData({datasetTag: tag})
            if (dataset && dataset.spreadsheet && dataset.spreadsheet?.rows) {
                rowsPerTag[tag] = [...dataset.spreadsheet.rows]
                dataset.getDynamicVariables()
                datasetPerTag[`__${tag}`] = GraphMatchNodeAdapter.adapt(dataset)
            }
        }
        return {rowsPerTag, datasetPerTag}
    }

    calculateFormula({formula, variables = []}: {
        formula: string,
        variables?: INumberVariable[]
    }) {
        if (Number(formula) && !isNaN(Number(formula))) {
            return Number(formula)
        } else if (formula === 'true') {
            return true
        }

        // pattern to get dataset tags from formula (mmrRangeDataset.lengthX, mmrRangeDataset[1][2])
        const datasetPattern = /(\w+)(?:\.\w+|\[[a-zA-Z0-9]+\])+/g;
        const datasetTags = [...formula.matchAll(datasetPattern)].map((match) => match[1])
            .filter((value, index, self) => self.indexOf(value) === index);
        const {rowsPerTag: datasetRows, datasetPerTag} = this.getDatasetRowsByTags({tags: datasetTags})
        const tagVariables = this.tagManager.getNodeTagVariables()
        const allVariables = [...variables, ...tagVariables]
        const mappedVariables = allVariables.reduce((acc: {
            [key: string]: number
        }, variable) => {
            const variableName = variable.variableName || '-'
            if (variable.value !== undefined) {
                acc[variableName] = variable.value
            }
            return acc
        }, {})
        const transformedFormula = this.transformString({formula, variables: mappedVariables})
        try {

            if (formula) {
                const compiledFormula = Match.compile(transformedFormula)


                const res = compiledFormula.evaluate({...mappedVariables, ...datasetRows, ...datasetPerTag})

                if (typeof res === 'object' && 'entries' in res && Array.isArray(res.entries)) {
                    return res.entries[0]
                }
                return res
            }
        } catch (e) {
            console.error(e, {transformedFormula: transformedFormula}, {variables: allVariables}, {datasetTags}, datasetPerTag, {datasetRows})
        }
    }

    private allTags() {
        return this.nodeManager.nodes.map(node => node.tag).filter(Boolean) as string[]
    }

    private transformString({formula, variables}: {
        formula: string, variables: {
            [key: string]: number
        }
    }): string {
        const pattern = /\[([a-zA-Z0-9]+)\]\[([a-zA-Z0-9]+)\]/g;

        const transformed = formula.replace(pattern, (match, num1, num2) => {
            const num1Var: number | undefined = variables[num1];
            const num2Var: number | undefined = variables[num2];
            const newNum1 = typeof num1Var === 'number'? num1Var + 1 : parseInt(num1) + 1;
            const newNum2 = typeof num2Var === 'number'? num2Var +1: parseInt(num2) + 1;
            return `[${newNum2},${newNum1}]`;
        });

        const allTags: string[] = this.allTags()

        // replace dataset tags with __datasetTag
        const transformedWithTags = transformed.replace(/(\w+\.\w+)/g, (match) => {
            const [firstPart, secondPart] = match.split('.')
            if (allTags.includes(firstPart)) {
                return `__${firstPart}.${secondPart}`;
            }
            return match;
        });

        return transformedWithTags;
    }
}

