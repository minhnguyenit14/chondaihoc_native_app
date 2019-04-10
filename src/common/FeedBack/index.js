import React, { Component } from 'react';
import StarRating from 'react-native-star-rating';
import {
    Modal,
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    Keyboard,
    Alert
} from 'react-native';
import { ViewStyles, vars, screenWidth, screenHeight } from '../../styles';
import { Title, Input, Button, Caption } from '../../common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import { getStorage } from '../../helper/axiosHelper';
import { API, STATUS } from '../../constants';

type FeedBackProps = {
    visible?: Boolean,
    onRequestClose?: Function,
    onFeedBackSuccess?: Function
}

const PLACEHOLDER_TEXTAREA = "Hãy cho chúng tôi biết bạn nghĩ gì về UniR - chondaihoc...";

class FeedBack extends Component<FeedBackProps> {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            starCount: 5,
            userID: null,
            isVerified: false,
            error: "",
            feedBackStatus: STATUS.default
        };
    }

    componentDidMount() {
        getStorage().then(
            storage => {
                let { userID, isVerified } = storage;
                this.setState({
                    userID,
                    isVerified
                })
            }
        )
    }

    onChange = (key, value) => {
        let state = this.state;
        state[key] = value;
        this.setState({
            ...state,
            error: ""
        })
    }

    submit = () => {
        let { starCount, value, userID, isVerified } = this.state;

        let error = "";

        if (!userID)
            error = "Bạn phải đăng nhập để thực hiện chức năng này";
        else if (!isVerified)
            error = "Bạn phải xác thực email để thực hiện chức năng này";
        else if (value.replace(/ /g, '').length === 0)
            error = "Bạn cần nhập đánh giá trước khi gửi";

        if (error !== "") {
            this.setState({
                error
            })
            return;
        } else {
            this.setState({
                error
            })
            this.feedbackAct(starCount, value);
        }
        this.props.onFeedBackSuccess();
    }

    feedbackAct = (rate, feedbackContent, callbackSuccess) => {
        let body = {
            entityName: 'Feedback',
            masterData: JSON.stringify({
                FeedbackID: 100,
                UserID: this.state.userID,
                FeedbackPoint: rate,
                FeedbackContent: feedbackContent
            }),
            mode: 'New'
        }
        let url = API.FEEDBACK;
        this.setFeedBackStatus(STATUS.loading)
        post(url, body).then(
            res => {
                if (res.data.Error) {
                    this.setFeedBackStatus(STATUS.error)
                }
                else {
                    try {
                        this.setFeedBackStatus(STATUS.success)
                        Alert.alert(
                            "Thành công!",
                            "Cám ơn bạn đã đánh giá và phản hồi",
                            [
                                {
                                    text: "OK",
                                }
                            ],
                            { cancelable: true }
                        )
                    }
                    catch (e) {
                        this.setFeedBackStatus(STATUS.error)
                    }
                }
            },
            rej => {
                this.setFeedBackStatus(STATUS.error)
            }
        )
    }

    setFeedBackStatus = (feedBackStatus) => {
        this.setState({ feedBackStatus })
    }

    onRequestClose = () => {
        this.setState({
            error: "",
            starCount: 5,
            value: ""
        })
        if (this.animation) {
            this.animation.zoomOut(250).then(() => this.props.onRequestClose())
        } else {
            this.props.onRequestClose();
        }
    }

    render() {
        let { visible } = this.props;
        let {
            value,
            starCount,
            error,
            feedBackStatus
        } = this.state;
        let loading = feedBackStatus === STATUS.loading;
        let isDisabled = value === "";
        return (
            <Modal
                animationType="fade"
                visible={visible}
                onRequestClose={this.onRequestClose}
                transparent={true}
            >
                <TouchableWithoutFeedback
                    // onPress={this.onRequestClose}
                >
                    <View style={[
                        styles.container,
                        ViewStyles.flexCenter
                    ]}>
                        <Animatable.View
                            ref={node => this.animation = node}
                            useNativeDriver
                            style={[
                                styles.contentContainer
                            ]}
                            animation={visible ? "zoomIn" : "zoomOut"}
                            duration={500}
                        >
                            <KeyboardAwareScrollView
                                keyboardShouldPersistTaps='always'
                                contentContainerStyle={{ flexGrow: 1 }}
                            >
                                <TouchableWithoutFeedback onPress={(e) => { Keyboard.dismiss(); e.stopPropagation() }}>
                                    <View style={styles.contentWrapper}>
                                        <View style={styles.title}>
                                            <Title style={{ fontWeight: vars.fontMedium }}>
                                                Góp ý và đánh giá
                                            </Title>
                                            <Caption style={styles.error}>
                                                {error}
                                            </Caption>
                                        </View>
                                        <View style={[ViewStyles.flexCenter, styles.stars]}>
                                            <StarRating
                                                containerStyle={styles.containerStars}
                                                disabled={false}
                                                emptyStar={'star-o'}
                                                fullStar={'star'}
                                                halfStar={'star-half-o'}
                                                iconSet={"FontAwesome"}
                                                maxStars={5}
                                                rating={starCount}
                                                selectedStar={(rating) => this.onChange("starCount", rating)}
                                                fullStarColor={vars.orange}
                                            />
                                        </View>
                                        <Input
                                            blurOnSubmit
                                            multiline={true}
                                            numberOfLines={10}
                                            inputStyle={styles.textArea}
                                            placeholder={PLACEHOLDER_TEXTAREA}
                                            onChange={(value) => this.onChange("value", value)}
                                            value={value}
                                        />
                                        <View style={[ViewStyles.flexDirectionRow]}>
                                            <Button
                                                buttonStyle={styles.btn}
                                                secondary
                                                title="Hủy"
                                                onPress={this.onRequestClose}
                                            />
                                            <Button
                                                disabled={isDisabled || loading}
                                                loading={loading}
                                                buttonStyle={styles.btn}
                                                title="Gửi"
                                                onPress={this.submit}
                                            />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>

                            </KeyboardAwareScrollView>
                        </Animatable.View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,.6)',
        margin: 0, // This is the important style you need to set
        alignItems: undefined,
        justifyContent: undefined,
        height: screenHeight,
        padding: vars.padding,

    },
    title: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: vars.borderColor,
        padding: vars.padding,
    },
    contentContainer: {
        width: '100%',
        backgroundColor: vars.white,
        paddingHorizontal: vars.padding,
        borderRadius: vars.borderRadius / 4,
    },
    stars: {
        margin: vars.margin
    },
    containerStars: {
        width: '50%',
    },
    btn: {
        maxWidth: screenWidth * .4
    },
    error: {
        color: vars.red
    },
    textArea: {
        height: screenHeight * .2,
        maxHeight: screenHeight * .2,
        justifyContent: "flex-start",
        textAlignVertical: 'top',
        borderRadius: vars.borderRadius / 4
    },
    contentWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: vars.padding
    }
})

FeedBack.defaultProps = {
    visible: false,
    onFeedBackSuccess: () => { },
    onRequestClose: () => { },
}

export default FeedBack;