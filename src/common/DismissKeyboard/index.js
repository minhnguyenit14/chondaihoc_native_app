import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ViewStyles } from '../../styles';

class DismissKeyboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let { children, style } = this.props;
        return (
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                style={[ViewStyles.container, style]}
            >
                {children}
            </TouchableWithoutFeedback>
        );
    }
}

export default DismissKeyboard;