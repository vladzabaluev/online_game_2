const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";
const SET_ISPLAYING = "SET_ISPLAYING";
const SET_ISCOUNTING = "SET_ISCOUNTING";

const defaultState = {
  currentUser: {},
  isAuth: false,
  isPlaying: false,
  isCounting: false,
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: {},

        isAuth: false,
      };
    default:
      return state;
    case SET_ISPLAYING:
      return {
        ...state,
        isPlaying: action.payload,
      };
    case SET_ISCOUNTING:
      return {
        ...state,
        isCounting: action.payload,
      };
  }
}

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const logout = () => ({ type: LOGOUT });
export const setIsCounting = (bool) => ({ type: SET_ISCOUNTING, payload: bool });
export const setIsPlaying = (bool) => ({ type: SET_ISPLAYING, payload: bool });
