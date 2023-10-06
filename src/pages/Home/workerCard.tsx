import react, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Image } from "react-native-animatable";
import { Avatar, Button, Card } from "react-native-paper";

export default function WorkerCard(props: any) {
  const { workerInfo } = props;

  return (
    <Card style={styles.container}>
      <Card.Cover
        source={{
          uri: "https://nypost.com/wp-content/uploads/sites/2/2013/08/construction_worker-300x450.jpg?quality=75&strip=all",
        }}
      />
      <Card.Title
        title={workerInfo?.name}
        subtitle={workerInfo?.professionName}
      />
      <Card.Content>
        <Text>⭐ {workerInfo?.averageRating}</Text>
        <Text> ⛯ {workerInfo?.distanceToClientInKm} Km</Text>
      </Card.Content>
      <Card.Actions style={styles.buttonContainer}>
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
            props.onAccepted();
          }}
        >
          ✔
        </Button>
        <Button
          style={styles.button}
          onPress={() => {
            props.onAccepted();
          }}
        >
          ⓘ
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "90%",
    padding: 10,
  },
  cardText: {
    width: "80%",
    height: "15%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: "20%",
  },
  button: {
    width: "25%",
  },
  buttonInfo: {
    width: "25%",
  },
});
