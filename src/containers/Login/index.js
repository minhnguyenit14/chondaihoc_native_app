import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ROUTES, STATUS } from '../../constants';
import { Button, AppContainer, Input, Heading, Text, Image, Caption } from '../../common';
import { ViewStyles, vars } from '../../styles';
import { connect } from 'react-redux';
import {
    loginAct,
    setEmail,
    setPassword,
    setFormError
} from '../../actions/login';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            error: "",
            loading: false
        };
    }

    login = () => {
        let { userEmail, userPassword } = this.props.login;
        this.props.loginAct(userEmail, userPassword, (data) => {
            this.props.navigation.navigate('App');
        })
    }

    onChange = (key, value) => {
        this.props[key](value, "");
        this.props.setFormError();
    }

    onRedirect = (route) => {
        this.props.navigation.push(route, { prev: ROUTES.LOG_IN.route })
    }

    render() {
        let {
            userEmail,
            userPassword,
            loginStatus,
            formError
        } = this.props.login;
        let isLoading = loginStatus === STATUS.loading;
        let disabled = !userEmail.data || !userPassword.data;
        let error = formError !== "" && <Caption style={{ color: vars.red }}>
            {formError}
        </Caption>
        return (
            <AppContainer style={styles.container}>
                <Image source={require('../../assets/logo/logo.png')} />
                <Heading style={styles.heading}>
                    Đăng nhập
                </Heading>

                <Input
                    onChange={(value) => this.onChange("setEmail", value)}
                    value={userEmail.data}
                    placeholder={"Email"}
                    label={"Email"}
                    loading={isLoading}
                    error={userEmail.error}
                />
                <Input
                    loading={isLoading}
                    password
                    onChange={(value) => this.onChange("setPassword", value)}
                    value={userPassword.data}
                    placeholder={"Password"}
                    label={"Mật khẩu"}
                    error={userPassword.error}
                />
                {error}
                <Button
                    style={styles.btn}
                    disabled={disabled || isLoading}
                    loading={isLoading}
                    onPress={this.login}
                    title="Đăng nhập"
                />
                <View style={[ViewStyles.flexDirectionRow, styles.bottom]}>
                    <TouchableOpacity
                        onPress={() => this.onRedirect(ROUTES.SIGN_UP.route)}
                        hitSlop={{
                            top: 20,
                            bottom: 20
                        }}
                    >
                        <Text style={styles.text}>
                            Đăng kí
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        hitSlop={{
                            top: 20,
                            bottom: 20
                        }}
                        onPress={() => { }}
                    >
                        <Text style={styles.text}>
                            Quên mật khẩu
                    </Text>
                    </TouchableOpacity>
                </View>
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: vars.padding * 2,
    },
    heading: {
        marginTop: vars.margin,
        marginBottom: vars.margin * 2
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
    }
})

const mapDispatchToProps = dispatch => {
    return {
        loginAct: (userEmail, userPassword, callBackSuccess) => {
            dispatch(loginAct(userEmail, userPassword, callBackSuccess))
        },
        setEmail: (data, error) => {
            dispatch(setEmail(data, error))
        },
        setPassword: (data, error) => {
            dispatch(setPassword(data, error))
        },
        setFormError: (message) => {
            dispatch(setFormError(message))
        },
        clearLogIn: () => {
            dispatch(clearLogIn())
        }
    }
}

const mapStateToProps = state => {
    return {
        login: state.login
    }
}

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login);