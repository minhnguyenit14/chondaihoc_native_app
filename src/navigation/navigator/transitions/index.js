import { fromLeft, zoomIn } from 'react-navigation-transitions'
import { ROUTES } from '../../../constants';
import {Animated, Easing} from 'react-native-reanimated';

export const handleCustomTransition = ({ scenes }) => {
    const prevScene = scenes[scenes.length - 2];
console.warn(prevScene);
    // Custom transitions go there
    if (prevScene
        && prevScene.route.routeName === ROUTES.LOG_IN) {
        return zoomIn();
    }
    return fromLeft();
}

export const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 750,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { position, scene } = sceneProps

            const thisSceneIndex = scene.index

            const opacity = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex],
                outputRange: [0, 1],
            })

            return { opacity }
        },
    }
}