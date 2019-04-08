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
    reNewPassword: { data: "", error: "" },
    mainMajors: [],
    subMajors: [],
    treeMajors: [],
    universities: [],
    result: [],
    kindCode: "",
    testMsg: "",
    totalUniversities: 0,
    pointFrom: { data: "", error: "" },
    pointTo: { data: "", error: "" },
    universitySearch: { data: "", error: "" },
    checkedMajors: [],
    topUniRecommend: [],
    majors: [],
    cities: [],
    checkedMajorsDefault: [],
    city: { data: "", error: "" },
    setGetTestResultByUserIDStatus: STATUS.default
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
        case types.SET_TOP_UNI_RECOMMEND:
            return {
                ...state,
                topUniRecommend: action.topUniRecommend
            }
        case types.SET_CHECKED_MAJORS_DEFAULT:
            return {
                ...state,
                checkedMajorsDefault: action.checkedMajorsDefault
            }
        case types.SET_CITIES:
            return {
                ...state,
                cities: action.cities
            }
        case types.SET_CITY:
            return {
                ...state,
                city: action.city
            }
        case types.SET_UNIVERSITY_SEARCH:
            return {
                ...state,
                universitySearch: action.universitySearch
            }
        case types.SET_MAJORS:
            return {
                ...state,
                majors: action.majors
            }
        case types.SET_POINT_FROM:
            return {
                ...state,
                pointFrom: action.pointFrom
            }
        case types.SET_POINT_TO:
            return {
                ...state,
                pointTo: action.pointTo
            }
        case types.SET_CHECKED_MAJORS:
            return {
                ...state,
                checkedMajors: action.checkedMajors
            }
        case types.SET_RESULT:
            return {
                ...state,
                result: action.result
            }
        case types.SET_KIND_CODE:
            return {
                ...state,
                kindCode: action.kindCode
            }
        case types.SET_TEST_MSG:
            return {
                ...state,
                testMsg: action.testMsg
            }
        case types.RESET:
            return {
                ...initState
            }
        case types.RESET_FILTER:
            return {
                ...state,
                pointFrom: initState.pointFrom,
                pointTo: initState.pointTo,
                checkedMajors: initState.checkedMajors,
                universitySearch: initState.universitySearch
            }
        case types.SET_MAIN_MAJORS:
            return {
                ...state,
                mainMajors: action.mainMajors
            }
        case types.SET_SUB_MAJORS:
            return {
                ...state,
                subMajors: action.subMajors
            }
        case types.SET_TREE_MAJORS:
            return {
                ...state,
                treeMajors: action.treeMajors
            }
        case types.SET_UNI_RECOMMEND:
            return {
                ...state,
                universities: action.uniRecommend
            }
        case types.SET_TOTAL_UNIVERSITIES:
            return {
                ...state,
                totalUniversities: action.totalUniversities
            }
        case types.SET_GET_TEST_RESULT_BY_USER_ID:
            return {
                ...state,
                getTestResultByUserIDStatus: action.status
            }
        default:
            return state;
    }
}
export default profile