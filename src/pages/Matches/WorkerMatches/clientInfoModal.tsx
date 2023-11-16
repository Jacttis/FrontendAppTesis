import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { Image } from "react-native-animatable";
import {
  Button,
  ActivityIndicator,
  IconButton,
  Avatar,
} from "react-native-paper";

export default function ClientInfoModal(props: any) {
  const { visible, clientInfo } = props;

  return (
    <Modal style={styles.container} isVisible={visible}>
      <ScrollView
        contentContainerStyle={{ height: "110%" }}
        style={styles.modalContainer}
      >
        <View style={styles.modalTopImage}>
          {clientInfo?.picture === null ? (
            <Image
              style={styles.image}
              source={require("../../../assets/defaultuser.jpg")}
            />
          ) : (
            <Image
              style={styles.image}
              source={{
                uri: clientInfo.picture,
              }}
            />
          )}
        </View>
        <View style={styles.modalBody}>
          <View style={styles.modalDescriptionContainer}>
            <View style={{ justifyContent: "space-evenly", height: "100%" }}>
              <View style={{ gap: 3, height: "55%", marginTop: 5 }}>
                <Text style={{ fontSize: 30, fontWeight: "700" }}>
                  {clientInfo?.name}
                </Text>
                <Text>⛯ {clientInfo?.distanceInKm} Kilometers away</Text>
              </View>
              <View style={{ gap: 7, height: "40%" }}>
                <Text style={{ fontWeight: "600", fontSize: 18 }}>
                  Problem Description
                </Text>
                <Text style={{ fontSize: 15, fontWeight: "400" }}>
                  " {clientInfo?.matchInfo?.clientProblemDescription} "
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomContainer}></View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          right: "50%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: 20,
        }}
      >
        <Button
          mode="elevated"
          onPress={() => {
            props.onClose();
          }}
        >
          ⤵
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    alignSelf: "center",
    marginBottom: "auto",
    marginTop: "auto",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
  },
  modalTopImage: {
    width: "100%",
    height: "35%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    resizeMode: "cover",
  },
  modalBody: {
    width: "100%",
    height: "65%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  modalDescriptionContainer: {
    height: "40%",
    width: "90%",
    gap: 10,
  },
  modalReviewsContainer: {
    width: "95%",
    height: "30%",
    borderStyle: "solid",
    backgroundColor: "white",
    justifyContent: "space-around",
    gap: 10,
    padding: 10,
  },
  modalReviewsScroll: {
    height: "30%",
    width: "100%",
    padding: 5,
  },
  modalReviewItem: {
    height: 100,
    width: 250,
    padding: 10,
    marginRight: 15,
    justifyContent: "space-between",
    borderStyle: "dotted",
    borderRadius: 10,
    borderWidth: 1,
    gap: 15,
  },
  modalReviewItemClientInfo: {
    width: "100%",
    height: "30%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  modalReviewItemImage: {
    height: 35,
    width: 35,
    borderRadius: 100,
    resizeMode: "cover",
  },
  modalReviewItemAvatar: {
    height: 35,
    width: 35,
    borderRadius: 100,
  },
  modalReviewItemDescriptionContainer: {
    width: "80%",
    height: "60%",
  },
  bottomContainer: {
    height: "20%",
  },
});
