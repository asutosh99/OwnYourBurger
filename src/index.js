import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import { Provider} from 'react-redux';
import BurgerBuilderReducer from './Store/reducer/BurgerBuilder'
import orderReducer from './Store/reducer/order'
import thunk from 'redux-thunk'
import authReducer from './Store/reducer/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer=combineReducers({
  burgerBuilder:BurgerBuilderReducer,
  order :orderReducer,
  auth:authReducer
})
const store = createStore(rootReducer,composeEnhancers(
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
  <BrowserRouter>
      <App />
  </BrowserRouter>
  </Provider>

);

ReactDOM.render(
app,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

