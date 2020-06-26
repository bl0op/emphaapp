import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import auth from './auth';
import users from './users';

const configureStore = createStore(
    combineReducers({
        auth: auth,
        users: users
    }),
    {},
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default configureStore;