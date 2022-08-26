import styled from "styled-components";
import { Link } from "react-router-dom";

export const Backdrop = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.4);
  z-index: 150;
  &:hover {
    cursor: initial;
  }
`;

export const Button = styled.button`
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  background: ${({ bg }) => bg};
  bottom: ${({ b }) => b};
  border-radius: 10px;
  box-shadow: 0 0 10px 5px #f96e46;
  border: 2px solid #ff3b14;
  font-size: 2.5vh;
  font-weight: bold;
`;

export const CloseButton = styled(Link)`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 1.75em;
  color: #333;
  text-decoration: none;
  &:hover {
    color: #888;
  }
`;

export const Modal = styled.div`
  position: absolute;
  color: white;
  height: 50vh;
  width: 33vw;
  z-index: 200;
  background: gray;
  border-left: 2px solid #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #c4c4c4;
  box-shadow: 0 0 20px 5px #c4c4c4;
`;
