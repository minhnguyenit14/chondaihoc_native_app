import types from './types';
import { API, STATUS } from '../../constants';
import { post } from '../../helper/axiosHelper';

const pagination = (quesList, pageSize) => {
    let questions = [];
    let answers = [];
    let pIndex = 1;
    let temp = [];
    quesList.forEach((q, i) => {
        q["index"] = i + 1;

        if ((i + 1) >= pIndex && (i + 1) <= pageSize * pIndex) {
            temp.push(q)
        }
        if ((i + 1) === pIndex * pageSize) {
            answers.push({
                data: []
            });
            questions.push({
                pageIndex: pIndex,
                data: temp
            });
            temp = [];
            pIndex++;
        }
    })
    return { questions, answers };
}

export const getFilterData = (data) => {
    let kindCode = "";
    data.map((d, i) => {
        kindCode += d.CharacterKindName.charAt(0);
        if (i < data.length - 1) {
            kindCode = `${kindCode}.`;
        }
    })
    return { kindCode, data };
}

export const getQuestions = (userID = -1) => {
    return dispatch => {
        let url = API.GET_QUESTIONS;
        let body = { UserID: userID };
        dispatch(setGetQuestionsStatus(STATUS.loading))
        post(url, body).then(
            res => {
                console.log(res)
                if (res.data.Error) {
                    dispatch(setGetQuestionsStatus(STATUS.error))
                } else {
                    let resultData = res.data.ResultData;
                    let questions = resultData.Questions;
                    let options = resultData.Options;
                    let pageSize = resultData.PageSize;
                    dispatch(setTotalQuestions(questions.length));
                    dispatch(setQuestionsOrigin(questions));
                    let temp = pagination(questions, pageSize);
                    questions = temp.questions;
                    let answers = temp.answers;
                    dispatch(setQuestions(questions));
                    dispatch(setAnswers(answers));
                    dispatch(setQuestionKind(resultData.QuestionKind));
                    dispatch(setQuestionSetID(resultData.QuestionSetID));
                    dispatch(setOptions(options));
                    dispatch(setPageSize(pageSize));
                    dispatch(setGetQuestionsStatus(STATUS.success));
                }
            },
            rej => {
                dispatch(setGetQuestionsStatus(STATUS.error))
            }
        )
    }
}

export const getResult = (data, userID, questionKind, questionSetID, callBackSuccess) => {
    return dispatch => {
        let body = {
            Data: JSON.stringify(data),
            UserID: userID,
            QuestionKind: questionKind,
            QuestionSetID: questionSetID
        }
        let url = API.GET_RESULT_TEST_FREE;
        dispatch(setGetResultStatus(STATUS.loading))
        post(url, body).then(
            res => {
                console.log(res)
                if (res.data.Error) {
                    dispatch(setGetResultStatus(STATUS.error))
                } else {
                    let resultData = res.data.ResultData;
                    let { kindCode, data } = getFilterData(resultData.CharacterKind);
                    dispatch(setMainMajors(resultData.MainMajor));
                    dispatch(setSubMajors(resultData.SubMajor));
                    dispatch(setTreeMajors(resultData.TreeMajor));
                    dispatch(setTopUniRecommend(resultData.University));
                    dispatch(setResult(data));
                    dispatch(setTestMsg(resultData.TestMsg[0].TestMsg));
                    dispatch(setKindCode(kindCode));
                    dispatch(setGetResultStatus(STATUS.success));
                    callBackSuccess(resultData.TreeMajor);
                }
            },
            rej => {
                dispatch(setGetResultStatus(STATUS.error))
            }
        )
    }
}

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

export const setTotalAnswered = (totalAnswered) => ({
    type: types.SET_TOTAL_ANSWERED,
    totalAnswered
})

export const setGetQuestionsStatus = (status) => ({
    type: types.SET_GET_QUESTIONS_STATUS,
    status
})

export const setGetResultStatus = (status) => ({
    type: types.SET_GET_RESULT_STATUS,
    status
})

export const setQuestions = (questions) => ({
    type: types.SET_QUESTIONS,
    questions
})

export const setQuestionsOrigin = (questionsOrigin) => ({
    type: types.SET_QUESTIONS_ORIGIN,
    questionsOrigin
})

export const setOptions = (options) => ({
    type: types.SET_OPTIONS,
    options
})

export const setPageSize = (pageSize) => ({
    type: types.SET_PAGE_SIZE,
    pageSize
})

export const setPageIndex = (pageIndex) => ({
    type: types.SET_PAGE_INDEX,
    pageIndex
})

export const setAnswers = (answers) => ({
    type: types.SET_ANSWERS,
    answers
})

export const setTestProgress = (testProgress) => ({
    type: types.SET_TEST_PROGRESS,
    testProgress
})

export const setTotalQuestions = (totalQuestions) => ({
    type: types.SET_TOTAL_QUESTIONS,
    totalQuestions
})

export const setPagesAnswered = (pagesAnswered) => ({
    type: types.SET_PAGES_ANSWERED,
    pagesAnswered
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

export const setQuestionKind = (questionKind = "Free") => ({
    type: types.SET_QUESTION_KIND,
    questionKind
})

export const setQuestionSetID = (questionSetID = "") => ({
    type: types.SET_QUESTION_SET_ID,
    questionSetID
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

export const reset = () => ({
    type: types.RESET
})

export const resetFilter = () => ({
    type: types.RESET_FILTER
})