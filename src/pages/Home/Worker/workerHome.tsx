import { useCallback, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Text, View } from "react-native-animatable";
import { ImageBackground, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {
  postMatchClient,
  postRejectClient,
  getLikedClients,
} from "../../../connection/requests";
import ClientInfo from "./clientInfo";
import client from "../../../connection/client";
import ClientScroll from "./clientScroll";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { colors } from "../../../assets/colors";
import images from "../../../assets/images";

export interface client {
  email: string;
  name: string;
  phoneNumber: string;
  picture: string;
  distanceInKm: number;
  birthDate: string;
  secretKey: string;
  interactionInfo: interaction | match;
}

export interface interaction {
  createdAt: string;
  clientProblemDescription: string;
}

export interface match {
  createdAt: string;
  clientProblemDescription: string;
}

export default function WorkerHome() {
  const { userToken } = useContext(AuthContext);

  const [clientSelected, setClientSelected] = useState<client>();
  const [clients, setClients] = useState<client[]>([]);

  const [searching, setSearching] = useState<boolean>(false);

  useEffect(() => {
    searchLikedClients();
  }, []);

  const searchLikedClients = () => {
    setSearching(true);

    getLikedClients(userToken)
      .then((clientsResponse) => {
        if (clientsResponse.data.length > 0) setClients(clientsResponse.data);
        setSearching(false);
      })
      .catch((error) => {
        console.log(error);
        setSearching(false);
      });
  };

  useEffect(() => {
    if (clients.length > 0) {
      setClientSelected(clients[0]);
    } else {
      setClientSelected(undefined);
      searchLikedClients();
    }
    console.log(clients);
  }, [clients]);

  const onRemoveClient = useCallback((clientEmail: string) => {
    setClients((currentClients) => {
      return currentClients.filter((client) => client.email !== clientEmail);
    });
  }, []);

  const matchClient = (client: client) => {
    const matchInfo = {
      clientEmail: client.email,
      clientSecretKey: client.secretKey,
    };

    postMatchClient(userToken, matchInfo)
      .then((response) => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Matched client",
          textBody: "Congrats! You accepted the job for client!",
          button: "Close",
        });
        onRemoveClient(client.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectClient = (client: client) => {
    const rejectInfo = {
      clientEmail: client.email,
      clientSecretKey: client.secretKey,
    };

    postRejectClient(userToken, rejectInfo)
      .then((response) => {
        console.log(response);
        onRemoveClient(client.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ImageBackground
      source={images.background}
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={{ fontWeight: "700", color: "black" }}>
            Clients who liked you
          </Text>
        </View>
        <View style={styles.resultsContainer}>
          {clients.length > 0 ? (
            <ClientScroll
              clients={clients}
              clientSelected={clientSelected}
              onClientSelected={(client: client) => setClientSelected(client)}
            />
          ) : searching ? (
            <View>
              <ActivityIndicator size={"large"} animating={true} />
              <Text>Searching clients who liked you...</Text>
            </View>
          ) : (
            <Text>Still no clients liked you...</Text>
          )}
        </View>
        <View style={styles.clientInfoContainer}>
          {clientSelected === undefined ? (
            clients.length > 0 ? (
              <Text>Touch a client to see his description!</Text>
            ) : (
              <Text> </Text>
            )
          ) : (
            <ClientInfo
              clientInfo={clientSelected}
              onMatch={(client: client) => matchClient(client)}
              onReject={(client: client) => rejectClient(client)}
            />
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  topSection: {
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  resultsContainer: {
    width: "100%",
    height: 170,
    alignItems: "center",
    justifyContent: "center",
  },
  clientInfoContainer: {
    width: "90%",
    height: "55%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    elevation: 20,
  },
  clientInfo: {
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
