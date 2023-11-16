import { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { client } from "../../Home/Worker/workerHome";
import ClientsMatchedScroll from "./clientsMatchedScroll";
import { colors } from "../../../assets/colors";
import { StackActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../routes/routes";
import {
  getMatchedClients,
  workerCancelMatch,
} from "../../../connection/requests";
import { AuthContext } from "../../../context/AuthContext";
import { useCallback } from "react";
import { Image } from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";

export default function WorkerMatches() {
  const { userToken } = useContext(AuthContext);
  const [clientsMatched, setClientsMatched] = useState<client[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isSearching, setIsSearching] = useState(false);

  const onRemoveClient = useCallback((clientEmail: string) => {
    setClientsMatched((currentClients) => {
      return currentClients.filter((client) => client.email !== clientEmail);
    });
  }, []);

  useEffect(() => {
    obtainClientsMatched();
  }, []);

  const obtainClientsMatched = () => {
    setIsSearching(true);
    getMatchedClients(userToken)
      .then((response) => {
        setClientsMatched(response.data);
        setIsSearching(false);
      })
      .catch((error) => {
        console.log(error);
        setIsSearching(false);
      });
  };

  const cancelMatch = (client: client) => {
    let cancelMatchInfo = {
      clientEmail: client?.email,
    };

    workerCancelMatch(userToken, cancelMatchInfo)
      .then((response) => {
        onRemoveClient(client.email);
      })
      .catch((error) => {});
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={{ fontWeight: "700", color: "black" }}>Your matches</Text>
      </View>
      <View style={styles.matchesContainer}>
        {clientsMatched.length > 0 ? (
          <ClientsMatchedScroll
            clientsMatched={clientsMatched}
            onClientSelected={(client: client) =>
              navigation.navigate("chat", { info: client })
            }
            onCancelMatch={(client: client) => cancelMatch(client)}
          />
        ) : isSearching ? (
          <View
            style={{
              height: "80%",
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              size={"large"}
              animating={true}
              color={colors.primaryBlue}
            />
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
    padding: 15,
  },
  matchesContainer: {
    width: "100%",
    height: "85%",
    marginTop: 5,
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
