import React from "react";
import { useState } from "react";
import Input from "../utils/input/Input";
import "./authorization.css";
import { registration } from "../../actions/user";

const Registration = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="authorization">
      <div className="authorization__header">Регистрация </div>
      <Input value={login} setValue={setLogin} type="text" placeholder="Введите логин"></Input>
      <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль"></Input>
      <button className="authorization__btn" onClick={() => registration(login, password)}>
        Зарегистрироваться
      </button>
    </div>
  );
};

export default Registration;
