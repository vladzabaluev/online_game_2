import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import "./components/styles/app.css";
import Registration from "./components/authorization/Registration";
import Login from "./components/authorization/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar></Navbar>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
