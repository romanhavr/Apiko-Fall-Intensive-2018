import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootModule from '../modules/rootModule';

let store = null;

if (process.env.NODE_ENV === 'development') {
    store = createStore(rootModule, applyMiddleware(reduxThunk));
} else {
    store = createStore(rootModule);
};

export default store;