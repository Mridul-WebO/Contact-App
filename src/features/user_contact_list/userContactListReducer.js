const ADD_CONTACT = "ADD_CONTACT";
const UPDATE_CONTACT = "UPDATE_CONTACT";
const DELETE_CONTACT = "DELETE_CONTACT";
const IMPORT_CONTACTS = "IMPORT_CONTACTS";
const DELETE_ALL_CONTACTS = "DELETE_ALL_CONTACTS";

const initialState = {
  contactList: [],
};

const userContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      // payload: obj
      return {
        ...state,
        contactList: [action.payload, ...state.contactList],
      };

    case UPDATE_CONTACT:
      const updatedContacts = state.contactList;
      const { userId } = action.payload;
      const { contacts } = state.contactList.find(
        (user) => user.userId === userId
      );
      const rowIndex = contacts.findIndex(
        (contact) => contact.userId === action.payload.userId
      );
      contacts.splice(rowIndex, 1, action.payload);

      return {
        ...state,
        contactList: updatedContacts,
      };

    case DELETE_CONTACT:
      return {
        ...state,
      };

    case IMPORT_CONTACTS:
      // payload : array of obj
      return {
        ...state,
        contactList: [...action.payload, ...state.contactList],
      };

    case DELETE_ALL_CONTACTS:
      return {
        ...state,
        contactList: [],
      };

    default:
      return state;
  }
};

export default userContactReducer;
