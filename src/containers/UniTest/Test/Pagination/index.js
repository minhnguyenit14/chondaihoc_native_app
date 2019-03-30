import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ViewStyles, vars } from '../../../../styles';
import Page from './Page';
import { connect } from 'react-redux';
import { setPageIndex } from '../../../../actions/uniTest';
class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onPageChange = (pIndex) => {
        let {pageIndex} = this.props.uniTest;
        this.props.setPageIndex(pIndex);
        this.props.onPageChange(pageIndex, pIndex);
    }

    genPagination = () => {
        let { questions, pagesAnswered, pageIndex } = this.props.uniTest;
        return questions.map((d, i) => {
            let isAnswered = pagesAnswered.filter(p => p === d.pageIndex).length;
            let active = pageIndex === d.pageIndex;
            return <Page
                key={i}
                onPress={this.onPageChange}
                pageNumber={d.pageIndex}
                isAnswered={isAnswered}
                active={active}
            />
        })
    }

    render() {
        let data = this.genPagination();
        return (
            <View style={[ViewStyles.flexDirectionRow, styles.row]}>
                {data}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        width: '100%',
        flex: .8,
        justifyContent: 'space-between',
        paddingHorizontal: vars.padding,
    },
})

const mapStateToProps = state => (
    {
        uniTest: state.uniTest
    }
)

const mapDispatchToProps = dispatch => {
    return {
        setPageIndex: (pageIndex) => {
            dispatch(setPageIndex(pageIndex))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pagination);