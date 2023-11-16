import { useEffect, useState, useRef, useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { interactWorker, searchWorkers } from "../../../connection/requests";
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
import { AuthContext } from "../../../context/AuthContext";
import { Image } from "react-native-animatable";
import Slider from "@react-native-community/slider";
import { colors } from "../../../assets/colors";

interface filter {
  minimumDistanceInKm: number;
  professionName: string;
}

export interface worker {
  email: string;
  name: string;
  description: string;
  professionName: string;
  averageRating: number;
  picture: string;
  distanceInKm: number;
  secretKey: string;
}

const swiperRef = React.createRef<Swiper<worker>>();

export default function Home() {
  const { userToken } = useContext(AuthContext);

  const [workers, setWorkers] = useState<worker[]>([]);
  const [actualLikedWorker, setActualLikedWorker] = useState<worker>();
  const [index, setIndex] = useState(0);
  const [filters, setFilters] = useState<filter>({
    minimumDistanceInKm: 0,
    professionName: "",
  });
  const [distanceRange, setDistanceRange] = useState(20);

  const [searching, setSearching] = useState(false);
  const [waitToSearch, setWaitToSearch] = useState(false);
  const waitToSearchRef = useRef(waitToSearch);
  waitToSearchRef.current = waitToSearch;
  const [timeOutWaitToSearch, setTimeoutWaitToSearch] = useState<any>(null);

  const [professions, setProfessions] = useState<string[]>([]);

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
  }, []);

  useEffect(() => {
    if (index >= workers.length && index != 0) {
      getWorkersForClient();
    }
  }, [index]);

  useEffect(() => {
    getWorkersForClient();
  }, [filters]);

  useEffect(() => {
    setFilters({
      minimumDistanceInKm: distanceRange,
      professionName: filters.professionName,
    });
  }, [distanceRange]);

  const getWorkersForClient = () => {
    resetWorkers();
    setSearching(true);

    let mockClientSearchInfo = {
      minimumDistanceInKm: filters.minimumDistanceInKm,
      professionName: filters.professionName,
    };

    searchWorkers(userToken, mockClientSearchInfo)
      .then((workersResponse) => {
        setWorkers(workersResponse.data);
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
    const freelancerProfessions = [
      "All professions",
      "Bricklayer",
      "Plumber",
      "Developer",
      "Designer",
      "Writer",
      "Translator",
      "Electrician",
      "Carpenter",
      "Painter",
      "Welder",
      "Mechanic",
      "Chef",
      "Baker",
      "Tailor",
      "Gardener",
      "Locksmith",
      "Photographer",
      "Videographer",
      "Editor",
      "SEO Expert",
      "Digital Marketer",
      "Graphic Designer",
      "Web Designer",
      "Software Engineer",
      "IT Consultant",
      "Tutor",
      "Fitness Coach",
      "Yoga Instructor",
      "Nutritionist",
      "Lawyer",
    ];
    setProfessions(freelancerProfessions);
  };

  const onSwiped = () => {
    setIndex(index + 1);
  };

  const refusedWorker = async (refusedWorker: worker) => {
    let mockInteractionInfo = {
      workerEmail: refusedWorker?.email,
      interactionType: "disliked",
      workerSecretKey: refusedWorker?.secretKey,
    };
    interactWorker(userToken, mockInteractionInfo)
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
        onClose={() => {
          hideLikedWorkerModal();
          setWaitToSearch(false);
          onSwiped();
        }}
      />
      <View style={styles.searchOptionsContainer}>
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
        <View style={styles.searchOptionsDistanceSelection}>
          <Text>Choose maximum distance to worker</Text>
          <Slider
            style={{ width: "85%", height: 20 }}
            minimumValue={1}
            maximumValue={50}
            minimumTrackTintColor={colors.primaryBlue}
            thumbTintColor={colors.primaryBlue}
            value={distanceRange}
            onSlidingComplete={(value) => setDistanceRange(Math.trunc(value))}
          ></Slider>
          <Text>{distanceRange} Kilometers Away</Text>
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
              onSwipedLeft={() => {
                setWaitToSearch(true);
                refusedWorker(workers[index]).then(onSwiped);
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
                      backgroundColor: colors.primaryBlue,
                      borderColor: colors.primaryBlue,
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
        <View style={styles.noResultContainer}>
          <Image
            style={styles.noResultImage}
            source={require("../../../assets/noresultsearch.png")}
          ></Image>
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
    justifyContent: "flex-start",
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
    gap: 15,
  },
  searchOptionsDistanceSelection: {
    width: "90%",
    alignItems: "center",
  },
  searchResultContainer: {
    height: "80%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  noResultContainer: {
    height: "80%",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  noResultImage: {
    width: "100%",
    height: "60%",
    resizeMode: "contain",
    marginTop: 80,
  },
  select: {
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 15,
  },
});
