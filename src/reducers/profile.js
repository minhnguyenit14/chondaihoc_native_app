import { STATUS } from '../constants';
import types from '../actions/profile/types';

const initState = {
    userFullName: { data: "", error: "" },
    changeUserFullName: { data: "", error: "" },
    userID: "",
    userEmail: "",
    userDOB: "",
    changeUserDOB: "",
    day: "1",
    month: "1",
    year: "2000",
    userAvatar: "",
    uploadImageError: "",
    uploadTempImageError: "",
    updatePasswordFormError: "",
    updateProfileFormError: "",
    getProfileStatus: STATUS.default,
    uploadTempImageStatus: STATUS.default,
    uploadImageStatus: STATUS.default,
    updateProfileStatus: STATUS.default,
    updatePasswordStatus: STATUS.default,
    currentPassword: { data: "", error: "" },
    newPassword: { data: "", error: "" },
    reNewPassword: { data: "", error: "" }
}

const profile = (state = initState, action) => {
    switch (action.type) {
        case types.SET_AVATAR:
            return {
                ...state,
                avatar: action.avatar
            }
        case types.SET_PROFILE:
            return {
                ...state,
                userFullName: action.userFullName,
                changeUserFullName: action.userFullName,
                day: action.day,
                month: action.month,
                year: action.year,
                userAvatar: action.userAvatar,
                userEmail: action.userEmail,
                userID: action.userID,
                userDOB: action.userDOB,
                changeUserDOB: action.userDOB
            }
        case types.SET_USER_FULL_NAME:
            return {
                ...state,
                userFullName: action.userFullName
            }
        case types.SET_CHANGE_USER_FULL_NAME:
            return {
                ...state,
                changeUserFullName: action.changeUserFullName
            }
        case types.SET_GET_PROFILE_STATUS:
            return {
                ...state,
                getProfileStatus: action.status
            }
        case types.SET_UPDATE_PROFILE_STATUS:
            return {
                ...state,
                updateProfileStatus: action.status
            }
        case types.SET_CURRENT_PASSWORD:
            return {
                ...state,
                currentPassword: action.currentPassword
            }
        case types.SET_UPDATE_PASSWORD_STATUS:
            return {
                ...state,
                updatePasswordStatus: action.status
            }
        case types.SET_NEW_PASSWORD:
            return {
                ...state,
                newPassword: action.newPassword
            }
        case types.SET_RE_NEW_PASSWORD:
            return {
                ...state,
                reNewPassword: action.reNewPassword
            }
        case types.SET_USER_DOB:
            return {
                ...state,
                userDOB: action.userDOB
            }
        case types.SET_CHANGE_USER_DOB:
            return {
                ...state,
                changeUserDOB: action.changeUserDOB
            }
        case types.SET_UPLOAD_TEMP_IMAGE_STATUS:
            return {
                ...state,
                uploadTempImageStatus: action.status
            }
        case types.SET_UPLOAD_IMAGE_STATUS:
            return {
                ...state,
                uploadImageStatus: action.status
            }
        case types.SET_UPLOAD_IMAGE_ERROR:
            return {
                ...state,
                uploadImageError: action.message
            }
        case types.SET_UPLOAD_TEMP_IMAGE_ERROR:
            return {
                ...state,
                uploadTempImageError: action.message
            }
        case types.SET_UPDATE_PASSWORD_FORM_ERROR:
            return {
                ...state,
                updatePasswordFormError: action.message
            }
        case types.SET_UPDATE_PROFILE_FORM_ERROR:
            return {
                ...state,
                updateProfileFormError: action.message
            }
        case types.RESET_EDIT_FORM:
            return {
                ...state,
                changeUserDOB: state.userDOB,
                changeUserFullName: state.userFullName,
                currentPassword: initState.currentPassword,
                newPassword: initState.newPassword,
                reNewPassword: initState.reNewPassword
            }
        default:
            return state;
    }
}
export default profile