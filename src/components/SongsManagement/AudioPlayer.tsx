import styles from "./AudioPlayer.module.css";

import React, { useState, useEffect, useRef } from "react";

import { formatSeconds } from "../../utils/formatSeconds";

const AudioPlayer = ({
  audioPath,
  setAudioPath,
  title,
}: {
  audioPath: string;
  setAudioPath: React.Dispatch<React.SetStateAction<string>>;
  title: string;
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currDuration, setCurrDuration] = useState<string>("0:00");
  const [finalDuration, setFinalDuration] = useState<string>("0:00");

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (audioRef.current && audioPath !== "") {
      audioRef.current.pause();
      audioRef.current.src = audioPath;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [audioPath]);

  const onPlayClick = () => {
    if (isPlaying) {
      // Pause lagu
      audioRef.current!.pause();
    } else {
      // Mulai lagu
      audioRef.current!.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onStopClick = () => {
    audioRef.current!.pause();
    setIsPlaying(false);
    setAudioPath("");
  };

  const onTimeUpdate = () => {
    setFinalDuration(formatSeconds(Math.ceil(audioRef.current!.duration)));

    const percent =
      (audioRef.current!.currentTime / audioRef.current!.duration) * 100;

    progressBar.current!.value = percent.toString();

    const seconds = Math.ceil(audioRef.current!.currentTime);
    
    setCurrDuration(formatSeconds(seconds));
  };

  const onProgressBarInput = (e: React.FormEvent<HTMLInputElement>) => {
    const seconds = (parseInt(e.currentTarget.value) / 100) * audioRef.current!.duration;
    setCurrDuration(formatSeconds(Math.ceil(seconds)))

    audioRef.current!.currentTime = seconds;
  }

  if (audioPath === "") {
    return <></>;
  }
  return (
    <div className={styles.audioPlayerContainer}>
      <p className={styles.playingInfo}>{title}</p>
      <div className={styles.playerButton}>
        <div className={styles.buttonPlay} onClick={() => onPlayClick()}>
          {!isPlaying && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                fill="#000000"
                d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
              />
            </svg>
          )}
          {isPlaying && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path
                fill="#000000"
                d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"
              />
            </svg>
          )}
        </div>
        <div className={styles.buttonStop} onClick={() => onStopClick()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
          </svg>
        </div>
      </div>
      <div className={styles.progressBarContainer}>
        <p id="curr-duration">{currDuration}</p>
        <input
          type="range"
          name="progress-bar"
          id="progress-bar"
          step="0.01"
          ref={progressBar}
          onInput={(e) => onProgressBarInput(e)}
        />
        <p id="final-duration">{finalDuration}</p>
      </div>
      <div className={styles.hidePlayer}>
        <audio
          controls
          className={styles.audioPlayer}
          ref={audioRef}
          onTimeUpdate={() => onTimeUpdate()}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
