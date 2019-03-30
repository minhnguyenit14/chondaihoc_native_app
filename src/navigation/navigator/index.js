import React from 'react';
import { View } from 'react-native';
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
    withNavigation
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {
    Profile,
    Login,
    UniSearch,
    SignUp,
    Blog,
    IntroTest,
    Test
} from '../../containers';
import { getHeaderName } from '../../helper/routeNameTranslator';
import { handleCustomTransition } from './transitions';
import { Icon, Avatar } from 'react-native-elements';
import { fromLeft } from 'react-navigation-transitions';
import { ROUTES } from '../../constants';
import { vars } from '../../styles';
import CheckAuthScreen from './CheckAuthScreen';
import { Heading } from '../../common';



const AuthStack = createStackNavigator(
    {
        Login: Login,
        SignUp: SignUp
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        transitionConfig: () => fromLeft()
    }
);


const UniSearchStack = createStackNavigator(
    {
        UniSearch: UniSearch
    },
    {
        initialRouteName: "UniSearch",
        transitionConfig: () => fromLeft()
    }
)

const BlogStack = createStackNavigator(
    {
        Blog: Blog
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
        IntroTest: IntroTest,
        Test: Test
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
        Profile: Profile
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
        initialRouteName: 'IntroTest',
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
                            iconName = "list-ul";
                            size = 30;
                            break;
                        case ROUTES.UNI_SEARCH.route:
                            iconName = "search";
                            break;
                        case ROUTES.BLOG.route:
                            iconName = "file";
                            break;
                        case ROUTES.PROFILE.route:
                            iconName = "user";
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
                    return avatar || <Icon type='font-awesome' name={iconName} size={size} color={tintColor} />;
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
    return <TabStack screenProps={navigation.getParam("data")} navigation={navigation} />;
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
            initialRouteName: 'Loading',
        }
    )
)
