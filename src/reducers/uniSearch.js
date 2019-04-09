import types from '../actions/uniSearch/types';
import { STATUS } from '../constants';

const initState = {
    checkedMajors: [],
    universities: [],
    searchUniversityStatus: STATUS.default,
    totalUniversities: 0,
    majors: [],
    getMajorsStatus: STATUS.default,
    cities: [],
    getCitiesStatus: STATUS.default,
    universitySearch: { data: "", error: "" },
    pointFrom: { data: "", error: "" },
    pointTo: { data: "", error: "" },
    city: { data: "", error: "" },
    getUniDetailStatus: STATUS.default,
    rangePoint: null,
    majorsTable: [],
    uniInfo: null
}

const uniSearch = (state = initState, action) => {
    switch (action.type) {
        case types.SET_GET_UNI_DETAIL_STATUS:
            return {
                ...state,
                getUniDetailStatus: action.status
            }
        case types.SET_UNI_RANGE_POINT:
            return {
                ...state,
                rangePoint: action.rangePoint
            }
        case types.SET_MAJORS_TABLE:
            return {
                ...state,
                majorsTable: action.majorsTable
            }
        case types.SET_UNI_INFO:
            return {
                ...state,
                uniInfo: action.uniInfo
            }
        case types.SET_CHECKED_MAJORS:
            return {
                ...state,
                checkedMajors: action.checkedMajors
            }
        case types.SET_UNIVERSITIES:
            return {
                ...state,
                universities: action.universities
            }
        case types.SET_SEARCH_UNIVERSITY_STATUS:
            return {
                ...state,
                searchUniversityStatus: action.status
            }
        case types.SET_TOTAL_UNIVERSITIES:
            return {
                ...state,
                totalUniversities: action.totalUniversities
            }
        case types.SET_MAJORS:
            return {
                ...state,
                majors: action.majors
            }
        case types.SET_GET_MAJORS_STATUS:
            return {
                ...state,
                getMajorsStatus: action.status
            }
        case types.SET_CITIES:
            return {
                ...state,
                cities: action.cities
            }
        case types.SET_GET_CITIES_STATUS:
            return {
                ...state,
                getCitiesStatus: action.status
            }
        case types.SET_UNIVERSITY_SEARCH:
            return {
                ...state,
                universitySearch: action.universitySearch
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
        case types.SET_CITY:
            return {
                ...state,
                city: action.city
            }
        default:
            return state
    }
}

export default uniSearch