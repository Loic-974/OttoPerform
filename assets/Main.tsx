import React = require("react");
import { useState } from "react";
import { Button } from "@mui/material";
import styled from "styled-components";
import { LoginPageView } from "./LoginPage/LoginPageView";
export const Main = ({}) => {
	return (
		<StyledMainContainer>
		
			<LoginPageView/>
		</StyledMainContainer>
	);
};



// ---------------------------------------------- Styled ----------------------------------------------- //

const StyledMainContainer = styled.div`
background-color:red;
width: 100%;
height:100%;
box-sizing: border-box;


`