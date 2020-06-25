import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import './LoginComponent.scss';
import { useAuth } from './context/auth';


function Login(props){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //move to store
    const [isLoggenIn, setLoggedIn] = useState(false);
    const { setAuthToken } = useAuth();

    function postLogin(e) {
        e.preventDefault();
        fetch('http://emphasoft-test-assignment.herokuapp.com/api-token-auth/', {
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
            setAuthToken(res.token);
            setLoggedIn(true);
        })
        .catch((err) => {
            console.log(err);
        })
        ;
    }

    if(isLoggenIn) {
        <Redirect to='/'/>
    }


    return (
        <form className='login-form'>
            <div className='login-form__header'>
                <h1 className='login-form__app-label'>EmphaApp</h1>
                <h1 className='login-form__form-label'>Login</h1>
            </div>
            <div className='login-form__content'>
                <label htmlFor='username' className='login-form__username-label'>
                    <span className='login-form__icon fa fa-user'></span>username
                </label>
                {/*Username input*/}
                <input 
                 type='text'
                 name='username'
                 className='login-form__username-input'
                 value={username}
                 onChange={e => setUsername(e.target.value)}
                />

                <label htmlFor='password' className='login-form__password-label'>
                    <span className='login-form__icon fa fa-key'></span>password
                </label>
                {/*Password input*/}
                <input 
                  type='password'
                  name='password'
                  className='login-form__password-input'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className='login-form__sign-in'>
                    {/*Submit input*/}
                    <input type='submit'
                     className='login-form__submit-input btn'
                     value='Sign in'
                     onClick={(e) => postLogin(e)}
                    />
                    <input type='checkbox' name='remember-me' className='login-form__checkbox-input checkbox'/>
                    <label htmlFor='password' htmlFor='remember-me' className='login-form__checkbox-label'>
                         Remember me
                    </label>
                </div>
                <div className='login-form__sign-up'>
                    <Link to='/signup' className='login-form__sign-up-link link'>sign up</Link>
                </div>
            </div>
        </form>
    );
}

export default Login;