import * as Actions from './ActionTypes';

const auth = (state = {isLogginIn: false, error: ""}, action) => {
    switch(action.type){
        case Actions.AuthLogin:
            return {...state, isLogginIn: true, error: ""};
        case Actions.AuthLoginEnd:
            return {...state, isLogginIn: false, error: ""};
        case Actions.AuthFailed:
            const error = action.error;
            return {...state, isLogginIn: false, error: error}
        default:
            return state;
    }
}

export default auth;