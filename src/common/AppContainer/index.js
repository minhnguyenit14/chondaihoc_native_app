import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, Platform } from 'react-native';
import { ViewStyles, screenWidth } from '../../styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { ScrollView } from 'react-native-gesture-handler';

type AppContainerProps = {
    children?: React.Node,
    style?: Object | Array,
    showDrawer?: Boolean,
    drawerDataInside?: React.Node,
    refresher?: React.Node,
    sticker?: React.Node,
    scroll?: Boolean,
    scrollRef?: Function
}
const keyboardDismissMode = Platform.OS === "ios" ? { keyboardDismissMode: "on-drag" } : { onScrollEndDrag: Keyboard.dismiss };
class AppContainer extends Component<AppContainerProps> {
    constructor(props) {
        super(props);
        this.state = {};
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
            <View style={styles.container}>
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
            </View >
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
    showDrawer: PropTypes.bool,
    drawerDataInside: PropTypes.any,
    refresher: PropTypes.element,
    sticker: PropTypes.element,
    scroll: PropTypes.bool,
    scrollRef: PropTypes.func
}

AppContainer.defaultProps = {
    children: null,
    style: null,
    showDrawer: false,
    drawerDataInside: null,
    refresher: null,
    sticker: null,
    scroll: true,
    scrollRef: () => { }
}

export default AppContainer;
