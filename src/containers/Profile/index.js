import React, { Component } from 'react';
import { View } from 'react-native';
import { ROUTES } from '../../constants';
import { Button, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppContainer } from '../../common';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    

    render() {
        return (
            <AppContainer>
                <Text>
                    Profile Page
                </Text>
                <Button
                    title="UniSearch"
                    onPress={() => this.props.navigation.push(ROUTES.UNI_SEARCH, { prev: ROUTES.Profile })}
                />
            </AppContainer>
        );
    }
}

export default Profile;