import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../counter/counter.css";

const socket = new WebSocket("ws://localhost:5000/:id");

const Counter = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isCounting, setIsCounting] = useState(0);
  const [isGamePlaying, setIsGamePlaying] = useState(0);

  const [winnerName, setWinnerName] = useState();
  const [winnerScore, setWinnerScore] = useState();

  const user = useSelector((state) => state.user.currentUser);
  const cursor = useSelector((state) => state.user.currentCursor);

  socket.onmessage = (event) => {
    event = JSON.parse(event.data);
    console.log(event);
    switch (event.method) {
      case "TimeValueChanged":
        setIsCounting(true);
        break;
      case "StartGame":
        setIsGamePlaying(true);
        break;
      case "FinishGame":
        setIsCounting(false);
        socket.send(
          JSON.stringify({
            method: "GameOver",
            result: clickCount,
            user: user.userName,
          })
        );
        break;
      case "ReloadPage":
        window.location.reload();
        break;
      case "ShowFinalResult":
        setIsCounting(false);
        setWinnerName(event.userName);
        setWinnerScore(event.winnerCliCkCount);

        break;
    }
  };

  function incrementScore() {
    if (isCounting && isGamePlaying) setClickCount(clickCount + 1);
  }

  function restartPage() {
    socket.send(
      JSON.stringify({
        method: "Reload",
      })
    );
  }
  return (
    <div>
      {isCounting && isGamePlaying ? (
        <button
          className="mainButton"
          style={
            user.skins && user.skins.length > 0
              ? {
                  cursor: "auto",
                  // cursor: cursor,
                  cursor: "url(" + cursor + ") 64 64, auto",
                }
              : null
          }
          onClick={incrementScore}
        >
          Кликай <br></br> {clickCount}
        </button>
      ) : (
        <></>
      )}

      {!isCounting && isGamePlaying ? (
        <div>
          {" "}
          <button
            className="restartButton"
            style={
              user.skins && user.skins.length > 0
                ? {
                    cursor: "auto",
                    // cursor: cursor,
                    cursor: "url(" + cursor + ") 64 64, auto",
                  }
                : null
            }
            onClick={restartPage}
          >
            Перезапустить игру
            <br></br>
            Победитель: {winnerName}
            <br></br>
            Его очки: {winnerScore}
          </button>
          <button className="mainButton">Ваш результат: {clickCount}</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Counter;
