import React, { Component } from 'react';
import { Text, Caption, DismissKeyboard } from '../../common';
import { View, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import { InputStyles, vars, ViewStyles } from '../../styles';
import {
    caculateAppMaxHeight,
    caculateAppMinHeight,
    screenHeight
} from "../../styles/responsiveFunction";
import DatePicker from 'react-native-datepicker'

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = (value) => {
        this.props.onChange(value);
    }

    render() {
        let {
            placeholder,
            password,
            datePicker,
            label,
            error,
            value,
            loading,
            style,
            format,
            onChange,
            ...rest
        } = this.props;
        return (
            <View style={[styles.container, style]}>
                {label !== "" && <Text style={styles.label}>
                    {label}
                </Text>}
                {
                    datePicker
                        ?
                        <DatePicker
                            style={{
                                borderWidth: 1,
                                borderColor: vars.borderColor,
                                marginTop: vars.padding / 2,
                                marginBottom: vars.padding / 2,
                                width: "100%",
                                borderRadius: vars.borderRadius,
                                height: screenHeight * 0.08,
                                minHeight: caculateAppMinHeight(),
                                maxHeight: caculateAppMaxHeight(),
                                paddingLeft: vars.padding,
                                paddingRight: vars.padding,
                                display: 'flex',
                                backgroundColor: vars.white
                            }}
                            date={value}
                            mode="date"
                            androidMode="spinner"
                            placeholder="Chọn ngày sinh"
                            disabled={loading}
                            format={format}
                            minDate="01-01-1800"
                            confirmBtnText="Chọn"
                            cancelBtnText="Hủy"
                            showIcon={false}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0,
                                    alignItems: 'flex-start',
                                },
                                dateTouchBody: {
                                    height: '100%',
                                },
                                dateText: {
                                    fontSize: vars.fontSizeStandard
                                },
                                btnTextConfirm: {
                                    color: vars.orange
                                },
                                btnTextCancel: {
                                    color: vars.textMain
                                },
                                btnTextText: {
                                    color: vars.orange
                                }
                            }}
                            onDateChange={this.onChange}
                        />
                        : <DismissKeyboard>
                            <TextInput
                                editable={!loading}
                                placeholder={placeholder}
                                onChangeText={this.onChange}
                                secureTextEntry={password}
                                value={value}
                                style={[ViewStyles.flexDirectionRow, InputStyles.inputStyle]}
                                {...rest}
                            />
                        </DismissKeyboard>}
                {
                    error !== "" && <Caption style={styles.error}>
                        {error}
                    </Caption>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: vars.padding / 3,
    },
    label: {
        paddingLeft: vars.padding
    },
    error: {
        paddingLeft: vars.padding,
        color: vars.red
    }
})

Input.propTypes = {
    placeholder: PropTypes.string,
    password: PropTypes.bool,
    label: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    format: PropTypes.string,
    style: PropTypes.oneOf(PropTypes.object, PropTypes.array)
}

Input.defaultProps = {
    placeholder: "",
    password: false,
    label: "",
    error: "",
    value: "",
    style: null,
    format: "YYYY-MM-DD",
    onChange: () => { }
}

export default Input;