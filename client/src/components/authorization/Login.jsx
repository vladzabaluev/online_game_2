import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../utils/input/Input";
import "./authorization.css";
import { login_test } from "../../actions/user";
import { useNavigate } from "react-router-dom";
import { store } from "../../reducers";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="authorization">
      <div className="authorization__header">Авторизация </div>
      <Input value={login} setValue={setLogin} type="text" placeholder="Введите логин"></Input>
      <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль"></Input>
      <button
        className="authorization__btn"
        onClick={() => {
          dispatch(login_test(login, password)).then(() => {
            if (store.getState().user.isAuth) {
              navigate("/");
            }
          });
        }}
      >
        Войти в аккаунт
      </button>
    </div>
  );
};

export default Login;
