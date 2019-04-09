import React from 'react';
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {
    Profile,
    Login,
    UniSearch,
    UniDetail,
    SignUp,
    Blog,
    BlogDetail,
    IntroTest,
    Test,
    TestResult,
    UniRecommendFilter,
    ProfileUniRecommendFilter
} from '../../containers';
import { getHeaderName } from '../../helper/routeNameTranslator';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { fromLeft, fromBottom } from 'react-navigation-transitions';
import { ROUTES } from '../../constants';
import { vars } from '../../styles';
import CheckAuthScreen from './CheckAuthScreen';
import { Heading, NavigationEvents } from '../../common';
import * as Animatable from 'react-native-animatable';

const AuthStack = createStackNavigator(
    {
        Login,
        SignUp
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        transitionConfig: () => fromLeft()
    }
);


const UniSearchStack = createStackNavigator(
    {
        UniSearch,
        UniDetail
    },
    {
        initialRouteName: "UniSearch",
        transitionConfig: () => fromLeft()
    }
)

const BlogStack = createStackNavigator(
    {
        Blog,
        BlogDetail
    },
    {
        initialRouteName: "Blog",
        transitionConfig: () => fromLeft(),
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: <Heading header>{ROUTES.BLOG.header}</Heading>
        })
    }
)

const TestStack = createStackNavigator(
    {
        IntroTest,
        Test,
        TestResult,
        UniRecommendFilter,
        UniDetail
    },
    {
        initialRouteName: "IntroTest",
        transitionConfig: () => fromLeft(),
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: <Heading header>{ROUTES.INTRO_TEST.header}</Heading>,
        })
    }
)

const ProfileStack = createStackNavigator(
    {
        Profile,
        ProfileUniRecommendFilter,
        UniDetail
    },
    {
        initialRouteName: "Profile",
        transitionConfig: () => fromLeft(),
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: <Heading header>{ROUTES.PROFILE.header}</Heading>,
        })
    }
)

const TabStack = createMaterialBottomTabNavigator(
    {
        UniSearch: {
            screen: UniSearchStack
        },
        IntroTest: {
            screen: TestStack
        },
        Blog: {
            screen: BlogStack
        },
        Profile: {
            screen: ProfileStack
        },
    },
    {
        initialRouteName: 'UniSearch',
        swipeEnabled: true,
        animationEnabled: true,
        defaultNavigationOptions: ({ navigation, screenProps }) => (
            {
                tabBarLabel:
                    // navigation.state.routeName === ROUTES.PROFILE.route
                    //     ? screenProps.UserFullName
                    //     : 
                    getHeaderName(navigation.state.routeName),
                tabBarColor: vars.orange,
                tabBarIcon: ({ focused, horizontal, tintColor }) => {
                    const { routeName } = navigation.state;
                    let iconName;
                    let avatar = null;
                    let size = 25;
                    switch (routeName) {
                        case ROUTES.INTRO_TEST.route:
                            iconName = "clipboard-list";
                            break;
                        case ROUTES.UNI_SEARCH.route:
                            iconName = "search";
                            break;
                        case ROUTES.BLOG.route:
                            iconName = "blog";
                            break;
                        case ROUTES.PROFILE.route:
                            iconName = "user-alt";
                            // let data = screenProps;
                            // let userFullName = "";
                            // data.UserFullName.split(" ").map(c => userFullName += c.charAt(0).toUpperCase());
                            // avatar = <Avatar
                            //     title={userFullName}
                            //     titleStyle={{
                            //         color: vars.textMain,
                            //         fontSize: vars.fontSizeStandard,
                            //         fontFamily: vars.appFont,
                            //     }}
                            //     avatarStyle={{ backgroundColor: '#000' }}
                            //     rounded
                            //     size={size}
                            //     source={require('../../assets/uni_logo/fpt.png')}
                            // />
                            break;
                    }
                    return avatar || <Icon name={iconName} size={size} color={tintColor} />;
                },
                barStyle: {
                    borderTopWidth: 1,
                    borderColor: vars.primaryHover,
                    backgroundColor: vars.white,
                    paddingTop: 0,
                }
            }),
        activeColor: vars.white,
        inactiveColor: '#000000a1',
    }
);

const Container = ({ navigation }) => {
    return <TabStack screenProps={navigation.getParam("data")} navigation={navigation} />
};

Container.router = TabStack.router;

export default RootNavigator = createAppContainer(
    createSwitchNavigator(
        {
            Loading: CheckAuthScreen,
            App: Container,
            Auth: AuthStack,

        },
        {
            initialRouteName: 'Loading'
        }
    )
)
