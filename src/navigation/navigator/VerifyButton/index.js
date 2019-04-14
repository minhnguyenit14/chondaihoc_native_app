import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { vars, ViewStyles, screenWidth } from '../../../styles';
import { Text, Loading } from '../../../common';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Icon4 from 'react-native-vector-icons/dist/FontAwesome';
import { getStorage, setStorage, post } from '../../../helper/axiosHelper';
import { checkVerified } from '../../../actions/profile';
import { STATUS, API } from '../../../constants';


class VerifyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reSendStatus: STATUS.default
        };
        this.animate = null;
        this.interval = null
    }

    componentDidMount() {
        this.interval = setInterval(() => this.animate.bounce(500), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    reSendVerifyEmail = () => {
        getStorage().then(
            storage => {
                let body = {
                    id: storage.userID
                }
                this.setState({
                    reSendStatus: STATUS.loading
                })
                post(API.RE_SEND_VERIFY_EMAIL, body).then(data => {
                    if (!data.data.Error) {
                        this.setState({
                            reSendStatus: STATUS.success
                        })
                        Alert.alert(
                            "Gửi lại thành công",
                            "Chúng tôi đã gửi lại email xác thực cho bạn, hãy kiểm tra email ngay nhé.",
                            [
                                {
                                    text: 'Ok',
                                }
                            ],
                            { cancelable: true }
                        )
                    } else {
                        this.setState({
                            reSendStatus: STATUS.error
                        })
                    }
                }).catch(err => {
                    this.setState({
                        reSendStatus: STATUS.error
                    })
                })
            })
    }

    reCheckVerified = () => {
        Alert.alert(
            "Chú ý!",
            "Tài khoản của bạn chưa được xác thực, vui lòng kiểm tra lại email và xác thực, sau đó ấn Xác thực tại đây để hoàn tất.",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Chưa có Mail?",
                    onPress: this.reSendVerifyEmail
                },
                {
                    text: "Xác thực",
                    onPress: this.checkVerified
                }
            ],
            { cancelable: true }
        )
    }

    checkVerified = () => {
        getStorage().then(
            storage => {
                this.props.checkVerified(storage.userID, (isVerified) => {
                    setStorage({
                        ...storage,
                        isVerified
                    }).then(() => {
                        if (isVerified) {
                            Alert.alert(
                                "Thành công!",
                                "Tài khoản của bạn đã được xác thực.",
                                [
                                    {
                                        text: "Ok",
                                        onPress: () => this.props.navigation.navigate('Loading')
                                    }
                                ],
                                { cancelable: false }
                            )
                        } else {
                            Alert.alert(
                                "Chưa xác thực!",
                                "Tài khoản của bạn chưa thực hiện xác thực email, bạn vui lòng kiểm tra email và xác thực.",
                                [
                                    {
                                        text: "Ok"
                                    }
                                ],
                                { cancelable: false }
                            )
                        }
                    })
                })
            }
        )
    }

    render() {
        let { reSendStatus } = this.state;
        let { checkVerifiedStatus } = this.props.profile;
        let loading = checkVerifiedStatus === STATUS.loading || reSendStatus === STATUS.loading;

        return (
            <Animatable.View
                useNativeDriver
                ref={inst => this.animate = inst}
                animation="bounce"
                duration={500}
                style={[styles.container]}
            >
                <TouchableOpacity
                    onPress={this.reCheckVerified}
                    disabled={loading}
                >
                    <View style={[ViewStyles.flexCenter]}>
                        <View style={styles.iconGroup}>

                            <Icon4
                                name="envelope"
                                color={loading ? vars.textBase : vars.logo}
                                size={36}
                            />
                            <View style={styles.times}>
                                {loading
                                    ? <Loading color={vars.logo} />
                                    : <Icon4
                                        name="times-circle"
                                        size={16}
                                        color={vars.logo}

                                    />
                                }
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animatable.View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D7B49E',
        position: 'absolute',
        bottom: 70,
        right: 20,
        borderRadius: vars.borderRadius * 2,
        maxWidth: screenWidth / 3,
        padding: vars.padding / 2,
        shadowColor: vars.textBase,
        shadowOffset: vars.shadowOffset,
        shadowOpacity: vars.shadowOpacity,
        shadowRadius: vars.shadowRadius,
        elevation: 10,
        borderColor: '#D7B49E',
        borderWidth: 3
    },
    iconGroup: {
        position: 'relative'
    },
    times: {
        position: 'absolute',
        top: -6,
        right: -8,
    },
    mess: {
        fontSize: vars.fontSizeStandard / 1.75,
        fontWeight: vars.fontMedium
    }
})

const mapStateToProps = state => ({
    profile: state.profile
})

const mapDispatchToProps = dispatch => ({
    checkVerified: (userID, callBackSuccess, callBackError) =>
        dispatch(checkVerified(userID, callBackSuccess, callBackError))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VerifyButton);