import { combineReducers, createStore } from "redux";
import userReducer from "../features/user/userReducer";
import authReducer from "../features/auth/authReducer";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
