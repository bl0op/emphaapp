import React from 'react';
import {Link} from 'react-router-dom'; 
import './SignupComponent.scss';

function Signup(props){
    return (
        <form class='sign-up-form'>
            <div class='sign-up-form__header'>
                <h1 class='sign-up-form__app-label'>EmphaApp</h1>
                <h1 class='sign-up-form__form-label'>Sign up</h1>
            </div>
            <div class='sign-up-form__content'>
                <label htmlFor='username' class='sign-up-form__username-label'><span class='sign-up-form__icon fa fa-user'></span>username</label>
                <input type='text' name='username' class='sign-up-form__username-input'/>

                <label htmlFor='password' class='sign-up-form__password-label'><span class='sign-up-form__icon fa fa-key'></span>password</label>
                <input type='password' name='password' class='sign-up-form__password-input'/>

                <label htmlFor='repeat-password' class='sign-up-form__repeat-password-label'><span class='sign-up-form__icon fa fa-key'></span>repeat password</label>
                <input type='password' name='repeat-password' class='sign-up-form__repeat-password-input'/>

                <div class='sign-up-form__sign-up'>
                    <input type='submit' class='sign-up-form__submit-input btn' value='Sign up'/>
                    <Link to='/login' class='sign-up-form__sign-in-link link'>sign in</Link>
                </div>
            </div>
        </form>
    );
}

export default Signup;