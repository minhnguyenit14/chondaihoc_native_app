import { combineReducers } from "redux";
import login from './login';
import signup from './signup';
import uniSearch from './uniSearch';
import uniTest from './uniTest';
import blog from './blog';
import profile from './profile';

export default rootReducers = combineReducers({
    login,
    signup,
    uniSearch,
    uniTest,
    blog,
    profile
})