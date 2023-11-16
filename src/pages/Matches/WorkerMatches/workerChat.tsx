import * as React from "react";
import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Image } from "react-native-animatable";
import { Text } from "react-native-paper";
import { Avatar, IconButton } from "react-native-paper";
import { StackActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import { colors } from "../../../assets/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import VectorIcon from "react-native-vector-icons/Ionicons";
import ClientInfoModal from "./clientInfoModal";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function WorkerChat() {
  const navigation = useNavigation();
  const route: any = useRoute();
  const clientInfo = route.params?.info;
  const [clientInfoModalVisible, setClientInfoModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ClientInfoModal
        visible={clientInfoModalVisible}
        clientInfo={clientInfo}
        onClose={() => setClientInfoModalVisible(false)}
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
            <TouchableOpacity onPress={() => setClientInfoModalVisible(true)}>
              <View style={styles.imageContainer}>
                {clientInfo?.picture === null ? (
                  <Avatar.Text
                    style={styles.avatar}
                    labelStyle={{ bottom: 11, fontSize: 22 }}
                    label={clientInfo?.name.charAt(0)}
                  ></Avatar.Text>
                ) : (
                  <Image
                    style={styles.image}
                    source={{
                      uri: clientInfo?.picture,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </GestureHandlerRootView>

          <Text style={{ fontSize: 11 }}>{clientInfo?.name}</Text>
        </View>
        <View style={styles.headerRightContainer}>
          <IconButton icon={"flag"} onPress={() => {}} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <VectorIcon name="calendar" color="black" size={20} />
          <Text>Matched on {clientInfo?.matchInfo?.createdAt}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <VectorIcon name="phone-portrait" color="black" size={20} />
          <Text>{clientInfo?.phoneNumber}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <VectorIcon name="person-circle" color="black" size={20} />
          <Text>"{clientInfo?.matchInfo?.clientProblemDescription}"</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <VectorIcon name="location" color="black" size={20} />
          <Text>{clientInfo?.distanceInKm} Kilometers away</Text>
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
    backgroundColor: colors.primaryBlue,
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
