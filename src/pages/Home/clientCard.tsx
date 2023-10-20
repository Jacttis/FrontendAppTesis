import { StyleSheet } from "react-native";
import { Image, View } from "react-native-animatable";
import { Button, Text } from "react-native-paper";

export default function ClientCard(props: any) {
  const { clientInfo } = props;

  return (
    <View style={styles.container}>
      <View style={{ height: "10%", width: "100%" }}></View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: "https://images.unsplash.com/photo-1614213951697-a45781262acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29ya2VyfGVufDB8fDB8fHww&w=1000&q=80",
          }}
        />
      </View>
      <View style={styles.topSection}>
        <View style={styles.infoContainer}>
          <Text
            style={{ fontWeight: "700", fontSize: 13, textAlign: "center" }}
          >
            {clientInfo.name}
          </Text>
          <Text style={{ fontSize: 11 }}>
            {clientInfo.distanceToWorkerInKm} Kilometers away
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={{ fontSize: 11, fontWeight: "700" }}>
            Client problem
          </Text>
          <Text style={{ fontSize: 10, textAlign: "center" }}>
            "{clientInfo.clientProblemDescription}"
          </Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Button
          style={{ backgroundColor: "white", borderRadius: 100 }}
          onPress={() => {
            props.onReject(clientInfo);
          }}
        >
          <Text style={{ color: "red" }}>✘</Text>
        </Button>
        <Button
          style={{ backgroundColor: "white", borderRadius: 100 }}
          onPress={() => {
            props.onMatch(clientInfo);
          }}
        >
          ✔
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 200,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
    elevation: 10,
    borderRadius: 20,
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
  infoContainer: {
    width: "100%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionContainer: {
    height: "40%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  bottomSection: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
});
