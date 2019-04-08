import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text, Caption } from '../../../../common';
import { vars } from '../../../../styles';

const EMPTY_MESS = "Chúng tôi sẽ cập nhật mô tả chi tiết cho ngành này trong thời gian sớm nhất."

class MainMajor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapse: true
        };
    }
    render() {
        let { data } = this.props;
        let { isCollapse } = this.state;
        let majorDes = data.MajorDescription || EMPTY_MESS;
        return (
            <TouchableOpacity
                onPress={() => this.setState({ isCollapse: !isCollapse })}
                style={styles.container}
            >
                <Text style={styles.text}>
                    {data.MajorName}
                </Text>
                <View style={[styles.majorDes, isCollapse && styles.collapse]}>
                    <Caption style={styles.caption}>
                        {majorDes}
                    </Caption>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {

    },
    container: {
        backgroundColor: vars.borderColorDarker,
        borderRadius: vars.borderRadius / 4,
        padding: vars.padding,
        marginBottom: vars.margin,
        width: '100%',
        overflow: 'hidden'
    },
    text: {
        textAlign: 'left'
    },
    majorDes: {
        marginTop: vars.margin,
        padding: vars.padding,
        borderRadius: vars.borderRadius / 4,
        backgroundColor: vars.white,
        overflow: 'hidden'
    },
    collapse: {
        marginTop: 0,
        padding: 0,
        backgroundColor: 'black',
        overflow: 'hidden',
        height: 0
    },
    caption: {
        fontStyle: 'italic'
    }
})

export default MainMajor;