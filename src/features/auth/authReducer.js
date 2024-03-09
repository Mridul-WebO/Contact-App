const USER_LOGGED_IN = "USER_LOGGED_IN";
const USER_LOGGED_OUT = "USER_LOGGED_OUT";

const initialState = {
  currentUser: {},
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        currentUser: action.payload,
      };

    case USER_LOGGED_OUT:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export const isLoggedinSelector = (state) =>
  Object.keys(state.auth.currentUser).length !== 0;

export default authReducer;
