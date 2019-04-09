import { API, STATUS } from "../../constants";
import { post, getStorage } from "../../helper/axiosHelper";

export const getUniDetail = (universityId, callBack) => {
    return dispatch => {
        let body = {
            universityId
        }
        let url = API.GET_UNIVERSITY;
        callBack(STATUS.loading);
        post(url, body).then(
            res => {
                console.log(res);
                if (res.data.Error) {
                    callBack(STATUS.error);
                } else {
                    dispatch(increaseViewCount(universityId))
                    callBack(STATUS.success, res.data.ResultData)
                }
            },
            rej => {
                console.log(rej);
                callBack(STATUS.error);
            }
        )
    }
};

export const increaseViewCount = (universityId) => {
    return dispatch => {
        getStorage().then(
            storage => {
                let url = API.INCREASE_UNIVERSITY_VIEW_COUNT;
                let { userID } = storage;
                let body = {
                    userId: userID,
                    universityId
                };
                post(url, body).then(
                    res => {
                        console.log(res);
                    },
                    rej => {
                        console.log(rej);
                    }
                )
            }
        )
    }
};