import react, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "react-native-animatable";
import { Button } from "react-native-paper";

export default function WorkerCard(props: any) {
  const { workerInfo } = props;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: "https://images.unsplash.com/photo-1614213951697-a45781262acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29ya2VyfGVufDB8fDB8fHww&w=1000&q=80",
          }}
        />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.titlesContainer}>
          <Text style={styles.title}>{workerInfo?.name}</Text>
          <Text style={styles.subTitle}>{workerInfo?.professionName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text>⭐ {workerInfo?.averageRating}</Text>
          <Text> ⛯ {workerInfo?.distanceInKm} Km</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={() => {
              props.onRefused();
            }}
          >
            ✘
          </Button>

          <Button
            style={styles.button}
            onPress={() => {
              props.onShowInfo();
            }}
          >
            ⓘ
          </Button>
          <Button
            style={styles.button}
            onPress={() => {
              props.onAccepted();
            }}
          >
            ✔
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 450,
    padding: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 5,
  },
  imageContainer: {
    height: "60%",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "95%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  bodyContainer: {
    height: "40%",
    width: "90%",
    justifyContent: "space-evenly",
  },
  titlesContainer: {
    width: "70%",
    height: "40%",
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
  },
  subTitle: {
    fontSize: 14,
  },
  infoContainer: {
    width: "50%",
    height: "25%",
  },
  buttonContainer: {
    width: "90%",
    height: "35%",
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  button: {
    width: "20%",
    height: "70%",
  },
});
