import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { STATUS } from '../../constants';
import { Button, AppContainer, Input, Heading, Text, Image } from '../../common';
import { vars } from '../../styles';
import { connect } from 'react-redux';
import {
    signupAct,
    setEmail,
    setPassword,
    setConfirmPassword,
    setFullName,
    setUserDOB
} from '../../actions/signup';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const EMAIL_UNVALID = "Email không hợp lệ";
const PASSWORD_LENGTH_VALID = "Mật khẩu phải có ít nhất 6 kí tự";
const PASSWORD_COINCIDE = "Mật khẩu không khớp";
const NAME_MSG_ERROR = "Tên không được để trống";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    formatDate = (date) => {
        let tempDate = { ...date };
        let data = tempDate.data;
        data = data.replace(' ', '');
        let temp = data.split('-');
        tempDate.data = `${temp[2]}-${temp[1]}-${temp[0]}`;
        return tempDate;
    }

    getResult = (chk, msg) => {
        return { result: chk, msg: msg };
    }

    onChange = (key, value, error = "") => {
        let { userPassword, userConfirmPassword } = this.props.signup;
        if (key === "setPassword" && userConfirmPassword.data) {
            if (userConfirmPassword.data !== value) {
                this.props.setConfirmPassword(userConfirmPassword.data, PASSWORD_COINCIDE);
            } else {
                this.props.setConfirmPassword(userConfirmPassword.data, "");
            }
        }
        if (key === "setConfirmPassword") {
            if (userPassword.data !== value) {
                error = PASSWORD_COINCIDE;
            }
            else {
                error = "";
            }
        }

        this.props[key](value, error);
    }

    //#region valid method
    isEmailValid = (email) => {
        var r = EMAIL_REGEX;
        if (!r.test(email.toLowerCase())) {
            return this.getResult(false, EMAIL_UNVALID);
        }
        else return this.getResult(true, "");
    }

    isPasswordValid = (pass) => {
        var chkWithoutSpace = (pass.replace(/ /g, '').length >= 6);

        if (!chkWithoutSpace) return this.getResult(false, PASSWORD_LENGTH_VALID);
        else return this.getResult(true, "");
    }

    isConfirmPasswordValid(confirmPass, pass) {
        var confirmPassWithoutSpace = confirmPass.replace(/ /g, '');
        var passWithoutSpace = pass.replace(/ /g, '');

        var chkCoincide = (passWithoutSpace == confirmPassWithoutSpace);

        if (chkCoincide === false) return this.getResult(false, PASSWORD_COINCIDE);
        else return this.getResult(true, "");
    }

    isNameValid = (value) => {
        var chkWithoutSpace = (value.replace(/ /g, '').length > 0);
        if (chkWithoutSpace === false) return this.getResult(false, NAME_MSG_ERROR);
        return this.getResult(true, "");
    }
    //#endregion

    signup = () => {
        let {
            userEmail,
            userPassword,
            userConfirmPassword,
            fullName,
            userDOB
        } = this.props.signup;

        let chkEmail = this.isEmailValid(userEmail.data);
        let chkPass = this.isPasswordValid(userPassword.data);
        let chkfullname = this.isNameValid(fullName.data);
        let chkConfirmPassword = this.isConfirmPasswordValid(userConfirmPassword.data, userPassword.data);

        if (!chkEmail.result || !chkPass.result || !chkfullname.result || !chkConfirmPassword.result) {
            this.onChange("setEmail", userEmail.data, chkEmail.msg);
            this.onChange("setPassword", userPassword.data, chkPass.msg);
            this.onChange("setConfirmPassword", userConfirmPassword.data, chkConfirmPassword.msg);
            this.onChange("setFullName", fullName.data, chkfullname.msg);
        } else {
            this.props.signupAct(userEmail, userPassword, fullName, this.formatDate(userDOB), () => {
                Alert.alert(
                    "Thành công!",
                    "Bạn đã đăng ký thành công\nHãy kiểm tra email để xác thực tài khoản nhé",
                    [
                        {
                            text: "Ok",
                            onPress: () => this.props.navigation.goBack()
                        }
                    ],
                    { cancelable: false }
                )

            });
        }
    }

    render() {
        let {
            userEmail,
            userPassword,
            userConfirmPassword,
            fullName,
            userDOB,
            signupStatus
        } = this.props.signup;
        let isLoading = (signupStatus === STATUS.loading);

        let disabled = (!userEmail.data || !userPassword.data
            || !userConfirmPassword.data || !fullName.data
            || !userDOB.data || (userPassword.data !== userConfirmPassword.data));

        return (
            <AppContainer style={styles.container}>
                <Image source={require('../../assets/logo/logo.png')} />
                <Heading style={styles.heading}>
                    Đăng Ký
                </Heading>
                <Input
                    keyboardType={"email-address"}
                    loading={isLoading}
                    onChange={(value) => this.onChange("setEmail", value)}
                    value={userEmail.data}
                    label={"Email"}
                    error={userEmail.error}
                />
                <Input
                    loading={isLoading}
                    password
                    onChange={(value) => this.onChange("setPassword", value)}
                    value={userPassword.data}
                    label={"Mật khẩu"}
                    error={userPassword.error}
                />
                <Input
                    loading={isLoading}
                    password
                    onChange={(value) => this.onChange("setConfirmPassword", value)}
                    value={userConfirmPassword.data}
                    label={"Nhập lại mật khẩu"}
                    error={userConfirmPassword.error}
                />
                <Input
                    loading={isLoading}
                    onChange={(value) => this.onChange("setFullName", value)}
                    value={fullName.data}
                    label={"Họ tên"}
                    error={fullName.error}
                />
                <Input
                    loading={isLoading}
                    datePicker
                    onChange={(value) => this.onChange("setUserDOB", value)}
                    value={userDOB.data}
                    label={"Ngày sinh"}
                    format={"DD - MM - YYYY"}
                    error={userDOB.error}
                />
                <Button
                    style={styles.btn}
                    disabled={disabled || isLoading}
                    loading={isLoading}
                    onPress={this.signup}
                    title="Đăng Ký"
                />
                <TouchableOpacity
                    style={styles.back}
                    hitSlop={{
                        top: 20,
                        bottom: 20
                    }}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Text style={styles.text}>
                        Quay lại đăng nhập
                    </Text>
                </TouchableOpacity>
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: vars.padding,
    },
    heading: {
        marginTop: vars.margin * 2,
        marginBottom: vars.margin
    },
    btn: {
        marginTop: vars.margin * 2
    },
    bottom: {
        marginTop: vars.margin * 3,
        width: '100%',
        justifyContent: 'space-between'
    },
    text: {
        color: vars.orange,
        textDecorationLine: 'underline'
    },
    back: {
        marginTop: vars.margin * 3
    }
})

const mapStateToProps = (state) => {
    return {
        signup: state.signup
    }
}

const mapDispathToProps = (dispatch) => {
    return {
        signupAct: (userEmail, userPassword, fullName, userDOB, callbackSuccess) => {
            dispatch(signupAct(userEmail, userPassword, fullName, userDOB, callbackSuccess));
        },

        setEmail: (data, error) => {
            dispatch(setEmail(data, error));
        },

        setPassword: (data, error) => {
            dispatch(setPassword(data, error));
        },

        setConfirmPassword: (data, error) => {
            dispatch(setConfirmPassword(data, error));
        },
        setFullName: (data, error) => {
            dispatch(setFullName(data, error));
        },
        setUserDOB: (data, error) => {
            dispatch(setUserDOB(data, error));
        }
    }

}

export default connect(
    mapStateToProps,
    mapDispathToProps
)(SignUp);