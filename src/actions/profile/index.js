import { API, STATUS } from '../../constants';
import { post } from '../../helper/axiosHelper';
import types from './types';
import { Alert } from 'react-native';

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
                Alert.alert(
                    "Lỗi",
                    res.data.Message,
                    [
                        {
                            text: "OK",
                            style: "cancel"
                        }
                    ],
                    { cancelable: true }
                )
                dispatch(setUpdateProfileFormError(res.data.Message))
                dispatch(setUpdateProfileStatus(STATUS.error))
            } else {
                dispatch(setUpdateProfileFormError())
                dispatch(setUpdateProfileStatus(STATUS.success))
                callBackSuccess(res);
            }
        }).catch(error => {
            Alert.alert(
                "Lỗi",
                error,
                [
                    {
                        text: "OK",
                        style: "cancel"
                    }
                ],
                { cancelable: true }
            )
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
                Alert.alert(
                    "Lỗi",
                    res.data.Message,
                    [
                        {
                            text: "OK",
                            style: "cancel"
                        }
                    ],
                    { cancelable: true }
                )
                dispatch(setUploadTempImageError(res.data.Message))
                dispatch(setUploadTempImageStatus(STATUS.error))
            } else {
                dispatch(setUploadTempImageError())
                dispatch(setUploadTempImageStatus(STATUS.success))
                callBackSuccess(res.data);
            }
        }).catch(error => {
            Alert.alert(
                "Lỗi",
                error,
                [
                    {
                        text: "OK",
                        style: "cancel"
                    }
                ],
                { cancelable: true }
            )
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
                Alert.alert(
                    "Lỗi",
                    res.data.Message,
                    [
                        {
                            text: "OK",
                            style: "cancel"
                        }
                    ],
                    { cancelable: true }
                )
                dispatch(setUploadImageError(res.data.Message))
                dispatch(setUploadImageStatus(STATUS.error))
            } else {
                dispatch(setUploadImageError())
                dispatch(setUploadImageStatus(STATUS.success));
                callBackSuccess();
                Alert.alert(
                    "Thành công!",
                    "Bạn đã cập nhật ảnh đại diện thành công",
                    [
                        {
                            text: "OK",
                            style: "cancel"
                        }
                    ],
                    { cancelable: true }
                )
            }
        }).catch(error => {
            Alert.alert(
                "Lỗi",
                error,
                [
                    {
                        text: "OK",
                        style: "cancel"
                    }
                ],
                { cancelable: true }
            )
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
                Alert.alert(
                    "Lỗi",
                    res.data.Message,
                    [
                        {
                            text: "OK",
                            style: "cancel"
                        }
                    ],
                    { cancelable: true }
                )
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
            Alert.alert(
                "Lỗi",
                rej,
                [
                    {
                        text: "OK",
                        style: "cancel"
                    }
                ],
                { cancelable: true }
            )
            dispatch(setUpdatePasswordFormError(rej))
            dispatch(setUpdatePasswordStatus(STATUS.error));
        });
    }
};

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