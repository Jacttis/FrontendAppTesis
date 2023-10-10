import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { Button, ActivityIndicator } from "react-native-paper";
import { getWorkerReviews } from "../../connection/requests";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPersonDigging, faPerson } from "@fortawesome/free-solid-svg-icons";

interface review {
  id: number;
  description: string;
  rating: number;
  clientName: string;
  clientPicture: string;
}

export default function WorkerModal(props: any) {
  const [workerReviews, setWorkerReviews] = useState<review[]>([]);
  const [searching, setSearching] = useState(false);

  const { visible, workerInfo } = props;

  useEffect(() => {
    if (visible) {
      console.log(workerInfo);
      obtainWorkerReviews();
    }
  }, [visible]);

  const obtainWorkerReviews = () => {
    let workerData = {
      email: workerInfo?.email,
    };

    setSearching(true);

    getWorkerReviews(workerData)
      .then((response) => {
        setWorkerReviews(response.data);
        setSearching(false);
      })
      .catch((error) => {
        console.log(error);
        setSearching(false);
      });
  };

  return (
    <Modal isVisible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBody}>
          <View style={styles.modalDescriptionContainer}>
            <View style={{ gap: 5 }}>
              <Text style={{ fontWeight: "600" }}>Information</Text>
              <View style={{ gap: 3 }}>
                <Text>
                  <FontAwesomeIcon icon={faPerson} />
                  {workerInfo?.name}
                </Text>
                <Text>
                  <FontAwesomeIcon icon={faPersonDigging} />
                  {" " + workerInfo?.professionName}
                </Text>
                <Text>
                  ⛯ {workerInfo?.distanceToClientInKm} Kilometers away
                </Text>
              </View>
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
                    <View key={review?.id} style={styles.modalReviewItem}>
                      <Text style={{ fontWeight: "500" }}>
                        {review?.clientName} ⭐{review?.rating}
                      </Text>
                      <Text>" {review?.description} "</Text>
                    </View>
                  );
                })}
              </ScrollView>
            ) : searching ? (
              <ActivityIndicator size={"small"} animating={true} />
            ) : (
              <Text style={{ marginLeft: "auto", marginRight: "auto" }}>
                Worker has no reviews!
              </Text>
            )}
          </View>
        </View>
        <View style={styles.modalButtonContainer}>
          <Button onPress={() => props.onClose()}>
            <Text style={{ color: "white" }}>Close</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: "100%",
    height: "65%",
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    justifyContent: "space-between",
  },
  modalBody: {
    width: "100%",
    height: "90%",
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
    justifyContent: "space-around",
    gap: 10,
    padding: 10,
  },
  modalReviewsScroll: {
    height: "80%",
    width: "100%",
    padding: 5,
  },
  modalReviewItem: {
    height: 80,
    padding: 10,
    justifyContent: "space-evenly",
    borderStyle: "dotted",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  modalButtonContainer: {
    backgroundColor: "purple",
    width: "100%",
    height: "8%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
