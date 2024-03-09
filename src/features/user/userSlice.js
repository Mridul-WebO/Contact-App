const ADD_USER = 'ADD_USER';

export const addUser = (userObj = {}) => {
  return {
    type: ADD_USER,
    payload: userObj,
  };
};
