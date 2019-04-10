import React, { Component } from 'react';
import { AppContainer, Title, Caption, Button, FeedBack } from '../../../common';
import { View, StyleSheet } from 'react-native';
import { ROUTES } from '../../../constants';
import { connect } from 'react-redux';
import ResultKind from './ResultKind';
import { Icon } from 'react-native-elements';
import { vars, TextStyles } from '../../../styles';
import Divider from 'react-native-divider';
import MainMajor from './MainMajor';
import SubMajor from './SubMajor';
import UniRow from '../../UniSearch/UniRow';

class TestResult extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: ROUTES.TEST_RESULT.header,
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            showFeedBack: false
        };
    }

    componentDidMount() {
        if (this.props.navigation.state.routeName !== ROUTES.PROFILE.route) {
            setTimeout(() => this.setState({
                showFeedBack: true
            }), 2000)
        }
    }

    renderKinds = (result) => {
        let data = []
        result.map((r, i) => {
            let type = "";
            let icon = <Icon type="font-awesome" name="heart" />;
            switch (i) {
                case 0:
                    type = "first";
                    break;
                case 1:
                    type = "second";
                    break;
                case 2:
                    type = "third";
                    break;
                default:
                    break;
            }
            data.push(
                <ResultKind
                    icon={icon}
                    key={r.CharacterKindID}
                    type={type}
                    data={r}
                />
            )
        })
        return data;
    }

    renderMainMajors = (mainMajors) => {
        let data = [];
        mainMajors.map(m => data.push(
            <MainMajor
                data={m}
                key={m.MajorID}
            />
        ))
        return data;
    }

    renderSubMajors = (subMajors) => {
        let data = [];
        subMajors.map(m => data.push(
            <SubMajor
                data={m}
                key={m.MajorID}
            />
        ))
        return data;
    }

    renderUniRecommend = (topUniRecommend) => {
        let data = [];
        topUniRecommend.map(u => data.push(
            <UniRow
                data={u}
                navigation={this.props.navigation}
                style={styles.uniRow}
                key={u.UniversityID}
            />
        ))
        return data;
    }

    watchMore = (profilePage) => {
        this.props.navigation.push(
            profilePage
                ? ROUTES.PROFILE_UNI_RECOMMEND_FILTER.route
                : ROUTES.UNI_RECOMMEND_FILTER.route
        );
    }

    render() {
        let { profilePage } = this.props;
        let {
            result,
            kindCode,
            testMsg,
            mainMajors,
            subMajors,
            topUniRecommend
        } = this.props[profilePage ? "profile" : "uniTest"];
        let kinds = this.renderKinds(result);
        mainMajors = this.renderMainMajors(mainMajors);
        subMajors = this.renderSubMajors(subMajors);
        topUniRecommend = this.renderUniRecommend(topUniRecommend);
        let uniLength = topUniRecommend.length;
        return (
            <AppContainer
                containerStyle={{
                    backgroundColor: 'rgba(0,0,0,0)',
                }}
            >
                <FeedBack
                    visible={this.state.showFeedBack}
                    onRequestClose={() => this.setState({ showFeedBack: false })}
                    onFeedBackSuccess={() => this.setState({ showFeedBack: false })}
                />
                {
                    kinds.length !== 0 &&
                    <React.Fragment>
                        <Divider
                            borderColor={vars.borderColorDarker}
                            orientation="center"
                        >
                            <Title style={[TextStyles.boldFont]}>
                                Mã tính cách của bạn là
                        </Title>
                        </Divider>
                        <View style={styles.code}>
                            <Title style={[TextStyles.boldFont, styles.textCode]}>
                                {kindCode}
                            </Title>
                        </View>
                        <Caption style={styles.testMsg}>
                            {testMsg && `(${testMsg})`}
                        </Caption>
                        <View style={styles.group}>
                            {kinds}
                        </View>
                    </React.Fragment>
                }

                {mainMajors.length !== 0 &&
                    <React.Fragment>
                        <Divider
                            borderColor={vars.borderColorDarker}
                            orientation="center"
                        >
                            <Title style={[TextStyles.boldFont]}>
                                Những ngành phù hợp nhất với bạn
                    </Title>
                        </Divider>
                        <View style={styles.group}>
                            {mainMajors}
                        </View>
                    </React.Fragment>
                }


                {subMajors.length !== 0 &&
                    <React.Fragment>
                        <Divider
                            borderColor={vars.borderColorDarker}
                            orientation="center"
                        >
                            <Title style={[TextStyles.boldFont]}>
                                Những ngành có thể phù hợp với bạn
                    </Title>
                        </Divider>
                        <View style={styles.group}>
                            {subMajors}
                        </View>
                    </React.Fragment>
                }

                {topUniRecommend.length !== 0 &&
                    <React.Fragment>
                        <Divider
                            borderColor={vars.borderColorDarker}
                            orientation="center"
                        >
                            <Title style={[TextStyles.boldFont]}>
                                Top {uniLength} đại học phù hợp với bạn
                    </Title>
                        </Divider>
                        <View style={styles.group}>
                            {topUniRecommend}
                        </View>
                        <View>
                            <Button
                                danger
                                title="Xem thêm"
                                onPress={() => this.watchMore(profilePage)}
                            />
                        </View>
                    </React.Fragment>
                }
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    code: {
        width: 100,
        marginTop: vars.margin,
        paddingVertical: vars.padding / 2,
        borderRadius: vars.borderRadius / 4,
        backgroundColor: vars.primaryActive
    },
    testMsg: {
        fontStyle: 'italic'
    },
    textCode: {
        fontWeight: vars.fontBold,
        textAlign: 'center',
        color: vars.white,
        textShadowOffset: vars.textShadowOffset,
        textShadowRadius: vars.textShadowRadius
    },
    uniRow: {
        marginHorizontal: 0
    },
    group: {
        width: '100%',
        marginTop: vars.margin,
        marginBottom: vars.margin * 2,
    }
})

TestResult.defaultProps = {
    profilePage: false
}

const mapStateToProps = state => (
    {
        uniTest: state.uniTest,
        profile: state.profile
    }
)

export default connect(
    mapStateToProps
)(TestResult);