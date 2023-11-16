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
  getMatchedClients,
  getMatchedWorkers,
  workerCancelMatch,
} from "../../../connection/requests";
import { AuthContext } from "../../../context/AuthContext";
import { useCallback } from "react";
import { Image } from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";

interface matchInfo {
  createdAt: Date;
  clientProblemDescription: string;
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

  const [isSearching, setIsSearching] = useState(false);

  const onRemoveWorker = useCallback((clientEmail: string) => {
    setWorkersMatched((currentClients) => {
      return currentClients.filter((client) => client.email !== clientEmail);
    });
  }, []);

  useEffect(() => {
    obtainWorkersMatched();
  }, []);

  const obtainWorkersMatched = () => {
    setIsSearching(true);
    getMatchedWorkers(userToken)
      .then((response) => {
        setWorkersMatched(response.data);
        setIsSearching(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSearching(false);
      });
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
        ) : isSearching ? (
          <View
            style={{
              height: "50%",
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} animating={true} />
            <Text>Searching matches...</Text>
          </View>
        ) : (
          <Image
            style={styles.noResultImage}
            source={require("../../../assets/noresult3.png")}
          ></Image>
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
  noResultImage: {
    width: "60%",
    height: "60%",
    resizeMode: "cover",
    marginTop: 40,
  },
});
