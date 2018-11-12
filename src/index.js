import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import { persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

store.subscribe(() => {
    const state = store.getState();
    const json = JSON.stringify(state);

    window.localStorage.setItem('redux', json);
});

ReactDOM.render(
    <Provider store = {store} >
        <PersistGate loading = {<img src='https://www.createwebsite.net/wp-content/uploads/2015/09/Loader.gif'></img>} persistor = {persistor}>
            <BrowserRouter>    
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
