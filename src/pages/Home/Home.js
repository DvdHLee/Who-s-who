import React, { useEffect, useState } from "react";
import styled from "styled-components";
import fetchFromSpotify, { request } from "../../services/api";
import { Route } from "react-router-dom";
import Game from "../Game/Game";
import {
  StyledHome,
  StyledLink,
  StyledButton,
  StyledDiv,
  DiffDiv,
  SelectedEasy,
  SelectedMedium,
  SelectedHard,
  Easy,
  Medium,
  Hard,
} from "./Home.styles";
import { useMediaQuery } from 'react-responsive';

/* -------------------------------------------------------------------------- */
/*                           Set Mobile BreakPoints                           */
/* -------------------------------------------------------------------------- */

// Will render mobile friendly nav, horizontal with diff layout
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 1025 })
  return isMobile ? children : null
}

// Will render desktop friendly nav, vertical nav
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 1026 })
  return isNotMobile ? children : null
}

let EasyButton = Easy;
let MediumButton = Medium;
let HardButton = Hard;

const selectEasy = () => {
  EasyButton = SelectedEasy;
  MediumButton = Medium;
  HardButton = Hard;
};

const selectMedium = () => {
  EasyButton = Easy;
  MediumButton = SelectedMedium;
  HardButton = Hard;
};

const selectHard = () => {
  EasyButton = Easy;
  MediumButton = Medium;
  HardButton = SelectedHard;
};

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [authLoading, setAuthLoading] = useState(false);
  const [configLoading, setConfigLoading] = useState(false);
  const [token, setToken] = useState("");
  const [difficulty, setDifficulty] = useState(
    localStorage.getItem("difficulty")
      ? localStorage.getItem("difficulty")
      : "Easy"
  );
  const [selectedGenre, setSelectedGenre] = useState(
    localStorage.getItem("genre") ? localStorage.getItem("genre") : "alt-rock"
  );
  const [numberOfSongs, setNumberOfSongs] = useState(3);
  const [numberOfArtists, setNumberOfArtists] = useState(2);

  const listOfSetGenres = [
    "alt-rock",
    "alternative",
    "chill",
    "country",
    "hard-rock",
    "hip-hop",
    "party",
    "pop",
    "rock",
    "rock-n-roll",
  ];

  const loadGenres = async (t) => {
    setConfigLoading(true);
    const response = await fetchFromSpotify({
      token: t,
      endpoint: "recommendations/available-genre-seeds",
    });
    setGenres(listOfSetGenres);
    setConfigLoading(false);
  };

  useEffect(() => {
    clickedDefault();
    switch (localStorage.getItem("difficulty")) {
      case "Easy":
        selectEasy();
        break;
      case "Medium":
        selectMedium();
        break;
      case "Hard":
        selectHard();
        break;
      default:
        break;
    }

    setAuthLoading(true);

    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        setAuthLoading(false);
        setToken(storedToken.value);
        loadGenres(storedToken.value);
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      setAuthLoading(false);
      setToken(newToken.value);
      loadGenres(newToken.value);
    });
  }, []);

  if (authLoading || configLoading) {
    return <div>Loading...</div>;
  }

  const clickedEasy = (e) => {
    selectEasy();
    localStorage.setItem("difficulty", "Easy");
    localStorage.setItem("numberOfSongs", "3");
    localStorage.setItem("numberOfArtists", "2");
    setNumberOfSongs(3);
    setNumberOfArtists(2);
    setDifficulty(localStorage.getItem("difficulty"));
  };

  const clickedMedium = (e) => {
    selectMedium();
    localStorage.setItem("difficulty", "Medium");
    localStorage.setItem("numberOfSongs", "2");
    localStorage.setItem("numberOfArtists", "3");
    setNumberOfSongs(2);
    setNumberOfArtists(3);
    setDifficulty(localStorage.getItem("difficulty"));
  };

  const clickedHard = (e) => {
    selectHard();
    localStorage.setItem("difficulty", "Hard");
    localStorage.setItem("numberOfSongs", "1");
    localStorage.setItem("numberOfArtists", "4");
    setNumberOfSongs(1);
    setNumberOfArtists(4);
    setDifficulty(localStorage.getItem("difficulty"));
  };

  const clickedDefault = () => {
    localStorage.getItem("difficulty")
      ? setDifficulty(localStorage.getItem("difficulty"))
      : setDifficulty("Demo");
    setNumberOfArtists(2);
    setNumberOfSongs(1);
  };

  const genreSelectionChange = (event) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
    localStorage.setItem("genre", genre);
  };

  const renderSwitch = (param) => {
    switch (param) {
      case "Easy":
        return "3  Songs and 2 Choices";
      case "Medium":
        return "2 Songs and 3 Choices";
      case "Hard":
        return "1 Song and 4 Choices";
      default:
        return "1 Song and 2 Choices";
    }
  };

  return (
    <>
      <Route exact path="/">
        <StyledHome>
          <h1 style={{ color: "white" }}>Chosen Difficulty: {difficulty}</h1>
          <DiffDiv>
            <EasyButton onClick={clickedEasy}>Easy</EasyButton>
            <MediumButton onClick={clickedMedium}>Medium</MediumButton>
            <HardButton onClick={clickedHard}>Hard</HardButton>
          </DiffDiv>
          <div>
            <p style={{ color: "white" }}>{renderSwitch(difficulty)}</p>
          </div>
          <StyledDiv>
            Genre:
            <select
              value={selectedGenre ? selectedGenre : "alt-rock"}
              onChange={genreSelectionChange}
              style={{
                fontSize: "18px",
                margin: "20px",
                width: "220px",
                height: "30px",
                border: "1px solid black",
                borderRadius: "5px",
                padding: "3px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </StyledDiv>
          <StyledLink to="/game">
            <StyledButton>Start Game</StyledButton>
          </StyledLink>
        </StyledHome>
      </Route>
      <Route path="/game">
        <Game
          token={token}
          genre={selectedGenre}
          numberOfArtists={numberOfArtists}
          numberOfSongs={numberOfSongs}
        />
      </Route>
    </>
  );
};

export default Home;
