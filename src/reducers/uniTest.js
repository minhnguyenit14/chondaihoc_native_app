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
    pagesAnswered: [],
    result: [],
    kindCode: "",
    testMsg: "",
    questionKind: "",
    questionSetID: "",
    testProgress: 0,
    getQuestionsStatus: STATUS.default,
    getResultStatus: STATUS.default
}

const uniTest = (state = initState, action) => {
    switch (action.type) {
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
        case types.SET_TEST_PROGRESS:
            return {
                ...state,
                testProgress: action.testProgress
            }
        default:
            return state
    }
}

export default uniTest