import React, { PureComponent } from 'react';
import { Modal, StyleSheet, View, TouchableWithoutFeedback, Alert } from 'react-native';
import { Input, Button } from '../../../common';
import { connect } from 'react-redux';
import {
    setChangeUserFullName,
    setChangeUserDOB,
    setCurrentPassword,
    setNewPassword,
    setReNewPassword,
    updateProfile,
    updatePassword
} from '../../../actions/profile';
import { screenHeight, vars, ViewStyles, screenWidth } from '../../../styles';
import { STATUS } from '../../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import moment from "moment";

const ENTITY_NAME = 'User';
const EDIT_MODE = 'Edit';
const PASSWORD_LENGTH = 6;
const PASSWORD_LENGTH_VALID = "Độ dài mật khẩu ít nhất 6";
const PASSWORD_COINCIDE = "Mật khẩu không khớp";

class Edit extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onChange = (key, value, error = "") => {
        this.props[key](value, error);
    }
    getResult = (chk, msg) => {
        return { result: chk, msg: msg };
    }
    //#region valid
    isPasswordValid = (pass) => {
        var chkWithoutSpace = (pass.replace(/ /g, '').length >= PASSWORD_LENGTH);

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

    checkDisabled = (userFullName, userDOB, changePass, changeUserFullName, changeUserDOB, currentPassword, newPassword, reNewPassword) => {
        if (changePass) {
            let isDisabled = !newPassword.data
                || !reNewPassword.data
                || !currentPassword.data;
            return isDisabled
        } else {
            return !changeUserDOB
                || !changeUserFullName.data
                || (changeUserFullName.data === userFullName.data
                    && moment(userDOB).isSame(moment(changeUserDOB), 'date'));
        }
    }

    onSubmit = (changePass, currentPassword, newPassword, reNewPassword) => {

        if (changePass) {
            let { userEmail } = this.props.profile;
            let chkPass = this.isPasswordValid(newPassword.data);
            let chkConfirmPassword = this.isConfirmPasswordValid(reNewPassword.data, newPassword.data);
            if (!chkPass.result || !chkConfirmPassword.result) {
                this.onChange("setNewPassword", newPassword.data, chkPass.msg);
                this.onChange("setReNewPassword", reNewPassword.data, chkConfirmPassword.msg);
            } else {
                this.props.updatePassword(
                    currentPassword.data,
                    newPassword.data,
                    userEmail,
                    () => {
                        this.props.onRequestClose();
                        Alert.alert(
                            "Thành công",
                            "Bạn đã thay đổi mật khẩu thành công",
                            [
                                {
                                    text: "OK"
                                }
                            ],
                            { cancelable: true }
                        )
                    });
            }
        } else {
            let { userID, changeUserFullName, changeUserDOB, userEmail, userAvatar } = this.props.profile;
            let profile = {
                entityName: ENTITY_NAME,
                userID,
                userFullName: changeUserFullName.data,
                userDOB: changeUserDOB,
                userAvatar,
                userEmail: userEmail,
                mode: EDIT_MODE
            }
            this.props.updateProfile(profile, () => {
                this.props.onUpdateSuccess(userID);
            })
        }
    }

    changeDOB = (value) => {
        value = value.replace(/ /g, "").split("-");
        let date = `${value[2]}/${value[1]}/${value[0]}`;
        date = moment(new Date(date));
        date.set({ hour: 10, minute: 0, second: 0, millisecond: 0 });
        this.props.setChangeUserDOB(
            date
        )
    }

    render() {
        let { visible, changePass } = this.props;
        let {
            changeUserFullName,
            changeUserDOB,
            updateProfileStatus,
            currentPassword,
            newPassword,
            reNewPassword,
            updatePasswordStatus,
            userFullName,
            userDOB
        } = this.props.profile;
        let loading = changePass
            ? updatePasswordStatus === STATUS.loading
            : updateProfileStatus === STATUS.loading;
        let disabled = this.checkDisabled(
            userFullName,
            userDOB,
            changePass,
            changeUserFullName,
            changeUserDOB,
            currentPassword,
            newPassword,
            reNewPassword
        );
        let visualDOB = changeUserDOB ? moment(changeUserDOB).format('DD - MM - YYYY') : changeUserDOB;
        let edit = <View>
            <Input
                loading={loading}
                label="Tên người dùng"
                error={changeUserFullName.error}
                value={changeUserFullName.data}
                onChange={(value) => this.onChange("setChangeUserFullName", value)}
            />
            <Input
                loading={loading}
                datePicker
                onChange={(value) => this.changeDOB(value)}
                value={visualDOB}
                label={"Ngày sinh"}
                format={"DD - MM - YYYY"}
            />
        </View>
        let changePassword = <View>
            <Input
                password
                loading={loading}
                label="Mật khẩu hiện tại"
                error={currentPassword.error}
                value={currentPassword.data}
                onChange={(value) => this.onChange("setCurrentPassword", value)}
            />
            <Input
                password
                loading={loading}
                onChange={(value) => this.onChange("setNewPassword", value)}
                error={newPassword.error}
                value={newPassword.data}
                label={"Mật khẩu mới"}
            />
            <Input
                password
                loading={loading}
                onChange={(value) => this.onChange("setReNewPassword", value)}
                error={reNewPassword.error}
                value={reNewPassword.data}
                label={"Nhập lại mật khẩu mới"}
            />
        </View>
        return (
            <Modal
                animationType="fade"
                visible={visible}
                onRequestClose={this.props.onRequestClose}
                transparent={true}
            >
                <TouchableWithoutFeedback onPress={this.props.onRequestClose}>
                    <View style={[styles.modal]}>
                        <Animatable.View
                            useNativeDriver
                            animation='bounceInUp'
                            easing="ease-in-cubic"
                            direction="alternate"
                            style={[ViewStyles.container, styles.content, changePass && styles.changePass]}
                        >

                            <KeyboardAwareScrollView
                                contentContainerStyle={[ViewStyles.container]}
                            >
                                <TouchableWithoutFeedback>
                                    <View style={[
                                        changePass
                                            ? {
                                                maxHeight: screenHeight * .55,
                                                minHeight: 380,
                                                flex: .43
                                            }
                                            : {
                                                maxHeight: screenHeight * .35,
                                                minHeight: 260,
                                                flex: .28
                                            }
                                    ]}>
                                        {changePass ? changePassword : edit}
                                        <View style={[
                                            ViewStyles.flexDirectionRow,
                                            styles.btnGroup,
                                        ]}>
                                            <Button
                                                disabled={disabled || loading}
                                                loading={loading}
                                                style={styles.btn}
                                                buttonStyle={styles.btn}
                                                onPress={() => this.onSubmit(changePass, currentPassword, newPassword, reNewPassword)}
                                                title="Chỉnh sửa"
                                            />
                                            <Button
                                                secondary
                                                buttonStyle={styles.btn}
                                                style={styles.btn}
                                                title="Hủy"
                                                onPress={this.props.onRequestClose}
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
        position: 'absolute'
    },
    modal: {
        margin: 0, // This is the important style you need to set
        alignItems: undefined,
        justifyContent: undefined,
        backgroundColor: 'rgba(0,0,0,.6)'
    },
    btn: {
        maxWidth: screenWidth * .4
    },
    content: {
        marginTop: screenWidth > 400 ? screenHeight * .6 : screenHeight * .55,
        borderTopLeftRadius: vars.padding,
        borderTopRightRadius: vars.padding,
        paddingVertical: vars.padding,
        backgroundColor: vars.white,
        paddingHorizontal: vars.padding
    },
    changePass: {
        marginTop: screenWidth > 400 ? screenHeight * .4 : screenHeight * .35,
    },
    btnGroup: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flex: 1,
    },
    formError: {
        marginVertical: vars.margin,
        color: vars.red,
    }
})

const mapStateToProps = state => ({
    profile: state.profile
})

const mapDispatchToProps = dispatch => ({
    setChangeUserFullName: (data, error) => {
        dispatch(setChangeUserFullName(data, error))
    },
    setChangeUserDOB: (userDOB) => {
        dispatch(setChangeUserDOB(userDOB))
    },
    setCurrentPassword: (data, error) => {
        dispatch(setCurrentPassword(data, error))
    },
    setNewPassword: (data, error) => {
        dispatch(setNewPassword(data, error))
    },
    setReNewPassword: (data, error) => {
        dispatch(setReNewPassword(data, error))
    },
    updateProfile: (profile, callBackSuccess) => {
        dispatch(updateProfile(profile, callBackSuccess))
    },
    updatePassword: (currentPassword, newPassword, userEmail, callBackSuccess) => {
        dispatch(updatePassword(currentPassword, newPassword, userEmail, callBackSuccess))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit);