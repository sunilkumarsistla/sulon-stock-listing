import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';
var store; 

const getStore = (initialState = {}) => {
    store = store || createStore(rootReducer, applyMiddleware(thunk));
    return store;
}

export default getStore;
