import types from '../actions/uniTest/types';
import { STATUS } from '../constants';

const initState = {
    questions: [],
    questionsOrigin: [],
    options: [],
    pageSize: 0,
    pageIndex: 1,
    answers: [],
    totalQuestions: 0,
    totalAnswered: 0,
    pagesAnswered: [],
    mainMajors: [],
    subMajors: [],
    treeMajors: [],
    universities: [],
    result: [],
    kindCode: "",
    testMsg: "",
    questionKind: "",
    questionSetID: "",
    testProgress: 0,
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
    getQuestionsStatus: STATUS.default,
    getResultStatus: STATUS.default,
    getUniDetailStatus: STATUS.default,
    rangePoint: null,
    majorsTable: [],
    uniInfo: null
}

const uniTest = (state = initState, action) => {
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
        case types.SET_TOTAL_ANSWERED:
            return {
                ...state,
                totalAnswered: action.totalAnswered
            }
        case types.SET_GET_QUESTIONS_STATUS:
            return {
                ...state,
                getQuestionsStatus: action.status
            }
        case types.SET_GET_RESULT_STATUS:
            return {
                ...state,
                getResultStatus: action.status
            }
        case types.SET_QUESTIONS:
            return {
                ...state,
                questions: action.questions
            }
        case types.SET_QUESTIONS_ORIGIN:
            return {
                ...state,
                questionsOrigin: action.questionsOrigin
            }
        case types.SET_OPTIONS:
            return {
                ...state,
                options: action.options
            }
        case types.SET_PAGE_SIZE:
            return {
                ...state,
                pageSize: action.pageSize
            }
        case types.SET_PAGE_INDEX:
            return {
                ...state,
                pageIndex: action.pageIndex
            }
        case types.SET_ANSWERS:
            return {
                ...state,
                answers: action.answers
            }
        case types.SET_TOTAL_QUESTIONS:
            return {
                ...state,
                totalQuestions: action.totalQuestions
            }
        case types.SET_PAGES_ANSWERED:
            return {
                ...state,
                pagesAnswered: action.pagesAnswered
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
        case types.SET_QUESTION_KIND:
            return {
                ...state,
                questionKind: action.questionKind
            }
        case types.SET_QUESTION_SET_ID:
            return {
                ...state,
                questionSetID: action.questionSetID
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
        case types.SET_TEST_PROGRESS:
            return {
                ...state,
                testProgress: action.testProgress
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
        default:
            return state
    }
}

export default uniTest