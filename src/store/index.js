import { createStore } from 'redux';
import testApp from '../reducers';

const store = createStore(testApp);

export default store;
