import React, { Component } from 'react';
import {
    Platform,
    DatePickerAndroid,
    DatePickerIOS,
    TouchableWithoutFeedback,
    View,
    Text
} from 'react-native';
import { Input } from '../../common';


class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    showPicker = async () => {
        let { date } = this.state;
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date,
                mode: 'spinner',
                minDate: new Date('1800-01-01')
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }
    render() {
        return (
            Platform === 'ios'
                ? <DatePickerIOS />
                : <TouchableWithoutFeedback
                    onPress={this.showPicker}
                >
                    <Text>ABC</Text>
                </TouchableWithoutFeedback>
        );
    }
}

export default DatePicker;