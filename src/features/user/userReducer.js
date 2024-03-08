const ADD_USER = "ADD_USER";

const initialState = {
  data: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
