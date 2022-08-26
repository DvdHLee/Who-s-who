import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledHome = styled.div`
  text-align: center;
  display: block;
`;

export const StyledLink = styled(Link)`
  background: black;
`;

export const StyledButton = styled.button`
  background: #b5b3ff;
  width: 200px;
  height: 50px;
  margin: 80px;
  border: 2px solid #524dff;
  border-radius: 10px;
  box-shadow: 0 0 10px 2px #b5b3ff;
  font-size: 20px;
  cursor: pointer;
`;

export const StyledDiv = styled.div`
  color: white;
`;

export const Easy = styled.button`
  background-color: #b3ffb4;
  margin: 0 20px;
  height: 50px;
  width: 100px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

export const Medium = styled.button`
    background-color: #ffe299;
    margin: 0 20px;
    height: 50px;
    width: 100px;
    border-radius: 10px;
    border: none;
    font-size: 16px;
    cursor: pointer;
`;

export const Hard = styled.button`
  background-color: #ff9696;
  margin: 0 20px;
  height: 50px;
  width: 100px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;


export const SelectedEasy = styled.button`
  background-color: #b3ffb4;
  margin: 0 20px;
  height: 50px;
  width: 100px;
  border-radius: 10px;
  border: solid #00ff5e 2px;
  box-shadow: 0 0 6px 2px #00ff5e;
  font-size: 16px;
  `;

export const SelectedMedium = styled.button`
  background-color: #ffe299;
  margin: 0 20px;
  height: 50px;
  width: 100px;
  border-radius: 10px;
  border: 2px solid #ffc400;
  box-shadow: 0 0 6px 2px #ffc400;
  font-size: 16px;
  `;

export const SelectedHard = styled.button`
  background-color: #ff9696;
  margin: 0 20px;
  height: 50px;
  width: 100px;
  border-radius: 10px;
  border: 2px solid #ff6969;
  box-shadow: 0 0 6px 2px #ff6969;
  font-size: 16px;
  `;

  export const DiffDiv = styled.div`
    margin: 20px 0px 50px 0;
  `;