import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ROUTES } from '../../../constants';
import { ViewStyles, screenHeight, caculateAppMaxHeight, TextStyles, vars } from "../../../styles";
import { Image, Caption, Text } from "../../../common";
import moment from 'moment';
import { BLOG_THUMBNAIL_PATH } from "../../../../appConfig";
let vi = require('moment/locale/vi.js');

class BlogRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    formatDate = (data) => {
        try {
            return moment(data).locale('vi', vi).format('DD MMM, YYYY');
        }
        catch (e) {
            console.log(e, "format date", data);
        }
        return null;
    }

    goToBlogDetail = (ArticleID, ArticleTitle) => {
        this.props.navigation.push(ROUTES.BLOG_DETAIL.route, { data: { ArticleID, ArticleTitle } });
    }

    render() {
        let {
            ArticleImages,
            ArticleTitle,
            CreatedDate,
            ArticleAuthor,
            ArticleShortDescription,
            ArticleID
        } = this.props.data;
        let uri = BLOG_THUMBNAIL_PATH.replace("name", ArticleImages);
        let formatDate = this.formatDate(CreatedDate);

        return (
            <TouchableOpacity
                onPress={() => this.goToBlogDetail(ArticleID, ArticleTitle)}
                style={[ViewStyles.flexDirectionRow, styles.container]}
            >
                <View style={[styles.imgContainer]}>
                    <Image
                        errorCaptionStyle={{ color: vars.white }}
                        colorIcon={vars.white}
                        style={styles.img}
                        lightbox
                        uri={uri}
                    />
                </View>
                <View style={styles.content}>
                    <View>
                        <Text numberOfLines={3} style={[TextStyles.boldFont, styles.title]}>
                            {ArticleTitle}
                        </Text>
                        <Caption numberOfLines={1}>
                            {ArticleShortDescription}
                        </Caption>
                    </View>
                    <Caption style={styles.subInfo}>
                        {`${ArticleAuthor} • ${formatDate}`}
                    </Caption>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: vars.margin,
        borderWidth: 1,
        borderColor: vars.borderColor,
        padding: vars.padding,
        backgroundColor: vars.white,
        borderRadius: 4,
        minHeight: screenHeight * .18,
        maxHeight: caculateAppMaxHeight() * 3,
        marginBottom: vars.margin,
        shadowColor: vars.shadowColor,
        shadowOffset: vars.shadowOffset,
        shadowOpacity: vars.shadowOpacity,
        shadowRadius: vars.shadowRadius,
        elevation: vars.elevation,

    },
    title: {
        fontWeight: vars.fontMedium,
        lineHeight: vars.fontSizeStandard * 1.2
    },
    img: {
        width: '100%',
        height: '100%',
    },
    imgContainer: {
        borderRadius: 4,
        backgroundColor: 'black',
        flex: .4,
        marginRight: vars.margin
    },
    content: {
        flex: .7,
        justifyContent: 'space-between'
    },
    subInfo: {
        fontSize: vars.fontSizeSmall / 1.1,
        fontWeight: vars.fontMedium,
    }
})

export default BlogRow;