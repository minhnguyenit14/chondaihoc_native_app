import React, { Component } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { STATUS, ROUTES } from '../../constants';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { StyleSheet } from 'react-native';
import { AppContainer, Loading } from '../../common';
import { getStorage } from '../../helper/axiosHelper';
import { AVATAR_PATH } from '../../../appConfig';
import { vars, screenHeight } from '../../styles';
import { connect } from 'react-redux';
import {
    getProfile,
    uploadTempImage,
    uploadImage,
    updateProfile,
    setAvatar,
    resetEditForm,
    getTestResultByUserID
} from '../../actions/profile';
import { setGetResultStatus } from '../../actions/uniTest';
import { setNextTab, setCurrentTab } from '../../actions/navigationEvents';
import { NavigationEvents } from 'react-navigation';
import { logOut } from '../../actions/logout';
import Avatar from './Avatar';
import Edit from './Edit';
import TestResult from '../UniTest/TestResult';

const ENTITY_NAME = 'User';
const EDIT_MODE = 'Edit';

class Profile extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableOpacity
                    style={{ paddingHorizontal: vars.padding }}
                    hitSlop={{
                        top: 20,
                        left: 20,
                        bottom: 20,
                        right: 20
                    }}
                    onPress={navigation.getParam('logout')}
                >
                    <Icon
                        size={vars.fontSizeStandard * 2}
                        name="sign-out-alt"
                        color={vars.orange}
                    />
                </TouchableOpacity>
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            avatarUrl: '',
            isEdit: false,
            changePass: false
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            logout: this._logout
        });
        this.getProfile();
    }

    getProfile = (userID = null) => {
        if (userID) {
            this.props.getProfile(userID, (data) => {
                let {
                    userAvatar,
                    // userFullName
                } = data;
                this.setState({
                    avatarUrl: AVATAR_PATH.replace("name", userAvatar),
                    // userFullName
                });
            });
            this.getTestResult(userID);
        } else {
            getStorage().then(
                storage => {
                    let userID = storage.userID || this.props.login.userID;
                    this.props.getProfile(userID, (data) => {
                        let {
                            userAvatar,
                            // userFullName
                        } = data;
                        this.setState({
                            avatarUrl: AVATAR_PATH.replace("name", userAvatar),
                            userAvatar
                            // userFullName
                        });
                    });
                    this.getTestResult(userID);
                }
            )
        }
    }

    getTestResult = (userID = null) => {
        if (userID) {
            this.props.getTestResultByUserID(userID, () => { });
        } else {
            getStorage().then(
                storage => {
                    let userID = storage.userID || this.props.login.userID;
                    this.props.getTestResultByUserID(userID, () => { });
                }
            )
        }
    }

    _logout = () => {
        Alert.alert(
            "Đăng xuất",
            "Bạn có chắc chắn muốn đăng xuất?",
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đăng xuất',
                    onPress: () => {
                        this.props.logOut();
                        this.props.navigation.navigate("Loading")
                    }
                },
            ],
            { cancelable: false }
        )
    }

    uploadTempImage = (image) => {
        let imgPathArray = image.path.split("/");
        let imageSource = new FormData();
        imageSource.append("file", {
            uri: image.path,
            type: image.mime,
            name: imgPathArray[imgPathArray.length - 1]
        });
        this.props.uploadTempImage(imageSource, (data) => {
            let newAvatar = data.ResultData;
            let { userID, userFullName, userDOB, userEmail, userAvatar } = this.props.profile;
            let profile = {
                entityName: ENTITY_NAME,
                userID,
                userFullName: userFullName.data,
                userDOB,
                userAvatar: newAvatar,
                userEmail: userEmail,
                mode: EDIT_MODE
            }
            this.props.updateProfile(profile, () => {
                this.props.uploadImage(newAvatar, userAvatar, () => {
                    this.props.setAvatar(newAvatar);
                    this.setState({
                        avatarUrl: AVATAR_PATH.replace("name", newAvatar),
                        // userFullName
                    });
                });
            })
        })
    }

    onUpdateSuccess = (userID) => {
        this.setState({
            isEdit: false,
            changePass: false
        })
        this.getProfile(userID);
    }

    closeEdit = () => {
        this.setState({ isEdit: false, changePass: false });
        this.props.resetEditForm();
    }

    checkTested = () => {
        let { getResultStatus } = this.props.uniTest;
        getResultStatus === STATUS.success && (
            this.getTestResult(),
            this.props.setGetResultStatus(STATUS.default)
        )
    }

    render() {
        let {
            avatarUrl,
            isEdit,
            changePass
        } = this.state;
        let {
            userFullName,
            userDOB,
            getProfileStatus,
            uploadTempImageStatus,
            uploadImageStatus,
            updateProfileStatus,
            getTestResultByUserIDStatus
        } = this.props.profile;
        let loading = getProfileStatus === STATUS.loading || updateProfileStatus === STATUS.loading;
        let getTestLoading = getTestResultByUserIDStatus === STATUS.loading && <Loading dot />;
        let color = loading ? vars.borderColorDarker : vars.primaryHover;
        let avaLoading = uploadTempImageStatus === STATUS.loading || uploadImageStatus === STATUS.loading;

        return (
            <AppContainer
                sticker={
                    <React.Fragment>
                        <Edit
                            onUpdateSuccess={this.onUpdateSuccess}
                            changePass={changePass}
                            visible={isEdit || changePass}
                            onRequestClose={this.closeEdit}
                        />
                        <View style={styles.sticker} />
                    </React.Fragment>
                }
            >
                <NavigationEvents
                    onWillFocus={this.checkTested}
                />
                <View style={{ width: '100%', flex: 1 }}>
                    <Avatar
                        loading={loading}
                        avatarLoading={avaLoading}
                        avatarUrl={avatarUrl}
                        userFullName={userFullName.data}
                        userDOB={userDOB}
                        onSuccess={this.uploadTempImage}
                    />
                    < View style={styles.editContainer}>
                        <TouchableOpacity
                            disabled={loading}
                            onPress={() => this.setState({ isEdit: true })}
                        >
                            <View style={styles.edit} />
                            <Icon
                                style={styles.icon}
                                name="pen"
                                color={color}
                                size={vars.fontSizeStandard * 1.5}
                            />
                        </TouchableOpacity>
                    </View>
                    < View style={styles.changePass}>
                        <TouchableOpacity
                            disabled={loading}
                            onPress={() => this.setState({ changePass: true })}
                        >
                            <View style={styles.edit} />
                            <Icon
                                style={styles.icon}
                                name="lock"
                                color={color}
                                size={vars.fontSizeStandard * 1.5}
                            />
                        </TouchableOpacity>
                    </View>
                    {getTestLoading ||
                        <TestResult
                            profilePage
                            navigation={this.props.navigation}
                        />
                    }
                </View>
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    sticker: {
        backgroundColor: vars.logo,
        height: screenHeight / 6 + vars.margin * 2,
        maxHeight: 300,
        position: 'absolute',
        width: '100%'
    },
    changePass: {
        position: 'absolute',
        top: vars.margin * 3.5,
        right: vars.margin / 2,
    },
    editContainer: {
        position: 'absolute',
        top: vars.margin / 2,
        right: vars.margin / 2,
    },
    edit: {
        backgroundColor: vars.white,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,.3)',
        width: 30,
        height: 30,
        borderRadius: vars.borderRadius
    },
    icon: {
        position: 'absolute',
        top: -vars.padding / 2,
        bottom: 0,
        right: -vars.padding,
        left: vars.padding,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = state => {
    return {
        profile: state.profile,
        login: state.login,
        uniTest: state.uniTest
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfile: (userID, callBackSuccess) => {
            dispatch(getProfile(userID, callBackSuccess))
        },
        uploadTempImage: (image, callBackSuccess) => {
            dispatch(uploadTempImage(image, callBackSuccess))
        },
        uploadImage: (imageName, oldAvatarName, callBackSuccess) => {
            dispatch(uploadImage(imageName, oldAvatarName, callBackSuccess))
        },
        updateProfile: (profile, callBackSuccess) => {
            dispatch(updateProfile(profile, callBackSuccess))
        },
        setAvatar: (userAvatar) => {
            dispatch(setAvatar(userAvatar))
        },
        resetEditForm: () => {
            dispatch(resetEditForm())
        },
        logOut: () => {
            dispatch(logOut())
        },
        setNextTab: (nextTab) => {
            dispatch(setNextTab(nextTab))
        },
        setCurrentTab: (currentTab) =>
            dispatch(setCurrentTab(currentTab)),
        getTestResultByUserID: (userID, callBackSuccess) =>
            dispatch(getTestResultByUserID(userID, callBackSuccess)),
        setGetResultStatus: (status) =>
            dispatch(setGetResultStatus(status))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);