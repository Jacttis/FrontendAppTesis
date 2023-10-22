import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/routes";
import { AlertNotificationRoot } from "react-native-alert-notification";

export default function App() {
  return (
    <NavigationContainer>
      <AlertNotificationRoot>
        <Routes />
      </AlertNotificationRoot>
    </NavigationContainer>
  );
}
