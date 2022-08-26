import React, { useState, useEffect } from "react";
import Question from "../../components/Question/Question";
import GameOver from "../GameOver/GameOver";
import { StyledP } from "./Game.Styles";
import { Redirect, useHistory, useLocation } from "react-router-dom";

const Game = ({ token, genre, numberOfArtists, numberOfSongs }) => {
  const [questions, setQuestions] = useState(1);
  const [score, setScore] = useState(0);
  const [gameover, setGameOver] = useState(false);

  if (!genre) {
    return <Redirect to="/" />;
  }
  const history = useHistory();
  const location = useLocation();

  const reload = () => {
    history.push({
      pathname: "/",
    });
  };

  const clickedNext = (i) => {
    if (i < 9) {
      setQuestions(listOfQuestions[i + 1]);
    } else {
      setQuestions();
      setGameOver(true);
    }
  };

  const scoreUp = () => {
    setScore((score) => score + 1);
  };

  let listOfQuestions = [...Array(10)].map((val, i) => [
    <Question
      numberOfSongs={numberOfSongs}
      numberOfArtists={numberOfArtists}
      qi={i}
      clickedNext={() => clickedNext(i)}
      token={token}
      selectedGenre={genre}
      key={i}
      scoreUp={scoreUp}
    ></Question>,
  ]);

  useEffect(() => {
    setQuestions(listOfQuestions[0]);
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
      reload();
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  return (
    <div>
      {questions}
      {gameover ? (
        <GameOver score={score} />
      ) : (
        <StyledP>Score: {score}</StyledP>
      )}
    </div>
  );
};

export default Game;
