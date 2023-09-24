import react from "react";
import {StatusBar, View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import Routes from './src/routes/routes'

export default function App() {
  return (
      <NavigationContainer>
          <StatusBar backgroundColor="#38A69D" barStyle="light-content" />
          <Routes/>
      </NavigationContainer>
  );
}