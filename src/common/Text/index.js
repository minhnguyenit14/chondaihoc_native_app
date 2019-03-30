import React, { Component } from 'react';
import { Text as Txt, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { vars, TextStyles } from '../../styles';

type TextProps = {
    children: React.Node,
    style: String | Array,
    disabled: Boolean
}

class Text extends Component<TextProps> {
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
            <Txt
                style={[
                    TextStyles.appFont,
                    styles.text,
                    disabled && styles.disabled,
                    style
                ]}
                selectionColor={vars.orange}
                {...rest}
            >
                {children}
            </Txt>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: vars.fontSizeStandard,
        color: vars.textMain,
    },
    disabled: {
        color: vars.textSecondary
    }
})

Text.propTypes = {
    children: PropTypes.any,
    style: PropTypes.oneOf(PropTypes.array, PropTypes.object),
    disabled: PropTypes.bool
}

export default Text;