import types from "./types";
import { API, STATUS } from '../../constants';
import { post } from '../../helper/axiosHelper';

export const act = (whereClause, indexPage, ROW_PER_PAGE, setStatus, callbackSuccess) => {
    return dispatch => {
        let body = {
            entityName: 'Article',
            where: whereClause,
            order: 'CreatedDate desc',
            pageNumber: indexPage,
            rowsPerPage: ROW_PER_PAGE
        }

        let url = API.BLOG;
        dispatch(setStatus(STATUS.loading));
        post(url, body).then(
            res => {
                if (res.data.Error) {
                    dispatch(setStatus(STATUS.error))
                }
                else {
                    callbackSuccess(res.data.ResultData);
                    dispatch(setStatus(STATUS.success));
                }
            },
            rej => {
                dispatch(setStatus(STATUS.error))
            }
        )
    }
}

export const searchAct = (whereClause, indexPage, ROW_PER_PAGE, callbackSuccess) => {
    return dispatch => {
        dispatch(act(whereClause, indexPage, ROW_PER_PAGE, setSearchStatus, callbackSuccess));
    }

}

export const showmoreAct = (whereClause, indexPage, ROW_PER_PAGE, callbackSuccess) => {
    return dispatch => {
        dispatch(act(whereClause, indexPage, ROW_PER_PAGE, setShowmoreStatus, callbackSuccess));
    }
}

export const setSearchStatus = (status) => ({
    type: types.SET_SEARCH_STATUS,
    status
})

export const setShowmoreStatus = (status) => ({
    type: types.SET_SHOWMORE_STATUS,
    status
})