import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Loading, Input, Picker, Button } from '../../../common';
import { ViewStyles, vars, screenWidth } from '../../../styles';
import TreeSelect from './TreeSelect';
import Divider from 'react-native-divider';
import { STATUS } from '../../../constants';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
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
import {
  setCheckedMajors as setCheckedMajorsFilter,
  setUniversitySearch as setUniversitySearchFilter,
  setPointFrom as setPointFromFilter,
  setPointTo as setPointToFilter,
  setCity as setCityFilter,
  resetFilter
} from '../../../actions/uniTest';
import {
  setCheckedMajors as setCheckedMajorsProfile,
  setUniversitySearch as setUniversitySearchProfile,
  setPointFrom as setPointFromProfile,
  setPointTo as setPointToProfile,
  setCity as setCityProfile,
  resetFilter as resetFilterProfile
} from '../../../actions/profile';

class SearchDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: []
    }
    this.treeSelectRef = null;
    this.interval = null;
  }

  onChangeData = (key, value) => {
    this.props[key](value, "")
  }

  reset = (uniRecommend, profilePage) => {
    uniRecommend
      ? (
        this.props.resetFilter(),
        this.props.setCityFilter()
      )
      : (
        profilePage
          ? (
            this.props.resetFilterProfile(),
            this.props.setCityProfile()
          )
          : this.props.reset()
      )
    this.treeSelectRef.reset();
  }

  isDefault = (profilePage, uniRecommend, universitySearch, pointFrom, pointTo, city) => {
    let { checkedMajors } = this.props[uniRecommend ? "uniTest" : (profilePage ? "profile" : "uniSearch")];
    return (!universitySearch.data && !pointFrom.data && !pointTo.data && checkedMajors.length === 0 && city.data.id === 0)
  }

  render() {
    let { uniRecommend, profilePage } = this.props;
    let {
      getMajorsStatus,
      getCitiesStatus
    } = this.props.uniSearch;
    let {
      city,
      cities,
      universitySearch,
      pointFrom,
      pointTo,
      majors
    } = this.props[uniRecommend ? "uniTest" : (profilePage ? "profile" : "uniSearch")];

    let isDefault = this.isDefault(
      profilePage,
      uniRecommend,
      universitySearch,
      pointFrom,
      pointTo,
      city
    );
    let getMajorsLoading = uniRecommend ? false : getMajorsStatus === STATUS.loading;
    let getCitiesLoading = uniRecommend ? false : getCitiesStatus === STATUS.loading;
    let loading = <Loading dot dotSize={vars.fontSizeStandard / 3} />;
    let dividerTextColor = vars.textMain;
    let dividerColor = vars.borderColor;
    return (
      <View
        style={[ViewStyles.container, styles.container]}
        treeRef={() => this.props.treeSelectRef(this.treeSelectRef)}
      >
        <View style={[ViewStyles.flexDirectionRow, styles.firstBlock]}>
          <TouchableOpacity
            disabled={isDefault}
            style={styles.redo}
            hitSlop={{
              top: 20,
              left: 20,
              bottom: 20,
              right: 20
            }}
            onPress={() => this.reset(uniRecommend, profilePage)}
          >
            <Icon name="redo" size={vars.fontSizeLarge} color={isDefault ? vars.textSecondary : vars.orange} />
          </TouchableOpacity>
          <Button
            style={styles.btn}
            buttonStyle={styles.btn}
            title="Tìm kiếm"
            onPress={this.props.search}
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
            onChange={(value) => this.onChangeData(
              uniRecommend
                ? "setUniversitySearchFilter"
                : (profilePage
                  ? "setUniversitySearchProfile"
                  : "setUniversitySearch"
                ), value)}
            value={universitySearch.data}
          />
        </View>
        {/* <View style={[styles.block]}>
          <Divider
            borderColor={dividerColor}
            color={dividerTextColor}
            orientation="left"
          >
            Khoảng điểm
            </Divider>

        </View> */}
        <View style={[styles.block]}>
          <Divider
            borderColor={dividerColor}
            color={dividerTextColor}
            orientation="left"
          >
            Khối ngành/Ngành
          </Divider>
          <View style={[ViewStyles.flexDirectionRow, styles.inputGroup]}>
            <Input
              placeholder="Từ..."
              keyboardType="numeric"
              style={[styles.input]}
              onChange={(value) => this.onChangeData(
                uniRecommend
                  ? "setPointFromFilter"
                  : (profilePage
                    ? "setPointFromProfile"
                    : "setPointFrom"
                  ), value)}
              value={pointFrom.data}
              error={pointFrom.error}
            />
            <Input
              placeholder="Đến..."
              keyboardType="numeric"
              style={[styles.input]}
              onChange={(value) => this.onChangeData(
                uniRecommend
                  ? "setPointToFilter"
                  : (profilePage
                    ? "setPointToProfile"
                    : "setPointTo"
                  ), value)}
              value={pointTo.data}
              error={pointTo.error}
            />
          </View>
          {getMajorsLoading ? loading : majors.length !== 0 && <TreeSelect
            style={styles.tree}
            treeRef={node => this.treeSelectRef = node}
            onSelect={(value) => this.onChangeData(
              uniRecommend
                ? 'setCheckedMajorsFilter'
                : (profilePage
                  ? "setCheckedMajorsProfile"
                  : 'setCheckedMajors'
                ), value)}
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
            onChangeText={(value) => this.onChangeData(
              uniRecommend
                ? "setCityFilter"
                : (profilePage
                  ? "setCityProfile"
                  : "setCity"
                ), value)}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: vars.margin,
    paddingHorizontal: vars.padding
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
    maxWidth: 125,
    marginBottom: 0
  },
  picker: {
    top: -vars.padding
  },
  redo: {
    backgroundColor: vars.white,
    borderRadius: vars.borderRadius,
    borderWidth: 1,
    borderColor: vars.borderColor,
    padding: vars.padding / 2
  },
  btn: {
    maxWidth: screenWidth * .4
  }
})

SearchDrawer.defaultProps = {
  uniRecommend: false,
  profilePage: false
}

const mapStateToProps = state => {
  return {
    uniSearch: state.uniSearch,
    uniTest: state.uniTest,
    profile: state.profile
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
    },
    setCheckedMajorsFilter: (majors) => {
      dispatch(setCheckedMajorsFilter(majors))
    },
    setUniversitySearchFilter: (data, error) => {
      dispatch(setUniversitySearchFilter(data, error))
    },
    setPointFromFilter: (data, error) => {
      dispatch(setPointFromFilter(data, error))
    },
    setPointToFilter: (data, error) => {
      dispatch(setPointToFilter(data, error))
    },
    setCityFilter: (data, error) => {
      dispatch(setCityFilter(data, error))
    },
    resetFilter: () => {
      dispatch(resetFilter())
    },
    setCheckedMajorsProfile: (majors) => {
      dispatch(setCheckedMajorsProfile(majors))
    },
    setUniversitySearchProfile: (data, error) => {
      dispatch(setUniversitySearchProfile(data, error))
    },
    setPointFromProfile: (data, error) => {
      dispatch(setPointFromProfile(data, error))
    },
    setPointToProfile: (data, error) => {
      dispatch(setPointToProfile(data, error))
    },
    setCityProfile: (data, error) => {
      dispatch(setCityProfile(data, error))
    },
    resetFilterProfile: () => {
      dispatch(resetFilterProfile())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDrawer);