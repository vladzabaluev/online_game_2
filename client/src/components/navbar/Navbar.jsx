import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducers";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const userName = useSelector((state) => state.user.currentUser.userName);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cursor = useSelector((state) => state.user.currentCursor);
  return (
    <div
      className="navbar "
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
      <div className="container">
        <div
          className="navbar__header"
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
          <NavLink to="/">Курсовая</NavLink>
        </div>
        {!isAuth && (
          <div
            className="navbar__login"
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
            <NavLink to="/login">Войти</NavLink>
          </div>
        )}
        {!isAuth && (
          <div
            className="navbar__registration"
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
            <NavLink to="/registration">Регистрация</NavLink>
          </div>
        )}
        {console.log(userName)}
        {isAuth && (
          <div
            className="navbar__login"
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
            <NavLink to="/profile">Добро пожаловать, {userName} </NavLink>
          </div>
        )}
        {isAuth && (
          <div
            className="navbar__registration"
            style={
              user.skins && user.skins.length > 0
                ? {
                    cursor: "auto",
                    // cursor: cursor,
                    cursor: "url(" + cursor + ") 64 64, auto",
                  }
                : null
            }
            onClick={() => dispatch(logout())}
          >
            Выход
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
