import {GraphLoopNode} from "./abstracts";
import {
    EConnectionMode,
    IMicroLoopNodeData,
    IResetAfterDiagramRun,
    IResetBeforeStep,
    IUpdateGraphNodeState
} from "../../../interface";
import {RunManager} from "../RunManager";
import {GraphNodeManager} from "../NodeManager";

export class GraphMicroLoopNode extends GraphLoopNode<IMicroLoopNodeData>
    implements IUpdateGraphNodeState, IResetBeforeStep, IResetAfterDiagramRun {


    constructor(value: IMicroLoopNodeData, runManager: RunManager, nodeManager: GraphNodeManager) {
        super(value, runManager, nodeManager);
    }

    get isAccumulative() {
        return this.data.isAccumulative || false
    }

    get currentLoopCount() {
        return this.data.currentLoopCount;
    }

    get loopCount(): number {
        if (this.data.loopFormula) {
            const result = this.matchManager.calculateFormula({
                formula: this.data.loopFormula,
            })
            if (typeof result === 'number') {
                return result
            }
        }
        return 0
    }

    resetAfterDiagramRun() {
        this.resetLoopStep()
    }

    resetBeforeStep() {
        super.resetBeforeStep();
        // const hasParent = this.data.parentId !== undefined
        // if (hasParent) {
        //     this.resetLoopStep()
        // }
    }

    protected checkIsLoopActive() {
        // const isLoopActive = this.isAccumulative ? this.currentLoopCount <= this.loopCount: this.currentLoopCount <= this.loopCount - 1
        const isLoopActive = this.currentLoopCount <= this.loopCount - 1
        this.setIsLoopActive(isLoopActive)
        return isLoopActive
    }

    isEventTriggered(mode: EConnectionMode): boolean {

        if (EConnectionMode.LoopInnerToChildren === mode) {
            return this.checkIsLoopActive()
        }
        return true
    }

    resetLoopStep() {
        this.updateNode({currentLoopCount: 0})
        this.checkIsLoopActive()
    }

    invokeStep() {
        super.invokeStep()
        this.addStep()
    }

    private addStep() {
        const updatedLoopCount = this.currentLoopCount + 1
        this.updateNode({currentLoopCount: updatedLoopCount})
    }
}
