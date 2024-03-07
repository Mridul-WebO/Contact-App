const ADD_USER = "ADD_USER";

const initialState = {
  userData: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      console.log(action.payload);
      return {
        ...state,
        userData: [...state.userData, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
