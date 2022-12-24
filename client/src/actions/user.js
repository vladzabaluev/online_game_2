import axios from "axios";
import { setUser } from "../reducers/userReducers";

export const registration = async (login, password) => {
  try {
    const responce = await axios.post("http://localhost:5000/auth/registration", {
      userName: login,
      password: password,
    });
    alert(responce.data.message);
  } catch (e) {
    console.log(e);
  }
};

export const login_test = (login, password) => {
  return async (dispatch) => {
    try {
      const responce = await axios.post("http://localhost:5000/auth/login", {
        userName: login,
        password: password,
      });
      console.log(responce.data.user);
      dispatch(setUser(responce.data.user));
      localStorage.setItem("token", responce.data.token);

      //   console.log(responce.data);
    } catch (e) {
      console.log(e);
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:5000/auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(response.data.user));
      console.log(response.data.user);
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      console.log(e);
      localStorage.removeItem("token");
    }
  };
};

export const changeNickName = (userName, newUserName) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/changeNickname`,
        { userName, newUserName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setUser(response.data.user));
      console.log(response.data.user);
    } catch (e) {
      console.log(e);
    }
  };
};
