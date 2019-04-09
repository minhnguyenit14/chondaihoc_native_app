import { API, STATUS } from "../../constants";
import { post } from "../../helper/axiosHelper";
import moment from 'moment';

const ENTITY_NAME = "Article";
export const getBlogDetail = (id, callBack) => {
    return dispatch => {
        let body = {
            id,
            entityName: ENTITY_NAME
        }
        let url = API.GET_ARTICLE;
        callBack(STATUS.loading);
        post(url, body).then(
            res => {
                let article = JSON.parse(res.data.ResultData);
                if (article) {
                    console.log(article);
                    let date = new Date(article.CreatedDate);
                    date.setHours(10);
                    let createDate = moment(date).format('DD MMM, YYYY').toString();
                    console.log(createDate)
                    dispatch(increaseViewCount(id));
                    callBack(STATUS.error, {
                        ...article,
                        createDate: createDate
                    });
                } else {
                    callBack(STATUS.error);
                }
            },
            rej => {
                console.log(rej);
                callBack(STATUS.error);
            }
        )
    }
};

export const increaseViewCount = (articleId) => {
    return dispatch => {
        let url = API.INCREASE_ARTICLE_VIEW_COUNT;
        let body = {
            articleId
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
};