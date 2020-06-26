import React, {useEffect, useState, Suspense} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {loadUsers, usersLoading} from '../redux/ActionCreators';
import User from './ UserComponent';

const mapStateToProps = (state) => {
    return {
        users: state.users
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers : () => dispatch(loadUsers())
    }
}

import './UsersComponent.scss';

function Users(props){

    const users = props.users;

    const [filter, setFilter] = useState('.*');
    const [collapsed, setCollapsed] = useState([]); 

    /* true - ascending id, false - descending id */
    const [sort, setSort] = useState(true);
    
    /* componentDidMount only */
    useEffect(() => {
        props.loadUsers();
    }, []);

    /*filter users list by username */
    function filterList(){
       if(users.users === null) {
            return null;
       }
       try {
        const regExp = new RegExp(filter);
        //filter ->
        //sort ->
        //return JSX list
        return users.users
               .filter(user => regExp.test(user.username))
               .sort((a, b) => 
                    sort ? (a.id > b.id ? 1 : -1) : (a.id < b.id ? 1 : -1)
               )
               .map((user, i) => {
                return (<User
                     key={i}
                     user={user}
                     onClick={(id) => {toggleCollapsed(id)}}
                     isCollapsed={collapsed.indexOf(user.id)}
                    ></User>
                );
               });
       }
       catch {
           return null;
       }
    }

    function toggleCollapsed(id){
        collapsed.indexOf(id) === -1 ? setCollapsed([...collapsed, id])
         : setCollapsed(collapsed.filter(val => val!==id));
    }

    if(users.isLoading){
        return (
            <section className="users">
                <div>is Loading...</div>
            </section>
        );
    }
    else if(users.error !== ""){
        //token is not valid
        if(users.error === 'Error 401: Unauthorized'){
            localStorage.clear();
            sessionStorage.clear();
            return (<Redirect to='/login'/>)
        }
        else return (
            <section className="users">
                <p className="error">{users.error}</p>
            </section>
        );
    }

    return (
        <section className="users">
            <Suspense fallback={<div>Loading...</div>}>
                <div className="users__header">
                    <h1>Users</h1>
                    {/* search input*/}
                    <div>
                        <input 
                         type="search"
                         className="search"
                         value={filter}
                         onChange={(e) => setFilter(e.target.value)}
                         placeholder="username"
                        />
                        <span className="icon fa fa-search"></span>
                    </div>
                    {/* sort btn*/}
                    <button 
                        className="btn btn--secondary users__sort-btn"
                        onClick={() => setSort(!sort)}
                    >
                        <h1>ID </h1>
                        <span className={sort ? 'icon fa fa-caret-up' : 'icon fa fa-caret-down'}></span>
                    </button>
                </div>
                <div className="users__list">
                    {filterList()}
                </div>
            </Suspense>
        </section>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);