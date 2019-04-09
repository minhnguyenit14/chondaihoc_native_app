import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text, Caption } from '../../../../../common';
import { vars, ViewStyles } from '../../../../../styles';

class ChildMajor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {
            data,
            style
        } = this.props;
        return (
            <View style={[style]}
            >
                <Caption>
                    {data}
                </Caption>
            </View>
        );
    }
}

export default ChildMajor;