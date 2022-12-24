import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./components/styles/app.css";
import Registration from "./components/authorization/Registration";
import Login from "./components/authorization/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./actions/user";
import Counter from "./components/counter/Counter";
import Timer from "./components/timer/Timer";
import Profile from "./components/Profile/Profile";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.currentUser);
  const cursor = useSelector((state) => state.currentCursor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <div>
      <BrowserRouter>
        <div
          className="app"
          style={
            user.skins && user.skins.length > 0
              ? {
                  cursor: "auto",
                  // cursor: cursor,
                  cursor: "url(" + cursor + ") 64 64, auto",
                }
              : null
          }
        >
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
                path="/:id"
                element={
                  <div>
                    <Timer></Timer>
                    <Counter></Counter>
                  </div>
                }
              />
              <Route path="/" element={<Navigate to={`f${(+new Date()).toString(16)}`} />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
