import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../counter/counter.css";

const Counter = () => {
  const [clickCount, setClickCount] = useState(0);

  const isCounting = useSelector((state) => state.user.isCounting);
  const gameIsPlayed = useSelector((state) => state.user.isPlaying);
  function incrementScore() {
    if (isCounting && gameIsPlayed) setClickCount(clickCount + 1);
  }

  function restartPage() {
    console.log("restart");
    window.location.reload();
  }
  return (
    <div>
      {isCounting && gameIsPlayed ? (
        <button className="mainButton" onClick={incrementScore}>
          Кликай <br></br> {clickCount}
        </button>
      ) : (
        <></>
      )}

      {!isCounting && gameIsPlayed ? (
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
