import React from 'react';
import { getStorage } from '../../helper/axiosHelper';
import { Loading } from '../../common';
import {
    View,
    Alert,
    Linking
} from 'react-native';
import { ViewStyles, vars } from '../../styles';
import ImagePicker from 'react-native-image-crop-picker';
import { version } from '../../../package.json';
import { post } from '../../helper/axiosHelper';
import { API } from '../../constants';
import RNExitApp from 'react-native-exit-app';

class CheckAuthScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        ImagePicker.clean().then(() => {
        }).catch(e => {
            alert(e);
        });

        post(API.CHECK_MOBILE_VERSION).then(
            data => {
                let { MobileVersionLink, MobileVersionNumber } = data.data.ResultData;
                if (version !== MobileVersionNumber) {
                    Alert.alert(
                        `Đã có phiên bản mới ${MobileVersionNumber}`,
                        "Bạn cần cập nhật lên phiên bản mới nhất để có thể sử dụng ứng dụng.",
                        [
                            {
                                text: "Thoát",
                                style: 'cancel',
                                onPress: () => RNExitApp.exitApp()
                            },
                            {
                                text: "Cập nhật ngay!",
                                onPress: () => this.linking(MobileVersionLink)
                            },
                        ],
                        { cancelable: false }
                    )
                    this.setState({
                        updateVersion: true
                    })
                } else {
                    this.goToApp();
                }
            }
        ).catch(err => {
            console.warn(err)
            this.goToApp();
        })

    };

    linking = (href) => {
        Linking.openURL(href).then(() => RNExitApp.exitApp()).catch(() => {

        });
    }

    goToApp = () => {
        getStorage().then(
            storage => {
                const { userToken, isVerified } = storage;
                this.props.navigation.navigate(userToken ? 'App' : 'Auth', { data: { isVerified } });
            }
        )
    }

    render() {
        return (
            <View style={[
                ViewStyles.container,
                ViewStyles.flexCenter
            ]}>
                <Loading size="large" />
            </View>
        );
    }
}
export default CheckAuthScreen;