import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { vars, TextStyles } from '../../styles';

type CaptionProps = {
    children: React.Node,
    style: Object | Array,
    disabled: Boolean
}

class Caption extends Component<CaptionProps> {
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
                    styles.caption,
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
    caption: {
        fontSize: vars.fontSizeSmall,
        color: vars.textBase
    },
    disabled: {
        color: vars.textSecondary
    }
})

Caption.propTypes = {
    children: PropTypes.any,
    style: PropTypes.oneOf(PropTypes.array, PropTypes.object),
    disabled: PropTypes.bool
}

export default Caption;