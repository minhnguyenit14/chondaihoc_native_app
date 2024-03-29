import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Loading } from '../../common';
import {
    vars,
    screenWidth,
    ViewStyles,
    caculateAppMaxHeight,
    caculateAppMinHeight,
    screenHeight
} from '../../styles';

type ButtonProps = {
    onPress: Function,
    title: String,
    loading: Boolean,
    disabled: Boolean,
    style: Array | Object,
    danger?: Boolean,
    buttonStyle?: Array | Object,
    secondary?: Boolean
}

class Button extends Component<ButtonProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onPress = () => {
        this.props.onPress();
    }

    render() {
        let { title, loading, disabled, style, header, danger, buttonStyle, secondary } = this.props;
        let btnStyle = disabled
            ? [styles.btn,styles.disabled]
            : (danger
                ? [styles.btn, styles.danger]
                : (secondary
                    ? [styles.btn, styles.secondary]
                    : styles.btn
                )
            );
        btnStyle = [btnStyle, buttonStyle];
        let color = disabled ? vars.textSecondary : vars.white;
        return (
            <View style={[styles.containers, style]}>
                {header
                    ?
                    <TouchableOpacity
                        style={[
                            styles.header
                        ]}
                        onPress={() => this.props.onPress()}
                    >
                        <Text style={[
                            styles.headerTxt
                        ]}>
                            {title}
                        </Text>
                    </TouchableOpacity>
                    : <TouchableOpacity
                        style={[
                            ViewStyles.flexCenter,
                            ViewStyles.flexDirectionRow,
                            btnStyle
                        ]}
                        onPress={() => { Keyboard.dismiss(); this.onPress() }}
                        disabled={disabled}
                    >
                        {loading &&
                            <Loading
                                containerStyle={styles.loading}
                                color={color}
                                size="small"
                            />
                        }
                        <Text
                            style={[styles.text, secondary && { color: vars.textBase }]}
                            disabled={disabled}
                        >
                            {title}
                        </Text>
                    </TouchableOpacity>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        alignItems: 'center'
    },
    danger: {
        backgroundColor: vars.red,
    },
    secondary: {
        backgroundColor: vars.borderColorDarker
    },
    btn: {
        backgroundColor: vars.orange,
        borderRadius: vars.borderRadius,
        width: screenWidth * .6,
        height: screenHeight * 0.08,
        minHeight: caculateAppMinHeight(),
        maxHeight: caculateAppMaxHeight(),
        flex: 1,
        alignItems: 'center'
    },
    loading: {
        width: '20%',
    },
    disabled: {
        backgroundColor: vars.borderColor,
    },
    text: {
        fontWeight: vars.fontMedium,
        color: vars.white,
    },
    header: {
        padding: vars.padding
    },
    headerTxt: {
        fontSize: vars.fontSizeSmall,
        color: vars.red
    }
})

Button.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    style: PropTypes.oneOf(PropTypes.arrayOf(PropTypes.object), PropTypes.object),
    danger: PropTypes.bool,
    buttonStyle: PropTypes.oneOf(PropTypes.arrayOf(PropTypes.object), PropTypes.object),
    secondary: PropTypes.bool
}

Button.defaultProps = {
    onPress: () => { },
    title: "",
    loading: false,
    disabled: false,
    style: null,
    buttonStyle: null,
    danger: false,
    secondary: false
}

export default Button;