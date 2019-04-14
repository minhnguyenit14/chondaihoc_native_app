import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, findNodeHandle } from 'react-native';
import RNCarousel, { Pagination, } from 'react-native-snap-carousel';
import { Image } from '../../common';
import { screenWidth, vars, screenHeight, ViewStyles } from '../../styles';

type CarouselProps = {
    images?: Array
}

class Carousel extends Component<CarouselProps> {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0,
            images: [],
            outOfWidth: false
        };
        this.interval = null;
        this.pagi = null;
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.pagi && this.props.images.length !== 0) {
                this.pagi.measureLayout(findNodeHandle(this.pagi), ({ width }) => {
                    this.setState({
                        outOfWidth: (width >= screenWidth) ? true : false
                    })
                })
                clearInterval(this.interval);
            }
        }, 100)
    }

    _renderItem({ item, index }) {
        return <View style={{ width: '100%', height: '100%' }}>
            <Image lightbox uri={item} />
        </View>
    }

    get pagination() {
        const { activeSlide, outOfWidth } = this.state;
        const { images } = this.props;
        return (
            <View ref={inst => this.pagi = inst}>
                <Pagination

                    dotsLength={images.length}
                    activeDotIndex={activeSlide}
                    containerStyle={[outOfWidth && {
                        maxWidth: screenWidth - vars.padding * 2,
                        justifyContent: 'space-between'
                    }, { paddingVertical: vars.padding }]}
                    dotStyle={[
                        {
                            width: vars.padding / 2,
                            height: vars.padding / 2,
                            borderRadius: vars.borderRadius,
                            backgroundColor: vars.logo
                        },
                        !outOfWidth && { marginHorizontal: vars.margin / 3 }
                    ]}
                    inactiveDotStyle={{
                        backgroundColor: vars.textBase
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>

        );
    }

    render() {
        let { images } = this.props;
        return (
            <View style={{
                height: screenHeight * .4,
                width: '100%'
            }}>
                <RNCarousel
                    inactiveSlideScale={0.9}
                    inactiveSlideOpacity={0.5}
                    contentContainerCustomStyle={[
                        ViewStyles.flexCenter,
                        {
                            marginLeft: -vars.margin,
                            paddingVertical: 0,
                        }]}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth * .8}
                    data={images}
                    renderItem={this._renderItem}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                />
                {this.pagination}
            </View>

        );
    }
}

Carousel.propTypes = {
    images: PropTypes.array,
}

Carousel.defaultProps = {
    images: []
}

export default Carousel;