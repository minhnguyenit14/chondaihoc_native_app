import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ViewStyles, vars, screenWidth } from '../../../../../styles';
import { Text } from '../../../../../common';
import * as Animatable from 'react-native-animatable';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActived: false
        };
        this.page = null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAnswered && !this.state.isActived && this.page) {
            this.page.bounce(500);
            this.setState({
                isActived: true
            })
        }
        if (!nextProps.isAnswered && this.state.isActived) {
            this.setState({
                isActived: false
            })
        }
    }


    render() {
        let { pageNumber, active, isAnswered } = this.props;
        return (
            <Animatable.View
                ref={inst => this.page = inst}
                useNativeDriver
                style={{ flexGrow: 1 }}
            >
                <TouchableOpacity
                    style={[
                        styles.pageNumber,
                        isAnswered && styles.answered,
                        active && styles.active
                    ]}
                    onPress={() => this.props.onPress(pageNumber)}
                >

                    <Text style={styles.text}>
                        {pageNumber}
                    </Text>

                </TouchableOpacity>
            </Animatable.View>

        );
    }
}

const styles = StyleSheet.create({
    pageNumber: {
        flex: 1,
        backgroundColor: vars.borderColorDarker,
        borderWidth: 3,
        borderRadius: vars.borderRadius / 4,
        marginHorizontal: vars.margin / 5,
        borderColor: vars.white
    },
    active: {
        borderColor: vars.logo
    },
    answered: {
        backgroundColor: vars.orange
    },
    text: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: vars.textBase
    }
})

export default Page;