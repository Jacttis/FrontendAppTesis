import { StyleSheet } from "react-native";
import { Image, View } from "react-native-animatable";
import { Button, Text } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { colors } from "../../assets/colors";

export default function ClientInfo(props: any) {
  const { clientInfo } = props;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {clientInfo?.picture === "" ? (
          <Avatar.Text
            style={styles.avatar}
            labelStyle={{ fontSize: 55 }}
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
        <View style={styles.descriptionContainer}>
          <View
            style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              Client liked you in date
            </Text>
            <Text style={{ fontSize: 14, textAlign: "center" }}>
              {clientInfo?.interactionInfo?.createdAt}
            </Text>
          </View>
          <View
            style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              Client problem
            </Text>
            <Text style={{ fontSize: 14, textAlign: "center" }}>
              "{clientInfo?.interactionInfo?.clientProblemDescription}"
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Button
          style={{
            backgroundColor: "white",
            width: 100,
            height: 50,
            borderRadius: 100,
          }}
          onPress={() => {
            props.onReject(clientInfo);
          }}
        >
          <Text style={{ color: "red" }}>✘</Text>
        </Button>
        <Button
          style={{
            backgroundColor: "white",
            width: 100,
            height: 50,
            borderRadius: 100,
          }}
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
    width: "100%",
    height: "100%",
    backgroundColor: colors.terciary,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    elevation: 10,
  },
  topSection: {
    width: "100%",
    height: "50%",
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "45%",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    resizeMode: "cover",
    borderWidth: 4,
    borderColor: colors.secondary,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: colors.secondary,
  },
  descriptionContainer: {
    height: "70%",
    width: "80%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 30,
    gap: 15,
  },
  bottomSection: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
});
