import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./components/styles/app.css";
import Registration from "./components/authorization/Registration";
import Login from "./components/authorization/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./actions/user";
import Counter from "./components/counter/Counter";
import Timer from "./components/timer/Timer";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  });

  return (
    <div>
      <BrowserRouter>
        <div className="app">
          <Navbar></Navbar>

          {!isAuth && (
            <Routes>
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          )}
          {isAuth && (
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <Timer></Timer>
                    <Counter></Counter>
                  </div>
                }
              />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
