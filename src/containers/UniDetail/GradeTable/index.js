import React, { Component } from 'react';
import Major from './Major';
import { View, StyleSheet } from 'react-native';
import { Caption } from '../../../common';
import { vars, ViewStyles, TextStyles } from '../../../styles';
import Divider from 'react-native-divider';

class GradeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getTableContent = () => {
        let { data } = this.props;
        return data.map(d =>
            <Major
                key={d.MajorID}
                data={d}
            />
        )
    }

    renderIntro = () => {
        return <View style={styles.introWrapper}>
            <View>
                <Caption style={styles.intro}>
                    [Tên khối ngành]
                </Caption>
            </View>
            <View style={[ViewStyles.flexDirectionRow, {justifyContent: 'space-between'}]}>
                <Caption style={[styles.intro]}>
                    [Tên ngành]
                </Caption>
                <Caption style={[styles.intro]}>
                    [Tổ hợp môn]
                </Caption>
                <Caption style={[styles.intro]}>
                    [Điểm chuẩn]
                </Caption>
            </View>
        </View>
    }

    render() {
        let content = this.getTableContent();
        let intro = this.renderIntro();
        return (
            <View style={styles.container}>
                <Divider
                    borderColor={vars.borderColor}
                    color={vars.textMain}
                    orientation="center"
                >
                    Bảng điểm chuẩn
                </Divider>
                {intro}
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: vars.margin
    },
    title: {
        paddingVertical: vars.margin,
    },
    introWrapper: {
        flex: 1, 
        paddingHorizontal: vars.padding,
        paddingBottom: vars.padding
    },
    intro: {
        fontStyle: 'italic'
    }
})

export default GradeTable;