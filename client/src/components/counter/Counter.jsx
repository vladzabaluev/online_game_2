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

  const userName = useSelector((state) => state.user.currentUser.userName);

  socket.onmessage = (event) => {
    event = JSON.parse(event.data);
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
            user: userName,
          })
        );
        break;
      case "ReloadPage":
        window.location.reload();
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
        <button className="mainButton" onClick={incrementScore}>
          Кликай <br></br> {clickCount}
        </button>
      ) : (
        <></>
      )}

      {!isCounting && isGamePlaying ? (
        <div>
          {" "}
          <button className="restartButton" onClick={restartPage}>
            Перезагрузить страницу
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