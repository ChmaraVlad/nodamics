import React, {ChangeEventHandler} from 'react';
import {BaseNodeContainer} from "../container";
import type {NodeProps} from "reactflow";
import {IDataNodeData, ILabelNodeData} from "../../../../interface";
import {Box, TextField} from "@mui/material";
import {Parameter} from "../../../base";
import {EColor, EFontColor, GAP_BETWEEN_EDITOR_CANVAS_DOTS} from "../../../../constant";
import {useUpdateNode} from "../../../../hooks";

export const LabelNode: React.FC<NodeProps<ILabelNodeData>> = (props) => {


    const {updateNodeData} = useUpdateNode<ILabelNodeData>({
        nodeId: props.id
    })

    const onCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateNodeData({
            comment: event.target.value,
        })
    }

    return (
        <BaseNodeContainer
            node={props}
            sx={{
                borderStyle: 'dashed',
                strokeDasharray: '12',
            }}
        >
            <Box sx={{
                width: 272,
                height: 131,
            }}>
                <TextField
                    multiline
                    rows={4}
                    sx={{
                        color: EFontColor.grey4,
                        background: 'transparent',
                        borderStyle: 'solid',
                        width: '100%',
                        fontSize: 14,
                        "& fieldset": {border: 'none'},
                    }}
                    onChange={onCommentChange}
                    value={props.data.comment}
                    InputProps={{
                        disableUnderline: true,
                    }}
                />

            </Box>
        </BaseNodeContainer>
    );
};

