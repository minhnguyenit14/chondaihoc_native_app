import React, { Component } from 'react';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import LightBox from 'react-native-lightbox';
import { Image as Img, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ViewStyles, vars } from '../../styles';

type ImageProps = {
    uri?: String,
    style?: Object | Array,
    lightbox?: Boolean,
    source?: Number,
    resizeMode?: String
}

class Image extends Component<ImageProps> {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let {
            uri,
            style,
            lightbox,
            source,
            resizeMode
        } = this.props;

        let err = <Icon
            size={vars.fontSizeLarge}
            type="font-awesome"
            name="image"
        />
        let img = source
            ? <Img
                style={[style]}
                resizeMode={resizeMode}
                source={source}
                onError={() => err}
            />
            : (uri
                ? <FastImage
                    style={[style]}
                    source={{
                        uri: uri,
                        priority: FastImage.priority.normal,
                    }}
                    onError={() => err}
                    resizeMode={FastImage.resizeMode.contain}
                />
                : err)

        return (
            // <View style={[ViewStyles.container]}>
                lightbox
                    ? <LightBox
                        underlayColor={vars.white}
                    >
                        {img}
                    </LightBox>
                    : img
            // </View>

        );
    }
}

Image.propTypes = {
    style: PropTypes.oneOf(PropTypes.array, PropTypes.object),
    uri: PropTypes.string,
    lightbox: PropTypes.bool,
    source: PropTypes.oneOf(PropTypes.number, PropTypes.string),
    resizeMode: PropTypes.string
}

Image.defaultProps = {
    style: null,
    uri: "",
    lightbox: false,
    source: null,
    resizeMode: "contain"
}

export default Image;