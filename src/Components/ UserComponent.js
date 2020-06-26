import React from 'react';
import './UserComponent.scss';

function User(props){
    const user = props.user;

    return (
        <section className='user'>
            <div  onClick={() =>  props.onClick(user.id)} className='user__collapsible'>
                <div>
                    <span className={props.isCollapsed!==-1 ? 'icon fa fa-caret-down' : 'icon fa fa-caret-right'}></span>
                    <span className={user.is_active ? "user__active" : "user__inactive"}></span>
                </div>
                <h3>{user.username}</h3>
                <h3>ID {user.id}</h3>
            </div>
            <div className={props.isCollapsed!==-1 ? 'user__content--active' : 'user__content'}>
                <h3>Firstname: {user.first_name}</h3>
                <h3>Lastname: {user.last_name}</h3>
                <h3>Last login: {user.last_login}</h3>
                <h3>Admin: {user.is_superuser.toString()}</h3>
            </div>
        </section>
    );
}

export default User;