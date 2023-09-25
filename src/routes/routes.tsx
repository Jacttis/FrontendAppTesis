import Welcome from '../pages/Welcome/welcome'
import Login from '../pages/Login/login'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VectorIcon from 'react-native-vector-icons/Ionicons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <Tab.Navigator >

            <Tab.Screen
                name="Welcome"
                component={Welcome}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <VectorIcon name="home" color='black' size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={Login}

            />
        </Tab.Navigator>

       /* <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                options={{headerShown: false }}
                component={Welcome}
            />

            <Stack.Screen
                name="Login"
                component={Login}
            />
        </Stack.Navigator>*/
    )
}

