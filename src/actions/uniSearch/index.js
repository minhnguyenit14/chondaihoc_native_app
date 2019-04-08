import types from './types';
import { API, STATUS } from '../../constants';
import { post } from '../../helper/axiosHelper';

export const searchUniversity = (checkedMajors, universitySearch, pointFrom, pointTo, cityID, callBackSuccess, pageNumber = 0, pageSize = 500) => {
    return dispatch => {
        let body = {
            majors: checkedMajors.toString() || 0,
            universityName: universitySearch,
            from: pointFrom || 0,
            to: pointTo || 999,
            cityID,
            pageNumber,
            pageSize
        }
        let url = API.SEARCH_UNIVERSITY;
        console.log(body)
        dispatch(setSearchUniversityStatus(STATUS.loading))
        post(url, body).then(
            res => {
                console.log(res)
                if (res.data.Error) {
                    dispatch(setSearchUniversityStatus(STATUS.error))
                } else {
                    let resultData = res.data.ResultData;
                    let totalRecords = resultData.totalRecords;
                    callBackSuccess(resultData.data, totalRecords);
                    dispatch(setSearchUniversityStatus(STATUS.success));
                }
            },
            rej => {
                dispatch(setSearchUniversityStatus(STATUS.error))
            }
        )
    }
}

export const getMajors = (entityName, where, order, reArrangeMajorsToTreeData, pageNumber = 0, rowsPerPage = 500) => {
    return dispatch => {
        let body = {
            entityName,
            where,
            order,
            pageNumber,
            rowsPerPage
        }

        let url = API.GET_MAJORS;
        dispatch(setGetMajorsStatus(STATUS.loading))
        post(url, body).then(
            res => {
                console.log(res)
                let data = [];
                if (res.data.Error) {
                    dispatch(setGetMajorsStatus(STATUS.error))
                } else {
                    let resultData = JSON.parse(res.data.ResultData);
                    if (resultData.length != 0) {
                        data = JSON.parse(resultData.data);
                    }
                    dispatch(setMajors(reArrangeMajorsToTreeData(data)))
                    dispatch(setGetMajorsStatus(STATUS.success));
                }
            },
            rej => {
                dispatch(setGetMajorsStatus(STATUS.error))
            }
        )
    }
}

export const getCities = (entityName, where, order, reArrangeCities, callBackSuccess, pageNumber = 0, rowsPerPage = 500) => {
    return dispatch => {
        let body = {
            entityName,
            where,
            order,
            pageNumber,
            rowsPerPage
        }

        let url = API.GET_CITIES;
        dispatch(setGetCitiesStatus(STATUS.loading))
        post(url, body).then(
            res => {
                console.log(res)
                if (res.data.Error) {
                    dispatch(setGetCitiesStatus(STATUS.error))
                } else {
                    let resultData = [];
                    let data = [];
                    if (res.data) {
                        resultData = JSON.parse(res.data.ResultData);
                        data = JSON.parse(resultData.data);
                        data.unshift({ CityID: 0, CityName: "Tất cả" });
                        data = reArrangeCities(data);
                        callBackSuccess(data);
                        dispatch(setCity(data[0]));
                    }
                    dispatch(setCities(data));
                    dispatch(setGetCitiesStatus(STATUS.success));
                }
            },
            rej => {
                dispatch(setGetCitiesStatus(STATUS.error))
            }
        )
    }
}

export const reset = () => (
    dispatch => {
        dispatch(setUniversitySearch());
        dispatch(setCheckedMajors());
        dispatch(setCity());
        dispatch(setPointFrom());
        dispatch(setPointTo());
    }
)

export const setCheckedMajors = (checkedMajors = []) => ({
    type: types.SET_CHECKED_MAJORS,
    checkedMajors
})

export const setUniversities = (universities) => ({
    type: types.SET_UNIVERSITIES,
    universities
})

export const setSearchUniversityStatus = (status) => ({
    type: types.SET_SEARCH_UNIVERSITY_STATUS,
    status
})

export const setTotalUniversities = (totalUniversities) => ({
    type: types.SET_TOTAL_UNIVERSITIES,
    totalUniversities
})

export const setMajors = (majors) => ({
    type: types.SET_MAJORS,
    majors
})

export const setGetMajorsStatus = (status) => ({
    type: types.SET_GET_MAJORS_STATUS,
    status
})

export const setCities = (cities) => ({
    type: types.SET_CITIES,
    cities
})

export const setGetCitiesStatus = (status) => ({
    type: types.SET_GET_CITIES_STATUS,
    status
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

export const setCity = (data = { id: 0, value: 'Tất cả' }, error = "") => ({
    type: types.SET_CITY,
    city: { data, error }
})