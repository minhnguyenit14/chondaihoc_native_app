import { API, STATUS } from '../../constants';
import { post } from '../../helper/axiosHelper';
import types from './types';
import { logOut } from '../logout';

export const loginAct = (userEmail, userPassword, callBackSuccess) => {
    return dispatch => {
        let body = {
            userEmail: userEmail.data.toLowerCase(),
            userPassword: userPassword.data,
        }
        let url = API.LOG_IN;
        dispatch(setLoginStatus(STATUS.loading))
        post(url, body).then(
            res => {
                console.log(res)
                if (res.data.Error) {
                    dispatch(setLoginStatus(STATUS.error))
                    dispatch(setFormError(res.data.Message))
                } else {
                    let data = JSON.parse(res.data.ResultData);
                    console.log(data);
                    dispatch(logOut());
                    dispatch(setStorage(
                        data.UserID,
                        data.UserToken,
                        data.UserEmail,
                        data.UserFullName,
                        data.IsVerified,
                        data.UserAvatar
                    ))
                    dispatch(setUser(
                        data.UserID,
                        data.UserEmail,
                        data.UserFullName,
                    ))
                    dispatch(setLoginStatus(STATUS.success))
                    callBackSuccess(data);
                }
            },
            rej => {
                dispatch(setLoginStatus(STATUS.error))
            }
        )
    }
}

export const updateUserStatus = (userID) => {
    return dispatch => {
        let body = {
            id: userID
        }
        let url = API.UPDATE_USER_STATUS;
        dispatch(setUpdateUserStatus(STATUS.loading))
        post(url, body).then(
            res => {
                console.warn(res)
                if (res.data.Error) {
                    dispatch(setUpdateUserStatus(STATUS.error))
                } else {
                    dispatch(setUpdateUserStatus(STATUS.success))
                }
            },
            rej => {
                console.warn(rej)
                dispatch(setUpdateUserStatus(STATUS.error))
            }
        )
    }
}

export const setUpdateUserStatus = (status) => ({
    type: types.SET_UPDATE_USER_STATUS,
    status
})

export const setLoginStatus = (status) => ({
    type: types.SET_LOG_IN_STATUS,
    status
})

export const setEmail = (data = "", error = "") => ({
    type: types.SET_EMAIL,
    userEmail: { data, error }
})

export const setPassword = (data = "", error = "") => ({
    type: types.SET_PASSWORD,
    userPassword: { data, error }
})

export const setUser = (userID, userEmail, userFullName) => ({
    type: types.SET_USER,
    userID,
    userEmail,
    userFullName
})

export const setStorage = (userID, userToken, userEmail, userFullName, isVerified, userAvatar) => ({
    type: types.SET_STORAGE,
    userID,
    userToken,
    userEmail,
    userFullName,
    isVerified,
    userAvatar
})

export const setFormError = (message = "") => ({
    type: types.SET_FORM_ERROR,
    message
})

export const clearLogIn = () => ({
    type: types.CLEAR_LOG_IN
})