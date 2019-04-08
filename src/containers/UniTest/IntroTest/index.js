import React, { Component } from 'react';
import { Button, AppContainer, Text, Title, Image } from '../../../common';
import { View, StyleSheet } from 'react-native';
import { vars, TextStyles, ViewStyles } from '../../../styles';
import { ROUTES } from '../../../constants';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { setNextTab, setCurrentTab } from '../../../actions/navigationEvents';

class IntroTest extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.appAnimate = null;
    }

    goToTest = () => {
        this.props.navigation.push(ROUTES.TEST.route);
    }
    render() {
        return (
            <AppContainer tab={ROUTES.INTRO_TEST}>
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
                    title="Làm trắc nghiệm"
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