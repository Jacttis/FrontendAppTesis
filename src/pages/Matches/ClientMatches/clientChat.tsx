import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Image } from "react-native-animatable";
import { Text } from "react-native-paper";
import { Avatar, IconButton } from "react-native-paper";
import { StackActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import { colors } from "../../../assets/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import VectorIcon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import ReviewModal from "./reviewModal";
import WorkerInfoModal from "./workerInfoModal";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default function ClientChat() {
  const navigation = useNavigation();
  const route: any = useRoute();
  const workerInfo = route.params?.info;
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [workerInfoModalVisible, setWorkerInfoModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ReviewModal
        visible={reviewModalVisible}
        workerInfo={workerInfo}
        onClose={() => setReviewModalVisible(false)}
      />
      <WorkerInfoModal
        visible={workerInfoModalVisible}
        workerInfo={workerInfo}
        onClose={() => setWorkerInfoModalVisible(false)}
      />
      <View style={styles.headerContainer}>
        <View style={styles.headerLeftContainer}>
          <IconButton
            icon={"arrow-left"}
            onPress={() => navigation.dispatch(StackActions.pop())}
          />
        </View>
        <View style={styles.headerMiddleContainer}>
          <GestureHandlerRootView>
            <TouchableOpacity
              onPress={() => {
                setWorkerInfoModalVisible(true);
              }}
            >
              <View style={styles.imageContainer}>
                {workerInfo?.picture === null ? (
                  <Avatar.Text
                    style={styles.avatar}
                    labelStyle={{ bottom: 10, fontSize: 20 }}
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
            </TouchableOpacity>
          </GestureHandlerRootView>

          <Text style={{ fontSize: 11 }}>{workerInfo?.name}</Text>
        </View>
        <View style={styles.headerRightContainer}>
          <IconButton
            icon={"message-draw"}
            onPress={() => setReviewModalVisible(true)}
          />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <VectorIcon name="calendar" color="black" size={20} />
          <Text>Matched on {workerInfo?.matchInfo?.createdAt}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <VectorIcon name="phone-portrait" color="black" size={20} />
          <Text>{workerInfo?.phoneNumber}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <VectorIcon name="person-circle" color="black" size={20} />
          <Text>"{workerInfo?.matchInfo?.clientProblemDescription}"</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <VectorIcon name="location" color="black" size={20} />
          <Text>{workerInfo?.distanceInKm} Kilometers away</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    gap: 20,
  },
  headerContainer: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    elevation: 10,
    backgroundColor: colors.white,
  },
  headerLeftContainer: {
    height: "100%",
    width: "33%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerMiddleContainer: {
    height: "100%",
    width: "33%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerRightContainer: {
    height: "100%",
    width: "33%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 5,
  },
  imageContainer: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    borderRadius: 100,
    elevation: 20,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 100,
    resizeMode: "cover",
    borderWidth: 0.5,
    borderColor: "blue",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: "blue",
  },
  infoContainer: {
    width: "80%",
    height: "80%",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dotted",
    borderRadius: 20,
    borderWidth: 1,
  },
});
