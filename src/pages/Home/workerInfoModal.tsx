import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { Image } from "react-native-animatable";
import {
  Button,
  ActivityIndicator,
  IconButton,
  Avatar,
} from "react-native-paper";
import { getWorkerReviews } from "../../connection/requests";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface review {
  id: number;
  description: string;
  rating: number;
  clientName: string;
  clientPicture: string;
}

export default function WorkerInfoModal(props: any) {
  const [workerReviews, setWorkerReviews] = useState<review[]>([]);
  const [searching, setSearching] = useState(false);

  const { visible, workerInfo } = props;

  useEffect(() => {
    if (visible) {
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
                <Text style={{ fontSize: 30, fontWeight: "700" }}>
                  {workerInfo?.name}
                </Text>
                <Text style={{ fontSize: 22, fontWeight: "500" }}>
                  {workerInfo?.professionName}
                </Text>
                <Text>⛯ {workerInfo?.distanceInKm} Kilometers away</Text>
              </View>
              <View style={{ gap: 7, height: "40%" }}>
                <Text style={{ fontWeight: "600", fontSize: 18 }}>
                  Description
                </Text>
                <Text style={{ fontSize: 15 }}>{workerInfo?.description}</Text>
              </View>
            </View>
          </View>
          <View style={styles.modalReviewsContainer}>
            <Text style={{ fontWeight: "600", fontSize: 18 }}>
              Worker reviews
            </Text>
            {workerReviews.length > 0 ? (
              <ScrollView horizontal={true} style={styles.modalReviewsScroll}>
                {workerReviews.map((review) => {
                  return (
                    <View key={review?.id} style={styles.modalReviewItem}>
                      <View style={styles.modalReviewItemClientInfo}>
                        {workerInfo?.picture === "" ? (
                          <Avatar.Text
                            label={workerInfo?.name.charAt(0)}
                            style={styles.modalReviewItemAvatar}
                          ></Avatar.Text>
                        ) : (
                          <Image
                            style={styles.modalReviewItemImage}
                            source={{
                              uri: "https://images.unsplash.com/photo-1614213951697-a45781262acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29ya2VyfGVufDB8fDB8fHww&w=1000&q=80",
                            }}
                          ></Image>
                        )}
                        <Text style={{ fontWeight: "500" }}>
                          {review?.clientName} ⭐{review?.rating}
                        </Text>
                      </View>
                      <View style={styles.modalReviewItemDescriptionContainer}>
                        <Text style={{ fontSize: 12 }}>
                          " {review?.description} "
                        </Text>
                      </View>
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
          gap: 20,
        }}
      >
        <Button
          mode="elevated"
          onPress={() => {
            props.onRefused();
          }}
        >
          ✘
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
            props.onAccepted();
          }}
        >
          ✔
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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
    height: "30%",
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
    height: 100,
    width: 250,
    padding: 10,
    marginRight: 15,
    justifyContent: "space-between",
    borderStyle: "dotted",
    borderRadius: 10,
    borderWidth: 1,
    gap: 15,
  },
  modalReviewItemClientInfo: {
    width: "100%",
    height: "30%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  modalReviewItemImage: {
    height: 30,
    width: 30,
    borderRadius: 100,
    resizeMode: "cover",
  },
  modalReviewItemAvatar: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
  modalReviewItemDescriptionContainer: {
    width: "80%",
    height: "60%",
  },
  bottomContainer: {
    height: "20%",
  },
});
