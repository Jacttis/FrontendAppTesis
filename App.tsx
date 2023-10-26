import {NavigationContainer} from "@react-navigation/native";
import Routes from './src/routes/routes'
import {AuthProvider} from './src/context/AuthContext'
import { AlertNotificationRoot } from "react-native-alert-notification";

export default function App() {
    return (
      <AuthProvider>
        <NavigationContainer>
          <AlertNotificationRoot>
            <Routes/>
          </AlertNotificationRoot>
        </NavigationContainer>
      </AuthProvider>
    );
}
