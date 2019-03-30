import React, { Component } from 'react';
import { Button, AppContainer, Input, Heading, Text } from '../../common';
import { View } from 'react-native';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <AppContainer>
                <Text>
                    Blog Page
                </Text>
            </AppContainer>
        );
    }
}

export default Blog;