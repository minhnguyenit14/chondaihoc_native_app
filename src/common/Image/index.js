import React, { Component } from 'react';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import LightBox from 'react-native-lightbox';
import { Image as Img, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { vars, ViewStyles, screenHeight, screenWidth } from '../../styles';
import { Caption, Loading } from '..';

type ImageProps = {
    uri?: String,
    style?: Object | Array,
    lightbox?: Boolean,
    source?: Number | Object,
    resizeMode?: String,
    loading?: Boolean
}

class Image extends Component<ImageProps> {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            uri: '',
            isLoading: false,
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
        // console.log(type)
        if (this.state.error || error || this.state.isLoading) {
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
            loading
        } = this.props;
        let { error, isLoading, opened } = this.state;
        let status = error
            ? <View style={[ViewStyles.container, ViewStyles.flexCenter]}>
                <Icon
                    size={vars.fontSizeLarge}
                    name="image"
                />
                <Caption>
                    Không thể tải ảnh!
                </Caption>
            </View>
            : <View></View>

        loadingComponent = (isLoading || loading) ?
            <View style={[
                ViewStyles.container,
                ViewStyles.flexCenter,
                { position: 'absolute' },
                loading && { zIndex: 999, backgroundColor: 'rgba(0,0,0,.6)' }
            ]}>
                <Loading size="large" />
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
        error && (img = status);
        return (
            (lightbox && !error && !isLoading && !loading)
                ?
                <LightBox
                    // activeProps={
                    //     {
                    //         style: [{
                    //             marginTop: 50
                    //         },
                    //         opened && { height: screenHeight }
                    //         ],
                    //     }
                    // }
                    didOpen={() => setTimeout(() => this.setState({ opened: true }), 250)}
                    onClose={() => this.setState({ opened: false })}
                    underlayColor={vars.white}>
                    <View>
                        {loadingComponent}
                        {
                            opened
                                ?
                                <View style={[{ position: 'relative', marginTop: 50, height: screenHeight }]}>
                                    {img}
                                </View>
                                : img
                        }
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
    resizeMode: PropTypes.string
}

Image.defaultProps = {
    style: null,
    uri: "",
    lightbox: false,
    loading: false,
    source: null,
    resizeMode: "contain"
}

export default Image;