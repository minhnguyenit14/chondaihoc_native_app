import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Loading, Input, Picker, Button } from '../../../common';
import { ViewStyles, vars } from '../../../styles';
import TreeSelect from './TreeSelect';
import Divider from 'react-native-divider';
import { STATUS } from '../../../constants';
import { connect } from 'react-redux';
import {
  setMajors,
  searchUniversity,
  setCheckedMajors,
  setUniversities,
  setUniversitySearch,
  setPointFrom,
  setPointTo,
  setCity,
  reset
} from '../../../actions/uniSearch';

class SearchDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    }
    this.treeSelectRef = null;
  }

  onChangeData = (key, value) => {
    this.props[key](value, "")
  }

  reset = () => {
    this.props.reset();
    this.treeSelectRef.reset();
  }

  isDefault = () => {
    let {
      universitySearch,
      pointFrom,
      pointTo,
      city,
      checkedMajors
    } = this.props.uniSearch;
    return (!universitySearch.data && !pointFrom.data && !pointTo.data && checkedMajors.length == 0 && (city.data.id == 0))
  }

  render() {
    let {
      universitySearch,
      pointFrom,
      pointTo,
      city,
      cities,
      majors,
      getMajorsStatus,
      getCitiesStatus
    } = this.props.uniSearch;
    let isDefault = this.isDefault();
    let getMajorsLoading = getMajorsStatus === STATUS.loading;
    let getCitiesLoading = getCitiesStatus === STATUS.loading;
    let loading = <Loading />;
    let dividerTextColor = vars.textMain;
    let dividerColor = vars.borderColor;
    return (
      <View style={[ViewStyles.container, styles.container]}>
        <View style={[styles.firstBlock]}>
          <Button
            title="Đặt lại mặc định"
            onPress={this.reset}
            disabled={isDefault}
          />
        </View>
        <View style={[styles.block]}>
          <Divider
            borderColor={dividerColor}
            color={dividerTextColor}
            orientation="left"
          >
            Tên trường
          </Divider>
          <Input
            placeholder="Tên trường đại học, cao đẳng,..."
            onChange={(value) => this.onChangeData("setUniversitySearch", value)}
            value={universitySearch.data}
          />
        </View>
        <View style={[styles.block]}>
          <Divider
            borderColor={dividerColor}
            color={dividerTextColor}
            orientation="left"
          >
            Khoảng điểm
            </Divider>
          <View style={[ViewStyles.flexDirectionRow, styles.inputGroup]}>
            <Input
              placeholder="Từ..."
              keyboardType="numeric"
              style={[styles.input]}
              onChange={(value) => this.onChangeData("setPointFrom", value)}
              value={pointFrom.data}
              error={pointFrom.error}
            />
            <Input
              placeholder="Đến..."
              keyboardType="numeric"
              style={[styles.input]}
              onChange={(value) => this.onChangeData("setPointTo", value)}
              value={pointTo.data}
              error={pointTo.error}
            />
          </View>
        </View>
        <View style={[styles.block]}>
          <Divider
            borderColor={dividerColor}
            color={dividerTextColor}
            orientation="left"
          >
            Khối ngành/Ngành
          </Divider>
          {getMajorsLoading ? loading : majors.length !== 0 && <TreeSelect
            style={styles.tree}
            treeRef={node => this.treeSelectRef = node}
            onSelect={(value) => this.onChangeData('setCheckedMajors', value)}
            onlyCheckLeaf={false}
            multiple={true}
            treeData={majors} />}
        </View>
        <View style={[styles.lastBlock]}>
          <Divider
            borderColor={dividerColor}
            color={dividerTextColor}
            orientation="left"
          >
            Thành phố
          </Divider>
          <Picker
            loading={getCitiesLoading}
            dropdownPosition={2}
            style={styles.picker}
            pickerRef={inst => this.picker = inst}
            data={cities}
            value={city.data.value}
            onChangeText={(value) => this.onChangeData("setCity", value)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: vars.padding
  },
  firstBlock: {
    marginTop: vars.margin,
    marginBottom: vars.margin
  },
  block: {
    marginBottom: vars.margin
  },
  lastBlock: {
    marginTop: vars.margin,
  },
  tree: {
    marginTop: vars.margin / 2
  },
  inputGroup: {
    justifyContent: 'space-between'
  },
  input: {
    maxWidth: 125
  },
  picker: {
    top: -vars.padding
  }
})

const mapStateToProps = state => {
  return {
    uniSearch: state.uniSearch
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMajors: (majors) => {
      dispatch(setMajors(majors))
    },
    searchUniversity: (checkedMajors, universitySearch, pointFrom, pointTo, cityID, callBackSuccess, pageNumber, pageSize) => {
      dispatch(searchUniversity(checkedMajors, universitySearch, pointFrom, pointTo, cityID, callBackSuccess, pageNumber, pageSize))
    },
    setCheckedMajors: (majors) => {
      dispatch(setCheckedMajors(majors))
    },
    setUniversities: (universities) => {
      dispatch(setUniversities(universities))
    },
    setUniversitySearch: (data, error) => {
      dispatch(setUniversitySearch(data, error))
    },
    setPointFrom: (data, error) => {
      dispatch(setPointFrom(data, error))
    },
    setPointTo: (data, error) => {
      dispatch(setPointTo(data, error))
    },
    setCity: (data, error) => {
      dispatch(setCity(data, error))
    },
    reset: () => {
      dispatch(reset())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDrawer);