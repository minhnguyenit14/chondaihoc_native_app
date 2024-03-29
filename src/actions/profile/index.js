import { API, STATUS } from '../../constants';
import { post } from '../../helper/axiosHelper';
import types from './types';
import { getFilterData } from '../uniTest';

export const getDateFromString = (dateStr) => {
    let d = new Date(dateStr);
    d.setHours(10);
    let month = d.getUTCMonth() + 1;
    let day = d.getUTCDate();
    let year = d.getUTCFullYear();
    let date = {
        day,
        month,
        year
    }
    return date;
}
export const getProfile = (id, callBackSuccess) => {
    return dispatch => {
        let body = {
            id: id
        }
        let url = API.PROFILE;
        dispatch(setGetProfileStatus(STATUS.loading));
        post(url, body).then(
            res => {
                console.log(res);
                if (res.data.Error) {
                    dispatch(setGetProfileStatus(STATUS.error));
                } else {
                    let userProfile = JSON.parse(res.data.ResultData);
                    console.log(userProfile);
                    let UserDOB = getDateFromString(userProfile.UserDOB);
                    dispatch(setProfile(
                        userProfile.UserID,
                        userProfile.UserFullName,
                        UserDOB.day,
                        UserDOB.month,
                        UserDOB.year,
                        userProfile.UserAvatar,
                        userProfile.UserEmail,
                        userProfile.UserDOB
                    ));
                    let data = {
                        userDOB: UserDOB,
                        userFullName: userProfile.UserFullName,
                        userAvatar: userProfile.UserAvatar
                    }
                    dispatch(setGetProfileStatus(STATUS.success));
                    callBackSuccess(data)

                }
            },
            rej => {
                console.log(rej);
                dispatch(setGetProfileStatus(STATUS.error));
            }
        )
    }
};

export const updateProfile = (profile, callBackSuccess) => {
    return dispatch => {
        let body = {
            entityName: profile.entityName,
            masterData: JSON.stringify({
                UserID: profile.userID,
                UserPassword: "",
                UserFullName: profile.userFullName,
                UserDOB: profile.userDOB,
                UserAvatar: profile.userAvatar,
                UserEmail: profile.userEmail
            }),
            mode: profile.mode
        }

        let url = API.CHANGE_PROFILE;
        dispatch(setUpdateProfileStatus(STATUS.loading))
        post(url, body).then(res => {
            if (res.data.Error) {
                dispatch(setUpdateProfileFormError(res.data.Message))
                dispatch(setUpdateProfileStatus(STATUS.error))
            } else {
                dispatch(setUpdateProfileFormError())
                dispatch(setUpdateProfileStatus(STATUS.success))
                callBackSuccess(res);
            }
        }).catch(error => {
            dispatch(setUpdateProfileStatus(STATUS.error))
        })
    };
};

export const uploadTempImage = (image, callBackSuccess) => {
    return dispatch => {
        let url = API.UPLOAD_TEMP_IMAGE;
        dispatch(setUploadTempImageStatus(STATUS.loading))
        post(url, image, true).then(res => {
            if (res.data.Error) {
                dispatch(setUploadTempImageError(res.data.Message))
                dispatch(setUploadTempImageStatus(STATUS.error))
            } else {
                dispatch(setUploadTempImageError())
                dispatch(setUploadTempImageStatus(STATUS.success))
                callBackSuccess(res.data);
            }
        }).catch(error => {
            dispatch(setUploadTempImageError(res.data.Message))
            dispatch(setUploadTempImageStatus(STATUS.error))
        })
    };
};

export const uploadImage = (imageName, oldAvatarName, callBackSuccess) => {
    return dispatch => {
        let url = API.MOVE_AVATAR;

        let body = {
            fileName: imageName,
            oldName: oldAvatarName
        }
        dispatch(setUploadImageStatus(STATUS.loading))
        post(url, body).then(res => {
            console.log(res)
            if (res.data.Error) {
                dispatch(setUploadImageError(res.data.Message))
                dispatch(setUploadImageStatus(STATUS.error))
            } else {
                dispatch(setUploadImageError())
                dispatch(setUploadImageStatus(STATUS.success));
                callBackSuccess();
            }
        }).catch(error => {
            dispatch(setUploadImageError(res.data.Message))
            dispatch(setUploadImageStatus(STATUS.error))
        })
    };
};

export const updatePassword = (userPassword, userNewPassword, userEmail, callBackSuccess) => {
    return dispatch => {
        let url = API.CHANGE_PASSWORD;
        let body = {
            userEmail,
            userPassword,
            userNewPassword
        }
        dispatch(setUpdatePasswordStatus(STATUS.loading));
        post(url, body).then(res => {
            if (res.data.Error) {
                dispatch(setUpdatePasswordFormError(res.data.Message))
                dispatch(setUpdatePasswordStatus(STATUS.error))
            } else {
                dispatch(setUpdatePasswordFormError())
                dispatch(setUpdatePasswordStatus(STATUS.success))
                dispatch(setCurrentPassword());
                dispatch(setNewPassword());
                dispatch(setReNewPassword());
                callBackSuccess()
            }
        }).catch(rej => {
            dispatch(setUpdatePasswordFormError(rej))
            dispatch(setUpdatePasswordStatus(STATUS.error));
        });
    }
};

export const getTestResultByUserID = (UserID, callBackSuccess) => {
    return dispatch => {
        let url = API.GET_RESULT_BY_USER_ID;
        let body = {
            UserID
        }
        dispatch(setGetTestResultByUserIDStatus(STATUS.loading));
        post(url, body).then(res => {
            if (res.data.Error) {
                dispatch(setGetTestResultByUserIDStatus(STATUS.error))
            } else {
                let resultData = res.data.ResultData;
                if (Object.keys(resultData).length) {
                    let { kindCode, data } = getFilterData(resultData.CharacterKind);
                    dispatch(setMainMajors(resultData.MainMajor));
                    dispatch(setSubMajors(resultData.SubMajor));
                    dispatch(setTreeMajors(resultData.TreeMajor));
                    dispatch(setTopUniRecommend(resultData.University));
                    dispatch(setResult(data));
                    dispatch(setTestMsg(resultData.TestMsg[0].TestMsg));
                    dispatch(setKindCode(kindCode));
                }
                dispatch(setGetTestResultByUserIDStatus(STATUS.success))
                callBackSuccess()
            }
        }).catch(rej => {
            dispatch(setGetTestResultByUserIDStatus(STATUS.error));
        });
    }
};

export const checkVerified = (userID, callBackSuccess, callBackError = () => { }) => {
    return dispatch => {
        let body = {
            userID
        }
        let url = API.CHECK_VERIFIED;
        dispatch(setCheckVerifiedStatus(STATUS.loading))
        post(url, body).then(
            res => {
                console.log(res)
                if (res.data.Error) {
                    dispatch(setCheckVerifiedStatus(STATUS.error))
                    callBackError(res.data.Message)
                } else {
                    let data = JSON.parse(res.data.ResultData);
                    dispatch(setCheckVerifiedStatus(STATUS.success))
                    callBackSuccess(data.IsVerified);
                }
            },
            rej => {
                dispatch(setCheckVerifiedStatus(STATUS.error))
            }
        )
    }
}


export const setCheckVerifiedStatus = (status) => ({
    type: types.SET_CHECK_VERIFIED_STATUS,
    status
})

export const setCheckedMajorsDefault = (checkedMajorsDefault = []) => ({
    type: types.SET_CHECKED_MAJORS_DEFAULT,
    checkedMajorsDefault
})

export const setUniversitySearch = (data = "", error = "") => ({
    type: types.SET_UNIVERSITY_SEARCH,
    universitySearch: { data, error }
})

export const setPointFrom = (data = "", error = "") => ({
    type: types.SET_POINT_FROM,
    pointFrom: { data, error }
})

export const setPointTo = (data = "", error = "") => ({
    type: types.SET_POINT_TO,
    pointTo: { data, error }
})

export const setCheckedMajors = (checkedMajors = []) => ({
    type: types.SET_CHECKED_MAJORS,
    checkedMajors
})

export const setMajors = (majors = []) => ({
    type: types.SET_MAJORS,
    majors
})

export const reset = () => ({
    type: types.RESET
})

export const setResult = (result) => ({
    type: types.SET_RESULT,
    result
})

export const setKindCode = (kindCode = "") => ({
    type: types.SET_KIND_CODE,
    kindCode
})

export const setTestMsg = (testMsg = "") => ({
    type: types.SET_TEST_MSG,
    testMsg
})

export const setMainMajors = (mainMajors = []) => ({
    type: types.SET_MAIN_MAJORS,
    mainMajors
})

export const setSubMajors = (subMajors = []) => ({
    type: types.SET_SUB_MAJORS,
    subMajors
})

export const setTreeMajors = (treeMajors = []) => ({
    type: types.SET_TREE_MAJORS,
    treeMajors
})

export const setUniRecommend = (uniRecommend = []) => ({
    type: types.SET_UNI_RECOMMEND,
    uniRecommend
})

export const setTopUniRecommend = (topUniRecommend = []) => ({
    type: types.SET_TOP_UNI_RECOMMEND,
    topUniRecommend
})

export const setCities = (cities) => ({
    type: types.SET_CITIES,
    cities
})

export const setCity = (data = { id: 0, value: 'Tất cả' }, error = "") => ({
    type: types.SET_CITY,
    city: { data, error }
})

export const setTotalUniversities = (totalUniversities) => ({
    type: types.SET_TOTAL_UNIVERSITIES,
    totalUniversities
})

export const resetFilter = () => ({
    type: types.RESET_FILTER
})

export const setGetTestResultByUserIDStatus = (status) => ({
    type: types.SET_GET_TEST_RESULT_BY_USER_ID,
    status
})

export const setUpdatePasswordFormError = (message = "") => ({
    type: types.SET_UPDATE_PASSWORD_FORM_ERROR,
    message
})

export const setUpdateProfileFormError = (message = "") => ({
    type: types.SET_UPDATE_PROFILE_FORM_ERROR,
    message
})

export const setUpdateProfileStatus = (status) => ({
    type: types.SET_UPDATE_PROFILE_STATUS,
    status
});
export const setUpdatePasswordStatus = (status) => ({
    type: types.SET_UPDATE_PASSWORD_STATUS,
    status
});
export const setGetProfileStatus = (status) => ({
    type: types.SET_GET_PROFILE_STATUS,
    status
});
export const setAvatar = (data = "", error = "") => ({
    type: types.SET_AVATAR,
    avatar: { data, error }
});
export const setFirstname = (data = "", error = "") => ({
    type: types.SET_FIRST_NAME,
    userFirstname: { data, error }
});

export const setUserFullName = (data = "", error = "") => ({
    type: types.SET_USER_FULL_NAME,
    userFullName: { data, error }
});

export const setChangeUserFullName = (data = "", error = "") => ({
    type: types.SET_CHANGE_USER_FULL_NAME,
    changeUserFullName: { data, error }
});

export const setUserDOB = (userDOB = "") => ({
    type: types.SET_USER_DOB,
    userDOB
});

export const setChangeUserDOB = (changeUserDOB = "") => ({
    type: types.SET_CHANGE_USER_DOB,
    changeUserDOB
});

export const setProfile = (userID, userFullName, day, month, year, userAvatar, userEmail, userDOB) => ({
    type: types.SET_PROFILE,
    userID,
    userFullName: { data: userFullName, error: "" },
    day,
    month,
    year,
    userAvatar,
    userEmail,
    userDOB
});

export const setCurrentPassword = (data = "", error = "") => ({
    type: types.SET_CURRENT_PASSWORD,
    currentPassword: { data, error }
});

export const setNewPassword = (data = "", error = "") => ({
    type: types.SET_NEW_PASSWORD,
    newPassword: { data, error }
});

export const setReNewPassword = (data = "", error = "") => ({
    type: types.SET_RE_NEW_PASSWORD,
    reNewPassword: { data, error }
});

export const setUploadTempImageStatus = (status) => ({
    type: types.SET_UPLOAD_TEMP_IMAGE_STATUS,
    status
})

export const setUploadImageStatus = (status) => ({
    type: types.SET_UPLOAD_IMAGE_STATUS,
    status
})

export const setUploadTempImageError = (message = "") => ({
    type: types.SET_UPLOAD_TEMP_IMAGE_ERROR,
    message
})

export const setUploadImageError = (message = "") => ({
    type: types.SET_UPLOAD_IMAGE_ERROR,
    message
})

export const resetEditForm = () => ({
    type: types.RESET_EDIT_FORM
})