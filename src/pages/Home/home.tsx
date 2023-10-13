import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { interactWorker, searchWorkers } from "../../connection/requests";
import {
  SegmentedButtons,
  ActivityIndicator,
  Button,
} from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import WorkerCard from "./workerCard";
import Modal from "react-native-modal";
import WorkerModal from "./workerModal";

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

  const [searching, setSearching] = useState(false);

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
      email: "clientemail1@example.com",
      latitude: 37,
      longitude: -122,
      minimumDistanceInKm: filters.minimumDistanceInKm,
      professionName: filters.professionName,
    };
    setSearching(true);
    searchWorkers(mockClientSearchInfo)
      .then((workersResponse) => {
        setWorkers(workersResponse.data);
        setSearching(false);
      })
      .catch((error) => {
        setWorkers([]);
        setSearching(false);
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

  const refusedWorker = () => {
    let mockInteractionInfo = {
      workerEmail: workers[0].email,
      clientEmail: "clientemail1@example.com",
      interactionType: "disliked",
    };
    interactWorker(mockInteractionInfo)
      .then((response) => {
        let updatedWorkers = workers.slice(1, workers.length);
        setWorkers(updatedWorkers);
        checkEmptyWorkers(updatedWorkers);
      })
      .catch((error) => console.log(error));
  };

  const acceptedWorker = () => {
    let mockInteractionInfo = {
      workerEmail: workers[0].email,
      clientEmail: "clientemail1@example.com",
      interactionType: "liked",
    };
    console.log(mockInteractionInfo);
    interactWorker(mockInteractionInfo)
      .then((response) => {
        let updatedWorkers = workers.slice(1, workers.length);
        setWorkers(updatedWorkers);
        checkEmptyWorkers(updatedWorkers);
      })
      .catch((error) => console.log(error));
  };

  const checkEmptyWorkers = (updatedWorkers: any) => {
    if (updatedWorkers.length === 0) {
      getWorkersForClient();
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <WorkerModal
        visible={visibleWorkerModal}
        workerInfo={workers[0]}
        onClose={() => hideWorkerModal()}
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
          <Text>These are workers for you!</Text>
          <WorkerCard
            workerInfo={workers[0]}
            onRefused={() => {
              refusedWorker();
            }}
            onAccepted={() => acceptedWorker()}
            onShowInfo={(worker: any) => showWorkerModal(worker)}
          />
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
    gap: 1,
  },
  searchOptionsContainer: {
    width: "90%",
    height: "20%",
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
    height: "70%",
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
});
