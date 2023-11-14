import { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import WorkerMatchedScroll from "./workerMatchedScroll";
import { colors } from "../../../assets/colors";
import { StackActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../routes/routes";
import {
  clientCancelMatch,
  getMatchedClients, getMatchedWorkers,
  workerCancelMatch
} from "../../../connection/requests";
import { AuthContext } from "../../../context/AuthContext";
import { useCallback } from "react";

interface matchInfo {
  createdAt: string,
  clientProblemDescription: string
}
export interface workerInfo {
  email: string;
  name: string;
  description: string;
  professionName: string;
  averageRating: number;
  picture: string;
  distanceInKm: number;
  secretKey: string;
  matchInfo: matchInfo;
}
export default function ClientMatches() {
  const { userToken } = useContext(AuthContext);
  const [workersMatched, setWorkersMatched] = useState<workerInfo[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onRemoveWorker = useCallback((clientEmail: string) => {
    setWorkersMatched((currentClients) => {
      return currentClients.filter((client) => client.email !== clientEmail);
    });
  }, []);


  const data = [
    {
      email: "clientemail1@example.com",
      name: "lean",
      phoneNumber: "1231232",
      distanceInKm: 50,
      birthDate: "1999-05-05",
      secretKey: "123123h1j2k",
      picture: "",
      description:"asd",
      professionName: "sda",
      averageRating:5,
      matchInfo: {
        createdAt: "2023-10-31",
        clientProblemDescription: "asdasd",
      },
    },
    {
      email: "clientemail4@example.com",
      name: "aaaalean",
      phoneNumber: "1231232",
      distanceInKm: 50,
      birthDate: "1999-05-05",
      secretKey: "123123h1j2k",
      picture: "",
      description:"asd",
      professionName: "sda",
      averageRating:5,
      matchInfo: {
        createdAt: "2023-10-31",
        clientProblemDescription: "sscccasdasd",
      },
    },
    {
      email: "clientemail3@example.com",
      name: "leasdasan",
      phoneNumber: "1231232",
      distanceInKm: 50,
      birthDate: "1999-05-05",
      secretKey: "123123h1j2k",
      picture: "",
      description:"asd",
      professionName: "sda",
      averageRating:5,
      matchInfo: {
        createdAt: "2023-10-31",
        clientProblemDescription: "eaaaa",
      },
    },
    {
      email: "clientemail2@example.com",
      name: "leanadas",
      phoneNumber: "1231232",
      distanceInKm: 50,
      birthDate: "1999-05-05",
      secretKey: "123123h1j2k",
      picture: "",
      description:"asd",
      professionName: "sda",
      averageRating:5,
      matchInfo: {
        createdAt: "2023-10-31",
        clientProblemDescription: "asdasd",
      },
    },
    {
      email: "clientemail5@example.com",
      name: "xxxxxleanadas",
      phoneNumber: "1231232",
      distanceInKm: 50,
      birthDate: "1999-05-05",
      secretKey: "123123h1j2k",
      picture: "",
      description:"asd",
      professionName: "sda",
      averageRating:5,
      matchInfo: {
        createdAt: "2023-10-31",
        clientProblemDescription: "xxxxxxasdasd",
      },
    },
  ];
  

  useEffect(() => {
    //obtainWorkersMatched();
    setWorkersMatched(data)
  }, []);

  const obtainWorkersMatched = () => {
    getMatchedWorkers(userToken)
      .then((response) => {
        setWorkersMatched(response.data);
      })
      .catch((error) => console.log(error));
  };

  const cancelMatch = (worker: workerInfo) => {
    let cancelMatchInfo = {
      workerEmail: worker?.email,
    };

    clientCancelMatch(userToken, cancelMatchInfo)
      .then((response) => {
        onRemoveWorker(worker.email);
      })
      .catch((error) => {});
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={{ fontWeight: "700", color: "black" }}>Your matches</Text>
      </View>
      <View style={styles.matchesContainer}>
        {workersMatched.length > 0 ? (
          <WorkerMatchedScroll
            workersMatched={workersMatched}
            onWorkerSelected={(worker: workerInfo) =>
              navigation.navigate("chat", { info: worker })
            }
            onCancelMatch={(worker: workerInfo) => cancelMatch(worker)}
          />
        ) : (
          <Text>You have no matches...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  textContainer: {
    width: "100%",
    marginTop: 20,
    padding: 5,
  },
  matchesContainer: {
    width: "100%",
    height: "85%",
    marginTop: 15,
    padding: 10,
    alignItems: "center",
  },
});
