import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { Button, ActivityIndicator } from "react-native-paper";
import { getWorkerReviews } from "../../connection/requests";

interface review {
  description: string;
  rating: number;
}

export default function WorkerModal(props: any) {
  const [workerReviews, setWorkerReviews] = useState<review[]>([]);

  const { visible, workerInfo } = props;

  useEffect(() => {
    if (visible) {
      console.log(workerInfo);
      obtainWorkerReviews();
    }
  }, [visible]);

  const obtainWorkerReviews = () => {
    let workerData = {
      email: workerInfo.email,
    };

    getWorkerReviews(workerData)
      .then((response) => setWorkerReviews(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <Modal isVisible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalTop}>
          <Text style={{ fontWeight: "600", color: "black" }}>
            {workerInfo?.name}
          </Text>
        </View>
        <View style={styles.modalBody}>
          <View style={styles.modalDescriptionContainer}>
            <View style={{ gap: 3 }}>
              <Text style={{ fontWeight: "600" }}>Information</Text>
              <Text>{workerInfo.professionName}</Text>
              <Text>⛯ {workerInfo.distanceToClientInKm} Kilometers away</Text>
            </View>
            <View style={{ gap: 3 }}>
              <Text style={{ fontWeight: "600" }}>Description</Text>
              <Text>{workerInfo?.description}</Text>
            </View>
          </View>
          <View style={styles.modalReviewsContainer}>
            <Text style={{ fontWeight: "600" }}>Worker reviews</Text>
            {workerReviews.length > 0 ? (
              <ScrollView style={styles.modalReviewsScroll}>
                {workerReviews.map((review) => {
                  return (
                    <View style={styles.modalReviewItem}>
                      <Text>" {review?.description} "</Text>
                      <Text>⭐{review?.rating}</Text>
                    </View>
                  );
                })}
              </ScrollView>
            ) : (
              <ActivityIndicator size={"large"} animating={true} />
            )}
          </View>
        </View>
        <View style={styles.modalButtonContainer}>
          <Button onPress={() => props.onClose()}>X</Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: "90%",
    height: "65%",
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  modalTop: {
    width: "100%",
    height: "8%",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalDescriptionContainer: {
    height: "35%",
    width: "90%",
    justifyContent: "center",
    gap: 15,
  },
  modalReviewsContainer: {
    width: "95%",
    height: "60%",
    borderStyle: "solid",
    backgroundColor: "white",
    justifyContent: "center",
    gap: 10,
    elevation: 20,
    padding: 10,
  },
  modalReviewsScroll: {
    height: "80%",
    width: "100%",
    padding: 5,
  },
  modalReviewItem: {
    height: 75,
    justifyContent: "space-evenly",
    borderStyle: "dotted",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  modalButtonContainer: {
    backgroundColor: "blue",
    width: "100%",
    height: "8%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
