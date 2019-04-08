import React, { Component } from 'react';
import {
    Button,
    AppContainer,
    Heading,
    Text,
    Input
} from '../../common';
import {
    View,
    FlatList,
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { Icon as Icon4 } from 'react-native-elements';
import { QUERY_HELPER } from '../../helper/queryHelper';
import { QUERY, STATUS, ROUTES } from '../../constants';
import { vars, ViewStyles } from '../../styles';
import { connect } from "react-redux";
import * as Animatable from 'react-native-animatable';
import {
    searchAct,
    showmoreAct
} from "../../actions/blog";
import { setNextTab, setCurrentTab } from '../../actions/navigationEvents';
import BlogRow from './BlogRow';

const ROW_PER_PAGE = 10;
const PLACEHOLDER_SEARCH = "Nhập thông tin muốn tìm kiếm";

class Blog extends Component {
    static navigationOptions = ({ navigation }) => {
        let total = navigation.getParam('total');
        let loading = navigation.getParam('loading');
        return {
            headerTitle: (<View style={[ViewStyles.flexDirectionRow, { marginLeft: vars.margin }]}>
                <Heading>{ROUTES.BLOG.header}</Heading>
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
                        {total} Bài viết
                        </Text>
                </View>
            </View>),
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
                    <Icon4 name="search" type="font-awesome" color={loading ? vars.textSecondary : vars.orange} />
                </TouchableOpacity>
            )
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            totalRecords: 0,
            blogData: [],
            searchText: "",
            whereClause: "",
            showSearchBar: false
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            search: () => this.onSearch(),
            total: 0
        });
        this.onSearch(true);
    }

    onShowMoreButtonClick = () => {

        let current = this.state.current + 1;

        let whereClause = this.state.whereClause;

        this.props.showmoreAct(whereClause, current, ROW_PER_PAGE, (data) => {
            let d = JSON.parse(data);

            let blogData = JSON.parse(d.data);
            let totalRecords = d.totalRecords;
            blogData = this.state.blogData.concat(...blogData);
            this.setState({ current, blogData, totalRecords });
        })
    }

    onChange = (current) => {
        this.setState({ current });
    }

    getShowMoreButton = (blogDataloaded, totalRecords, showmoreStatus) => {
        if (blogDataloaded >= totalRecords) return null;

        let loading = (showmoreStatus == STATUS.loading);

        let btnShowMore = <Button
            style={{ marginVertical: vars.margin }}
            onPress={this.onShowMoreButtonClick}
            danger
            loading={loading}
            title="Xem thêm"
        />

        return btnShowMore;
    }

    createWhereClause(isReSearch = false) {
        let { searchText } = this.state;
        isReSearch && (searchText = "");
        var pr = [];
        pr.push({
            ConditionOperation: QUERY.GroupClauseOperation.Or,
            GroupOperation: QUERY.GroupClauseOperation.And,
            Conditions: [
                QUERY_HELPER.createWhereClauseCondition("ArticleContent", searchText, QUERY.WhereClauseOperation.Like),
                QUERY_HELPER.createWhereClauseCondition("ArticleShortDescription", searchText, QUERY.WhereClauseOperation.Like),
                QUERY_HELPER.createWhereClauseCondition("ArticleTitle", searchText, QUERY.WhereClauseOperation.Like),
            ],
        });
        var json = pr.length > 0 ? QUERY_HELPER.prepareWhereClauseGroup(pr) : '';
        return json;
    }

    onSearch = (isReSearch = false) => {
        isReSearch && this.setState({ searchText: '' });

        let { showSearchBar } = this.state;
        showSearchBar && this.searchBar.bounceOutLeft(500).then(
            () => this.setState({ showSearchBar: false })
        )
        if (showSearchBar || isReSearch) {
            let whereClause = this.createWhereClause(isReSearch);
            this.setState({
                whereClause
            })
            this.props.navigation.setParams({
                loading: true,

            });
            this.props.searchAct(whereClause, 0, ROW_PER_PAGE, (data) => {
                let d = JSON.parse(data);
                let blogData = JSON.parse(d.data);
                console.log(blogData)
                let totalRecords = d.totalRecords;
                this.props.navigation.setParams({
                    loading: false,
                    total: totalRecords
                });
                this.setState({
                    blogData,
                    totalRecords,
                    current: 0,
                    whereClause
                });

            })
        } else {
            this.setState({
                showSearchBar: true
            })
        }
    }

    onSearchTextChange = (searchText) => {
        this.setState({ searchText });
    }

    hide = () => {
        this.searchBar.bounceOutLeft(500).then(() => this.setState({ showSearchBar: false }))
    }

    render() {
        let {
            totalRecords,
            blogData,
            searchText,
            showSearchBar
        } = this.state;

        let {
            searchStatus,
            showmoreStatus
        } = this.props.blog;
        let btnShowMore = this.getShowMoreButton(blogData.length, totalRecords, showmoreStatus);
        let searchLoading = searchStatus === STATUS.loading;
        return (
            <AppContainer
                tab={ROUTES.BLOG}
                scroll={false}
                refresher={<RefreshControl
                    onRefresh={() => this.onSearch(true)}
                    refreshing={searchLoading}
                    colors={[vars.orange]}
                />}
                sticker={
                    showSearchBar ? <Animatable.View
                        useNativeDriver
                        ref={inst => this.searchBar = inst}
                        style={[
                            ViewStyles.flexCenter,
                            styles.sticker,
                        ]}
                        animation={showSearchBar ? 'bounceInRight' : 'bounceOutLeft'}
                        direction="alternate"
                        easing="ease-in-cubic"
                        duration={500}
                    >
                        <View style={[ViewStyles.flexDirectionRow, { width: '80%', position: 'relative' }]}>
                            <Input
                                onSubmitEditing={() => this.onSearch()}
                                autoFocus
                                blurOnSubmit
                                returnKeyType={"search"}
                                value={searchText}
                                placeholder={PLACEHOLDER_SEARCH}
                                onChange={(value) => this.onSearchTextChange(value)}
                            />
                            <TouchableOpacity
                                hitSlop={{
                                    top: 20,
                                    left: 20,
                                    right: 20,
                                    bottom: 20
                                }}
                                onPress={() => this.setState({ searchText: "" })}
                                style={styles.close}
                            >
                                <Icon name="times" size={vars.fontSizeHeading} />
                            </TouchableOpacity>
                        </View>
                    </Animatable.View> : null
                }
            >
                {showSearchBar && <TouchableWithoutFeedback onPress={this.hide}>
                    <View style={{
                        backgroundColor: 'black',
                        opacity: .6,
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        zIndex: 100
                    }}
                    />
                </TouchableWithoutFeedback>
                }
                <View style={[{ width: '100%', marginTop: vars.margin }]}>
                    <FlatList
                        ListEmptyComponent={!searchLoading &&
                            <View style={ViewStyles.flexCenterHorrizontal}>
                                <Text>
                                    Không tìm thấy kết quả nào!
                                    </Text>
                            </View>
                        }
                        data={blogData}
                        keyExtractor={b => b.ArticleID.toString()}
                        renderItem={(b) =>
                            <Animatable.View
                                useNativeDriver
                                animation='bounceInDown'
                                direction='alternate'
                                easing="ease-in-cubic"
                                duration={800}
                            >
                                <BlogRow
                                    navigation={this.props.navigation}
                                    data={b.item}
                                />
                            </Animatable.View>
                        }
                    />
                </View>
                {btnShowMore}
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    sticker: {
        width: '100%',
        marginTop: vars.margin,
        zIndex: 100,
        position: 'absolute'
    },
    close: {
        marginLeft: vars.margin,
        position: 'absolute',
        top: 0,
        right: vars.padding,
        bottom: vars.padding,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapStateToProps = state => {
    return {
        blog: state.blog
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchAct: (whereClause, indexPage, ROW_PER_PAGE, callbackSuccess) => {
            dispatch(searchAct(whereClause, indexPage, ROW_PER_PAGE, callbackSuccess))
        },
        showmoreAct: (whereClause, indexPage, ROW_PER_PAGE, callbackSuccess) => {
            dispatch(showmoreAct(whereClause, indexPage, ROW_PER_PAGE, callbackSuccess))
        },
        setNextTab: (nextTab) => dispatch(setNextTab(nextTab)),
        setCurrentTab: (currentTab) => dispatch(setCurrentTab(currentTab)),

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blog);