import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ViewStyles, vars, screenHeight, caculateAppMaxHeight, TextStyles } from '../../../styles';
import { Image, Text, Caption } from '../../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { UNIVERSITY_LOGO_PATH } from '../../../../appConfig';
import { ROUTES } from '../../../constants';

class UniRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    goToDetail = (data) => {
        this.props.navigation.push(ROUTES.UNI_DETAIL.route, { data });
    }

    render() {
        let { data, style } = this.props;
        let uri = UNIVERSITY_LOGO_PATH.replace('name', data.UniversityLogo);
        let point = data.UniversityPointFrom
            ? (data.UniversityPointFrom === data.UniversityPointTo
                ? data.UniversityPointFrom
                : (`${data.UniversityPointFrom} ~ ${data.UniversityPointTo}`)
            )
            : "-";
        return (
            <TouchableOpacity
                style={[ViewStyles.flexDirectionRow, styles.container, style]}
                onPress={() => this.goToDetail(data)}
            >
                <View style={{ flex: .3, marginRight: vars.margin }}>
                    <Image
                        style={ViewStyles.container}
                        uri={uri}
                        lightbox
                    />
                </View>
                <View style={[{ flex: .7, justifyContent: 'space-between' }]}>
                    <View>
                        <Text numberOfLines={2} style={[TextStyles.boldFont, styles.title]}>
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
                                name="flag"
                                size={vars.fontSizeStandard}
                                color={vars.logo}
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
                                name="map-marker-alt"
                                size={vars.fontSizeStandard}
                                color={vars.logo}
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
        marginHorizontal: vars.margin,
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
        fontWeight: vars.fontMedium,
        lineHeight: vars.fontSizeStandard * 1.2
    },
    tag: {
        marginRight: vars.margin
    },
    txtTag: {
        marginLeft: vars.margin / 2
    }
})

export default UniRow;