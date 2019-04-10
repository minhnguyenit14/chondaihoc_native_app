import { BACKEND_URL } from '../../appConfig';

export default API = {
    UPLOAD_TEMP_IMAGE: `${BACKEND_URL}/fileupload/uploadtemp`,
    LOG_IN: `${BACKEND_URL}/User/Login`,
    CHECK_VERIFIED: `${BACKEND_URL}/User/CheckVerified`,
    SIGNUP: `${BACKEND_URL}/User/Register`,
    PROFILE: `${BACKEND_URL}/User/GetUserProfile`,
    GET_MAJORS: `${BACKEND_URL}/Core/GetDataPaging`,
    GET_CITIES: `${BACKEND_URL}/Core/GetDataPaging`,
    SEARCH_UNIVERSITY: `${BACKEND_URL}/University/SearchUniversity`,
    FEEDBACK: `${BACKEND_URL}/Home/SubmitData`,
    CHANGE_PASSWORD: `${BACKEND_URL}/User/ChangePassword`,
    GET_UNIVERSITY: `${BACKEND_URL}/University/GetUniversityInfo`,
    BLOG: `${BACKEND_URL}/Core/GetDataPaging`,
    MOVE_AVATAR: `${BACKEND_URL}/FileUpload/MoveToAvatar`,
    AVATAR_URL: `${BACKEND_URL}/userdata/avatar/{1}/{2}`,
    CHANGE_PROFILE: `${BACKEND_URL}/Home/SubmitData`,
    GET_ARTICLE: `${BACKEND_URL}/Home/GetDataById`,
    GET_RESULT_TEST_FREE: `${BACKEND_URL}/Holland/GetTestResult`,
    GET_QUESTIONS: `${BACKEND_URL}/Holland/GetQuestion`,
    GET_RESULT_BY_USER_ID: `${BACKEND_URL}/Holland/GetResultByUserID`,
    INCREASE_UNIVERSITY_VIEW_COUNT: `${BACKEND_URL}/University/IncreaseUniversityViewCount`,
    INCREASE_ARTICLE_VIEW_COUNT: `${BACKEND_URL}/Article/IncreaseArticleViewCount`,
    RESET_PASSWORD: `${BACKEND_URL}/User/ResetPassword`,

}