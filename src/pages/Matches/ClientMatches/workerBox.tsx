import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Image } from "react-native-animatable";
import { IconButton, Text } from "react-native-paper";
import { Avatar } from "react-native-paper";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { colors } from "../../../assets/colors";

export default function WorkerBox(props: any) {
  const { workerInfo } = props;

  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity
        style={styles.chatContainer}
        onPress={() => {
          props.onTouch(workerInfo);
        }}
      >
        <View style={styles.imageContainer}>
          {workerInfo?.picture === null ? (
            <Avatar.Text
              style={styles.avatar}
              labelStyle={{ bottom: 4 }}
              label={workerInfo?.name.charAt(0)}
            ></Avatar.Text>
          ) : (
            <Image
              style={styles.image}
              source={{
                uri: workerInfo?.picture,
              }}
            />
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={{ fontWeight: "700", fontSize: 13 }}>
            {workerInfo.name}
          </Text>
          <Text style={{ fontSize: 11 }}>
            "{workerInfo?.matchInfo?.clientProblemDescription}"
          </Text>
          <Text style={{ fontSize: 11 }}>
            Matched on {workerInfo?.matchInfo?.createdAt}
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        <IconButton
          icon={"flag"}
          onPress={() => props.onCancelMatch(workerInfo)}
        ></IconButton>
      </View>
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
  chatContainer: {
    width: "70%",
    height: "100%",
    flexDirection: "row",
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
    width: "100%",
    height: "100%",
    justifyContent: "center",
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderColor: "grey",
  },
});
