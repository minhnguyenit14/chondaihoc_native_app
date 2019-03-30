import React from 'react';
import { getStorage, removeStorage } from '../../../helper/axiosHelper';
import { transitionConfig } from '../../../navigation/navigator/transitions';
import { Loading } from '../../../common';
import {
    View
} from 'react-native';
import { ViewStyles } from '../../../styles';

class CheckAuthScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    static transitionConfig = () => { transitionConfig }

    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        removeStorage();
        getStorage().then(
            storage => {
                const userToken = storage.userToken;
                this.props.navigation.navigate(userToken ? 'App' : 'Auth');
            }
        )
    };

    render() {
        return (
            <View style={[
                ViewStyles.container,
                ViewStyles.flexCenter
            ]}>
                <Loading size="large"/>
            </View>
        );
    }
}
export default CheckAuthScreen;