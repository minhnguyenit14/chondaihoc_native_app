import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Caption } from '../../../common';
import { ViewStyles, vars } from '../../../styles';

class CommonInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let { style, data, title, icon } = this.props;
        return (
            <View style={[ViewStyles.flexDirectionRow, style]}>
                <View style={[
                    ViewStyles.flexDirectionRow,
                    { flex: 1 }
                ]}>
                    <View style={{ paddingTop: 3 }}>
                        {icon}
                    </View>
                    <View>
                        <Text style={[{
                            fontWeight: vars.fontMedium,
                            marginLeft: vars.margin / 2
                        }]}>
                            {`${title}: `}
                            <Caption style={[{
                                fontWeight: vars.fontNormal,
                                color: vars.textBase
                            }]}>
                                {data}
                            </Caption>
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default CommonInfo;