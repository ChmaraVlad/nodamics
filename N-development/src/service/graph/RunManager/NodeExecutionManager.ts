import {IChainItem} from "./ChainItem";
import {RunManager} from "./RunManager";
import {GraphBaseNode} from "../GraphNodes";

export class NodeExecutionManager {
    executionCount = 0
    current: IChainItem[]
    next: IChainItem[]
    runManager: RunManager

    constructor(runManager: RunManager, starters: IChainItem[]) {
        this.runManager = runManager
        this.current = []
        this.next = [...starters]
    }

    async invokeNodesToExecute() {
        this.current = [...this.next]
        this.executionCount = this.next.length
        this.next = []

        while (this.current.length > 0) {
            const argument = this.current.shift()
            if (argument) {
                this.executionCount--
                await this.runManager.executeNode(argument, this, {invoke: true})
            }


        }

        // for (const argument of this.current) {
        //     this.executionCount--
        //     await this.runManager.executeNode(argument, this, {invoke: true})
        //     // this.current.shift()
        // }

        // this.runManager.addCountOfExecuted()
    }


    // async invokeAll() {
    //     while (true) {
    //         this.current = [...this.next];
    //         this.executionCount = this.next.length;
    //         this.next = [];
    //
    //         if (this.executionCount > 0) {
    //             for (const argument of this.current) {
    //                 this.executionCount--;
    //                 await this.runManager.executeNode(argument, this, {invoke: true});
    //
    //             }
    //         }
    //         // Break the loop if executionCount is 0 and there are no next items to process.
    //         if (this.executionCount === 0 && this.next.length === 0) {
    //             break;
    //         }
    //     }
    //
    // }

    addNodesToExecute(chainItems: IChainItem[], withoutDuplicates = false) {
        if (withoutDuplicates) {
            chainItems.forEach(chainItem => {
                const isDuplicate = this.current.some(node => node.target.data.id === chainItem.target.data.id)
                if (!isDuplicate) {
                    this.next.push(chainItem)
                }
            })
        } else {
            this.next.push(...chainItems)
        }
    }

    removeCurrentNodesById(nodeIds: string[]) {
        const nodeIdsSet = new Set(nodeIds)
        this.current = this.current.filter(node => !nodeIdsSet.has(node.target.data.id))
        this.next = this.next.filter(node => !nodeIdsSet.has(node.target.data.id))
    }

    addNodesToCurrent(target: GraphBaseNode<any>, chainItems: IChainItem[], withoutDuplicates = false) {
        if (withoutDuplicates) {
            chainItems.forEach(chainItem => {
                const isDuplicate = this.current.some(node => node.target.data.id === chainItem.target.data.id)
                if (!isDuplicate) {
                    this.current.push(chainItem)
                    this.executionCount++
                }
            })
        } else {
            this.current.push(...chainItems)
            this.executionCount += chainItems.length
        }

    }
}
