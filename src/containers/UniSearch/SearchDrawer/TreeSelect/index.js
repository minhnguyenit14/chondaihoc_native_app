import React from 'react';
import PropTypes from 'prop-types';
import {
  InteractionManager,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';
import Tree from './tree';
import { connect } from 'react-redux';
import { setCheckedMajors } from '../../../../actions/uniSearch';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const IS_IOS = Platform.OS === 'ios';

class TreeSelect extends React.Component {
  static defaultProps = {
    ...Tree.defaultProps,
    style: {}
  }

  static propTypes = {
    ...Tree.propTypes,
    isVisible: PropTypes.bool,
    style: PropTypes.oneOf(PropTypes.object, PropTypes.array)
  }

  onGetValue = (value) => {
    let api = [];
    value.map(v => api.push(v.key));
    this.props.onSelect(api);
  }

  render() {
    const { style, onSelect, ...rest } = this.props;

    return (
      <View style={[styles.modalContent, style]}>
        <Tree
          {...rest}
          onSelect={this.onGetValue}
          ref={node => { this.treeRef = node; this.props.treeRef(node) }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    marginTop: SCREEN_HEIGHT * 0.14,
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  modalContent: {
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    uniSearch: state.uniSearch
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCheckedMajors: (checkedMajors) => {
      dispatch(setCheckedMajors(checkedMajors))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeSelect)