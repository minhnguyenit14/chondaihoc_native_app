import React, { Component } from 'react';
import RootNavigator from './navigator';
import { BackHandler } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        setTimeout(() => { SplashScreen.hide(); }, 500);
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        if (this.props.navigation && this.props.navigation.goBack) {
            this.props.navigation.goBack(null);
            return true;
        }
        return false;
    }

    render() {
        return <RootNavigator />
    }
}

export default Navigation;