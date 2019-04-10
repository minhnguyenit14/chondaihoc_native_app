import React, { Component } from 'react';
import { Button, AppContainer, Text, Title, Image } from '../../../common';
import { View, StyleSheet, Alert } from 'react-native';
import { vars, ViewStyles } from '../../../styles';
import { ROUTES } from '../../../constants';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { setNextTab, setCurrentTab } from '../../../actions/navigationEvents';
import { getStorage } from '../../../helper/axiosHelper';

class IntroTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerified: false
        };
        this.appAnimate = null;
    }

    checkVerified = () => {
        getStorage().then(
            storage => {
                let { isVerified } = storage;
                this.setState({
                    isVerified
                })
            }
        )
    }

    goToTest = () => {
        if (!this.state.isVerified) {
            Alert.alert(
                "Chú ý!",
                "Bạn chưa xác thực email, vui lòng kiểm tra email và xác thực để làm bài kiểm tra này",
                [
                    {
                        text: 'Ok',
                    },
                ],
                { cancelable: true }
            )
        } else {
            this.props.navigation.push(ROUTES.TEST.route);

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
        width: '90%'
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

const mapDispatchTopProps = dispatch => ({
    setNextTab: (nextTab) => {
        dispatch(setNextTab(nextTab))
    },
    setCurrentTab: (currentTab) => dispatch(setCurrentTab(currentTab)),

})

export default connect(
    null,
    mapDispatchTopProps
)(IntroTest);