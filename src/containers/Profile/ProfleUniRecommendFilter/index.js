import React, { Component } from 'react';
import { Heading, Text } from '../../../common';
import { View, TouchableOpacity } from 'react-native';
import { ViewStyles, vars, screenWidth } from '../../../styles';
import { ROUTES } from '../../../constants';
import UniSearch from '../../UniSearch';
import { Icon } from 'react-native-elements';

class ProfleUniRecommendFilter extends Component {
    static navigationOptions = ({ navigation }) => {
        let total = navigation.getParam('total', "0");
        let loading = navigation.getParam('loading');
        return {
            headerTitle: (
                <React.Fragment>
                    <Heading style={[
                        ViewStyles.flexCenterVertical,
                        { maxWidth: '65%' }
                    ]}>
                        {ROUTES.PROFILE_UNI_RECOMMEND_FILTER.header}
                    </Heading>
                    <View style={[
                        ViewStyles.flexCenterVertical,
                        {
                            paddingHorizontal: vars.padding / 2,
                            borderRadius: 4,
                            backgroundColor: vars.red
                        }
                    ]}>
                        <Text numberOfLines={1} style={{ color: vars.white }}>
                            {total} Kết quả
                        </Text>
                    </View>
                </React.Fragment>
            ),
            headerRight: (
                <TouchableOpacity
                    disabled={loading}
                    style={{ paddingHorizontal: vars.padding }}
                    hitSlop={{
                        top: 20,
                        left: 20,
                        bottom: 20,
                        right: 20
                    }}
                    onPress={navigation.getParam('toogleDrawer')}
                >
                    <Icon name="search" type="font-awesome" color={loading ? vars.textSecondary : vars.orange} />
                </TouchableOpacity>
            )
        }
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <UniSearch
                profilePage
                navigation={this.props.navigation}
            />
        );
    }
}

export default ProfleUniRecommendFilter;