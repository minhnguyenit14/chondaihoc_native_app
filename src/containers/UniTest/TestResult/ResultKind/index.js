import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { vars, screenHeight, ViewStyles } from '../../../../styles';
import { Title, Text, Caption } from '../../../../common';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import * as Animatable from 'react-native-animatable';

class ResultKind extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        };
    }

    onPress = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        let { toggle } = this.state;
        let { data, type } = this.props;
        let contentSource = require('../../../../assets/test_result_background/bg_content.png');
        let source = require('../../../../assets/test_result_background/first.png');
        let icon = <Icon
            size={30}
            name="crown"
            color="yellow"
        />
        let rank = 1;
        switch (type) {
            case 'second':
                rank = 2;
                source = require('../../../../assets/test_result_background/second.png');
                break;
            case 'third':
                rank = 3;
                source = require('../../../../assets/test_result_background/third.png');
                break
        }
        return (
            <Animatable.View
                animation='fadeIn'
                easing="ease-in-cubic"
                direction="alternate"
            >
                <TouchableOpacity
                    onPress={this.onPress}
                    style={styles.container}
                >
                    <ImageBackground
                        style={[styles.bg]}
                        source={source}
                    >
                        <View style={styles.icon}>
                            {icon}
                            <View style={styles.rank}>
                                <Caption style={styles.rankText}>
                                    {rank}
                                </Caption>
                            </View>
                        </View>

                        <View style={[ViewStyles.flexCenterHorrizontal, styles.kind]}>
                            <Title style={styles.kindName}>
                                {data.CharacterKindName}
                            </Title>
                        </View>
                        <ImageBackground
                            source={contentSource}
                            style={[
                                styles.contentContainer,
                                toggle
                                    ? styles.collapsable
                                    : { marginTop: vars.padding },
                            ]}
                        >
                            <View style={[

                                styles.content
                            ]}>
                                <Text style={styles.textContent}>
                                    {data.CharacterKindDescription}
                                </Text>
                            </View>
                        </ImageBackground>

                    </ImageBackground>

                </TouchableOpacity>
            </Animatable.View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: vars.borderRadius / 4,
        marginBottom: vars.margin,
        overflow: 'hidden',
    },
    icon: {
        position: 'absolute',
        top: vars.margin,
        left: vars.margin * 2
    },
    rank: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: -4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rankText: {
        fontSize: vars.fontSizeSmall / 1.2,
        color: vars.textBase,
        fontWeight: vars.fontLightBold
    },
    bg: {
        borderRadius: vars.borderRadius / 4,
        width: '100%',
        paddingVertical: vars.padding
    },
    collapsable: {
        overflow: 'hidden',
        height: 0
    },
    kind: {
        paddingHorizontal: vars.padding,
        borderRadius: vars.borderRadius / 4,
    },
    kindName: {
        width: '60%',
        textAlign: 'center',
        paddingVertical: vars.padding / 3,
        paddingHorizontal: vars.padding,
        backgroundColor: vars.white,
        borderRadius: vars.borderRadius,
        color: vars.orange,
        fontWeight: vars.fontMedium,
        shadowOffset: vars.shadowOffset,
        shadowOpacity: vars.shadowOpacity,
        elevation: vars.elevation
    },
    contentContainer: {
        marginHorizontal: vars.padding,
        borderRadius: vars.borderRadius / 4,
        overflow: 'hidden'
    },
    content: {
        padding: vars.padding,
    },
    textContent: {
        color: vars.white
    }
})

export default ResultKind;