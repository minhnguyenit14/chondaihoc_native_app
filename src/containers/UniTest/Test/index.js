import React, { Component } from 'react';
import { AppContainer } from '../../../common';
import { ROUTES, STATUS } from '../../../constants';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import { vars, screenWidth, ViewStyles } from '../../../styles';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Pagination from './Pagination';
import { getStorage } from '../../../helper/axiosHelper';
import { connect } from 'react-redux';
import { setPageIndex, getResult, setAnswers, setPagesAnswered, getQuestions } from '../../../actions/uniTest';
import Question from './Question';
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper';

class Test extends Component {
    static navigationOptions = ({ navigation }) => {
        let disabled = navigation.getParam('disabled');
        return {
            headerTitle: ROUTES.TEST.header,
            headerRight: (
                <View style={ViewStyles.flexDirectionRow}>
                    <TouchableOpacity
                        style={{ paddingHorizontal: vars.padding }}
                        hitSlop={{
                            top: 20,
                            left: 20,
                            bottom: 20,
                            right: 20
                        }}
                        onPress={navigation.getParam('auto')}
                    >
                        <Icon name="cogs" type="font-awesome" color={vars.orange} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={disabled}
                        style={{ paddingHorizontal: vars.padding }}
                        hitSlop={{
                            top: 20,
                            left: 20,
                            bottom: 20,
                            right: 20
                        }}
                        onPress={navigation.getParam('submit')}
                    >
                        <Icon name="paper-plane" type="font-awesome" color={disabled ? vars.textSecondary : vars.orange} />
                    </TouchableOpacity>
                </View>
            )
        }
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.navigation.setParams({
            disabled: true,
            submit: this._submit,
            auto: this.auto
        });
        this.getData();
    }

    getData = () => {
        let { questions } = this.props.uniTest;
        questions.length === 0 &&
            getStorage().then(
                storage => {
                    let { userID } = storage;
                    this.props.getQuestions(userID);
                }
            )
    }

    auto = () => {
        let { questions, options, totalQuestions } = this.props.uniTest;
        let auto = [];
        let minValue = options[0].OptionPoint;
        let maxValue = options[options.length - 1].OptionPoint;
        let minID = options[0].OptionID;
        let maxID = options[options.length - 1].OptionID;
        questions.map(q => {
            q.data.map(d => {
                let min = d.index >= totalQuestions / 2 ? maxValue / 2 : minValue;
                let max = d.index < totalQuestions / 2 ? maxValue / 2 : maxValue;
                auto.push({
                    QuestionID: d.QuestionID,
                    CharacterKindID: d.CharacterKindID,
                    OptionID: Math.floor(Math.random() * (maxID - minID + 1) + minID),
                    value: Math.floor(Math.random() * (max - min + 1) + min)
                })
            })
        })
        this.props.setAnswers(auto);
        let temp = [];
        questions.map(q => temp.push(q.pageIndex));
        this.props.setPagesAnswered(temp);
        this.props.navigation.setParams({
            disabled: true
        }); this.setState({})
    }

    _submit = () => {
        let { answers, questionKind, questionSetID } = this.props.uniTest;
        this.props.navigation.setParams({
            disabled: true
        });
        getStorage().then(
            storage => {
                if (storage) {
                    if (storage.userID) {
                        userID = storage.userID;
                    }
                };
                this.props.getResult(
                    answers,
                    userID,
                    questionKind,
                    questionSetID,
                    () => {
                        this.props.navigation.setParams({
                            disabled: false
                        });
                    }
                )
            }
        );
    }

    makeAnimate = (current, next) => {
        this.swiper.scrollBy(next - current);
        this.questionAnimate.bounce(500).then(() => this.scrollView.scrollToPosition(0, 0));
    }

    checkDisabled = () => {
        let { answers, totalQuestions } = this.props.uniTest;
        if (answers.length === totalQuestions) {
            this.props.navigation.setParams({
                disabled: false
            });
        }
    }

    onPageChange = (pageIndex) => {
        this.props.setPageIndex(pageIndex + 1)
    }

    renderFlatlist = () => {
        let { questions } = this.props.uniTest;
        let temp = []
        questions.map(q => {
            temp.push(
                <Animatable.View
                    key={q.pageIndex}
                    animation="bounceInDown"
                    easing="ease-in-cubic"
                    direction="alternate"
                >
                    <FlatList
                        data={q.data}
                        keyExtractor={q => q.QuestionID.toString()}
                        renderItem={q =>
                            <Animatable.View
                                ref={inst => this.questionAnimate = inst}
                                animation={q.index % 2 === 0 ? 'bounceInRight' : 'bounceInLeft'}
                            >
                                <View style={{ paddingHorizontal: vars.padding }}>
                                    <Question
                                        onAnswer={this.checkDisabled}
                                        data={q.item}
                                        number={q.item.index}
                                    />
                                </View>
                            </Animatable.View>
                        }
                    />
                </Animatable.View>
            )
        })
        return temp;
    }

    render() {
        let {
            questions,
            pageIndex,
            answers,
            totalQuestions,
            getResultStatus,
            getQuestionsStatus
        } = this.props.uniTest;
        questions = questions.length !== 0 ? questions.filter(q => q.pageIndex === pageIndex)[0].data : questions;
        let progress = (isNaN(totalQuestions) || Math.round(answers.length / totalQuestions * 100)) || 0;
        let loadingR = getResultStatus === STATUS.loading;
        let loadingQ = getQuestionsStatus === STATUS.loading;

        return (
            <AppContainer
                scroll={false}
                scrollRef={inst => this.scrollView = inst}
                refresher={
                    <RefreshControl
                        enabled={false}
                        refreshing={loadingQ || loadingR}
                        colors={[vars.orange]}
                    />
                }
                sticker={
                    loadingQ ? null :
                        <View style={[styles.status]}>
                            <ProgressBarAnimated
                                backgroundAnimationDuration={1500}
                                width={screenWidth}
                                value={progress}
                                maxValue={100}
                                barEasing='bounce'
                                backgroundColor={vars.orange}
                                backgroundColorOnComplete={vars.green}
                            />
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Pagination onPageChange={(current, next) => this.makeAnimate(current, next)} />
                            </View>
                        </View>
                }
            >
                {loadingQ ||

                    <Swiper
                        ref={inst => this.swiper = inst}
                        showsPagination={false}
                        onIndexChanged={this.onPageChange}
                    >

                        {this.renderFlatlist()}
                    </Swiper>

                    // <Animatable.View
                    //     animation="bounceInDown"
                    //     easing="ease-in-cubic"
                    //     direction="alternate"
                    // >
                    //     <FlatList
                    //         data={questions}
                    //         keyExtractor={q => q.QuestionID.toString()}
                    //         renderItem={q =>
                    //             <Animatable.View
                    //                 ref={inst => this.questionAnimate = inst}
                    //                 animation={q.index % 2 === 0 ? 'bounceInRight' : 'bounceInLeft'}
                    //             >
                    //                 <View style={{ paddingHorizontal: vars.padding }}>
                    //                     <Question
                    //                         onAnswer={this.checkDisabled}
                    //                         data={q.item}
                    //                         number={q.item.index}
                    //                     />
                    //                 </View>
                    //             </Animatable.View>}
                    //     />
                    // </Animatable.View>
                }
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    status: {
        width: '100%',
        height: vars.margin * 4,
    },
    btn: {
        width: 20,

    }
})

const mapStateToProps = state => (
    {
        uniTest: state.uniTest
    }
)

const mapDispatchToProps = dispatch => {
    return {
        getQuestions: (userID) => {
            dispatch(getQuestions(userID))
        },
        getResult: (data, userID, questionKind, questionSetID, callBackSuccess) => {
            dispatch(getResult(data, userID, questionKind, questionSetID, callBackSuccess))
        },
        setAnswers: (answers) => {
            dispatch(setAnswers(answers))
        },
        setPagesAnswered: (pagesAnswered) => {
            dispatch(setPagesAnswered(pagesAnswered))
        },
        setPageIndex: (pageIndex) => {
            dispatch(setPageIndex(pageIndex))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Test);