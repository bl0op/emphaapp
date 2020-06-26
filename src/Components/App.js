import React, {Suspense} from 'react';
import {BrowserRouter as Router,
        Route
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Users from './UsersComponent';
import Login from './LoginComponent';

import {Provider} from 'react-redux';
import store from '../redux/configureStore';
import {authSetToken} from '../redux/ActionCreators';

function App() {


    let localToken = localStorage.getItem('token');
    if(localToken){
        sessionStorage.setItem('token', localToken); 
    }
    return (
        <Provider store={store}>
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    <PrivateRoute exact path='/' component={Users}/>
                    <Route path='/login' component={Login}/>
                </Router>
            </Suspense>
        </Provider>
    );
}


export default App;