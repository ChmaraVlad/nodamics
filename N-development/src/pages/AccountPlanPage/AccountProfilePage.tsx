import React from 'react';
import {AccountInnerLayout, BaseInput, BaseInputVariant, SearchInput} from "../../component";
import {Avatar, Box, styled, Typography} from "@mui/material";
import {EColor, EFontColor} from "../../constant";
import AppButton, {AppButtonVariant} from "../../component/base/Button/AppButton";
import {SxProps} from "@mui/system";


const Parameter: React.FC<{
    children?: React.ReactNode
    title: string
}> = ({children, title}) => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                gridColumn: 1,
            }}>
                <Typography sx={{
                    textAlign: 'end',
                    fontSize: 14,
                    fontWeight: 300,
                    color: EFontColor.white,
                    letterSpacing: '0.02em',
                }}>
                    {title}
                </Typography>
            </Box>
            <Box sx={{
                gridColumn: 2,
                flexGrow: 1,
                flex: 1,
                width: '100%',
            }}>
                {children}
            </Box>
        </>
    );
}

const inputSX: SxProps = {
    width: '100%',
    fontColor: EFontColor.white,
    borderWidth: '0px',
}

const Separator = styled(Box)(() => ({
    width: '100%',
    height: '1px',
    backgroundColor: EColor.grey6,
}))

export const AccountProfilePage = () => {
    return (
        <Box sx={{
            width: '1040px',
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
        }}>
            <Box>
                <Typography sx={{
                    fontSize: 28,
                    fontWeight: 600,
                    color: EFontColor.white,
                }}>
                    Profile settings
                </Typography>
            </Box>
            <Separator
                sx={{
                    marginTop: '14px',
                }}
            />
            <Box sx={{
                marginTop: '24px',
                display: 'grid',
                gridTemplateColumns: 'fit-content(100%) 1fr',
                gridTemplateRows: 'repeat(auto, 1fr)',
                gridColumnGap: '32px',
                gridRowGap: '32px',
            }}>
                <Parameter title="Profile Image">
                    <Box sx={{
                        display: 'flex',
                        gap: '32px',
                        alignItems: 'center',
                    }}>
                        <Avatar sx={{
                            width: 124,
                            height: 124,
                            fontSize: 36,
                            fontWeight: 500,
                        }}>JS</Avatar>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                gap: '16px',
                            }}>
                                <AppButton variant={AppButtonVariant.plus}>Choose File</AppButton>
                                <AppButton variant={AppButtonVariant.delete}/>
                            </Box>
                            <Typography sx={{
                                fontWeight: 300,
                                fontSize: 12,
                                color: EFontColor.grey10,
                                letterSpacing: '0.02em',

                            }}>
                                Maximum image size is 1 MB
                            </Typography>
                        </Box>
                    </Box>
                </Parameter>
                <Parameter title="First Name">
                    <BaseInput
                        sx={inputSX}
                        viewVariant={BaseInputVariant.grey}
                    />
                </Parameter>
                <Parameter title="Last Name">
                    <BaseInput
                        sx={inputSX}
                        viewVariant={BaseInputVariant.grey}
                    />
                </Parameter>
                <Parameter title="Email">
                    <BaseInput
                        sx={inputSX}
                        viewVariant={BaseInputVariant.grey}
                    />
                </Parameter>
                <Parameter title="Role">
                    <BaseInput
                        sx={inputSX}
                        viewVariant={BaseInputVariant.grey}
                    />
                </Parameter>
            </Box>
            <Box sx={{
                marginTop: '48px'
            }}>
                <Typography sx={{
                    fontWeight: 700,
                    fontSize: 28,
                    color: EFontColor.red4,
                }}>
                    Delete Account
                </Typography>
                <Separator
                    sx={{
                        marginTop: '14px',
                    }}
                />
                <Typography sx={{
                    fontWeight: 300,
                    fontSize: 12,
                    color: EFontColor.grey10,
                    letterSpacing: '0.02em',
                    marginTop: '24px',
                }}>
                    Once you delete your account, there is no going back. Please be certain.
                </Typography>
                <AppButton
                    variant={AppButtonVariant.deleteV2}
                    sx={{
                        marginTop: '24px',
                    }}
                >Delete account </AppButton>
            </Box>
        </Box>
    );
};
