const ADD_CONTACT = 'ADD_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const DELETE_CONTACT = 'DELETE_CONTACT';
const IMPORT_CONTACTS = 'IMPORT_CONTACTS';
const DELETE_ALL_CONTACTS = 'DELETE_ALL_CONTACTS';

const initialState = {
  data: [],
};

const userContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      // payload: obj
      return {
        ...state,
        data: [action.payload, ...state.data],
      };

    case UPDATE_CONTACT:
      // eslint-disable-next-line no-case-declarations
      const contactIndex = state.data.findIndex(
        (contact) => contact._id === action.payload._id
      );
      state.data.splice(contactIndex, 1, action.payload);

      return {
        ...state,
      };

    case DELETE_CONTACT:
      return {
        ...state,
        data: state.data.filter((contact) => contact._id !== action.payload),
      };

    case IMPORT_CONTACTS:
      // payload : array of obj
      return {
        data: [...action.payload, ...state.data],
      };

    case DELETE_ALL_CONTACTS:
      // eslint-disable-next-line no-case-declarations
      const updatedData = state.data.filter((contact) => {
        return contact.userId !== action.payload;
      });
      return {
        ...state,
        data: [...updatedData],
      };

    default:
      return state;
  }
};
export default userContactReducer;
