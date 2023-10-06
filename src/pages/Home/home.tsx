import react, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import WorkerCard from "./workerCard";
import { Button } from "react-native-paper";
import { searchWorkers } from "../../connection/requests";
import GetLocation from "react-native-get-location";
import { SegmentedButtons } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";

interface filter {
  minimumDistanceInKm: number;
  professionName: string;
}

export default function Home() {
  const [workers, setWorkers] = useState<{ [key: string]: any }>([]);
  const [filters, setFilters] = useState<filter>({
    minimumDistanceInKm: 50,
    professionName: "",
  });
  const [professions, setProfessions] = useState<string[]>([]);
  const [minimumDistanceSelected, setMinimumDistanceSelected] = useState("");

  useEffect(() => {
    getWorkersForClient();
    getProfessions();
  }, []);

  useEffect(() => {
    console.log(workers);
  }, [workers]);

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
  };

  const acceptedWorker = () => {
    let updatedWorkers = workers.slice(1, workers.length);
    setWorkers(updatedWorkers);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
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
      <View style={styles.searchResultContainer}>
        <Text>These are workers for you!</Text>
        {workers.length > 0 ? (
          <WorkerCard
            workerInfo={workers[0]}
            onRefused={() => {
              removeRefusedWorker();
            }}
            onAccepted={() => acceptedWorker()}
          />
        ) : (
          <Button
            onPress={() => {
              getWorkersForClient();
            }}
          >
            Search Workers
          </Button>
        )}
      </View>
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
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
});
