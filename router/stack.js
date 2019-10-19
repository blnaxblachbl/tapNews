import { createStackNavigator } from 'react-navigation-stack'
import { Animated, Easing } from 'react-native'

import MainScreen from '../screens/main'
import ModalScreen from '../screens/modal'

export default createStackNavigator(
    {
        Main: {
            screen: MainScreen,
            navigationOptions: {
                header: null
            }
        },
        Modal: {
            screen: ModalScreen,
            navigationOptions: ({ navigation }) => ({
                headerStyle: {
                    backgroundColor: "#444f5a",
                },
                headerTitle: navigation.state.params.item.title,
                headerTitleStyle: { color: 'white' },
                headerTintColor: 'white',
                headerBackTitle: null
            }),
        }
    },
    {
        initialRouteName: 'Main',
        defaultNavigationOptions: {
            gesturesEnabled: true,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
                useNativeDriver: true
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;

                const width = layout.initWidth;
                const height = layout.height;

                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [width, 0, 0],
                })

                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                })

                return { transform: [{ translateX }] };
            },
        }),
    }
)