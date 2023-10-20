import { useEffect, useState, useRef } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { interactWorker, searchWorkers } from "../../connection/requests";
import {
  SegmentedButtons,
  ActivityIndicator,
  Button,
} from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import WorkerCard from "./workerCard";
import WorkerInfoModal from "./workerInfoModal";
import Swiper, { SwiperProps } from "react-native-deck-swiper";
import React from "react";
import LikedWorkerModal from "./likedWorkerModal";

interface filter {
  minimumDistanceInKm: number;
  professionName: string;
}

interface worker {
  email: string;
  name: string;
  description: string;
  professionName: string;
  averageRating: number;
  picture: string;
  distanceToClientInKm: number;
  secretKey: string;
}

const colors = {
  red: "#EC2379",
  blue: "#0070FF",
  gray: "#777777",
  white: "#ffffff",
  black: "#000000",
};

const swiperRef = React.createRef<Swiper<worker>>();

export default function Home() {
  const [workers, setWorkers] = useState<worker[]>([]);
  const [actualLikedWorker, setActualLikedWorker] = useState<worker>();
  const [index, setIndex] = useState(0);
  const [filters, setFilters] = useState<filter>({
    minimumDistanceInKm: 0,
    professionName: "",
  });

  const [searching, setSearching] = useState(false);
  const [waitToSearch, setWaitToSearch] = useState(false);

  const [professions, setProfessions] = useState<string[]>([]);
  const [minimumDistanceSelected, setMinimumDistanceSelected] = useState("");

  const [visibleWorkerInfoModal, setVisibleWorkerInfoModal] = useState(false);
  const hideWorkerInfoModal = () => setVisibleWorkerInfoModal(false);
  const showWorkerInfoModal = () => {
    setVisibleWorkerInfoModal(true);
  };
  const [visibleLikedWorkerModal, setVisibleLikedWorkerModal] = useState(false);
  const hideLikedWorkerModal = () => setVisibleLikedWorkerModal(false);
  const showLikedWorkerModal = () => setVisibleLikedWorkerModal(true);

  useEffect(() => {
    getProfessions();
    getWorkersForClient();
  }, []);

  useEffect(() => {
    resetWorkers();
    getWorkersForClient();
  }, [filters]);

  useEffect(() => {
    console.log(waitToSearch);
    if (!waitToSearch && index >= workers.length) {
      getWorkersForClient();
    }
  }, [waitToSearch]);

  useEffect(() => {
    let numberMinimumDistanceSelected = Number(minimumDistanceSelected);

    setFilters({
      minimumDistanceInKm: numberMinimumDistanceSelected,
      professionName: filters.professionName,
    });
  }, [minimumDistanceSelected]);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getWorkersForClient = () => {
    resetWorkers();
    setSearching(true);

    console.log("ENTERED");
    console.log("wait to search is " + waitToSearch);

    console.log("can search");
    let mockClientSearchInfo = {
      email: "clientemail1@example.com",
      latitude: 37,
      longitude: -122,
      minimumDistanceInKm: filters.minimumDistanceInKm,
      professionName: filters.professionName,
    };

    searchWorkers(mockClientSearchInfo)
      .then((workersResponse) => {
        setWorkers(workersResponse.data);
        console.log("gucci");
        setSearching(false);
      })
      .catch((error) => {
        console.log("error");
        setSearching(false);
      });
  };

  const resetWorkers = () => {
    setIndex(0);
    setWorkers([]);
  };

  const getProfessions = () => {
    let prof = [
      "All Professions",
      "Carpintero",
      "Cocinero",
      "Electricista",
      "Mecanico",
    ];
    setProfessions(prof);
  };

  useEffect(() => {
    if (index >= workers.length && index != 0) {
      //resetWorkers();
      //getWorkersForClient();
    }
  }, [index]);

  const onSwiped = () => {
    setIndex(index + 1);
  };

  const refusedWorker = (refusedWorker: worker) => {
    let mockInteractionInfo = {
      workerEmail: refusedWorker?.email,
      clientEmail: "clientemail1@example.com",
      interactionType: "disliked",
      workerSecretKey: refusedWorker?.secretKey,
    };
    interactWorker(mockInteractionInfo)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setWaitToSearch(false));
  };

  const startLikeProcess = (workerLiked: worker) => {
    setActualLikedWorker(workerLiked);
    showLikedWorkerModal();
  };

  const acceptedWorker = (clientProblemDescription: string) => {
    let mockInteractionInfo = {
      workerEmail: actualLikedWorker?.email,
      clientProblemDescription: clientProblemDescription,
      clientEmail: "clientemail1@example.com",
      interactionType: "liked",
      workerSecretKey: actualLikedWorker?.secretKey,
    };

    interactWorker(mockInteractionInfo)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setWaitToSearch(false));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <WorkerInfoModal
        visible={visibleWorkerInfoModal}
        workerInfo={workers[index]}
        onClose={() => hideWorkerInfoModal()}
        onAccepted={() => {
          hideWorkerInfoModal();
          swiperRef.current?.swipeRight();
        }}
        onRefused={() => {
          swiperRef.current?.swipeLeft();
          hideWorkerInfoModal();
        }}
      />
      <LikedWorkerModal
        visible={visibleLikedWorkerModal}
        workerInfo={actualLikedWorker}
        onClose={(clientProblemDescription: string) => {
          hideLikedWorkerModal();
          acceptedWorker(clientProblemDescription);
        }}
      />
      <View style={styles.searchOptionsContainer}>
        <View style={styles.searchOptionsDistanceSelection}>
          <Text>Choose maximum distance to worker</Text>
          <SegmentedButtons
            value={minimumDistanceSelected}
            onValueChange={setMinimumDistanceSelected}
            buttons={[
              {
                value: "10",
                label: "10Km",
              },
              {
                value: "25",
                label: "25Km",
              },
              {
                value: "50",
                label: "50Km",
              },
              {
                value: "100",
                label: "100Km",
              },
            ]}
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text>Choose the profession you want</Text>
          <SelectDropdown
            data={professions}
            defaultValueByIndex={0}
            defaultValue={"All Professions"}
            search={true}
            buttonStyle={styles.select}
            onSelect={(selectedItem, index) => {
              let professionSelected = index === 0 ? "" : selectedItem;
              setFilters({
                professionName: professionSelected,
                minimumDistanceInKm: filters.minimumDistanceInKm,
              });
            }}
          />
        </View>
      </View>
      {workers.length > 0 ? (
        <View style={styles.searchResultContainer}>
          <Text style={{ position: "absolute", top: 50 }}>
            These are workers for you!
          </Text>
          <View style={{ width: "100%", height: "90%" }}>
            <Swiper
              cards={workers}
              ref={swiperRef}
              cardIndex={index}
              renderCard={(card) => (
                <WorkerCard
                  workerInfo={card}
                  onRefused={() => {
                    swiperRef.current?.swipeLeft();
                  }}
                  onAccepted={() => {
                    swiperRef.current?.swipeRight();
                  }}
                  onShowInfo={() => showWorkerInfoModal()}
                />
              )}
              onSwiped={onSwiped}
              onSwipedLeft={() => {
                setWaitToSearch(true);
                refusedWorker(workers[index]);
              }}
              onSwipedRight={() => {
                setWaitToSearch(true);
                startLikeProcess(workers[index]);
              }}
              stackSize={3}
              stackSeparation={10}
              disableBottomSwipe
              disableTopSwipe
              animateOverlayLabelsOpacity
              backgroundColor={"transparent"}
              animateCardOpacity
              overlayLabels={{
                left: {
                  title: "NOPE",
                  style: {
                    label: {
                      backgroundColor: colors.red,
                      borderColor: colors.red,
                      color: colors.white,
                      borderWidth: 1,
                      fontSize: 24,
                    },
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                      marginTop: 20,
                      marginLeft: -20,
                    },
                  },
                },
                right: {
                  title: "LIKE",
                  style: {
                    label: {
                      backgroundColor: colors.blue,
                      borderColor: colors.blue,
                      color: colors.white,
                      borderWidth: 1,
                      fontSize: 24,
                    },
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      marginTop: 20,
                      marginLeft: 20,
                    },
                  },
                },
              }}
            />
          </View>
        </View>
      ) : searching ? (
        <View style={styles.searchResultContainer}>
          <ActivityIndicator size={"large"} animating={true} />
          <Text>Searching workers...</Text>
        </View>
      ) : (
        <View style={styles.searchResultContainer}>
          <Text>There are no workers for you with those filters...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: -20,
    backgroundColor: "white",
  },
  searchOptionsContainer: {
    width: "90%",
    height: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 10,
  },
  searchOptionsDistanceSelection: {
    width: "90%",
    alignItems: "center",
    gap: 10,
  },
  searchResultContainer: {
    height: "80%",
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  select: {
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 15,
  },
});
