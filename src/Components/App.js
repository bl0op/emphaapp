import React, {Suspense} from 'react';
import {BrowserRouter as Router,
        Switch,
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
                    <Switch>
                    <Route exact path='/login' component={Login}/>
                    <PrivateRoute exact path='/' component={Users}/>
                    </Switch>
                </Router>
            </Suspense>
        </Provider>
    );
}


export default App;