import * as Action from './ActionTypes';
import {baseUrl} from '../shared/url';

/* auth action creators */
export function authLogin(){
    return {
        type: Action.AuthLogin,
    };
}
export function authLoginEnd() {
    return {
        type: Action.AuthLoginEnd
    };
}
export function authFailed(error){
    return {
        type: Action.AuthFailed,
        error: error
    };
}

/* users action creators */
export function usersLoading(){
    return {
        type: Action.UsersLoading
    }
}
export function usersSet(users){
    return {
        type: Action.UsersSet,
        users: users
    }
}
export function usersFailed(error){
    return {
        type: Action.UsersFailed,
        error: error
    }
}

/*thunks*/
export function login(username, password, rememberMe) {
    return function (dispatch){
        dispatch(authLogin());
        fetch(`${baseUrl}/api-token-auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: `{"username": "${username}", "password": "${password}"}`
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            if(res.non_field_errors){
                var error = new Error(res.non_field_errors.join(','));
                throw error;
            }
            /* authentication is successfull*/
            if(rememberMe){
                localStorage.setItem('token', res.token); 
            }
            sessionStorage.setItem('token', res.token); 
            dispatch(Action.AuthLoginEnd);
        })
        .catch((err) => {
            dispatch(authFailed(err.message));
        })
        ;
    }
}

export function loadUsers() {
    return function (dispatch){
        dispatch(usersLoading());
        /* to shared */
        fetch(`${baseUrl}/api/v1/users/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${sessionStorage.getItem('token')}`,
            },
        })
        .then((res) => {
            if(res.ok){
                return res;
            }
            else {
                var error = new Error('Error ' + res.status + ': ' + res.statusText);
                throw error;
            }
        })
        .then((res) => {
            return res.json();
        })
        /* users successfully loaded*/
        .then((res) => {
            dispatch(usersSet(res));
        })
        .catch((err) => {
            dispatch(usersFailed(err.message));
        })
        ;
    }
}