import { combineReducers, createStore } from "redux";
import userReducer from "../features/user/userReducer";
import authReducer from "../features/auth/authReducer";

// redux-persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  registeredUsers: userReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(
  {
    key: "CONTACT_APP",
    storage,
  },
  rootReducer
);
const store = createStore(persistedReducer);

export const persistor = persistStore(store);
export default store;
