const ADD_CONTACT = "ADD_CONTACT";
const UPDATE_CONTACT = "UPDATE_CONTACT";
const DELETE_CONTACT = "DELETE_CONTACT";
const IMPORT_CONTACTS = "IMPORT_CONTACTS";
const DELETE_ALL_CONTACTS = "DELETE_ALL_CONTACTS";

export const addContact = (userObj = {}) => {
  return {
    type: ADD_CONTACT,
    payload: userObj,
  };
};

export const updateContact = (userObj = {}) => {
  return {
    type: UPDATE_CONTACT,
    payload: userObj,
  };
};

export const deleteContact = (userId = null) => {
  return {
    type: DELETE_CONTACT,
    payload: userId,
  };
};

export const importContacts = (contacts = []) => {
  return {
    type: IMPORT_CONTACTS,
    payload: contacts,
  };
};

export const deleteAllContacts = () => {
  return {
    type: DELETE_ALL_CONTACTS,
  };
};
