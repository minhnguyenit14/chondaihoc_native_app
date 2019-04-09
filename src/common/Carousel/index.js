import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import RNCarousel, { Pagination, } from 'react-native-snap-carousel';
import { Image } from '../../common';
import { screenWidth, vars, screenHeight } from '../../styles';

type CarouselProps = {
    images?: Array
}

class Carousel extends Component<CarouselProps> {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0,
            images: []
        };
    }
    _renderItem({ item, index }) {
        return <View style={{ width: '100%', height: '100%' }}>
            <Image lightbox uri={item} />
        </View>
    }

    get pagination() {
        const { activeSlide } = this.state;
        const { images } = this.props;
        return (
            <Pagination
                dotsLength={images.length}
                activeDotIndex={activeSlide}

                dotStyle={{
                    width: vars.padding / 2,
                    height: vars.padding / 2,
                    borderRadius: vars.borderRadius,
                    marginHorizontal: vars.padding / 3,
                    backgroundColor: vars.logo
                }}
                inactiveDotStyle={{
                    backgroundColor: vars.textBase
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
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
                    contentContainerCustomStyle={{
                        marginLeft: -vars.margin,
                        paddingVertical: 0
                    }}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth * .7}
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