import { API, STATUS } from '../../constants';
import { post } from '../../helper/axiosHelper';
import types from './types';

export const signupAct = (userEmail, userPassword, fullName, userDOB, callbackSuccess) => {
    return dispatch => {
        let body = {
            masterData: JSON.stringify({
                UserPassword: userPassword.data,
                UserFullName: fullName.data,
                UserEmail: userEmail.data,
                UserDOB: userDOB.data
            })
        }
        let url = API.SIGNUP;
        dispatch(setSignupStatus(STATUS.loading))
        post(url, body).then(
            res => {
                if (res.data.Error) {
                    dispatch(setSignupStatus(STATUS.error))
                    dispatch(setEmail(userEmail.data, res.data.Message))
                }
                else {
                    let data = JSON.parse(res.data.ResultData);
                    dispatch(setSignupStatus(STATUS.success));
                    callbackSuccess();
                }
            },
            rej => {
                dispatch(setSignupStatus(STATUS.error))
            }
        )
    }
}

export const setSignupStatus = (status) => ({
    type: types.SET_SIGNUP_STATUS,
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

export const setConfirmPassword = (data = "", error = "") => ({
    type: types.SET_CONFIRMPASSWORD,
    userConfirmPassword: { data, error }
})

export const setFullName = (data = "", error = "") => ({
    type: types.SET_FULLNAME,
    fullName: { data, error }
})

export const setUserDOB = (data = "", error = "") => ({
    type: types.SET_USER_DOB,
    userDOB: { data, error }
})
