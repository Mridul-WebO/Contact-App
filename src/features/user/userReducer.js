import { getData } from "../../storage/Storage";

const ADD_USER = "ADD_USER";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";

const initialState = {
  data: getData(),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      console.log(state.data);

      return {
        ...state,
      };

    case UPDATE_USER:
      return {
        ...state,
      };

    case DELETE_USER:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userReducer;
