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

export default function WorkerMatches() {
  const { userToken } = useContext(AuthContext);
  const [clientsMatched, setClientsMatched] = useState<client[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onRemoveClient = useCallback((clientEmail: string) => {
    setClientsMatched((currentClients) => {
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
      interactionInfo: {
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
      interactionInfo: {
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
      interactionInfo: {
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
      interactionInfo: {
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
      interactionInfo: {
        createdAt: "2023-10-31",
        clientProblemDescription: "xxxxxxasdasd",
      },
    },
  ];

  useEffect(() => {
    obtainClientsMatched();
  }, []);

  const obtainClientsMatched = () => {
    getMatchedClients(userToken)
      .then((response) => {
        setClientsMatched(response.data);
      })
      .catch((error) => console.log(error));
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
              navigation.navigate("chat", { clientInfo: client })
            }
            onCancelMatch={(client: client) => cancelMatch(client)}
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
