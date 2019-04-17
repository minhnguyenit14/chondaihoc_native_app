import React, { Component } from 'react';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import LightBox from 'react-native-lightbox';
import { Image as Img, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { vars, ViewStyles, screenHeight, screenWidth } from '../../styles';
import { Caption, Loading } from '../../common';

type ImageProps = {
    uri?: String,
    style?: Object | Array,
    lightbox?: Boolean,
    source?: Number | Object,
    resizeMode?: String,
    loading?: Boolean,
    errorCaptionStyle?: Object,
    colorIcon?: Object
}

class Image extends Component<ImageProps> {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoading: false,
            uri:'',
            opened: false
        };
        this.fastImg = null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.uri !== this.state.uri) {
            this.setState({
                error: false,
                uri: nextProps.uri
            })
        }
    }

    setStatus = (error = true, isLoading = false, type) => {
        // console.log(this.props.uri, isLoading, type)
        if (this.state.error || error || this.state.isLoading || (isLoading && this.props.uri)) {
            this.setState({
                error,
                isLoading
            })
        }

    }

    render() {
        let {
            uri,
            style,
            lightbox,
            source,
            resizeMode,
            loading,
            colorIcon,
            errorCaptionStyle
        } = this.props;
        let { error, isLoading, opened } = this.state;

        let status = error
            ? <View style={[ViewStyles.container, ViewStyles.flexCenter]}>
                <Icon
                    color={colorIcon}
                    size={vars.fontSizeLarge}
                    name="image"
                />
                <Caption style={errorCaptionStyle}>
                    Không thể tải ảnh!
                </Caption>
            </View>
            : <View></View>


        let img = source
            ? <Img
                style={[style]}
                resizeMode={resizeMode}
                source={source}
                onError={() => this.setStatus(true, false, 'err')}
                onLoadStart={() => this.setStatus(false, true, 'start')}
                onLoadEnd={() => this.setStatus(false, false, 'end')}
            />
            : (uri
                ? <FastImage
                    ref={inst => this.fastImg = inst}
                    style={[ViewStyles.container, style]}
                    source={{
                        uri,
                        priority: FastImage.priority.high,
                    }}
                    onError={() => this.setStatus(true, false, 'err')}
                    onLoadStart={() => this.setStatus(false, true, 'start')}
                    onLoadEnd={() => this.setStatus(false, false, 'end')}
                    resizeMode={FastImage.resizeMode[resizeMode]}
                />
                : status
            );

        loadingComponent =
            (isLoading || loading) ?
                <View style={[
                    ViewStyles.container,
                    ViewStyles.flexCenter,
                    { position: 'absolute' },
                    { zIndex: 999, backgroundColor: 'rgba(0,0,0,.6)' }
                ]}>
                    <Loading size="large" />
                </View>
                : <View></View>
        error && (img = status);
        return (
            lightbox
                ?
                <LightBox
                    activeProps={
                        {
                            style: [opened && {
                                position: 'relative',
                                marginTop: 48,
                                height: screenHeight
                            }],
                        }
                    }
                    didOpen={() => setTimeout(() => this.setState({ opened: true }), 250)}
                    willClose={() => this.setState({ opened: false })}

                    underlayColor={vars.white}>
                    <View style={[ViewStyles.container, ViewStyles.flexCenter]}>
                        {loadingComponent}
                        {img}
                    </View>
                </LightBox>

                : <View>
                    {loadingComponent}
                    {img}
                </View>
        );
    }
}

Image.propTypes = {
    style: PropTypes.oneOf(PropTypes.array, PropTypes.object),
    uri: PropTypes.string,
    lightbox: PropTypes.bool,
    loading: PropTypes.bool,
    source: PropTypes.oneOf(PropTypes.number, PropTypes.object),
    resizeMode: PropTypes.string,
    errorCaptionStyle: PropTypes.object,
    errorCaptionStyle: PropTypes.object
}

Image.defaultProps = {
    style: null,
    uri: "",
    lightbox: false,
    loading: false,
    source: null,
    resizeMode: "contain",
    errorCaptionStyle: null,
    colorIcon: null
}

export default Image;