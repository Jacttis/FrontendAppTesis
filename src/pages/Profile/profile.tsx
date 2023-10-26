import { View, Text } from "react-native-animatable";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Profile() {
  const { userToken, signOut } = useContext(AuthContext);
  return (
    <View>
      <GestureHandlerRootView>
        <TouchableOpacity onPress={signOut}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </GestureHandlerRootView>
    </View>
  );
}
