import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  background: black;
`;

export const StyledButton = styled.button`
  background: #ff9696;
  width: 100px;
  height: 30px;
  margin: 25px;
  text-align: center;
  border: 2px solid #ff0000;
  border-radius: 5px;
  box-shadow: 0 0 6px 2px #dedede;
  font-size: 16px;
  cursor: pointer;
`;

export const StyledGame = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: space-evenly;
`;

export const StyledPlay = styled.div`
  background: #be99ff;
  border-radius: 100px;
  display: flex;
  width: 150px;
  height: 150px;
  margin: 50px;
  cursor: pointer;
  box-shadow: 0 0 10px 2px #dedede;
  cursor: pointer;
`;

export const StyledCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: 200px;
  border: 2px solid #ffa200;
  border-radius: 10px;
  background: #ffe3b3;
  align-items: center;
  text-align: center;
  font-size: 1.35rem;
  box-shadow: 0 0 8px 3px #dedede;
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 50px;
`;

export const StyledP = styled.p`
  margin: 30px 0 30px 0;
  font-size: 24px;
  color: white;
  text-align: center;
`;


export const StyledGenre = styled.p`
  font-size: 16px;
  color: white;
  text-align: center;
  position: absolute;
  right: 25px;
  top: 100px;

`;
