import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setIsCounting, setIsPlaying } from "../../reducers/userReducers";
import { getPadTime } from "../helpers/getPadTime";
import "../timer/timer.css";

const socket = new WebSocket("ws://localhost:5000/:id");

socket.onopen = () => {
  socket.send(
    JSON.stringify({
      method: "connection",
      userName: "Тестовое имя",
    })
  );
};

// socket.onmessage = (event) => {
//   console.log("С сервера пришло сообщение", event.data);
// };

const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [isCounting, setIsCounting] = useState(0);
  const [isGamePlaying, setIsGamePlaying] = useState(0);

  const minutes = getPadTime(Math.floor(timer / 60));
  const seconds = getPadTime(timer - minutes / 60);

  socket.onmessage = (event) => {
    event = JSON.parse(event.data);
    switch (event.method) {
      case "TimeValueChanged":
        setIsCounting(true);
        setTimer(event.newTimerValue);
        break;
      case "StartGame":
        setIsGamePlaying(true);
        socket.send(
          JSON.stringify({
            method: "StartGame",
            timer: 5,
          })
        );
        break;
      case "ShowFinalResult":
        setIsCounting(false);
        socket.close();
        break;
    }
  };

  function TimerStart(durationTime) {
    socket.send(
      JSON.stringify({
        method: "StartCountdown",
        timer: durationTime,
      })
    );
  }

  return (
    <div>
      {!isCounting && !isGamePlaying ? (
        <button
          className="timer"
          onClick={() => {
            TimerStart(3);
          }}
        >
          Начать игру!
        </button>
      ) : (
        <></>
      )}
      {isCounting && !isGamePlaying ? <h1 className="timer">Готовься {timer}</h1> : <></>}
      {isCounting && isGamePlaying ? (
        <h1 className="timer">
          Осталось {minutes}:{seconds}
        </h1>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Timer;
