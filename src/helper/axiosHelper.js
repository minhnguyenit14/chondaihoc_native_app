import axios from 'axios';
import {
    LS_KEY
} from '../../appConfig';
import qs from 'qs';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../constants';

const INTERVAL_UPDATE_USER_STATUS = 5 * 60 * 1000;

export const post = (url, body = {}, image = false) => {
    if (image) {
        console.log(url, body)
        return axios(url,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-type": "application/x-www-form-urlencoded",
                },
                timeout: 15000,
                data: body
            }
        ).then(
            res => {
                return handleRespond(res);
            }
        ).catch(err => {
            return handleRej(err)
        })
    } else {
        return addToken(body).then(
            (bd) => {
                console.log(bd, url);
                if (bd.reUpdate && bd.userID) {
                    reUpdateUserStatus(bd.userID);
                }
                return axios(url, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        "Content-type": "application/x-www-form-urlencoded",
                    },
                    timeout: 15000,
                    data: qs.stringify(bd.body)
                }).then(
                    res => {
                        return handleRespond(res);
                    }
                ).catch(err => {
                    return handleRej(err)
                })
            }
        )
    }
}

const handleRespond = (res, isImg = false) => {
    return new Promise((resolve, reject) => {

        switch (res.status) {
            case 400:
                console.log('400', res)
                reject()
                break;
            case 401:
                reject()
                break;
            case 415:
                console.log('415', res)
                reject()
                break;
            case 500:
                console.log('500', res)
                reject()
                break;
            case 200:
                if (isImg) {
                    resolve({ data: `data:image/png;base64,${Buffer.from(res.data, 'binary').toString('base64')}` });
                } else {
                    resolve(res)
                }
                break;
            default:
                res.json().then(json => {
                    reject()
                    return json;
                }).catch(err => {
                    reject()
                    return err;
                })

        }
    }).then((data) => {
        if (data.data.Error) {

            Alert.alert(
                "Lỗi",
                data.data.Message,
                [
                    {
                        text: "OK",
                    }
                ],
                { cancelable: true }
            )
        }
        return data;
    })

}

const handleRej = (err) => {
    return new Promise((resolve, reject) => {
        let isTimeOut = err.message.includes("timeout of");
        let message = isTimeOut ? "Kết nối mất quá nhiều thời gian để phản hồi" : err.message;
        console.log(err)
        Alert.alert(
            "Lỗi",
            message,
            [
                {
                    text: "OK",
                    style: "cancel",
                    onPress: () => { reject(err) }
                }
            ],
            { cancelable: false }
        )
        return err.message;
    })
}


const addToken = (body) => {
    return getStorage().then(
        storage => {
            let userToken = null;
            let userID = null;
            let reUpdate = false;
            if (storage) {
                reUpdate = true;
                userToken = storage.userToken;
                userID = storage.userID;
                if (storage.timeStamp) {
                    let now = new Date().getTime();
                    if (now - storage.timeStamp < INTERVAL_UPDATE_USER_STATUS) {
                        reUpdate = false;
                    } else {
                        setStorage({
                            ...storage,
                            timeStamp: new Date().getTime()
                        })
                    }
                } else {
                    setStorage({
                        ...storage,
                        timeStamp: new Date().getTime()
                    })
                }
            }
            body.userToken = userToken;
            return { body, reUpdate, userID };
        }
    );
}

const reUpdateUserStatus = (userID) => {
    let body = {
        id: userID
    }
    let url = API.UPDATE_USER_STATUS;
    post(url, body).then(
        res => {
            console.log(res)
        },
        rej => {
            // console.warn(rej)
        }
    )
}

export const setStorage = async (value) => {
    try {
        await AsyncStorage.setItem(LS_KEY, JSON.stringify(value));
    } catch (error) {
        console.warn('setStorage', error)
    }
}

export const getStorage = async (value) => {
    try {
        const value = await AsyncStorage.getItem(LS_KEY);
        if (value !== null) {
            // We have data!!
            return JSON.parse(value);
        }
        return {};
    } catch (error) {
        console.warn('getStorage', error)
        // Error retrieving data
    }
}

export const removeStorage = async () => {
    try {
        await AsyncStorage.removeItem(LS_KEY);
    } catch (error) {
        console.warn('removeStorage', error)
    }
}