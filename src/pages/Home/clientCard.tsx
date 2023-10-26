import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Image } from "react-native-animatable";
import { Text } from "react-native-paper";
import { Avatar } from "react-native-paper";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { colors } from "../../assets/colors";

export default function ClientCard(props: any) {
  const [selected, setSelected] = useState(false);
  const { clientInfo, selectedClient } = props;

  useEffect(() => {
    if (clientInfo.email !== selectedClient) setSelected(false);
  }, [selectedClient]);

  return (
    <GestureHandlerRootView>
      <TouchableOpacity
        style={selected ? styles.selectedContainer : styles.container}
        onPress={() => {
          props.onTouch(clientInfo);
          setSelected(true);
        }}
      >
        <View style={{ height: "10%", width: "100%" }}></View>
        <View style={styles.imageContainer}>
          {clientInfo?.picture === "" ? (
            <Avatar.Text
              style={styles.avatar}
              labelStyle={{ bottom: 4 }}
              label={clientInfo?.name.charAt(0)}
            ></Avatar.Text>
          ) : (
            <Image
              style={styles.image}
              source={{
                uri: "https://images.unsplash.com/photo-1614213951697-a45781262acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29ya2VyfGVufDB8fDB8fHww&w=1000&q=80",
              }}
            />
          )}
        </View>
        <View style={styles.topSection}>
          <View style={styles.infoContainer}>
            <Text
              style={{ fontWeight: "700", fontSize: 13, textAlign: "center" }}
            >
              {clientInfo.name}
            </Text>
            <Text style={{ fontSize: 11 }}>
              {clientInfo?.distanceInKm} Kilometers away
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 110,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    borderRadius: 20,
  },
  selectedContainer: {
    width: 250,
    height: 110,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    elevation: 10,
    borderColor: "black",
  },
  topSection: {
    width: "100%",
    height: "60%",
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: "45%",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    resizeMode: "cover",
    borderWidth: 0.5,
    borderColor: "blue",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: "blue",
  },
  infoContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
