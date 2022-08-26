import React from "react";
import { Backdrop, Modal, CloseButton, Button } from "./GameOver.styles";
import { Link } from 'react-router-dom';

const GameOver = ({ score }) => {
  return (
    <Backdrop>
      <Modal>
        <CloseButton to="/">X</CloseButton>
        <h1>Game Over</h1>

        <h2>Score: {score}</h2>
        <Link to="/" style={{ width: "80%" }}>
          <Button w="100%" h="50px" bg="#ff8066" b="0px">
            Play Again
          </Button>
        </Link>
      </Modal>
    </Backdrop>
  );
};

export default GameOver;