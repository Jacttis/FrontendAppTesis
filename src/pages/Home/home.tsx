import react, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import WorkerCard from "./workerCard";
import { Button } from "react-native-paper";
import { searchWorkers } from "../../connection/requests";
import GetLocation from "react-native-get-location";

export default function Home() {
  const [workers, setWorkers] = useState<{ [key: string]: any }>([]);

  useEffect(() => {
    getWorkersForClient();

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then((location) => {
        console.log(location);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, []);

  useEffect(() => {}, [workers]);

  const getWorkersForClient = () => {
    let mockClientData = {
      email: "client@asd.com",
      latitude: 37,
      longitude: -122,
      professionName: "Carpintero",
    };
    searchWorkers(mockClientData)
      .then((workersResponse) => setWorkers(workersResponse.data))
      .catch((error) => {
        setWorkers([]);
      });
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
});
