import React from 'react';
import { render } from 'react-dom';
import App from './components/AppComponent';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

// possibility of hard coding the initial state here
let initialState = {}

let store = configureStore(initialState);


render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
);