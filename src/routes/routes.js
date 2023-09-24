import Welcome from '../pages/Welcome/welcome'
import Login from '../pages/Login/login'
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
            />

            <Stack.Screen
                name="Login"
                component={Login}
            />
        </Stack.Navigator>
    )
}

