import { createStore } from 'redux';

const initialState = {
  movies: [],
  id: null,
};

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    case 'SET_ID':
      return {
        ...state,
        id: action.payload,
      };

    default:
      return state;
  }
};

const configureStore = () => createStore(rootReducer, initialState);

export default configureStore;
