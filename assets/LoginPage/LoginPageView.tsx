import React = require("react");

import {
    Button,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";

import styled from "styled-components";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../AuthProvider";

const bgPath = require("../img/bg_login.jpg");
const logoPath = require("../img/logo.svg");

export const LoginPageView = ({}: {}) => {
    const [userEmail, setUserEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState(false);

    const { login, isUserConnected } = useAuth();

    async function handleConnexion() {
        setIsLoading(true);
        //@ts-ignore
        await login(userEmail, password);
        setIsLoading(false);
    }

    return isUserConnected ? (
        <></>
    ) : (
        <StyledLoginContainer container>
            <StyledGridImg item xs={3} lg={5}>
                {/* <StyledLogo /> */}
                <StyledImgContainer />
            </StyledGridImg>
            <StyledGridForm item xs={9} lg={7}>
                <StyledTitle>IDENTIFICATION</StyledTitle>

                <StyledSubTitle>
                    Bienvenue sur la plateforme de gestion Oxxo Perform
                    <br />
                    Identifiez-vous pour être redirigé sur votre page d'accueil
                </StyledSubTitle>
                <StyledDivider />
                <StyledFormContainer>
                    <StyledFormControl fullWidth>
                        <InputLabel htmlFor="userMail">Email</InputLabel>
                        <StyledInput
                            fullWidth
                            id="userMail"
                            type={"email"}
                            value={userEmail}
                            onChange={(event) =>
                                setUserEmail(event.target.value)
                            }
                            label="Email"
                        />
                    </StyledFormControl>
                    <StyledFormControl fullWidth>
                        <InputLabel htmlFor="passwordUser">
                            Mot de passe
                        </InputLabel>
                        <StyledInput
                            id="passwordUser"
                            label="Mot de passe"
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </StyledFormControl>
                    <StyledForgotPassword>
                        Mot de passe oublié
                    </StyledForgotPassword>
                    <StyledButton variant="contained" onClick={handleConnexion}>
                        {isLoading ? "Connexion en cours ..." : " Connexion"}
                    </StyledButton>
                </StyledFormContainer>
                <StyledDivider />
                <StyledText>
                    Pas encore de compte ? Contactez votre administrateur
                </StyledText>
                <StyledEndPart>
                    <StyledText>© OXXO Perform</StyledText>
                </StyledEndPart>
            </StyledGridForm>
        </StyledLoginContainer>
    );
};

// -------------------------------------------------------------------------------------------------------------------- //
//---------------------------------------------------- Style ----------------------------------------------------------- //
// -------------------------------------------------------------------------------------------------------------------- //

const StyledLoginContainer = styled(Grid)`
    width: 100%;
    height: 100%;
`;
const StyledGridImg = styled(Grid)`
    position: relative;
`;
const StyledLogo = styled.div`
    margin-top: 24px;
    margin-left: 24px;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 100;
    background-image: url(${logoPath});
    background-repeat: no-repeat;
    background-size: auto;
    object-fit: contain;
`;
const StyledImgContainer = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${bgPath});
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
    object-fit: contain;
`;
const StyledGridForm = styled(Grid)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    color: ${({ theme }) => theme.colors.lightGrey};
    background-color: ${({ theme }) => theme.colors.darkGrey};
    box-shadow: -8px 0 4px ${({ theme }) => theme.colors.darkGrey};
`;

const StyledFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    width: 80%;
    min-height: 40%;
    padding: 12px 12px 12px 12px;
`;

const StyledTitle = styled.p`
    font-size: 3.5rem;
    font-weight: 700;
    width: 100%;
    min-height: 10%;
    text-align: center;
    color: ${({ theme }) => theme.colors.mediumGrey};
`;
const StyledSubTitle = styled(StyledTitle)`
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0;
`;

const StyledInput = styled(OutlinedInput)`
    font-size: 1.2rem;
    padding: 16px;
`;

const StyledFormControl = styled(FormControl)`
    margin: 16px 0;

    .MuiFormControl-fullWidth {
        color: ${({ theme }) => theme.colors.mediumGrey};
    }
    label {
        color: ${({ theme }) => theme.colors.mediumGrey};
        font-size: 1.5rem;
    }
    .MuiFormLabel-root.MuiInputLabel-root.Mui-focused {
        color: ${({ theme }) => theme.colors.mediumBlue};
        font-size: 1.5rem;
        line-height: 1.45rem;
        background-color: ${({ theme }) => theme.colors.darkGrey};
        padding: 0px 6px 0px 3px;
    }
    .MuiInputBase-root.MuiOutlinedInput-root {
        color: ${({ theme }) => theme.colors.mediumGrey};
    }
    .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.colors.mediumGrey};
    }

    .MuiInputBase-root.MuiOutlinedInput-root:hover
        .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.colors.mediumBlue};
    }

    .MuiSvgIcon-root {
        color: ${({ theme }) => theme.colors.mediumGrey};
        margin-right: 6px;
        font-size: 1.5rem;
    }
`;

const StyledForgotPassword = styled.p`
    width: 100%;
    text-align: right;

    font-size: 1.3rem;

    color: ${({ theme }) => theme.colors.mediumGrey};
    margin-block-start: 0.2rem;
    margin-block-end: 0.2rem;
`;

const StyledButton = styled(Button)`
    width: 80%;
    margin-top: 32px;
    padding: 16px 8px;
    font-size: 1.2rem;
    background-color: ${({ theme }) => theme.colors.mediumRed};
    :hover {
        background-color: ${({ theme }) => theme.colors.lightRed};
    }
`;

const StyledDivider = styled.div`
    width: 80%;
    height: 1px;
    padding: 1px;
    background-color: ${({ theme }) => theme.colors.mediumGrey};
    margin-top: 24px;
    margin-bottom: 24px;
`;

const StyledText = styled.p`
    font-size: 1.3rem;
`;
const StyledEndPart = styled.div`
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;
