import { STATUS } from '../constants';
import types from '../actions/login/types';
import {
    getStorage,
    setStorage as setAsyncStorage,
    removeStorage
} from '../helper/axiosHelper';

const initState = {
    userFullName: "",
    userID: "",
    userEmail: { data: "abc@abc.com", error: "" },
    userPassword: { data: "111111", error: "" },
    loginStatus: STATUS.default,
    loginError: "",
    formError: ""
}

const login = (state = initState, action) => {

    switch (action.type) {
        case types.SET_LOG_IN_STATUS:
            return {
                ...state,
                loginStatus: action.status,
                loginError: action.error
            }
        case types.SET_FORM_ERROR:
            return {
                ...state,
                formError: action.message
            }
        case types.SET_USER:
            return {
                ...state,
                userID: action.userID,
                userEmail: action.userEmail,
                userFullName: action.userFullName,
            }
        case types.SET_STORAGE:
            setStorage(
                action.userID,
                action.userToken,
                action.userEmail,
                action.userFullName,
                action.isVerified,
                action.userAvatar
            );
            return {
                ...state
            }
        case types.SET_EMAIL:
            return {
                ...state,
                userEmail: action.userEmail
            }
        case types.SET_PASSWORD:
            return {
                ...state,
                userPassword: action.userPassword,
            }
        case types.CLEAR_LOG_IN:
            removeStorage();
            state = initState;
            return {
                ...state,
            }
        default:
            return state
    }
}

const setStorage = (userID, userToken, userEmail, userFullName, isVerified, userAvatar) => {
    getStorage().then(
        storage => {
            setAsyncStorage(
                {
                    userID,
                    userToken,
                    userEmail,
                    userFullName,
                    isVerified,
                    userAvatar
                }
            )
        }
    );

}

export default login