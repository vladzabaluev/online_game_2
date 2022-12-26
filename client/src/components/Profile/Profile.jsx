import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNickName, login_test } from "../../actions/user";
import Input from "../utils/input/Input";
import "./profile.css";
import { store } from "../../reducers";
import { setCursor } from "../../reducers/userReducers";

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [login, setLogin] = useState(user.userName);
  return (
    <div className="profile">
      <div className="authorization__header">Личный кабинет </div>

      <div> {user.rank ? <div> Твоё звание: {user.rank.rankName}</div> : <div>Выиграй 5 игр, чтобы получить новый ранг</div>}</div>
      <Input value={login} setValue={setLogin} type="text" placeholder="Измените логин"></Input>

      <button
        className="authorization__btn"
        onClick={() => {
          dispatch(changeNickName(user.userName, login));
        }}
      >
        Сменить имя
      </button>

      <div className="authorization__header">Выбери курсор из имеющихся </div>
      {user.skins.map((skin) => (
        <img
          key={skin._id}
          src={skin.cursorImage}
          onClick={() => {
            dispatch(setCursor(skin.cursorImage));
          }}
        ></img>
      ))}
    </div>
  );
};

export default Profile;
