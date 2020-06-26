
import * as Actions from './ActionTypes';

const users = (state = {isLoading: false, users: null, error: ""}, action) => {
    switch(action.type){
        case Actions.UsersLoading:
            return {...state, isLoading: true, users: null, error: ""};
        case Actions.UsersSet:
            const users = action.users;
            return {...state, isLoading: false, users: users, error: ""};
        case Actions.UsersFailed:
            const error = action.error;
            return {...state, isLoading: false, users: null, error: error};
        default:
            return state;
    }
}

export default users;