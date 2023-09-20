import { useEffect, useRef, useState } from "react";
import "./Player.css";
import roundDuration from "../../utils/roundDuration";
import PreloaderRecord from "../PreloaderRecord/PreloaderRecord";

function Player({
  isCallActive,
  isRecordActive,
  setIsRecordActive,
  setIsHideTime,
  id,
  isStatusDuration,
  isRecord,
}) {
  const [isClosePlayer, setIsClosePlayer] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isDuration, setIsDuration] = useState(0);
  const [isSongProgress, setIsSongProgress] = useState(0);
  const [isSpan, setIsSpan] = useState(false);
  const [isSongTime, setIsSongTime] = useState(0);
  const [isCheckTime, setIsCheckTime] = useState(0);
  const [isAudioUrl, setIsAudioUrl] = useState("none");
  const [preloader, setPreloader] = useState(false);
  const audioElem = useRef();
  const clickRef = useRef();
  //получение URL записи звонка
  useEffect(() => {
    if (isRecord === "none") {
      setPreloader(true);
    } else {
      const url = URL.createObjectURL(isRecord);
      setIsAudioUrl(url);
    }
  }, [isRecord]);
  //функция "закрепления" плеера при нажитии на плей или полосу перемотки
  function fixatePlayer(e) {
    if (e.target.closest(".record")) {
      setIsRecordActive(true);
    } else {
      setIsRecordActive(false);
    }
  }
  //функция старта проигрывания записи (при нажатии на плей одной записи вторая ставится на паузу)
  function play(e) {
    const target = e.target.closest(".record");
    const targetAudio = target.querySelector(".record__audio");
    const records = document.querySelectorAll(".record");
    targetAudio.play();
    setIsPlay(true);
    records.forEach((record) => {
      const recordAudio = record.querySelector(".record__audio");
      if (recordAudio.id !== targetAudio.id) {
        recordAudio.pause();
      }
    });
  }
  //функция паузы
  function pause(e) {
    const target = e.target.closest(".record");
    const targetAudio = target.querySelector(".record__audio");
    targetAudio.pause();
    setIsPlay(false);
  }
  //функция плей пауза для кнопки плей
  function playPuse(e) {
    if (isPlay) {
      pause(e);
    } else {
      play(e);
    }
  }
  //фунция закрытия плеера при нажатии крестика
  function closePlayer(e) {
    setIsClosePlayer(true);
    setIsRecordActive(false);
    pause(e);
    setIsHideTime(true);
  }
  //функция окончания проигрыания записи
  function endingAudio() {
    setIsPlay(false);
    setIsSongProgress(0);
    const duration = audioElem.current.duration;
    setIsDuration(roundDuration(duration));
  }

  useEffect(() => {
    if (isCallActive) {
      setIsClosePlayer(false);
      setIsHideTime(false);
    }
  }, [isCallActive, setIsHideTime]);
  //функция определения длительности записи при загрузке метаданных
  function setDuration() {
    const currentTime = audioElem.current.currentTime;
    const duration = audioElem.current.duration;
    setIsDuration(roundDuration(duration - currentTime));
    setPreloader(false);
  }
  //функция определения оставшегося времени проигрывания записи
  function onPlaying() {
    const duration = audioElem.current.duration;
    const currentTime = audioElem.current.currentTime;
    setIsSongProgress((currentTime / duration) * 100);
    if (!isNaN(duration)) {
      setIsDuration(roundDuration(duration - currentTime));
      setPreloader(false);
    }
  }
  //функция перемотки записи
  function checkRewind(e) {
    checkTime(e);
    const width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const rewindProgress = (offset / width) * 100;
    audioElem.current.currentTime =
      (rewindProgress / 100) * audioElem.current.duration;
    play(e);
  }
  //функция определения времени при наведении мыши на линию прогресса записи
  function checkTime(e) {
    const width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const rewindProgress = (offset / width) * 100;
    const duration = audioElem.current.duration;
    setIsSongTime(offset);
    setIsSpan(true);
    if (isNaN(duration)) {
      setIsCheckTime("");
    } else {
      setIsCheckTime(roundDuration((rewindProgress / 100) * duration));
    }
  }

  function closeSpan() {
    setIsSpan(false);
  }
  //функция остановки приогрывания записи звонка в случае начала проигрывания запсиси другого звонка
  function handlePause() {
    setIsPlay(false);
  }

  return (
    <div
      style={{
        display: `${
          isStatusDuration
            ? isClosePlayer
              ? "none"
              : isCallActive || isRecordActive
              ? "flex"
              : "none"
            : "none"
        }`,
      }}
      className="record"
    >
      <audio
        onPause={handlePause}
        onLoadedMetadata={setDuration}
        preload="metadata"
        id={id}
        className="record__audio"
        src={isAudioUrl}
        ref={audioElem}
        onTimeUpdate={onPlaying}
        onEnded={endingAudio}
      ></audio>
      {preloader ? (
        <PreloaderRecord />
      ) : (
        <p className="record__time">{isDuration}</p>
      )}
      <button
        onMouseUp={fixatePlayer}
        onClick={playPuse}
        type="button"
        className="record__button record__button_play"
      >
        <div
          className={`record__icon record__icon_${isPlay ? "pause" : "play"}`}
        ></div>
      </button>
      <div
        onMouseUp={fixatePlayer}
        onMouseDown={checkRewind}
        onMouseMove={checkTime}
        onMouseLeave={closeSpan}
        className="record__statusbar"
        ref={clickRef}
      >
        <div
          style={{ width: `${isSongProgress}%` }}
          className="record__rewind"
        ></div>
        <span
          style={{
            display: `${isSpan ? "block" : "none"}`,
            left: `${89 + isSongTime}px`,
          }}
          className="record__progress"
        >
          {isCheckTime}
        </span>
      </div>
      <button
        onMouseUp={fixatePlayer}
        className="record__button record__button_download"
      >
        <svg
          width="13"
          height="16"
          viewBox="0 0 13 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 16H13V14.1176H0V16ZM13 5.64706H9.28571V0H3.71429V5.64706H0L6.5 12.2353L13 5.64706Z"
            fill="#ADBFDF"
          />
        </svg>
      </button>
      <button
        onClick={closePlayer}
        style={{ display: `${isRecordActive ? "flex" : "none"}` }}
        className="record__button record__button_close"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
            fill="#ADBFDF"
          />
        </svg>
      </button>
    </div>
  );
}

export default Player;
