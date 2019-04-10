import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, Platform } from 'react-native';
import { ViewStyles, screenWidth } from '../../styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { NavigationEvents } from '../../common';
import { NavigationEvents as NE } from 'react-navigation';
import { connect } from 'react-redux';
import { setCurrentTab, setNextTab } from '../../actions/navigationEvents';

type AppContainerProps = {
    children?: React.Node,
    style?: Object | Array,
    showDrawer?: Boolean,
    drawerDataInside?: React.Node,
    refresher?: React.Node,
    sticker?: React.Node,
    scroll?: Boolean,
    scrollRef?: Function,
    appAnimate?: Function,
    containerStyle?: Object | Array
}
const keyboardDismissMode = Platform.OS === "ios" ? { keyboardDismissMode: "on-drag" } : { onScrollEndDrag: Keyboard.dismiss };
const ANIMATION_TAB_CHANGE_TIME = 250;

class AppContainer extends Component<AppContainerProps> {
    constructor(props) {
        super(props);
        this.state = {
            didMount: false
        };
    }

    makeAnimate = (nextTab) => {
        let { tabs, currentTab } = this.props.navigationEvents;
        if (currentTab || nextTab) {
            if (currentTab !== nextTab) {
                let currentRouteIndex = 0;
                let screenIndex = 0;
                tabs.map((t, i) => {
                    t.route === currentTab.route && (currentRouteIndex = i);
                    t.route === nextTab.route && (screenIndex = i);
                })
                if (!currentTab.route) {
                    this.appAnimate.fadeIn(ANIMATION_TAB_CHANGE_TIME);
                } else if (screenIndex < currentRouteIndex) {
                    this.appAnimate.fadeInRight(ANIMATION_TAB_CHANGE_TIME);
                } else if (screenIndex > currentRouteIndex) {
                    this.appAnimate.fadeInLeft(ANIMATION_TAB_CHANGE_TIME);
                } else {
                    this.appAnimate.fadeIn(ANIMATION_TAB_CHANGE_TIME);
                }
                this.props.setCurrentTab(nextTab);
            }
        }
    }

    setTab(payload) {
        if (this.props) {
            this.props.setCurrentTab();
            this.makeAnimate({ route: payload.state.routeName })
        }
    }

    componentWillMount() {
        this.setState({
            didMount: true
        })
    }

    render() {
        let {
            children,
            style,
            showDrawer,
            drawerDataInside,
            refresher,
            sticker,
            scroll,
            containerStyle
        } = this.props;
        children = <View
            style={[
                ViewStyles.container,
                style
            ]}
        >
            {scroll ? <ScrollView
                refreshControl={refresher}
                {...keyboardDismissMode}
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={[
                    ViewStyles.flexCenterHorrizontal,
                    {
                        flexGrow: 1,
                        padding: vars.padding
                    },
                ]}
            >
                {children}
            </ScrollView>
                : children}
        </View>

        let drawer = showDrawer &&

            <View
                style={ViewStyles.container}
            >
                <DrawerLayout
                    edgeWidth={screenWidth / 3}
                    ref={(inst) => this.props.drawer(inst)}
                    onDrawerClose={() => { Keyboard.dismiss(); this.props.onDrawerClose() }}
                    onDrawerOpen={this.props.onDrawerOpen}
                    drawerWidth={300}
                    drawerPosition={DrawerLayout.positions.Left}
                    drawerType='front'
                    drawerBackgroundColor={vars.white}
                    renderNavigationView={() =>
                        <ScrollView
                            {...keyboardDismissMode}
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{
                                flexGrow: 1,
                            }}
                        >
                            {drawerDataInside}
                        </ScrollView>
                    }
                >
                    {children}
                </DrawerLayout>
            </View>
        return (
            <Animatable.View
                useNativeDriver
                style={[styles.container, containerStyle]}
                ref={inst => { this.appAnimate = inst; this.props.appAnimate(inst) }}
            >
                <NE
                    onWillFocus={payload => this.setTab(payload)}
                />
                {drawer}
                {sticker}
                <KeyboardAwareScrollView
                    enableOnAndroid
                    keyboardShouldPersistTaps='handled'
                    contentContainerStyle={{ flexGrow: 1 }}
                    ref={inst => this.props.scrollRef(inst)}
                    refreshControl={scroll ? null : refresher}
                >
                    {children}
                </KeyboardAwareScrollView>

            </Animatable.View >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: vars.bg
    },
    sticker: {
        flex: 1,
        zIndex: 999
    }
});

AppContainer.propTypes = {
    children: PropTypes.any,
    style: PropTypes.oneOf(PropTypes.object, PropTypes.array),
    containerStyle: PropTypes.oneOf(PropTypes.object, PropTypes.array),
    showDrawer: PropTypes.bool,
    drawerDataInside: PropTypes.any,
    refresher: PropTypes.element,
    sticker: PropTypes.element,
    scroll: PropTypes.bool,
    scrollRef: PropTypes.func,
    appAnimate: PropTypes.func
}

AppContainer.defaultProps = {
    children: null,
    style: null,
    containerStyle: null,
    showDrawer: false,
    drawerDataInside: null,
    refresher: null,
    sticker: null,
    scroll: true,
    scrollRef: () => { },
    appAnimate: () => { }
}

const mapStateToProps = state => ({
    navigationEvents: state.navigationEvents
})

const mapDispatchToProps = dispatch => ({
    setCurrentTab: (currentTab) => dispatch(setCurrentTab(currentTab)),
    setNextTab: (nextTab) => dispatch(setNextTab(nextTab)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
