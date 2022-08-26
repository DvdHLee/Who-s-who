import React, { useState, useEffect } from "react";
import ReactHowler from "react-howler";
import { StyledButton } from "./PlayButton.styles";

export const AudioPlayer = (props) => {
  const [playing, setPlaying] = useState(false);
  const src = props.src;

  const togglePlay = () => {
    setPlaying(!playing);
  };

  useEffect(() => {
    setPlaying(false);
  }, [props.stopSongs]);

  return (
    <div>
      <ReactHowler volume={0.05} format={["mp3"]} playing={playing} src={src} />
      <StyledButton onClick={togglePlay}>Play/Pause</StyledButton>
    </div>
  );
};

export default AudioPlayer;
