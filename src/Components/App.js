import React, { useState } from 'react';
import {BrowserRouter as Router,
        Route
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import {AuthContext} from './context/auth';

import Profile from './ProfileComponent';
import Login from './LoginComponent';
import Signup from './SignupComponent';



function App() {

    const existingTokens = JSON.parse(localStorage.getItem('tokens'));
    const [authToken, setAuthToken] = useState(existingTokens);

    const setToken = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthToken(data);
    }

    return (
        <AuthContext.Provider value={{authToken, setAuthToken: setToken}}>
            <Router>
                <div>
                    <PrivateRoute exact path='/' component={Profile}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/signup' component={Signup}/>
                </div>
            </Router>
        </AuthContext.Provider>
    );
}


export default App;