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
import { colors } from "../../../assets/colors";

export default function ClientBox(props: any) {
  const { clientInfo } = props;

  return (
    <GestureHandlerRootView>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          props.onTouch(clientInfo);
        }}
      >
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

        <View style={styles.infoContainer}>
          <Text style={{ fontWeight: "700", fontSize: 13 }}>
            {clientInfo.name}
          </Text>
          <Text style={{ fontSize: 11 }}>
            "{clientInfo?.interactionInfo.clientProblemDescription}"
          </Text>
          <Text style={{ fontSize: 11 }}>
            Matched on {clientInfo?.interactionInfo?.createdAt}
          </Text>
        </View>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
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
    width: "80%",
    height: "100%",
    justifyContent: "center",
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderColor: "grey",
  },
});
