const USER_LOGGED_IN = "USER_LOGGED_IN";
const USER_LOGGED_OUT = "USER_LOGGED_OUT";

const initialState = {
  loggedIn: false,
  currentUser: {},
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        currentUser: action.payload,
        loggedIn: true,
      };

    case USER_LOGGED_OUT:
      return {
        ...state,
        currentUser: action.payload,
        loggedIn: false,
      };

    default:
      return state;
  }
};

export default authReducer;
