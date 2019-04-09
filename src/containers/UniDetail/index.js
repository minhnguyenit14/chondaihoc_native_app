import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUniDetail } from '../../actions/uniDetail'
import { AppContainer, Heading, Text, Loading, Caption, Image, Carousel } from '../../common';
import {
    getUniversityKind,
    getUniversityType
} from '../../helper/getUniversityHelper';
import { StyleSheet, View, Linking, ScrollView, RefreshControl } from 'react-native';
import { STATUS } from '../../constants';
import { ViewStyles, vars, TextStyles } from '../../styles';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import HTML from 'react-native-render-html';
import { Icon as Icon4 } from 'react-native-elements';
import Spotlight from './Spotlight';
import { UNIVERSITY_LOGO_PATH, UNIVERSITY_IMAGE_PATH } from '../../../appConfig';
import CommonInfo from './CommonInfo';
import GradeTable from './GradeTable';

class UniDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        let { UniversityName } = navigation.getParam('data');
        return {
            headerTitle: <Heading>{UniversityName}</Heading>
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            uniInfo: null,
            rangePoint: null,
            getUniDetailStatus: STATUS.default,
            majorsTable: [],
            universityType: null,
            universityJobAfterGraduating: null,
            universityLogo: null,
            universityKind: null,
            universityShortDescription: null,
            universityImages: []
        };
    }

    componentDidMount() {
        this.getUniDetail();
    }

    getUniDetail = () => {
        let { UniversityID } = this.props.navigation.getParam("data", 0);
        this.props.getUniDetail(UniversityID, (status, data = null) => {
            if (data) {
                let { UniParentMajors, UniChildMajors } = data;
                let uniInfo = data.UniGeneralInfos[0];
                let rangePoint = data.UniRangePoint[0];
                let {
                    UniversityType,
                    UniversityJobAfterGraduating,
                    UniversityLogo,
                    IsPrivate,
                    UniversityShortDescription,
                    UniversityImages
                } = uniInfo;
                rangePoint = rangePoint
                    && `${rangePoint.UniversityPointFrom} ~ ${rangePoint.UniversityPointTo}`;
                let universityType = UniversityType && getUniversityType(UniversityType);
                let universityJobAfterGraduating = UniversityJobAfterGraduating
                    && `${UniversityJobAfterGraduating}%`;
                let universityLogo = UniversityLogo
                    && UNIVERSITY_LOGO_PATH.replace("name", UniversityLogo);
                let majorsTable = this.reArrangeDataToMajorsTable(UniParentMajors, UniChildMajors);
                let universityKind = IsPrivate !== undefined && getUniversityKind(IsPrivate);
                let universityImages = UniversityImages.split(",");
                universityImages = universityImages.map(img => UNIVERSITY_IMAGE_PATH.replace("name", img));
                this.setState({
                    uniInfo,
                    rangePoint,
                    majorsTable,
                    universityType,
                    universityJobAfterGraduating,
                    universityLogo,
                    universityKind,
                    universityShortDescription: UniversityShortDescription,
                    universityImages
                })
            }
            this.setState({
                getUniDetailStatus: status
            })
        })
    }

    formatMoney = (data) => {
        var money = (data).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').split(".")[0];
        return money + ' VNĐ/năm';
    }

    reArrangeDataToMajorsTable = (parentMajors, childMajors) => {
        parentMajors.forEach(parentMajor => {
            let tempChilds = this.getChildsByParentId(childMajors, parentMajor.MajorID);
            parentMajor.children = tempChilds;
        });
        return parentMajors
    }

    getChildsByParentId = (childMajors, parentId) => {
        let childs = [];
        childMajors.forEach(child => {
            if (child.MajorParentID === parentId) {
                childs.push(child);
            }
        });
        return childs;
    }

    linking = (href) => {
        Linking.openURL(href).catch(() => {

        });
    }

    render() {
        let {
            uniInfo,
            majorsTable,
            getUniDetailStatus,
            rangePoint,
            universityType,
            universityJobAfterGraduating,
            universityLogo,
            universityKind,
            universityShortDescription,
            universityImages,
        } = this.state;
        let {
            UniversityWebsite,
            UniversityYearsAVG,
            UniversityAddress,
            UniversityEmail,
            UniversityPhone,
            UniversityLongDescription,
            UniversityFeeAVG
        } = uniInfo || {};
        let loading = getUniDetailStatus === STATUS.loading;

        return (
            <AppContainer
                scroll={false}
                refresher={<RefreshControl
                    onRefresh={this.getUniDetail}
                    refreshing={loading}
                    colors={[vars.orange]}
                />}
                sticker={
                    uniInfo
                        ? <View style={styles.sticker}>
                            <View style={[ViewStyles.flexDirectionRow, styles.wrapper]}>
                                <View style={[ViewStyles.flexDirectionRow, ViewStyles.flexCenterVertical]}>
                                    <View style={[
                                        ViewStyles.flexDirectionRow,
                                        styles.commonType,
                                        styles.uType
                                    ]}>
                                        <View style={[
                                            ViewStyles.flexCenterVertical,
                                            { marginRight: vars.margin / 2 }
                                        ]}>
                                            <Icon
                                                name="university"
                                                color={vars.logo}
                                                size={vars.fontSizeLarge}
                                            />
                                        </View>
                                        <Text style={[styles.tag]}>
                                            {universityType}
                                        </Text>
                                    </View>
                                    <View style={[styles.commonType, styles.uKind]}>
                                        <Text style={styles.tag}>
                                            {universityKind}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[ViewStyles.flexCenterVertical]}>
                                    <View style={[ViewStyles.flexDirectionRow]}>
                                        <Icon
                                            name="globe"
                                            size={vars.fontSizeLarge}
                                            color={vars.logo}
                                        />
                                        <Caption
                                            style={[ViewStyles.flexCenterVertical, styles.a]}
                                            onPress={() => this.linking(UniversityWebsite)}
                                        >
                                            Đi đến trang chủ
                                    </Caption>
                                    </View>
                                </View>
                            </View>
                            <View style={[ViewStyles.flexDirectionRow, styles.spotlightGroup]}>
                                <Spotlight
                                    textStyle={styles.spotlightText}
                                    style={styles.spotlight}
                                    data={rangePoint}
                                    title={"Khoảng điểm đỗ"}
                                />
                                <Spotlight
                                    textStyle={styles.spotlightText}
                                    style={[styles.spotlight, { marginHorizontal: vars.margin / 2 }]}
                                    data={universityJobAfterGraduating}
                                    title={"Tỉ lệ có việc làm"}
                                />
                                <Spotlight
                                    textStyle={styles.spotlightText}
                                    style={styles.spotlight}
                                    data={UniversityYearsAVG}
                                    title={"Số năm đào tạo"}
                                />
                            </View>
                        </View>
                        : null
                }
            >
                <View style={[{
                    padding: vars.padding,
                    flex: 1
                }]}>
                    <ScrollView

                        contentContainerStyle={[
                            { flexGrow: 1 }
                        ]}
                    >
                        <View style={[ViewStyles.flexDirectionRow, { flex: 1 }, styles.block]}>
                            <View style={{ flex: .3, marginRight: vars.margin / 2 }}>
                                <Image
                                    uri={universityLogo}
                                />
                            </View>
                            <View style={{ flex: .7, alignContent: 'flex-start' }}>
                                {UniversityAddress && <CommonInfo
                                    data={UniversityAddress}
                                    title={"Địa chỉ"}
                                    icon={<Icon
                                        name="map-marker-alt"
                                        color={vars.logo}
                                        size={vars.fontSizeStandard}
                                    />}
                                    style={styles.commonInfo}
                                />}
                                {UniversityPhone && <CommonInfo
                                    data={UniversityPhone}
                                    title={"Số điện thoại"}
                                    icon={<Icon
                                        name="phone"
                                        color={vars.logo}
                                        size={vars.fontSizeStandard}
                                    />}
                                    style={styles.commonInfo}
                                />}
                                {UniversityEmail && <CommonInfo
                                    data={UniversityEmail}
                                    title={"Email"}
                                    icon={<Icon4
                                        type="font-awesome"
                                        color={vars.logo}
                                        name="envelope"
                                        size={vars.fontSizeStandard}
                                    />}
                                    style={styles.commonInfo}
                                />}
                            </View>
                        </View>
                        {
                            universityShortDescription &&
                            <View style={[styles.block, styles.shortDes]}>
                                <Caption selectable>
                                    {universityShortDescription}
                                </Caption>
                            </View>
                        }
                        <Carousel images={universityImages} />
                        {
                            UniversityLongDescription &&
                            <View style={styles.html}>
                                <HTML
                                    tagsStyles={{
                                        span: {
                                            backgroundColor: 'transparent',
                                            // color: vars.textMain
                                        },
                                    }}
                                    textSelectable
                                    baseFontStyle={TextStyles.appFont}
                                    onLinkPress={(e, href) => this.linking(href)}
                                    html={UniversityLongDescription} />
                            </View>
                        }
                        {
                            UniversityFeeAVG &&
                            <View style={[
                                ViewStyles.flexDirectionRow,
                                styles.block
                            ]}
                            >
                                <View style={[
                                    ViewStyles.flexCenterVertical,
                                    { marginRight: vars.margin / 2 }
                                ]}>
                                    <Icon
                                        name="money-check-alt"
                                        color={vars.logo}
                                        size={vars.fontSizeLarge}
                                    />
                                </View>
                                <Text>
                                    <Text style={[styles.tag]}>
                                        {`Học phí: `}
                                    </Text>{this.formatMoney(UniversityFeeAVG)}
                                </Text>
                            </View>
                        }
                        {majorsTable.length !== 0 &&
                            <GradeTable
                                data={majorsTable}
                            />
                        }
                    </ScrollView>
                </View>
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    sticker: {
        borderWidth: 1,
        borderColor: vars.borderColor,
        shadowColor: vars.shadowColor,
        shadowOffset: vars.shadowOffset,
        shadowOpacity: vars.shadowOpacity,
        shadowRadius: vars.shadowRadius,
        elevation: vars.elevation,
    },
    wrapper: {
        paddingHorizontal: vars.margin,
        justifyContent: 'space-between',
    },
    commonType: {
        padding: vars.padding / 2,
    },
    block: {
        marginBottom: vars.margin
    },
    uKind: {

    },
    uType: {
        borderRightWidth: 1,
        borderColor: vars.borderColor
    },
    tag: {
        color: vars.textMain,
        fontWeight: vars.fontMedium
    },
    a: {
        marginLeft: vars.margin / 2,
        color: vars.logo,
        textDecorationLine: 'underline'
    },
    spotlightGroup: {
        paddingVertical: vars.padding,
        borderColor: vars.borderColor,
        borderTopWidth: 1,
        justifyContent: 'space-between',
        marginTop: vars.margin / 2,
    },
    spotlight: {
        borderRadius: vars.borderRadius / 4,
        backgroundColor: vars.orange,
        padding: vars.padding
    },
    spotlightText: {
        color: vars.white,
        textShadowOffset: vars.textShadowOffset,
        textShadowRadius: vars.textShadowRadius
    },
    commonInfo: {
    },
    shortDes: {
        borderRadius: vars.borderRadius / 4,
        padding: vars.padding / 2,
        backgroundColor: vars.green
    },
    html: {
        flex: 1,
        backgroundColor: vars.white,
        borderRadius: vars.borderRadius / 4
    }
})

const mapDispatchToProps = dispatch => ({
    getUniDetail: (universityId, callBack) => dispatch(getUniDetail(universityId, callBack))
})

export default connect(
    null,
    mapDispatchToProps
)(UniDetail);