import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { StyleSheet } from 'react-native';
import { vars, ViewStyles } from '../../styles';

type PickerProps = {
    label?: String,
    error?: String,
    data?: Array,
    value?: String,
    onChangeText?: Function,
    pickerRef?: Function,
    style?: Object | Array,
    loading?: Boolean,
    dropdownPosition?: Number
}

class Picker extends Component<PickerProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let {
            label,
            error,
            data,
            value,
            style,
            loading,
            dropdownPosition
        } = this.props;
        return (
            <Dropdown
                disabled={loading}
                ref={inst => this.props.pickerRef(inst)}
                label={label}
                error={error}
                fontSize={vars.fontSizeStandard}
                textColor={vars.textMain}
                itemColor={vars.textMain}
                itemTextStyle={{ color: vars.textMain, borderColor: 'transparent' }}
                selectedItemColor={vars.orange}
                dropdownPosition={dropdownPosition}
                data={data}
                itemCount={8}
                itemPadding={vars.padding}
                value={value}
                onChangeText={this.props.onChangeText}
                containerStyle={[styles.container, style]}
                pickerStyle={styles.picker}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: vars.borderColor,
    },
    picker: {
        backgroundColor: vars.bg
    }
})

Picker.defaultProps = {
    label: "",
    error: "",
    data: [],
    value: "",
    style: null,
    loading: false,
    dropdownPosition: null,
    onChangeText: () => { },
    pickerRef: () => { },
}

export default Picker;