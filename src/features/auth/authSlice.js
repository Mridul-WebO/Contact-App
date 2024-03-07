import { removeCurrentUser, setCurrentUser } from "../../storage/Storage";

const USER_LOGGED_IN = "USER_LOGGED_IN";
const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export const userLoggedIn = (userObj = {}) => {
  setCurrentUser(userObj);
  return {
    type: USER_LOGGED_IN,
    payload: userObj,
  };
};

export const userLoggedOut = () => {
  removeCurrentUser();
  return {
    type: USER_LOGGED_OUT,
    payload: {},
  };
};
