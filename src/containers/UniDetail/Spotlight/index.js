import React, { Component } from 'react';
import { View } from 'react-native';
import { ViewStyles, TextStyles } from '../../../styles';
import { Title, Caption } from '../../../common';

class Spotlight extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let { data, title, style, textStyle } = this.props;
        return (
            <View style={[ViewStyles.flexCenter, style]}>
                <React.Fragment>
                    <Title style={[TextStyles.boldFont, textStyle]}>
                        {data}
                    </Title>
                    <Caption style={[textStyle]}>
                        {title}
                    </Caption>
                </React.Fragment>
            </View>
        );
    }
}

export default Spotlight;