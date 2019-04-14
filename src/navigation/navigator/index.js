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
    ProfileUniRecommendFilter,
    CheckAuthScreen
} from '../../containers';
import { getHeaderName } from '../../helper/routeNameTranslator';
import { Avatar, Badge } from 'react-native-elements';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { fromLeft } from 'react-navigation-transitions';
import { ROUTES } from '../../constants';
import { vars, ViewStyles } from '../../styles';
import { Heading } from '../../common';
import * as Animatable from 'react-native-animatable';
import VerifyButton from './VerifyButton';

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
            screen: ProfileStack,
        },
    },
    {
        initialRouteName: 'IntroTest',
        swipeEnabled: true,
        animationEnabled: true,
        defaultNavigationOptions: ({ navigation, screenProps }) => ({
            tabBarLabel: getHeaderName(navigation.state.routeName),
            tabBarColor: vars.orange,
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                let avatar = null;
                let size = 24;
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
                        let { isVerified } = screenProps;
                        avatar = !isVerified && <View>
                            <Icon name={iconName} size={size} color={tintColor} />
                            <Animatable.View
                                useNativeDriver
                                animation="bounce"
                                style={{ position: 'absolute', top: -4, right: -12 }}
                            >
                                <Badge
                                    status="error"
                                    value="!"
                                />
                            </Animatable.View>

                        </View>
                        break;
                }
                return avatar || <View>
                    <Icon name={iconName} size={size} color={tintColor} />
                </View>;
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
    let data = navigation.getParam("data");
    return <React.Fragment>
        <TabStack screenProps={data} navigation={navigation} />
        {
            data.isVerified ||
            <VerifyButton navigation={navigation} />
        }
    </React.Fragment>
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
