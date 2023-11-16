import Modal from "react-native-modal";
import { Button, Text, ActivityIndicator } from "react-native-paper";
import { View } from "react-native";
import { StyleSheet, TextInput } from "react-native";
import { useEffect, useState, useContext } from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import { addWorkerReview } from "../../../connection/requests";
import { AuthContext } from "../../../context/AuthContext";

export default function ReviewModal(props: any) {
  const { userToken } = useContext(AuthContext);
  const [description, setDescription] = useState<string>("");
  const { workerInfo, visible } = props;
  const [actualRating, setActualRating] = useState(1);

  const [isWaiting, setIsWaiting] = useState(false);

  const ratingCompleted = (rating: any) => {
    setActualRating(rating);
  };

  const addReview = () => {
    setIsWaiting(true);
    const reviewInfo = {
      workerEmail: workerInfo.email,
      rating: actualRating,
      description: description,
    };
    addWorkerReview(userToken, reviewInfo)
      .then((response) => {
        props.onClose();
        setDescription("");
        setActualRating(1);
        setIsWaiting(false);
      })
      .catch((error) => {
        console.log(error);
        setIsWaiting(false);
      });
  };

  return (
    <Modal style={styles.container} isVisible={visible}>
      <View style={styles.inputContainer}>
        <Button
          style={{ position: "absolute", top: 0, left: -10 }}
          onPress={() => props.onClose()}
        >
          <Text style={{ fontWeight: "700" }}>X</Text>
        </Button>
        <View style={styles.topContainer}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 15,
            }}
          >
            Add your review!
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={{ textAlign: "center", fontSize: 12 }}>
            If you want, give an opinion to {workerInfo?.name} and rate him/her
            from 1⭐ to 5⭐!
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
        <Rating
          showRating
          onFinishRating={ratingCompleted}
          imageSize={30}
          fractions={1}
          jumpValue={0.5}
          minValue={1}
          ratingCount={5}
          style={{ paddingVertical: 10, height: "20%" }}
        />
        <View style={styles.bottomContainer}>
          {isWaiting ? (
            <View>
              <ActivityIndicator size={"small"} animating={true} />
              <Text>Making review...</Text>
            </View>
          ) : (
            <Button
              onPress={() => {
                addReview();
              }}
              style={{
                borderRadius: 20,
                backgroundColor: "white",
                width: "50%",
              }}
            >
              <Text style={{ color: "green" }}>Add review</Text>
            </Button>
          )}
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
    width: "95%",
    height: 550,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 15,
    gap: 10,
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
    height: "20%",
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
    justifyContent: "center",
  },
});
