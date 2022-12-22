import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

socket.onmessage = (event) => {
  console.log("С сервера пришло сообщение", event.data);
};

const Timer = () => {
  const [timer, setTimer] = useState(5);
  const isCounting = useSelector((state) => state.user.isCounting);
  const gameIsPlayed = useSelector((state) => state.user.isPlaying);
  const dispatch = useDispatch();

  //   const [isCounting, setIsCounting] = useState(false);
  //   const [gameIsPlayed, setGameIsPlayed] = useState(false);

  const minutes = getPadTime(Math.floor(timer / 60));
  const seconds = getPadTime(timer - minutes / 60);

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting && setTimer((timer) => (timer >= 1 ? timer - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (timer === 0) {
      if (!gameIsPlayed) {
        StartGame(1);
      } else {
        FinishGame();
      }
    }
  }, [timer]);

  function TimerStart(durationTime) {
    setTimer(durationTime);
    dispatch(setIsCounting(true));
    socket.send(
      JSON.stringify({
        method: "StartTimer",
      })
    );
  }

  function FinishGame() {
    dispatch(setIsCounting(false));
    socket.send(
      JSON.stringify({
        method: "GameOver",
      })
    );
  }

  function StartGame(durationTime) {
    setTimer(durationTime);
    dispatch(setIsCounting(true));
    dispatch(setIsPlaying(true));
    socket.send(
      JSON.stringify({
        method: "GameStart",
      })
    );
  }

  return (
    <div>
      {!isCounting && !gameIsPlayed ? (
        <button
          className="timer"
          onClick={() => {
            TimerStart(2);
          }}
        >
          Начать игру!
        </button>
      ) : (
        <></>
      )}
      {isCounting && !gameIsPlayed ? <h1 className="timer">Готовься {timer}</h1> : <></>}
      {isCounting && gameIsPlayed ? (
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
