import React from 'react';
import styled from 'styled-components';


const StyledButton = styled.button`
padding: .2rem .2rem;
font-size: 1rem;
color: white;
outline: none;
background-color: #C1C1C1;
border-color: #565656;
border-radius: 6px;

&:hover{
    background-color:#565656;
    color:white;
    border-color: #565656;
}
`;


const Buttonas = ({children}) => {
    return (
    <StyledButton>{children}</StyledButton>
    )
}

export default Buttonas;