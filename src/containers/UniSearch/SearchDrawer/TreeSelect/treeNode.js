import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Platform,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import { Text } from '../../../../common';
import { vars, screenWidth } from '../../../../styles';
const TochableFeedback = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
const checkIconNames = ['square-o', 'minus-square', 'check-square'];

export default class TreeNode extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.check !== this.props.check
      || nextProps.expanded !== this.props.expanded;
  }

  render() {
    const {
      check, expanded, onExpand, onSelect, multiple, onlyCheckLeaf, predecessorsCount,
      nodeData, nodeData: { key, label, children },
    } = this.props;
    const Touchable = hasChildren ? TouchableWithoutFeedback : TochableFeedback;
    const hasChildren = !!children;
    const checkable = multiple || !onlyCheckLeaf || onlyCheckLeaf && !hasChildren;

    return (
      <View style={[
        styles.container,
        { paddingLeft: predecessorsCount * vars.padding/2 }
      ]}>
        <Touchable
          onPress={() => {
            checkable && onSelect(nodeData, check);
          }}
          style={styles.Touchable}>
          <View style={styles.icons}>
            {checkable && <Icon
              name={checkIconNames[check || 0]}
              size={vars.fontSizeStandard}
              style={[styles.checkIcon]} />}
            <Text style={[styles.label, check === 2 && styles.active]}>{label}</Text>
          </View>
        </Touchable>
        {hasChildren &&
          <TouchableOpacity
            hitSlop={{
              top: 20,
              bottom: 20,
              right: 20,
              left: 20
            }}
            onPress={() => hasChildren && onExpand(key, expanded)}
          >
            <Icon
              name={expanded ? 'angle-up' : 'angle-down'}
              type="font-awesome"
              size={vars.fontSizeLarge} />
          </TouchableOpacity>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: vars.borderColor,
    borderBottomWidth: 1,
  },
  icons: {
    paddingLeft: 8,
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    width: 20,
    marginLeft: 6,
    marginRight: 6,
  },
  Touchable: {
    flex: 1,
    flexWrap: 'wrap'
  },
  label: {
    paddingLeft: 0,
    maxWidth: 240,
    paddingRight: vars.padding,
    paddingVertical: 5,
    color: vars.textBase
  },
  chevronIcon: {
    padding: 10,
  },
  active: {
    backgroundColor: vars.orange,
    borderRadius: vars.borderRadius,
    color: vars.white,
    paddingHorizontal: vars.padding,
  }
});