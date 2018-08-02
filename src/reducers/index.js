import { combineReducers } from 'redux';
import todos from './todos';
import { TEST_ACTION } from '../actions';

export const testReducer = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case TEST_ACTION:
      return {
        ...state,
        test: action.payload.test,
      };  
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  testReducer,
});
export default todoApp;
