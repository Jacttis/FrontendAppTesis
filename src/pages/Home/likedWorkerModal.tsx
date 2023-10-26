import Modal from "react-native-modal";
import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import { StyleSheet, TextInput } from "react-native";
import { useEffect, useState } from "react";

export default function LikedWorkerModal(props: any) {
  const [description, setDescription] = useState<string>("");
  const { workerInfo, visible } = props;

  return (
    <Modal style={styles.container} isVisible={visible}>
      <View style={styles.inputContainer}>
        <View style={styles.topContainer}>
          <Text
            style={{ textAlign: "center", fontWeight: "700", fontSize: 15 }}
          >
            Describe your problem
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={{ textAlign: "center", fontSize: 12 }}>
            If you want, give to {workerInfo?.name} a short description of your
            problem
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <TextInput
            style={{
              height: 75,
              borderRadius: 20,
              fontSize: 13,
              width: "70%",
            }}
            maxLength={60}
            multiline
            numberOfLines={4}
            textAlign="center"
            placeholder="You can leave this empty..."
            value={description}
            onChangeText={setDescription}
          ></TextInput>
        </View>
        <View style={styles.bottomContainer}>
          <Button
            onPress={() => {
              props.onClose(description);
              setDescription("");
            }}
            style={{
              borderRadius: 20,
              backgroundColor: "white",
              width: "50%",
            }}
          >
            <Text style={{ color: "green" }}>Ready</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    height: 300,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 15,
    gap: 20,
  },
  topContainer: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "grey",
  },
  infoContainer: {
    width: "100%",
    height: "15%",
  },
  descriptionContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "dotted",
    borderRadius: 20,
  },
  bottomContainer: {
    width: "100%",
    height: "20%",
    alignItems: "center",
  },
});
