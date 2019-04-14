import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { vars, TextStyles } from '../../styles';

type HeadingProps = {
    children: React.Node,
    style: String | Array,
    disabled?: Boolean,
    header?: Boolean
}

class Heading extends Component<HeadingProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let {
            children,
            style,
            disabled,
            header,
            ...rest
        } = this.props;
        return (
            <Text
                style={[
                    TextStyles.boldFont,
                    styles.heading,
                    disabled && styles.disabled,
                    header && styles.header,
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
    heading: {
        fontSize: vars.fontSizeHeading,
        color: vars.textMain,
        fontWeight: vars.fontLightBold,
        lineHeight: vars.fontSizeStandard*1.5
    },
    header: {
        marginLeft: vars.margin,
        paddingRight: vars.padding,
        marginTop: vars.margin / 2
    },
    disabled: {
        color: vars.textSecondary
    }
})

Heading.propTypes = {
    children: PropTypes.any,
    style: PropTypes.oneOf(PropTypes.array, PropTypes.string),
    disabled: PropTypes.bool,
    header: PropTypes.bool
}

export default Heading;