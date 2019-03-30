import { STATUS } from '../constants'
import types from '../actions/signup/types'

const initState = {
    userEmail: { data: "", error: "" },
    userPassword: { data: "", error: "" },
    userConfirmPassword: { data: "", error: "" },
    userDOB: { data: "", error: "" },
    fullName: { data: "", error: "" },
    signupStatus: STATUS.default,
    signupError: ""
}

const signup = (state = initState, action) => {
    switch (action.type) {
        case types.SET_SIGNUP_STATUS:
            return {
                ...state,
                signupStatus: action.status,
                signupError: action.error
            }
        case types.SET_EMAIL:
            return {
                ...state,
                userEmail: action.userEmail
            }
        case types.SET_PASSWORD:
            return {
                ...state,
                userPassword: action.userPassword
            }
        case types.SET_CONFIRMPASSWORD:
            return {
                ...state,
                userConfirmPassword: action.userConfirmPassword
            }
        case types.SET_FULLNAME:
            return {
                ...state,
                fullName: action.fullName
            }
        case types.SET_USER_DOB:
            return {
                ...state,
                userDOB: action.userDOB
            }
        default:
            return state
    }
}

export default signup