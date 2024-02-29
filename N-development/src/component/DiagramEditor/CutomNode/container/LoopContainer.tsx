import React from "react";
// eslint-disable-next-line import/named
import {NodeProps} from "reactflow";
import {IMicroLoopNodeData, IWhileLoopNodeData} from "../../../../interface";
import {useResizeParentOnSizeChange, useUpdatePosAbsolute} from "../../../../hooks";
import {BaseNodeContainer} from "./BaseNodeContainer";

export const LoopContainer: React.FC<{
    children: React.ReactNode
    node: NodeProps<IMicroLoopNodeData | IWhileLoopNodeData>
}> = ({
          children,
          node
      }) => {

    useResizeParentOnSizeChange(node)
    return (
        <BaseNodeContainer node={node}>
            {children}
        </BaseNodeContainer>
    )
};
