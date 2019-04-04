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
    setUniversities,
    searchUniversity,
    setPointFrom,
    setPointTo
} from '../../actions/uniSearch';
import { STATUS, ROUTES } from '../../constants';
import * as Animatable from 'react-native-animatable';
import { UNIVERSITY_LOGO_PATH } from '../../../appConfig';

const PAGE_SIZE = 5;
class UniSearch extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        let total = navigation.getParam('total');
        let loading = navigation.getParam('loading');
        return {
            headerTitle: (<View style={[ViewStyles.flexDirectionRow, { marginTop: vars.margin / 2 }]}>
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
    }

    componentDidMount() {
        this.props.getMajors('Major', "", 'MajorID', this.reArrangeMajorsToTreeData);
        this.props.getCities('City', "", 'CityID', this.reArrangeCities);
        this.props.setCheckedMajors(this.props.uniSearch.checkedMajors);
        this.props.navigation.setParams({
            toogleDrawer: this._toggleDrawer,
            search: () => this._search("", "", true),
            total: this.props.uniSearch.totalUniversities
        });
        this._search("", "", true);
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

    _search = (pageIndex = 0, pageSize = PAGE_SIZE, isSearch = false) => {
        let {
            universitySearch,
            pointFrom,
            pointTo,
            city,
        } = this.props.uniSearch;
        pageIndex = pageIndex || this.state.pageIndex;
        pageIndex = isSearch ? 0 : pageIndex;
        pageSize = pageSize || this.state.pageSize;
        if (pointFrom.data !== "") {
            if (isNaN(pointFrom.data)) {
                this.props.setPointFrom(pointFrom.data, "Hãy nhập một số hợp lệ!");
                return;
            } else if (pointFrom.data < 0) {
                this.props.setPointFrom(pointFrom.data, "Hãy nhập một số dương!");
                return;
            }
        } else if (pointTo.data !== "") {
            if (isNaN(pointTo.data)) {
                this.props.setPointTo(pointTo.data, "Hãy nhập một số hợp lệ!");
                return;
            } else if (pointTo.data < 0) {
                this.props.setPointTo(pointTo.data, "Hãy nhập một số dương!");
                return;
            }
        }
        if (pointFrom.data !== "" && pointTo.data !== "") {
            if (pointFrom.data > pointTo.data) {
                this.props.setPointFrom(pointFrom.data, "Khoảng điểm không hợp lệ");
                return;
            }
            if (pointTo.data < pointFrom.data) {
                this.props.setPointTo(pointTo.data, "Khoảng điểm không hợp lệ");
                return;
            }
        }
        this.drawer.closeDrawer();
        this.setState({
            isSearch
        });
        let { checkedMajors, universities } = this.props.uniSearch;
        this.props.navigation.setParams({
            loading: true
        });
        this.props.searchUniversity(
            checkedMajors,
            universitySearch.data,
            pointFrom.data,
            pointTo.data,
            city.data.id,
            (data) => {
                data.forEach(d => d.UniversityLogo = UNIVERSITY_LOGO_PATH.replace('name', d.UniversityLogo))
                isSearch ?
                    this.props.setUniversities(data) :
                    this.props.setUniversities(universities.concat(data));
                this.props.navigation.setParams({
                    total: this.props.uniSearch.totalUniversities,
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
        let { isSearch } = this.state;
        let { searchUniversityStatus, totalUniversities, universities } = this.props.uniSearch;
        let loading = searchUniversityStatus === STATUS.loading;
        btnShowMore = (loading && isSearch) || (universities.length < totalUniversities &&
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
                scroll={false}
                showDrawer
                drawerDataInside={<SearchDrawer />}
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
                            animation="fadeIn"
                            easing="ease-in-cubic"
                            direction="alternate"
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

const mapStateToProps = state => {
    return {
        uniSearch: state.uniSearch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMajors: (entityName, where, order, reArrangeMajorsToTreeData, pageNumber, rowsPerPage) => {
            dispatch(getMajors(entityName, where, order, reArrangeMajorsToTreeData, pageNumber, rowsPerPage))
        },
        getCities: (entityName, where, order, reArrangeCities, pageNumber, rowsPerPage) => {
            dispatch(getCities(entityName, where, order, reArrangeCities, pageNumber, rowsPerPage))
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
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UniSearch);