import {createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import departmentReducer from './reducers/departmentReducer';

export const ConfigureStore = () => {
    // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const reducer = combineReducers({
        auth: authReducer,
        department: departmentReducer
    });
    const store = createStore (
        reducer,
        applyMiddleware(thunk)
    );
    return store;
};