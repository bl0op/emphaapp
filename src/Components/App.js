import React, {Suspense} from 'react';
import {BrowserRouter as Router,
        Route
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Profile from './ProfileComponent';
import Login from './LoginComponent';

import {Provider} from 'react-redux';
import store from '../redux/configureStore';
import {authSetToken} from '../redux/ActionCreators';

function App() {

    /* fits token to redux-store, if in localStorage */
    let token = localStorage.getItem('token');
    if(token){
        //store.dispatch(authSetToken(token));
        store.dispatch(authSetToken(null));
    }

    return (
        <Provider store={store}>
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    <PrivateRoute exact path='/' component={Profile}/>
                    <Route path='/login' component={Login}/>
                </Router>
            </Suspense>
        </Provider>
    );
}


export default App;