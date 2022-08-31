import React = require("react");

import { Grid } from "@mui/material";

import styled from "styled-components";


export const LoginPageView = ({}:{}) => {

    return (
       <StyledLoginContainer container>

        <StyledGridImg item xs={5}>
           Display Image 
        </StyledGridImg>
        <StyledGridForm item xs={7}>
        <h3>Identification</h3>
        </StyledGridForm>
       </StyledLoginContainer> 
       
       );
}




//------

const StyledLoginContainer = styled(Grid)`
width:100%;
height:100%;
`
const StyledGridImg = styled(Grid)`
background-color: pink;
`
const StyledGridForm =  styled(Grid)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
background-color: grey;
`