import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { searchWorkers } from "../../connection/requests";
import {
  SegmentedButtons,
  ActivityIndicator,
  Button,
} from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import WorkerCard from "./workerCard";
import Modal from "react-native-modal";

interface filter {
  minimumDistanceInKm: number;
  professionName: string;
}

interface worker {}

export default function Home() {
  const [workers, setWorkers] = useState<{ [key: string]: any }>([]);
  const [filters, setFilters] = useState<filter>({
    minimumDistanceInKm: 0,
    professionName: "",
  });
  const [professions, setProfessions] = useState<string[]>([]);
  const [minimumDistanceSelected, setMinimumDistanceSelected] = useState("");

  const [visibleWorkerModal, setVisibleWorkerModal] = useState(false);
  const [actualWorker, setActualWorker] = useState<{ [key: string]: any }>({});
  const hideWorkerModal = () => setVisibleWorkerModal(false);
  const showWorkerModal = (worker: any) => {
    setActualWorker(worker);
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
      email: "client@asd.com",
      latitude: 37,
      longitude: -122,
      minimumDistanceInKm: filters.minimumDistanceInKm,
      professionName: filters.professionName,
    };

    searchWorkers(mockClientSearchInfo)
      .then((workersResponse) => setWorkers(workersResponse.data))
      .catch((error) => {
        setWorkers([]);
      });
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

  const removeRefusedWorker = () => {
    let updatedWorkers = workers.slice(1, workers.length);
    setWorkers(updatedWorkers);
    checkEmptyWorkers(updatedWorkers);
  };

  const acceptedWorker = () => {
    let updatedWorkers = workers.slice(1, workers.length);
    setWorkers(updatedWorkers);
    checkEmptyWorkers(updatedWorkers);
  };

  const checkEmptyWorkers = (updatedWorkers: any) => {
    if (updatedWorkers.length === 0) {
      getWorkersForClient();
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Modal isVisible={visibleWorkerModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTop}>
            <Text style={{ fontWeight: "800", color: "black" }}>
              {workers[0]?.name}
            </Text>
          </View>
          <View style={styles.modalBody}>
            <View style={styles.modalDescriptionContainer}></View>
            <ScrollView style={styles.modalReviewsContainer}>
              <Text style={{ height: 100 }}>ASD</Text>
              <Text style={{ height: 100 }}>ASD</Text>
              <Text style={{ height: 100 }}>ASD</Text>
              <Text style={{ height: 100 }}>ASD</Text>
              <Text style={{ height: 100 }}>ASD</Text>
              <Text style={{ height: 100 }}>ASD</Text>
            </ScrollView>
          </View>
          <View style={styles.modalButtonContainer}>
            <Button onPress={() => hideWorkerModal()}>X</Button>
          </View>
        </View>
      </Modal>
      <View style={styles.searchOptionsContainer}>
        <View style={styles.searchOptionsDistanceSelection}>
          <Text>Choose minimum distance to worker</Text>
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
          <Text>These are workers for you!</Text>
          <WorkerCard
            workerInfo={workers[0]}
            onRefused={() => {
              removeRefusedWorker();
            }}
            onAccepted={() => acceptedWorker()}
            onShowInfo={(worker: any) => showWorkerModal(worker)}
          />
        </View>
      ) : (
        <View style={styles.searchResultContainer}>
          <ActivityIndicator size={"large"} animating={true} />
          <Text>Searching workers...</Text>
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
    gap: 1,
  },
  searchOptionsContainer: {
    width: "90%",
    height: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  searchOptionsDistanceSelection: {
    width: "90%",
    alignItems: "center",
    gap: 10,
  },
  searchResultContainer: {
    display: "flex",
    height: "60%",
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  select: {
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 15,
  },
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
  },
  modalReviewsContainer: {
    width: "90%",
    height: "60%",
  },
  modalButtonContainer: {
    backgroundColor: "blue",
    width: "100%",
    height: "8%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
