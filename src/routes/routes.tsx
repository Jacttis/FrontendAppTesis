import Welcome from "../pages/Welcome/welcome";
import Login from "../pages/Login/login";
import Test from "../pages/Welcome/Test";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VectorIcon from "react-native-vector-icons/Ionicons";
import Home from "../pages/Home/home";

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

export const BottomTabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="home"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <VectorIcon name="home" color="black" size={30} />
        ),
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

export const MainStack = () => (
  <RootStack.Navigator initialRouteName={"bottomTabs"}>
    <RootStack.Screen
      name={"login"}
      component={Login}
      options={{ headerShown: false }}
    />
    {/*//esto es solo una screen */}
    <RootStack.Screen
      name={"bottomTabs"}
      options={{ headerShown: false }}
      component={BottomTabs}
    />
    {/*// en cambio esto es un stack*/}
    {/*aca si vos queres agregar mas screens o stacks*/}
  </RootStack.Navigator>
);
//aca devolvemos el stack principal. el que tiene tod0
export default function Routes() {
  return <MainStack />;
}
