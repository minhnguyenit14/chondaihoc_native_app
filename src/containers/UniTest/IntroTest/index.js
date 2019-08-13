import React, { Component } from 'react';
import { Button, AppContainer, Text, Title, Image } from '../../../common';
import { View, StyleSheet, Alert } from 'react-native';
import { vars, ViewStyles, screenWidth } from '../../../styles';
import { ROUTES } from '../../../constants';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { setNextTab, setCurrentTab } from '../../../actions/navigationEvents';
import { getStorage, setStorage } from '../../../helper/axiosHelper';
import { checkVerified } from '../../../actions/profile';

class IntroTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerified: false,
            storage: null,
            userID: -1
        };
        this.appAnimate = null;
    }

    checkVerified = () => {
        getStorage().then(
            storage => {
                let {
                    isVerified,
                    userID,
                } = storage;
                this.setState({
                    isVerified,
                    userID,
                    storage
                })
            }
        )
    }

    checkVerifiedAgain = () => {
        this.props.checkVerified(this.state.userID, (isVerified) => {
            setStorage({
                ...this.state.storage,
                isVerified
            }).then(() => {
                this.setState({
                    isVerified
                })
                this.goToTest(false);
            })
        })
    }

    goToTest = (isVerifiedButton = true) => {
        if (!this.state.isVerified) {
            Alert.alert(
                "Chú ý!",
                "Bạn chưa xác thực email, vui lòng kiểm tra email và xác thực để làm bài kiểm tra này",
                [
                    {
                        text: 'Tôi đã xác thực',
                        onPress: this.checkVerifiedAgain
                    },
                    {
                        text: 'Ok',
                    }
                ],
                { cancelable: true }
            )
        } else {
            isVerifiedButton
                ? this.props.navigation.push(ROUTES.TEST.route)
                : this.props.navigation.navigate("Loading");

        }
    }

    render() {
        const title = "Làm trắc nghiệm";
        return (
            <AppContainer>
                <NavigationEvents onDidFocus={this.checkVerified} />
                <Image source={require('../../../assets/logo/logo_horizontal.png')} />
                <View style={[ViewStyles.flexCenter, styles.title]}>
                    <View style={styles.title_ctn}>
                        <Title style={[
                            styles.titleText,
                            {
                                textAlign: "left",
                                marginBottom: vars.padding / 5
                            }
                        ]}>
                            TRẮC NGHIỆM BẢN THÂN
                        </Title>
                        <View style={[
                            ViewStyles.flexDirectionRow,
                            {
                                width: '100%',
                                justifyContent: 'flex-end'
                            }
                        ]}>
                            <Icon type="font-awesome" name="hand-o-right" />
                            <Title style={[
                                styles.titleText,
                                {
                                    textAlign: "right",
                                    marginLeft: vars.margin / 2
                                }
                            ]}>
                                ĐỊNH HƯỚNG TƯƠNG LAI
                            </Title>
                        </View>
                    </View>

                </View>

                <View style={[styles.intro]}>
                    <Text>
                        Chào bạn! Đây là bài kiểm tra trắc nghiệm giúp bạn hiểu rõ hơn về bản thân
                        nhằm hỗ trợ định hướng chọn lựa đại học cũng như ngành nghề của bạn sau này! Hãy bắt đầu ngay thôi!!
                    </Text>
                </View>
                <Button
                    style={[styles.btn]}
                    title={title}
                    onPress={this.goToTest}
                />
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        width: '100%',
        padding: vars.padding,
        borderRadius: vars.borderRadius / 4
    },
    title_ctn: {
        maxWidth: 350
    },
    titleText: {
        color: vars.logo,
        fontWeight: vars.fontMedium,
        textAlignVertical: "center",
    },
    intro: {
        padding: vars.padding,
        marginVertical: vars.margin
    },
    btn: {
        marginTop: vars.margin * 2
    }
})

const mapDispatchToProps = dispatch => ({
    setNextTab: (nextTab) => {
        dispatch(setNextTab(nextTab))
    },
    setCurrentTab: (currentTab) => dispatch(setCurrentTab(currentTab)),
    checkVerified: (userID, callBackSuccess, callBackError) =>
        dispatch(checkVerified(userID, callBackSuccess, callBackError))
})

export default connect(
    null,
    mapDispatchToProps
)(IntroTest);