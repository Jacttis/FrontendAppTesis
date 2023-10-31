import Login from "../pages/Login/login";
import Register from "../pages/Login/register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VectorIcon from "react-native-vector-icons/Ionicons";
import Home from "../pages/Home/home";
import WorkerHome, { client } from "../pages/Home/workerHome";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Profile from "../pages/Profile/profile";
import WorkerMatches from "../pages/Matches/WorkerMatches/workerMatches";
import WorkerChat from "../pages/Matches/WorkerMatches/workerChat";
import { Button } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";

export type RootStackParamList = {
  chat: { clientInfo: client };
  bottomTabs: {};
};

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

export const ClientBottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName="home">
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <VectorIcon name="person" color="black" size={30} />
          ),
          headerShown: false,
        }}
      />
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
      <Tab.Screen
        name="matches"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <VectorIcon name="chatbubble" color="black" size={30} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export const WorkerBottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName="home">
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <VectorIcon name="person" color="black" size={30} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="home"
        component={WorkerHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <VectorIcon name="home" color="black" size={30} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="matches"
        component={WorkerMatches}
        options={{
          tabBarIcon: ({ focused }) => (
            <VectorIcon name="chatbubble" color="black" size={30} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export const AuthClientStack = () => {
  return (
    <RootStack.Navigator initialRouteName={"bottomTabs"}>
      {/*//esto es solo una screen */}
      <RootStack.Screen
        name={"bottomTabs"}
        options={{
          title: "Jobder",
          headerStyle: {
            backgroundColor: "white",
          },

          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTintColor: "red",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        component={ClientBottomTabs}
      />
      {/*// en cambio esto es un stack*/}
      {/*aca si vos queres agregar mas screens o stacks*/}
    </RootStack.Navigator>
  );
};

export const AuthWorkerStack = () => {
  const navigation = useNavigation();
  return (
    <RootStack.Navigator initialRouteName={"bottomTabs"}>
      {/*//esto es solo una screen */}
      <RootStack.Screen
        name={"bottomTabs"}
        options={{
          title: "Jobder",
          headerStyle: {
            backgroundColor: "white",
          },

          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTintColor: "red",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        component={WorkerBottomTabs}
      />
      <RootStack.Screen
        name={"chat"}
        options={{ headerShown: false }}
        component={WorkerChat}
      />
      {/*// en cambio esto es un stack*/}
      {/*aca si vos queres agregar mas screens o stacks*/}
    </RootStack.Navigator>
  );
};

export const MainStack = () => {
  return (
    <RootStack.Navigator initialRouteName={"login"}>
      <RootStack.Screen
        name={"login"}
        component={Login}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={"register"}
        component={Register}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

//aca devolvemos el stack principal. el que tiene tod0
export default function Routes() {
  const { userToken, role } = useContext(AuthContext);
  if (userToken !== null && role !== null) {
    if (role === "client") return <AuthClientStack />;
    else return <AuthWorkerStack />;
  } else return <MainStack />;
}
