import { combineReducers } from "redux";
import login from './login';
import signup from './signup';
import uniSearch from './uniSearch';
import uniTest from './uniTest';
import blog from './blog';
import profile from './profile';
import navigationEvents from './navigationEvents';
import types from '../actions/logout/types';
import { removeStorage } from "../helper/axiosHelper";

const appReducer = combineReducers({
    login,
    signup,
    uniSearch,
    uniTest,
    blog,
    profile,
    navigationEvents
})

export default rootReducers = (state, action) => {
    if (action.type === types.LOG_OUT) {
        removeStorage().then(
            state = undefined
        );
    }
    return appReducer(state, action);
};