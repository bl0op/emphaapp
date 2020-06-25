import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}


function PrivateRoute({component: Component, token: token, ...rest}){
    return (
        <Route 
        {...rest}
        render={(props) => 
            token ? (<Component {...props} />) : (<Redirect to='/login'/>)
        } 
        />
    );
}

export default connect(mapStateToProps)(PrivateRoute);