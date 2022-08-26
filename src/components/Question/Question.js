import React, { useState, useEffect } from "react";
import AudioPlayer from "../PlayButton/PlayButton";
import { getListOfArtistsByGenre, getArtistTopSongs } from "../../services/api";
import {
  StyledButton,
  StyledLink,
  StyledGame,
  StyledPlay,
  StyledCard,
  StyledDiv,
  StyledP,
  StyledGenre,
} from "./Question.styles";
import { Redirect } from "react-router-dom";

const Question = (props) => {
  const [stopSongs, setStopSongs] = useState(false);
  const [allArtists, setAllArtists] = useState([]);
  const [correctArtist, setCorrectArtist] = useState();
  const [answer, setAnswer] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [songList, setSongList] = useState([]);
  const [previewArray, setPreviewArray] = useState([]);
  const [internalError, setInternalError] = useState("");

  useEffect(() => {
    const getAllArtists = async (token, genre, max) => {
      const extras = await getListOfArtistsByGenre(token, genre, max);
      setAllArtists(extras);
      setCorrectArtist(
        extras.map((artist) => artist.artistid)[
          Math.floor(Math.random() * props.numberOfArtists)
        ]
      );
    };
    let errorCount = 0;
    const rerunGetAllArtists = () => {
      errorCount += 1;
      if (errorCount < 5) {
        getAllArtists(
          props.token,
          props.selectedGenre,
          props.numberOfArtists
        ).catch((err) => {
          console.log("500 Error. Retrying...: " + err);
          rerunGetAllArtists();
        });
      } else if (errorCount >= 5) {
        setInternalError(<Redirect to="/" />);
      }
    };

    switch (props.numberOfSongs) {
      case 3:
        previewArray.length < 3 ? rerunGetAllArtists() : "";
        break;
      case 2:
        previewArray.length < 2 ? rerunGetAllArtists() : "";
        break;
      case 1:
        previewArray.length < 1 ? rerunGetAllArtists() : "";
        break;
      default:
        break;
    }
  }, [props.numberOfArtists, previewArray]);

  useEffect(() => {
    const getTopSongs = async () => {
      if (correctArtist) {
        const topSongs = await getArtistTopSongs(props.token, correctArtist);
        setSongList(topSongs.tracks);
      }
    };
    getTopSongs();
  }, [correctArtist]);

  useEffect(() => {
    const setPreviews = () => {
      if (songList.length > 0) {
        setPreviewArray(
          songList
            .filter((song) => song.preview_url)
            .map((song) => ({
              previewURL: song.preview_url,
              artistName: song.artists[0].name,
            }))
            .sort(() => 0.5 - Math.random())
            .slice(0, props.numberOfSongs)
        );
      }
    };
    setPreviews();
  }, [songList]);

  let songsplayer = previewArray.map((preview, i) => [
    <StyledPlay key={i}>
      <AudioPlayer
        src={previewArray[i].previewURL}
        index={i}
        stopSongs={stopSongs}
      ></AudioPlayer>
    </StyledPlay>,
  ]);

  const clickedNext = () => {
    setStopSongs(!stopSongs);
    props.clickedNext();
  };

  const clickedArtist = (i) => {
    setIsDisabled(true);
    document.getElementsByClassName("questionButton").disabled = isDisabled;

    for (let i = 0; i < allArtists.length; i++) {
      document.getElementsByClassName("questionButton")[i].style.backgroundColor = "#ff9696";
    }

    if (allArtists.map((artist) => artist.artistid)[i] === correctArtist) {
      document.getElementsByClassName("questionButton")[i].style.backgroundColor = "#b3ffb4";
      props.scoreUp();
      setAnswer(
        <div
          style={{
            textAlign: "center",
          }}
        >
          <StyledP>Correct</StyledP>
          <button
            onClick={clickedNext}
            style={{
              width: "80px",
              height: "40px",
              background: "#94edff",
              border: "2px solid #00bde3",
              borderRadius: "10px",
              boxShadow: "0 0 6px 2px #00bde3",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Next
          </button>
        </div>
      );
    } else {
      for (let i = 0; i < allArtists.length; i++) {
        if (allArtists[i].artistid === correctArtist) {
          document.getElementsByClassName("questionButton")[i].style.backgroundColor = "#b3ffb4";
        }
      }

      setAnswer(
        <div
          style={{
            textAlign: "center",
          }}
        >
          <StyledP>Incorrect</StyledP>
          <button
            onClick={clickedNext}
            style={{
              width: "80px",
              height: "40px",
              background: "#94edff",
              border: "2px solid #00bde3",
              borderRadius: "10px",
              boxShadow: "0 0 6px 2px #00bde3",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Next
          </button>
        </div>
      );
    }
  };

  let artistlist = [...Array(Number.parseInt(props.numberOfArtists))].map(
    (val, i) => [
      <StyledCard key={i}>
        <button
          className="questionButton"
          onClick={() => clickedArtist(i)}
          disabled={isDisabled}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            background: "#ffe3b3",
            border: "none",
            cursor: "pointer",
          }}
        >
          <p>{allArtists.map((artist) => artist.artistname)[i]}</p>
        </button>
      </StyledCard>,
    ]
  );

  return (
    <div>
      <StyledLink to="/">
        <StyledButton>{"Restart"}</StyledButton>
      </StyledLink>
      <StyledGenre>Listening to: '{props.selectedGenre}'</StyledGenre>
      <StyledP>Question #{props.qi + 1}</StyledP>
      {previewArray.length === props.numberOfSongs ? (
        <>
          <StyledGame>{songsplayer}</StyledGame>
          <StyledDiv>{artistlist}</StyledDiv>
        </>
      ) : (
        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "19.4%",
          }}
        >
          Loading...
        </h1>
      )}
      {answer}
      {internalError}
    </div>
  );
};

export default Question;
