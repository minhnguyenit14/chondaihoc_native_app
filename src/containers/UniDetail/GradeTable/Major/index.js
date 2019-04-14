import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { Text } from '../../../../common';
import { vars, ViewStyles, TextStyles } from '../../../../styles';
import ChildMajor from './ChildMajor';
class Major extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapse: true
        };
    }

    getChildren = (data) => {
        let temp = [];
        data.map((d, i) => temp.push(
            <View
                key={i}
                style={[
                    ViewStyles.flexDirectionRow,
                    styles.childGroup
                ]}
            >
                <ChildMajor
                    style={[styles.caption, { flex: .4 }]}
                    data={d.MajorName}
                />
                <ChildMajor
                    style={[styles.caption, { flex: .35 }]}
                    data={d.UniversityMajorDescription}
                />
                <ChildMajor
                    style={[styles.caption, { flex: .15 }]}
                    data={d.UniversityMajorPoint}
                />
            </View >
        ))
        return temp;
    }

    render() {
        let {
            MajorName,
            children
        } = this.props.data;
        let child = this.getChildren(children);
        let { isCollapse } = this.state;
        return (
            <TouchableOpacity
                onPress={() => this.setState({ isCollapse: !isCollapse })}
                style={styles.container}
            >
                <Text style={[TextStyles.boldFont, styles.text]}>
                    <Icon name={isCollapse ? "angle-right" : "angle-down"} /> {MajorName}
                </Text>
                <View
                    style={[styles.childMajor, isCollapse && styles.collapse]}
                >
                    {child}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
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
    childMajor: {
        marginTop: vars.margin,
        padding: vars.padding / 2,
        borderRadius: vars.borderRadius / 4,
        overflow: 'hidden',
    },
    collapse: {
        marginTop: 0,
        padding: 0,
        overflow: 'hidden',
        height: 0
    },
    caption: {
        overflow: 'hidden'
    },
    childGroup: { 
        justifyContent: 'space-between', 
        flex: 1 ,
        marginBottom: vars.margin
    }
})

export default Major;