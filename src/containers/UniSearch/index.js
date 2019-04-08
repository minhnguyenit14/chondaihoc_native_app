import React, { PureComponent } from 'react';
import { AppContainer, Text, Heading, Button } from '../../common';
import { View, TouchableOpacity, FlatList, RefreshControl, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import SearchDrawer from './SearchDrawer';
import { vars, ViewStyles } from '../../styles';
import UniRow from './UniRow';
import { connect } from 'react-redux';
import {
    getMajors,
    getCities,
    setCheckedMajors,
    setTotalUniversities,
    setUniversities,
    searchUniversity,
    setPointFrom,
    setPointTo,
    reset
} from '../../actions/uniSearch';
import {
    setCheckedMajorsDefault,
    setPointFrom as setPointFromFilter,
    setPointTo as setPointToFilter,
    setCities as setCitiesFilter,
    setCity,
    setUniRecommend,
    setTotalUniversities as setTotalUniversitiesFilter,
    resetFilter,
    setMajors
} from '../../actions/uniTest';
import {
    setCheckedMajorsDefault as setCheckedMajorsDefaultProfile,
    setPointFrom as setPointFromProfile,
    setPointTo as setPointToProfile,
    setCities as setCitiesProfile,
    setCity as setCityProfile,
    setUniRecommend as setUniRecommendProfile,
    setTotalUniversities as setTotalUniversitiesProfile,
    resetFilter as resetFilterProfile,
    setMajors as setMajorsProfile
} from '../../actions/profile';
import { setNextTab, setCurrentTab } from '../../actions/navigationEvents';
import { STATUS, ROUTES } from '../../constants';
import * as Animatable from 'react-native-animatable';

const PAGE_SIZE = 5;
class UniSearch extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        let total = navigation.getParam('total');
        let loading = navigation.getParam('loading');
        return {
            headerTitle: (<View style={[ViewStyles.flexDirectionRow]}>
                <Heading>{ROUTES.UNI_SEARCH.header}</Heading>
                <View style={[
                    ViewStyles.flexCenterVertical,
                    {
                        marginLeft: 10,
                        paddingHorizontal: vars.padding / 2,
                        borderRadius: 4,
                        backgroundColor: vars.red
                    }
                ]}>
                    <Text style={{ color: vars.white }}>
                        {total} Kết quả
                        </Text>
                </View>
            </View>),
            headerLeft: (
                <TouchableOpacity
                    style={{ paddingHorizontal: vars.padding }}
                    hitSlop={{
                        top: 20,
                        left: 20,
                        bottom: 20,
                        right: 20
                    }}
                    onPress={navigation.getParam('toogleDrawer')}
                >
                    <Icon name="filter" type="font-awesome" color={vars.orange} />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity
                    disabled={loading}
                    style={{ paddingHorizontal: vars.padding }}
                    hitSlop={{
                        top: 20,
                        left: 20,
                        bottom: 20,
                        right: 20
                    }}
                    onPress={navigation.getParam('search')}
                >
                    <Icon name="search" type="font-awesome" color={loading ? vars.textSecondary : vars.orange} />
                </TouchableOpacity>
            )
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            toogleDrawer: false,
            pageSize: PAGE_SIZE,
            pageIndex: 0,
            isSearch: true
        };
        this.drawer = null;
        this.treeSelectRef = null;
    }

    componentDidMount() {
        let { uniRecommend, profilePage } = this.props;
        let checkedMajors = [];
        this.props.getCities('City', "", 'CityID', this.reArrangeCities, (data) => {
            if (uniRecommend) {
                this.props.setCitiesFilter(data);
                this.props.setCity(data[0])
            } else if (profilePage) {
                this.props.setCitiesProfile(data);
                this.props.setCityProfile(data[0])
            }
        });
        if (uniRecommend || profilePage) {
            let { treeMajors } = this.props[uniRecommend ? "uniTest" : "profile"];
            let tree = this.reArrangeMajorsToTreeData(treeMajors);
            this.props[uniRecommend ? "setMajors" : "setMajorsProfile"](tree);
            treeMajors.map(t => checkedMajors.push(t.MajorID));
            this.props[uniRecommend ? "setCheckedMajorsDefault" : "setCheckedMajorsDefaultProfile"](checkedMajors);
        } else {
            this.props.getMajors('Major', "", 'MajorID', this.reArrangeMajorsToTreeData);
        }
        this.props.navigation.setParams({
            toogleDrawer: this._toggleDrawer,
            search: () => this._search("", "", true),
            total: this.props[uniRecommend ? "uniTest" : (profilePage ? "profile" : "uniSearch")].totalUniversities
        });
        this._search("", "", true, checkedMajors);
    }

    reArrangeCities = (data) => {
        data.forEach(d => (d.id = d.CityID, d.value = d.CityName));
        return data;
    }

    reArrangeMajorsToTreeData = (data) => {
        let tree = []
        data.map((d) => {
            if (!d.MajorParentID) {
                let children = [];
                data.map((c) => {
                    if (c.MajorParentID === d.MajorID) {
                        children.push({
                            key: c.MajorID,
                            label: c.MajorName,

                        });
                    }
                })

                tree.push({
                    key: d.MajorID,
                    label: d.MajorName,
                    children
                });
            }
        })
        return tree;
    }

    _search = (pageIndex = 0, pageSize = PAGE_SIZE, isSearch = false, checkedMajorsDefault = []) => {
        let { uniRecommend, profilePage } = this.props;
        let location = uniRecommend ? "uniTest" : (profilePage ? "profile" : "uniSearch");
        isSearch && this.treeSelectRef && (
            this.props[uniRecommend ? "resetFilter" : (profilePage ? "resetFilterProfile" : "reset")],
            this.treeSelectRef.reset()
        );
        let {
            universitySearch,
            pointFrom,
            pointTo
        } = this.props[location];

        pageIndex = pageIndex || this.state.pageIndex;
        pageIndex = isSearch ? 0 : pageIndex;
        pageSize = pageSize || this.state.pageSize;
        if (pointFrom.data !== "") {
            if (isNaN(pointFrom.data)) {
                this.props[uniRecommend
                    ? "setPointFromFilter"
                    : (profilePage
                        ? "setPointFromProfile"
                        : "setPointFrom"
                    )](pointFrom.data, "Hãy nhập một số hợp lệ!");
                return;
            } else if (pointFrom.data < 0) {
                this.props[uniRecommend
                    ? "setPointFromFilter"
                    : (profilePage
                        ? "setPointFromProfile"
                        : "setPointFrom"
                    )](pointFrom.data, "Hãy nhập một số dương!");
                return;
            }
        } else if (pointTo.data !== "") {
            if (isNaN(pointTo.data)) {
                this.props[uniRecommend
                    ? "setPointToFilter"
                    : (profilePage
                        ? "setPointToProfile"
                        : "setPointTo"
                    )](pointTo.data, "Hãy nhập một số hợp lệ!");
                return;
            } else if (pointTo.data < 0) {
                this.props[uniRecommend
                    ? "setPointToFilter"
                    : (profilePage
                        ? "setPointToProfile"
                        : "setPointTo"
                    )](pointTo.data, "Hãy nhập một số dương!");
                return;
            }
        }
        if (pointFrom.data !== "" && pointTo.data !== "") {
            if (pointFrom.data > pointTo.data) {
                this.props[uniRecommend
                    ? "setPointFromFilter"
                    : (profilePage
                        ? "setPointFromProfile"
                        : "setPointFrom"
                    )](pointFrom.data, "Khoảng điểm không hợp lệ");
                return;
            }
            if (pointTo.data < pointFrom.data) {
                this.props[uniRecommend
                    ? "setPointToFilter"
                    : (profilePage
                        ? "setPointToProfile"
                        : "setPointTo"
                    )](pointTo.data, "Khoảng điểm không hợp lệ");
                return;
            }
        }
        this.drawer.closeDrawer();
        this.setState({
            isSearch
        });
        this.props.navigation.setParams({
            loading: true
        });
        let {
            checkedMajors,
            universities,
            city
        } = this.props[location];
        (uniRecommend || profilePage)
            && checkedMajors.length === 0
            && (checkedMajors = checkedMajorsDefault.length !== 0
                ? checkedMajorsDefault
                : (profilePage
                    ? this.props.profile.checkedMajorsDefault
                    : this.props.uniTest.checkedMajorsDefault
                )
            );
        this.props.searchUniversity(
            checkedMajors,
            universitySearch.data,
            pointFrom.data,
            pointTo.data,
            city.data.id,
            (data, totalUniversities) => {
                this.props[uniRecommend
                    ? "setUniRecommend"
                    : (profilePage
                        ? "setUniRecommendProfile"
                        : "setUniversities")](
                            isSearch
                                ? data
                                : universities.concat(data)
                        );
                this.props[
                    uniRecommend
                        ? "setTotalUniversitiesFilter"
                        : (
                            profilePage
                                ? "setTotalUniversitiesProfile"
                                : "setTotalUniversities"
                        )
                ](totalUniversities);
                this.props.navigation.setParams({
                    total: this.props[location].totalUniversities,
                    loading: false
                });
            },
            pageIndex,
            pageSize
        );
        this.setState({
            pageIndex
        })
    }

    _toggleDrawer = () => {
        if (this.drawer) {
            let { toogleDrawer } = this.state;
            if (!toogleDrawer) {
                this.drawer.openDrawer();
            } else {
                this.drawer.closeDrawer();
            }
            this.setState({
                toogleDrawer: !toogleDrawer
            })
        }
    }

    openDrawer = () => {
        this.setState({
            toogleDrawer: true
        })
    }

    closeDrawer = () => {
        this.setState({
            toogleDrawer: false
        })
    }

    showMore = () => {
        let { pageIndex } = this.state;
        this.setState({
            pageIndex: pageIndex + 1
        })
        this._search(pageIndex + 1);
    }

    render() {
        let { uniRecommend, profilePage } = this.props;
        let tab = uniRecommend ? ROUTES.INTRO_TEST : (profilePage ? ROUTES.PROFILE : ROUTES.UNI_SEARCH);
        let { isSearch } = this.state;
        let { searchUniversityStatus } = this.props.uniSearch;
        let {
            universities,
            totalUniversities,
            majors
        } = this.props[uniRecommend ? "uniTest" : (profilePage ? "profile" : "uniSearch")];
        let loading = searchUniversityStatus === STATUS.loading;
        btnShowMore = (loading && isSearch) || (
            universities.length < totalUniversities &&
            <Button
                style={{ marginVertical: vars.margin }}
                danger
                title="Xem thêm"
                onPress={this.showMore}
                loading={loading}
                disabled={loading}
            />
        )
        return (
            <AppContainer
                tab={tab}
                scroll={false}
                showDrawer
                drawerDataInside={
                    <SearchDrawer
                        search={() => this._search("", "", true)}
                        majors={majors}
                        uniRecommend={uniRecommend}
                        profilePage={profilePage}
                        treeSelectRef={node => this.treeSelectRef = node}
                    />
                }
                drawer={(drawer) => this.drawer = drawer}
                onDrawerOpen={this.openDrawer}
                onDrawerClose={this.closeDrawer}
            >
                <ScrollView
                    refreshControl={<RefreshControl
                        onRefresh={() => this._search("", "", true)}
                        refreshing={loading && isSearch}
                        colors={[vars.orange]}
                    />}
                    style={{ width: '100%', flexGrow: 1, marginTop: vars.margin }}
                >
                    <FlatList
                        ListEmptyComponent={!loading &&
                            <View style={ViewStyles.flexCenterHorrizontal}>
                                <Text>
                                    Không tìm thấy kết quả nào!
                                </Text>
                            </View>
                        }
                        data={universities}
                        keyExtractor={d => d.UniversityID + ""}
                        renderItem={(d) => <Animatable.View
                            useNativeDriver
                            animation="bounceInDown"
                            easing="ease-in-cubic"
                            direction="alternate"
                            duration={800}
                        >
                            <UniRow
                                navigation={this.props.navigation}
                                data={d.item}
                            />
                        </Animatable.View>
                        }
                    />
                    {btnShowMore}
                </ScrollView>
            </AppContainer>
        );
    }
}

UniSearch.defaultProps = {
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
        getMajors: (entityName, where, order, reArrangeMajorsToTreeData, pageNumber, rowsPerPage) => {
            dispatch(getMajors(entityName, where, order, reArrangeMajorsToTreeData, pageNumber, rowsPerPage))
        },
        getCities: (entityName, where, order, reArrangeCities, callBackSuccess, pageNumber, rowsPerPage) => {
            dispatch(getCities(entityName, where, order, reArrangeCities, callBackSuccess, pageNumber, rowsPerPage))
        },
        setCheckedMajors: (majors) => {
            dispatch(setCheckedMajors(majors))
        },
        setUniversities: (universities) => {
            dispatch(setUniversities(universities))
        },
        searchUniversity: (checkedMajors, universitySearch, pointFrom, pointTo, cityID, callBackSuccess, pageNumber, pageSize) => {
            dispatch(searchUniversity(checkedMajors, universitySearch, pointFrom, pointTo, cityID, callBackSuccess, pageNumber, pageSize))
        },
        setPointFrom: (data, error) => {
            dispatch(setPointFrom(data, error))
        },
        setPointTo: (data, error) => {
            dispatch(setPointTo(data, error))
        },
        reset: () => {
            dispatch(reset())
        },
        setNextTab: (nextTab) => {
            dispatch(setNextTab(nextTab))
        },
        setCurrentTab: (currentTab) => dispatch(setCurrentTab(currentTab)),
        setPointFromFilter: (data, error) => {
            dispatch(setPointFromFilter(data, error))
        },
        setPointToFilter: (data, error) => {
            dispatch(setPointToFilter(data, error))
        },
        setCity: (data, error) => {
            dispatch(setCity(data, error))
        },
        setCheckedMajorsDefault: (majors) => {
            dispatch(setCheckedMajorsDefault(majors))
        },
        setMajors: (majors) => {
            dispatch(setMajors(majors))
        },
        resetFilter: () => {
            dispatch(resetFilter())
        },
        setUniRecommend: (universities) => {
            dispatch(setUniRecommend(universities))
        },
        setCitiesFilter: (cities) => {
            dispatch(setCitiesFilter(cities))
        },
        setTotalUniversities: (totalUniversities) => {
            dispatch(setTotalUniversities(totalUniversities))
        },
        setTotalUniversitiesFilter: (totalUniversities) => {
            dispatch(setTotalUniversitiesFilter(totalUniversities))
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
        setCheckedMajorsDefaultProfile: (majors) => {
            dispatch(setCheckedMajorsDefaultProfile(majors))
        },
        setMajorsProfile: (majors) => {
            dispatch(setMajorsProfile(majors))
        },
        resetFilterProfile: () => {
            dispatch(resetFilterProfile())
        },
        setUniRecommendProfile: (universities) => {
            dispatch(setUniRecommendProfile(universities))
        },
        setCitiesProfile: (cities) => {
            dispatch(setCitiesProfile(cities))
        },
        setTotalUniversitiesProfile: (totalUniversities) => {
            dispatch(setTotalUniversitiesProfile(totalUniversities))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UniSearch);