import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewStyles, vars } from '../../../../styles';
import { Text, Caption } from '../../../../common';
import { Slider } from 'react-native-elements';
import { setAnswers, setPagesAnswered, setTestProgress, setTotalAnswered } from '../../../../actions/uniTest';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { STATUS } from '../../../../constants';


class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    onChange = (value) => {
        this.setState({
            value
        })
    }

    updateData = () => {
        let { value } = this.state;
        let { data } = this.props;
        let { answers, options, pageIndex, totalAnswered, totalQuestions } = this.props.uniTest;
        let isExisted = false;
        let tempTotal = totalAnswered;
        let selectedOpt = options.filter(o => o.OptionPoint === value);

        answers[pageIndex - 1].data.forEach(a => {
            if (a.QuestionID === data.QuestionID) {
                a.value = value;
                isExisted = true;
            }
        });
        isExisted || (totalAnswered++ , answers[pageIndex - 1].data.push({
            QuestionID: data.QuestionID,
            QuestionSetID: data.QuestionSetID,
            CharacterKindID: data.CharacterKindID,
            OptionID: selectedOpt[0].OptionID,
            value
        }))

        if (tempTotal !== totalAnswered) {
            this.setProgress(totalAnswered);
        }
        this.props.setAnswers(answers);
        this.setPagesAnswered();
        this.props.onAnswer(totalAnswered === totalQuestions && totalQuestions !== 0);
    }

    setProgress = (totalAnswered) => {
        let { totalQuestions } = this.props.uniTest;
        this.props.setTotalAnswered(totalAnswered);
        this.props.setTestProgress(Math.round(totalAnswered / totalQuestions * 100));
    }

    setPagesAnswered = () => {
        let {
            questions,
            pageIndex,
            answers,
            pagesAnswered
        } = this.props.uniTest;
        questions = questions.length !== 0 ? questions.filter(q => q.pageIndex === pageIndex)[0].data : questions;

        let isFullAnswered = answers[pageIndex - 1].data.length === questions.length;
        if (isFullAnswered) {
            pagesAnswered.includes(pageIndex) || pagesAnswered.push(pageIndex)
        } else {
            pagesAnswered.includes(pageIndex) && pagesAnswered.slice(pageIndex, 1)
        }
        this.props.setPagesAnswered(pagesAnswered);
    }

    getAnsInfo = (answers, qID) => {
        let isAnswered = false;
        let value = null;
        answers.map(a => {
            if (a.QuestionID === qID) {
                isAnswered = true;
                value = a.value
            };
        });
        return [isAnswered, value];
    }

    render() {
        let {
            data,
            number
        } = this.props;
        let { answers, options, pageIndex, getResultStatus } = this.props.uniTest;
        let disabled = getResultStatus === STATUS.loading;
        let ansInfo = this.getAnsInfo(answers[pageIndex - 1].data, data.QuestionID);
        let isAnswered = ansInfo[0];
        let value = this.state.value || ansInfo[1];
        let step = 1;
        const min = options[0].OptionPoint;
        const max = options[options.length - 1].OptionPoint;
        value = value || max / 2;
        return (
            <Animatable.View
                useNativeDriver
                duration={800}
                direction="normal"
                animation="bounceInUp"
                easing="ease-in-cubic"
                style={[
                    ViewStyles.flexCenterVertical,
                    ViewStyles.flexDirectionRow,
                    styles.container
                ]}
            >
                <View style={[ViewStyles.flexCenter, styles.number]}>
                    <Text
                        style={[
                            styles.numberText,
                            disabled
                                ? styles.disabled
                                : (isAnswered && styles.answered)
                        ]}
                    >
                        {number}
                    </Text>
                    <View style={[ViewStyles.flexDirectionRow, { marginTop: 5 }]}>
                        <Caption style={{ fontWeight: vars.fontBold }}>
                            {value}
                        </Caption>
                        <Caption style={{ fontSize: vars.fontSizeSmall / 1.5 }}>
                            /{max}
                        </Caption>
                    </View>

                </View>
                <View style={styles.question}>
                    <Text>
                        {data.QuestionTitle}
                    </Text>
                    <Slider
                        disabled={disabled}
                        value={value}
                        maximumValue={max}
                        minimumValue={min}
                        step={step}
                        animateTransitions
                        thumbTouchSize={{ width: 100, height: 100 }}
                        minimumTrackTintColor={vars.textBase}
                        thumbStyle={{ width: vars.padding, height: vars.padding }}
                        onValueChange={this.onChange}
                        onSlidingComplete={() => {
                            this.updateData();
                        }}
                        thumbTintColor={
                            disabled
                                ? vars.textSecondary
                                : (isAnswered
                                    ? vars.logo
                                    : vars.borderColorDarker
                                )
                        }
                    />
                </View>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: vars.margin,
        paddingRight: vars.padding / 3,
        paddingVertical: vars.padding / 3,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flex: 1,
        flexWrap: 'wrap',
        backgroundColor: vars.white,
        shadowColor: vars.shadowColor,
        shadowOffset: vars.shadowOffset,
        shadowOpacity: vars.shadowOpacity,
        shadowRadius: vars.shadowRadius,
        elevation: vars.elevation,
        borderWidth: 1,
        borderColor: vars.borderColor,
    },
    number: {
        width: '15%',
        height: '100%',
    },
    numberText: {
        color: vars.white,
        borderRadius: vars.borderRadius,
        backgroundColor: vars.borderColorDarker,
        alignItems: 'center',
        justifyContent: 'center',
        width: vars.padding * 2,
        height: vars.padding * 2,
        textAlign: 'center',
        textAlignVertical: "center"
    },
    answered: {
        backgroundColor: vars.red,
    },
    disabled: {
        backgroundColor: vars.textSecondary,

    },
    question: {
        width: '85%',
        flexWrap: 'wrap',
    }
})

const mapStateToProps = state => {
    return {
        uniTest: state.uniTest
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAnswers: (answers) => {
            dispatch(setAnswers(answers))
        },
        setPagesAnswered: (pagesAnswered) => {
            dispatch(setPagesAnswered(pagesAnswered))
        },
        setTestProgress: (testProgress) => {
            dispatch(setTestProgress(testProgress))
        },
        setTotalAnswered: (totalAnswered) => {
            dispatch(setTotalAnswered(totalAnswered))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Question);