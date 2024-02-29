import React, {useMemo} from 'react';
import {Box} from "@mui/material";
import {EConnectionMode, IDataNodeData, IFormulaNodeData} from "../../../../interface";
import {EColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {BaseNodeShapeContainer, BaseNodeShapeContainerV2, SvgNodeContainerHandler} from "../container";
// eslint-disable-next-line import/named
import {NodeProps, Position} from "reactflow";
import {NodeStyle} from "../StyledComponent/styledComponent";
import {ChainHandle} from "../../CustomHandle/ChainHandle";
import {LogicHandle} from "../../CustomHandle";
import {DataNodeIcon} from "../../../../assets/svg/DataNodeIcon";
import {NodeGearIcon} from "../../../../assets/svg/NodeGearIcon";
import {FormulaNodeIcon} from "../../../../assets/svg/FormulaNodeIcon";
import {NodeValueInput} from "../../NodeInput";
import {useUpdateNode} from "../../../../hooks";
import {SimpleArrow} from "../../../../assets/svg/SimpleArrow";
import {FormulaNodeContainer, OriginNodeContainer} from "../../../../assets";


const path = 'M1.75571 103.063L36.1825 197.063C37.0485 199.428 39.2986 201 41.8166 201H312.183C314.701 201 316.952 199.428 317.817 197.063L352.244 103.063C352.732 101.731 352.732 100.269 352.244 98.9366L317.817 4.93658C316.952 2.57218 314.701 1 312.183 1H41.8166C39.2986 1 37.0485 2.57218 36.1825 4.93658L1.75571 98.9366C1.26775 100.269 1.26775 101.731 1.75571 103.063Z'
const WIDTH = 352
const HEIGHT = 200
const clipPath = `path('${path}')`
export const FormulaNode: React.FC<NodeProps<IFormulaNodeData>> = (props) => {
    const {isConnectable, data} = props
    // const [formula, setFormula] = useState<string | undefined>(data.formula || '')

    const result = useMemo(() => {
        console.log('data', data.result)
        if (data.result && data.result.type === 'number') {
            const value = data.result.value
            return data.isShowDecimal ? value?.toFixed(data.decimalDigits) : value
        }
        if (!data.result?.value) {
            return ''
        }
    }, [data])

    const {updateNodeData} = useUpdateNode<IFormulaNodeData>({
        nodeId: props.data.id,
    })


    const updateFormula = (value: string) => {
        console.log('formula.node.input', value)
        const numberValue = Number(value)
        if(!isNaN(numberValue)){
            updateNodeData({
                formula: numberValue,
            })
        }
    }

    return (
        <>
            {/*connections*/}
            <SvgNodeContainerHandler node={props} Container={FormulaNodeContainer}>
                <Box sx={{
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    px: '44px',
                    pt: '16px',
                }}>
                    <NodeStyle.NodeInfo maxNameLength={15} node={props}/>
                    <NodeStyle.ValueInput
                        title="Value"
                        value={result || ''}
                        onChange={updateFormula}
                    />
                    <NodeStyle.Comment>
                        {data.comment}
                    </NodeStyle.Comment>
                </Box>
            </SvgNodeContainerHandler>

            <Box sx={{
                pointerEvents: 'none',
                position: 'absolute',
                width: 'calc(100% + 4px)',
                height: 'calc(100% + 4px)',
                left: -2,
                top: -2,
            }}>
                <Box sx={{
                    width: '100%',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'space-between',
                    bottom: '50%',
                }}>
                    <ChainHandle
                        type="target"
                        position={Position.Left}
                        isConnectable={isConnectable}

                    />
                    <ChainHandle
                        type="source"
                        position={Position.Right}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeOutgoing}
                    />
                </Box>
                <Box sx={{
                    position: 'absolute',
                    top: 2,
                    left: 'calc(50%)',
                }}>
                    <LogicHandle
                        type="source"
                        position={Position.Top}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeOutgoing}
                    />
                </Box>
                <Box sx={{
                    position: 'absolute',
                    bottom: 6,
                    left: 'calc(50%)',
                }}>
                    <LogicHandle
                        type="target"
                        position={Position.Bottom}
                        isConnectable={isConnectable}
                        mode={EConnectionMode.NodeIncoming}
                    />
                </Box>
            </Box>
        </>
    );
};
