import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViewStyles, vars } from '../../../../styles';
import { Text, Caption } from '../../../../common';
import { Slider } from 'react-native-elements';
import { setAnswers, setPagesAnswered } from '../../../../actions/uniTest';
import { connect } from 'react-redux';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = (value) => {
        let { data } = this.props;
        let { answers, options } = this.props.uniTest;
        let isExisted = false;

        let selectedOpt = options.filter(o => o.OptionPoint === value);
        answers.forEach(a => {
            if (a.QuestionID === data.QuestionID) {
                a.OptionID = selectedOpt[0].OptionID;
                a.value = value;
                isExisted = true;
            }
        });

        isExisted || answers.push({
            QuestionID: data.QuestionID,
            QuestionSetID: data.QuestionSetID,
            CharacterKindID: data.CharacterKindID,
            OptionID: selectedOpt[0].OptionID,
            value
        })
        this.props.setAnswers(answers);
        this.setPagesAnswered();
        this.props.onAnswer();
    }

    setPagesAnswered = () => {
        let {
            questions,
            pageIndex,
            answers,
            pagesAnswered
        } = this.props.uniTest;
        questions = questions.length !== 0 ? questions.filter(q => q.pageIndex === pageIndex)[0].data : questions;
        let count = 0;
        answers.map(q => {
            questions.map(a => {
                if (q.QuestionID === a.QuestionID) {
                    count++;
                }
            })
        })
        let isFullAnswered = count === questions.length;
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
        let { answers, options } = this.props.uniTest;
        let ansInfo = this.getAnsInfo(answers, data.QuestionID);
        let isAnswered = ansInfo[0];
        let value = ansInfo[1];
        let step = 1;
        let min = options[0].OptionPoint;
        let max = options[options.length - 1].OptionPoint;
        value = value || max / 2;
        return (
            <View style={[
                ViewStyles.flexCenterVertical,
                ViewStyles.flexDirectionRow,
                styles.container
            ]}>
                <View style={[ViewStyles.flexCenter, styles.number]}>
                    <Text style={[styles.numberText, isAnswered && styles.answered]}>
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
                        value={value}
                        maximumValue={max}
                        minimumValue={min}
                        step={step}
                        animateTransitions
                        thumbTouchSize={{ width: 100, height: 100 }}
                        minimumTrackTintColor={vars.textBase}
                        thumbStyle={{ width: vars.padding, height: vars.padding }}
                        onValueChange={this.onChange}
                        thumbTintColor={isAnswered ? vars.logo : vars.borderColorDarker}
                    />
                </View>
            </View>
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
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Question);