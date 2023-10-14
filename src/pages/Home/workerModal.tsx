import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { Image } from "react-native-animatable";
import { Button, ActivityIndicator, IconButton } from "react-native-paper";
import { getWorkerReviews } from "../../connection/requests";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPersonDigging,
  faPerson,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import VectorIcon from "react-native-vector-icons/Ionicons";

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
    <Modal style={styles.container} isVisible={visible}>
      <ScrollView
        contentContainerStyle={{ height: "110%" }}
        style={styles.modalContainer}
      >
        <View style={styles.modalTopImage}>
          <Image
            style={styles.image}
            source={{
              uri: "https://images.unsplash.com/photo-1614213951697-a45781262acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29ya2VyfGVufDB8fDB8fHww&w=1000&q=80",
            }}
          />
        </View>
        <View style={styles.modalBody}>
          <View style={styles.modalDescriptionContainer}>
            <View style={{ justifyContent: "space-evenly", height: "100%" }}>
              <View style={{ gap: 3, height: "55%", marginTop: 5 }}>
                <Text style={{ fontSize: 25 }}>
                  <FontAwesomeIcon icon={faPerson} />
                  {workerInfo?.name}
                </Text>
                <Text style={{ fontSize: 25 }}>
                  <FontAwesomeIcon icon={faPersonDigging} />
                  {" " + workerInfo?.professionName}
                </Text>
                <Text>
                  ⛯ {workerInfo?.distanceToClientInKm} Kilometers away
                </Text>
              </View>
              <View style={{ gap: 3, height: "40%" }}>
                <Text style={{ fontWeight: "600" }}>Description</Text>
                <Text>{workerInfo?.description}</Text>
              </View>
            </View>
          </View>
          <View style={styles.modalReviewsContainer}>
            <Text style={{ fontWeight: "600" }}>Worker reviews</Text>
            {workerReviews.length > 0 ? (
              <ScrollView horizontal={true} style={styles.modalReviewsScroll}>
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
        }}
      >
        <Button
          mode="elevated"
          onPress={() => {
            props.onAccepted();
          }}
        >
          ✔
        </Button>
        <Button
          mode="elevated"
          onPress={() => {
            props.onClose();
          }}
        >
          ⤵
        </Button>
        <Button
          mode="elevated"
          onPress={() => {
            props.onRefused();
          }}
        >
          ✘
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
    height: "25%",
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
    height: 90,
    width: 250,
    padding: 10,
    marginRight: 15,
    justifyContent: "space-evenly",
    borderStyle: "dotted",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  bottomContainer: {
    height: "20%",
  },
});
