import React from 'react';
import {Button, IconButton, Typography} from "@mui/material";
import {EColor} from "../../../constant";
import {PlusIcon} from "../../../assets/svg/PlusIcon";
import {DeleteIcon} from "../../../assets/svg/DeleteIcon";
import {ButtonProps} from "@mui/material/Button/Button";
import {IconButtonProps} from "@mui/material/IconButton/IconButton";

export enum AppButtonVariant {
    plus = 'plus',
    delete = 'delete',
    deleteV2 = 'deleteV2',
}


export interface AppButtonDefaultProps {
    variant: AppButtonVariant,
    children?: React.ReactNode,
}

interface PlusButtonProps extends AppButtonDefaultProps, Omit<ButtonProps, 'variant'> {
    variant: AppButtonVariant.plus,
}

interface DeleteButtonProps extends AppButtonDefaultProps, Omit<IconButtonProps, 'variant'> {
    variant: AppButtonVariant.delete,
}

interface DeleteV2ButtonProps extends AppButtonDefaultProps, Omit<ButtonProps, 'variant'> {
    variant: AppButtonVariant.deleteV2,
}


export type AppButtonProps = PlusButtonProps | DeleteButtonProps | DeleteV2ButtonProps;

const AppButton: React.FC<AppButtonProps> = ({
                                                 children,
                                                 sx = {},
                                                 ...props
                                             }) => {

    if (props.variant === AppButtonVariant.deleteV2) {
        const {variant, ...buttonProps} = props;
        return (
            <Button sx={{
                display: 'flex',
                backgroundColor: EColor.red4,
                gap: '8px',
                paddingX: '12px',
                paddingY: '10px',
                borderRadius: '6px',
                '&:hover': {
                    color: EColor.red4,
                },
                ...sx
            }}
                    {...buttonProps}
            >
                <DeleteIcon color={EColor.white}/>
                <Typography sx={{
                    color: EColor.white,
                    letterSpacing: '0.02em',
                    fontSize: 14,
                    fontWeight: 400,
                }}>
                    {children}
                </Typography>
            </Button>
        )
    }


    if (props.variant === AppButtonVariant.delete) {
        const {variant, ...buttonProps} = props;

        return (
            <IconButton sx={{
                width: '40px',
                height: '40px',
                borderRadius: '6px',
                backgroundColor: EColor.grey8,
            }}
                        {...buttonProps}
            >
                <DeleteIcon/>
            </IconButton>
        )
    }

    return (
        <Button sx={{
            display: 'flex',
            backgroundColor: EColor.blue6,
            gap: '8px',
            paddingX: '12px',
            paddingY: '10px',
            borderRadius: '6px',
            '&:hover': {
                color: EColor.blue6,
            }
        }}>
            <PlusIcon/>
            <Typography sx={{
                color: EColor.white,
                letterSpacing: '0.02em',
                fontSize: 14,
                fontWeight: 500,

            }}>
                {children}
            </Typography>
        </Button>
    );
};

export default AppButton;
