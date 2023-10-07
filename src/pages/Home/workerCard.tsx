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
            uri: "https://nypost.com/wp-content/uploads/sites/2/2013/08/construction_worker-300x450.jpg?quality=75&strip=all",
          }}
        />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.titlesContainer}>
          <Text style={styles.title}>{workerInfo.name}</Text>
          <Text style={styles.subTitle}>{workerInfo.professionName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text>⭐ {workerInfo?.averageRating}</Text>
          <Text> ⛯ {workerInfo?.distanceToClientInKm} Km</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={() => {
              props.onAccepted();
            }}
          >
            ✔
          </Button>
          <Button
            style={styles.button}
            onPress={() => {
              props.onShowInfo(workerInfo);
            }}
          >
            ⓘ
          </Button>
          <Button
            style={styles.button}
            onPress={() => {
              props.onRefused();
            }}
          >
            ✘
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "90%",
    padding: 10,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 20,
  },
  imageContainer: {
    height: "55%",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "95%",
    borderRadius: 10,
  },
  bodyContainer: {
    height: "45%",
    width: "90%",
    justifyContent: "space-evenly",
  },
  titlesContainer: {
    width: "70%",
    height: "40%",
    justifyContent: "space-evenly",
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
    height: "30%",
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
    borderStyle: "solid",
    borderColor: "blue",
    borderWidth: 1,
  },
});
