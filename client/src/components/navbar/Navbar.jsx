import React from "react";
import "../styles/navbar.less";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__header">MERN CLOUD</div>
        <div className="navbar__login">Войти</div>
        <div className="navbar__registration">Регистрация</div>
      </div>
    </div>
  );
};

export default Navbar;
