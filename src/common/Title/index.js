import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { vars, TextStyles } from '../../styles';

type TitleProps = {
    children: React.Node,
    style: String | Array,
    disabled: Boolean
}

class Title extends Component<TitleProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let {
            children,
            style,
            disabled,
            ...rest
        } = this.props;
        return (
            <Text
                style={[
                    TextStyles.appFont,
                    styles.title,
                    disabled && styles.disabled,
                    style
                ]}
                {...rest}
            >
                {children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: vars.fontSizeLarge,
        color: vars.textMain,
    },
    disabled: {
        color: vars.textSecondary
    }
})

Title.propTypes = {
    children: PropTypes.any,
    style: PropTypes.oneOf(PropTypes.array, PropTypes.object),
    disabled: PropTypes.bool
}

export default Title;