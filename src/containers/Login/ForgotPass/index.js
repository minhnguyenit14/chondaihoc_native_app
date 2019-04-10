import React, { Component } from 'react';
import { API, STATUS } from '../../../constants';
import {
    Modal,
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    Keyboard,
    Alert
} from 'react-native';
import { ViewStyles, vars, screenWidth, screenHeight } from '../../../styles';
import { Title, Input, Button, Caption } from '../../../common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import { post } from '../../../helper/axiosHelper';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const EMAIL_UNVALID = "Email không hợp lệ";

class ForgotPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailResetPassword: "",
            error: "",
            resetPasswordStatus: STATUS.default,
            formError: ""
        };
    }
    getResult = (chk, msg) => {
        return { result: chk, msg: msg };
    }

    resetPassword = (userEmail, callBackSuccess) => {
        let url = API.RESET_PASSWORD;
        let body = {
            userEmail
        }
        this.setState({
            resetPasswordStatus: STATUS.loading
        })
        post(url, body).then(res => {
            if (res.data.Error) {
                this.setState({
                    resetPasswordStatus: STATUS.error
                })
            } else {
                this.setState({
                    resetPasswordStatus: STATUS.success
                })
            }
            callBackSuccess(res.data);
        }).catch(error => {
            this.setState({
                resetPasswordStatus: STATUS.error
            })
        })
    }

    isEmailValid = (email) => {
        var r = EMAIL_REGEX;
        if (!r.test(email.toLowerCase())) {
            return this.getResult(false, EMAIL_UNVALID);
        }
        else return this.getResult(true, "");
    }

    onResetPassword = () => {
        let {
            emailResetPassword
        } = this.state;
        let checkEmailResult = this.isEmailValid(emailResetPassword);
        if (checkEmailResult.result === false) {
            this.setState({
                error: checkEmailResult.msg
            });
        } else {
            this.setState({
                error: "",
                formError: ""
            })
            let userEmail = emailResetPassword.toLowerCase();
            this.resetPassword(userEmail, (data) => {
                if (data.Error) {
                    this.setState({
                        formError: data.Message
                    })
                } else {
                    Alert.alert(
                        "Thành công!",
                        "Chúng tôi đã gửi mật khẩu mới tới email của bạn",
                        [
                            {
                                text: "Ok",
                                onPress: this.onRequestClose
                            }
                        ],
                        { cancelable: false }
                    )
                }

            });
        }
    }

    onRequestClose = () => {
        this.setState({
            emailResetPassword: "",
            error: "",
            formError: "",
            resetPasswordStatus: STATUS.default
        })
        if (this.animation) {
            this.animation.zoomOut(250).then(() => this.props.onRequestClose())
        } else {
            this.props.onRequestClose();
        }
    }

    render() {
        let { visible } = this.props;
        let {
            emailResetPassword,
            error,
            formError,
            resetPasswordStatus
        } = this.state;
        let loading = resetPasswordStatus === STATUS.loading;
        let isDisabled = emailResetPassword === "";
        return (
            <Modal
                animationType="fade"
                visible={visible}
                onRequestClose={this.onRequestClose}
                transparent={true}
            >
                <TouchableWithoutFeedback onPress={this.onRequestClose}>
                    <View style={[
                        styles.container,
                        ViewStyles.flexCenter
                    ]}>
                        <Animatable.View
                            ref={node => this.animation = node}
                            useNativeDriver
                            style={[
                                styles.contentContainer
                            ]}
                            animation={visible ? "zoomIn" : "zoomOut"}
                            duration={500}
                        >
                            <KeyboardAwareScrollView
                                keyboardShouldPersistTaps='always'
                                contentContainerStyle={{ flexGrow: 1 }}
                            >
                                <TouchableWithoutFeedback onPress={(e) => { Keyboard.dismiss(); e.stopPropagation() }}>
                                    <View style={styles.contentWrapper}>
                                        <View style={styles.title}>
                                            <Title style={{ fontWeight: vars.fontMedium }}>
                                                Quên mật khẩu
                                            </Title>
                                            <Caption style={styles.error}>
                                                {formError}
                                            </Caption>
                                        </View>
                                        <Input
                                            label={"Nhập email của bạn"}
                                            blurOnSubmit
                                            onChange={(value) => this.setState({ emailResetPassword: value, error: "", formError: "" })}
                                            value={emailResetPassword}
                                            error={error}
                                        />
                                        <View style={[ViewStyles.flexDirectionRow]}>
                                            <Button
                                                buttonStyle={styles.btn}
                                                secondary
                                                title="Hủy"
                                                onPress={this.onRequestClose}
                                            />
                                            <Button
                                                buttonStyle={styles.btn}
                                                disabled={isDisabled || loading}
                                                loading={loading}
                                                title="Gửi lại mật khẩu"
                                                onPress={this.onResetPassword}
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </KeyboardAwareScrollView>
                        </Animatable.View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,.6)',
        margin: 0, // This is the important style you need to set
        alignItems: undefined,
        justifyContent: undefined,
        height: screenHeight,
        padding: vars.padding,

    },
    error: {
        color: vars.red
    },
    title: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: vars.borderColor,
        padding: vars.padding,
    },
    btn: {
        maxWidth: screenWidth * .4
    },
    contentContainer: {
        width: '100%',
        backgroundColor: vars.white,
        paddingHorizontal: vars.padding,
        borderRadius: vars.borderRadius / 4,
    },
    contentWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: vars.padding
    }
})

export default ForgotPass;