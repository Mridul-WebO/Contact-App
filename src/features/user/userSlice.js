const ADD_USER = "ADD_USER";
// const UPDATE_USER = "UPDATE_USER";
// const DELETE_USER = "DELETE_USER";

export const addUser = (userObj) => {
  return {
    type: ADD_USER,
    payload: userObj,
  };
};

// export const updateUser = (userObj) => {
//   return {
//     type: UPDATE_USER,
//     payload: {},
//   };
// };

// export const deleteUser = (userId) => {
//   return {
//     type: DELETE_USER,
//     payload: {},
//   };
// };
