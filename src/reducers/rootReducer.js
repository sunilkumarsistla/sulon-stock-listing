import { combineReducers } from 'redux';
import apiReducers from './apiReducers';
import portFolioReducers from './portFolioReducers';

export default combineReducers({
    symbols: apiReducers,
    portfolio: portFolioReducers
});