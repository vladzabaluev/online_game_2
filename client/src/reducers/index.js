import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import userReducer from "./userReducers";

const rootReducer = combineReducers({
    user: userReducer
})
// const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
// const store = createStore(rootReducer, composedEnhancer)
// export default store
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));