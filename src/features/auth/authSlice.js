const USER_LOGGED_IN = 'USER_LOGGED_IN';
const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export const userLoggedIn = (userObj = {}) => {
  return {
    type: USER_LOGGED_IN,
    payload: userObj,
  };
};

export const userLoggedOut = () => {
  return {
    type: USER_LOGGED_OUT,
    payload: {},
  };
};
