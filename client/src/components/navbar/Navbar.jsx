import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducers";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const userName = useSelector((state) => state.user.currentUser.userName);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__header">vrotebal tkp</div>
        {!isAuth && (
          <div className="navbar__login">
            <NavLink to="/login">Войти</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className="navbar__registration">
            <NavLink to="/registration">Регистрация</NavLink>
          </div>
        )}
        {console.log(userName)}
        {isAuth && <div className="navbar__login">Добро пожаловать, {userName} </div>}
        {isAuth && (
          <div className="navbar__registration" onClick={() => dispatch(logout())}>
            Выход
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
