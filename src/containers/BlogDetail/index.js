import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBlogDetail } from '../../actions/blogDetail'
import { RefreshControl, StyleSheet, View, Linking } from 'react-native';
import { AppContainer, Heading, Caption } from '../../common';
import { STATUS } from '../../constants';
import { TextStyles, vars, screenWidth } from '../../styles';
import HTML from 'react-native-render-html';
import { ADMIN_URL } from '../../../appConfig';

class BlogDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ArticleTitle: "",
            ArticleShortDescription: "",
            ArticleImages: [],
            ArticleContent: "",
            ArticleAuthor: "",
            createDate: "",
            getBlogDetailStatus: STATUS.default
        };
    }
    componentDidMount() {
        this.getBlogDetail();
    }

    getBlogDetail = () => {
        let { ArticleID } = this.props.navigation.getParam("data", 0);
        this.props.getBlogDetail(ArticleID, (status, data = null) => {
            if (data) {
                data.ArticleContent = data.ArticleContent.replace(/\/Images/g, ADMIN_URL + '/Images/');
                this.setState({
                    ...data,
                })
            }
            this.setState({
                getBlogDetailStatus: status
            })
        })
    }

    linking = (href) => {
        Linking.openURL(href).catch(() => {

        });
    }

    render() {
        let {
            ArticleTitle,
            ArticleContent,
            ArticleAuthor,
            ArticleShortDescription,
            createDate,
            getBlogDetailStatus
        } = this.state;
        let loading = getBlogDetailStatus === STATUS.loading;
        let info = `${ArticleAuthor} • ${createDate}`;
        return (
            <AppContainer
                refresher={<RefreshControl
                    refreshing={loading}
                    onRefresh={this.getBlogDetail}
                    colors={[vars.orange]}
                />}
            >
                {ArticleTitle !== "" &&
                    <View style={styles.header}>
                        <Heading style={styles.title}>
                            {ArticleTitle}
                        </Heading>
                        <Caption style={{ fontWeight: vars.fontMedium }}>
                            {info}
                        </Caption>
                    </View>

                }
                {
                    ArticleShortDescription !== "" &&
                    <View style={styles.shortDes}>
                        <Caption style={{ fontWeight: vars.fontMedium, fontStyle: 'italic' }}>
                            {`❝ ${ArticleShortDescription} ❞`}
                        </Caption>
                    </View>
                }
                {ArticleContent !== "" && <HTML
                    tagsStyles={{
                        span: {
                            backgroundColor: 'transparent'
                        }
                    }}
                    ignoredStyles={["width", "height"]}
                    baseFontStyle={TextStyles.appFont}
                    onLinkPress={(e, href) => this.linking(href)}
                    html={ArticleContent}
                />}
            </AppContainer>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingBottom: vars.padding,
        marginBottom: vars.margin,
        borderBottomWidth: 1,
        borderColor: vars.borderColor,
        width: '100%'
    },
    title: {
        fontWeight: vars.fontLightBold,
        marginBottom: vars.margin / 2
    }
})

const mapDispatchToProps = dispatch => ({
    getBlogDetail: (id, callBack) => dispatch(getBlogDetail(id, callBack))
})

export default connect(
    null,
    mapDispatchToProps
)(BlogDetail);