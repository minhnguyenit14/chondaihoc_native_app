import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBlogDetail } from '../../actions/blogDetail'
import { RefreshControl, StyleSheet, View } from 'react-native';
import { AppContainer, Heading, Caption, Image } from '../../common';
import { STATUS } from '../../constants';
import { TextStyles, vars, screenWidth } from '../../styles';
import HTML from 'react-native-render-html';
import { ADMIN_URL } from '../../../appConfig';

class BlogDetail extends Component {
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         headerTitle: 
    //     }
    // }

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

    render() {
        let {
            ArticleTitle,
            ArticleContent,
            ArticleAuthor,
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
                        <Caption>
                            {info}
                        </Caption>
                    </View>

                }
                {ArticleContent !== "" && <HTML
                    tagsStyles={{
                        span: {
                            backgroundColor: 'transparent'
                        },
                        img: {
                            maxWidth: screenWidth - vars.padding * 2
                        }
                    }}
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
        borderColor: vars.borderColor
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