import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ViewStyles, vars, screenHeight, caculateAppMaxHeight } from '../../../styles';
import { Image, Text, Caption } from '../../../common';
import { Icon } from 'react-native-elements';

class UniRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let { data } = this.props;
        
        let point = data.UniversityPointFrom
            ? (data.UniversityPointFrom === data.UniversityPointTo
                ? data.UniversityPointFrom
                : (`${data.UniversityPointFrom} ~ ${data.UniversityPointTo}`)
            )
            : "-";
        return (
            <TouchableOpacity
                style={[ViewStyles.flexDirectionRow, styles.container]}
            >
                <View style={{ flex: .3, marginRight: vars.margin }}>
                    <Image
                        style={ViewStyles.container}
                        source={require('../../../assets/uni_logo/fpt.png')}
                        lightbox
                    />
                </View>
                <View style={[{ flex: .7, justifyContent: 'space-between' }]}>
                    <View>
                        <Text numberOfLines={2} style={styles.title}>
                            {data.UniversityName}
                        </Text>
                        <Caption numberOfLines={3}>
                            {data.UniversityShortDescription}
                        </Caption>
                    </View>

                    <View style={ViewStyles.flexDirectionRow}>
                        <View style={[
                            ViewStyles.flexDirectionRow,
                            ViewStyles.flexCenterVertical,
                            styles.tag
                        ]}
                        >
                            <Icon
                                type="font-awesome"
                                name="flag"
                                size={vars.fontSizeStandard}
                                color={vars.red}
                            />
                            <Caption style={styles.txtTag}>
                                {point}
                            </Caption>
                        </View>

                        <View style={[
                            ViewStyles.flexDirectionRow,
                            ViewStyles.flexCenterVertical,
                            styles.tag
                        ]}
                        >
                            <Icon
                                type="font-awesome"
                                name="map-marker"
                                size={vars.fontSizeStandard}
                                color={vars.red}
                            />
                            <Caption style={styles.txtTag}>
                                {data.CityName}
                            </Caption>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: vars.borderColor,
        padding: vars.padding,
        backgroundColor: vars.white,
        borderRadius: 4,
        minHeight: screenHeight * .2,
        maxHeight: caculateAppMaxHeight() * 3.5,
        marginBottom: vars.margin,
        shadowColor: vars.shadowColor,
        shadowOffset: vars.shadowOffset,
        shadowOpacity: vars.shadowOpacity,
        shadowRadius: vars.shadowRadius,
        elevation: vars.elevation
    },
    title: {
        color: vars.orange,
        fontWeight: vars.fontLightBold
    },
    tag: {
        marginRight: vars.margin
    },
    txtTag: {
        marginLeft: vars.margin / 2
    }
})

export default UniRow;