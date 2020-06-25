import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../redux/ActionCreators.js';
import './LoginComponent.scss';


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login : (username, password, rememberMe) => dispatch(login(username, password, rememberMe))
    }
}

function Login(props){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    //move to store
    const [isLoggedIn, setLoggedIn] = useState(false);

    function postLogin(e) {
        e.preventDefault();
        props.login(username, password, rememberMe);
    }

    if(props.auth.token) {
        return <Redirect to='/'/>
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
                     value={props.auth.isLogginIn ? 'Loading...' : 'Sign in'}
                     onClick={(e) => postLogin(e)}
                    />
                    {/*Remember me checkbox*/}
                    <input
                     type='checkbox'
                     name='remember-me'
                     className='login-form__checkbox-input checkbox'
                     value={rememberMe}
                     onClick={(e) => {setRememberMe(e.target.checked);}}
                    />
                    <label htmlFor='password' htmlFor='remember-me' className='login-form__checkbox-label'>
                         Remember me
                    </label>
                </div>

                <p className='login-form__error'>{props.auth.error}</p>
            </div>
        </form>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);