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
import WorkerModal from "./workerModal";
import Swiper, { SwiperProps } from "react-native-deck-swiper";
import React from "react";

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
  const [index, setIndex] = useState(0);

  const [filters, setFilters] = useState<filter>({
    minimumDistanceInKm: 0,
    professionName: "",
  });

  const [searching, setSearching] = useState(false);

  const [professions, setProfessions] = useState<string[]>([]);
  const [minimumDistanceSelected, setMinimumDistanceSelected] = useState("");

  const [visibleWorkerModal, setVisibleWorkerModal] = useState(false);
  const hideWorkerModal = () => setVisibleWorkerModal(false);
  const showWorkerModal = () => {
    setVisibleWorkerModal(true);
  };

  useEffect(() => {
    getWorkersForClient();
    getProfessions();
  }, []);

  useEffect(() => {
    getWorkersForClient();
  }, [filters]);

  useEffect(() => {
    let numberMinimumDistanceSelected = Number(minimumDistanceSelected);

    setFilters({
      minimumDistanceInKm: numberMinimumDistanceSelected,
      professionName: filters.professionName,
    });
  }, [minimumDistanceSelected]);

  const getWorkersForClient = () => {
    let mockClientSearchInfo = {
      email: "clientemail1@example.com",
      latitude: 37,
      longitude: -122,
      minimumDistanceInKm: filters.minimumDistanceInKm,
      professionName: filters.professionName,
    };
    setSearching(true);
    resetWorkers();

    searchWorkers(mockClientSearchInfo)
      .then((workersResponse) => {
        setWorkers(workersResponse.data);
        setSearching(false);
      })
      .catch((error) => {
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

  const onSwiped = () => {
    setIndex(index + 1);
  };

  const refusedWorker = () => {
    let mockInteractionInfo = {
      workerEmail: workers[index]?.email,
      clientEmail: "clientemail1@example.com",
      interactionType: "disliked",
    };
    interactWorker(mockInteractionInfo)
      .then((response) => {})
      .catch((error) => console.log(error));
  };

  const acceptedWorker = () => {
    let mockInteractionInfo = {
      workerEmail: workers[index]?.email,
      clientEmail: "clientemail1@example.com",
      interactionType: "liked",
    };

    interactWorker(mockInteractionInfo)
      .then((response) => {})
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <WorkerModal
        visible={visibleWorkerModal}
        workerInfo={workers[index]}
        onClose={() => hideWorkerModal()}
        onAccepted={() => {
          swiperRef.current?.swipeRight();
          hideWorkerModal();
        }}
        onRefused={() => {
          swiperRef.current?.swipeLeft();
          hideWorkerModal();
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
        <View>
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
                  onShowInfo={() => showWorkerModal()}
                />
              )}
              onSwiped={onSwiped}
              onSwipedAll={() => {
                getWorkersForClient();
              }}
              onSwipedLeft={() => refusedWorker()}
              onSwipedRight={() => acceptedWorker()}
              stackSize={4}
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
  },
  searchOptionsContainer: {
    width: "90%",
    height: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  searchOptionsDistanceSelection: {
    width: "90%",
    alignItems: "center",
    gap: 10,
  },
  searchResultContainer: {
    height: "75%",
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
