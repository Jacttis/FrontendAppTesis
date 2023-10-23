import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native-animatable";
import ClientCard from "./clientCard";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { postMatchClient, postRejectClient } from "../../connection/requests";
import ClientInfo from "./clientInfo";
import client from "../../connection/client";
import ClientScroll from "./clientScroll";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { colors } from "../../assets/colors";
import images from "../../assets/images";

interface client {
  email: string;
  name: string;
  phoneNumber: string;
  picture: string;
  distanceInKm: number;
  birthDate: string;
  secretKey: string;
  interactionInfo: interaction;
}

interface interaction {
  createdAt: string;
  clientProblemDescription: string;
}

export default function WorkerHome() {
  const [clientSelected, setClientSelected] = useState<client>();
  const [clients, setClients] = useState<client[]>([
    {
      email: "cliente1@example.com",
      name: "Ramon Martinez",
      phoneNumber: "123-456-7890",
      picture: "",
      distanceInKm: 10,
      birthDate: "1990-01-15",
      secretKey: "A1231asFA",
      interactionInfo: {
        clientProblemDescription: "Me anda mal el termo",
        createdAt: "1999-05-01",
      },
    },
    {
      email: "cliente2@example.com",
      name: "WA Martinez",
      phoneNumber: "123-456-7890",
      picture: "",
      distanceInKm: 10,
      birthDate: "1990-01-15",
      secretKey: "A1231asFA",
      interactionInfo: {
        clientProblemDescription: "asdasdasde anaadadaadamal el tadadermo",
        createdAt: "1999-05-01",
      },
    },
  ]);

  useEffect(() => {
    //setClients([]);
  }, []);

  useEffect(() => {
    if (clients.length > 0) {
      setClientSelected(clients[0]);
    } else setClientSelected(undefined);
  }, [clients]);

  const onRemoveClient = useCallback((clientEmail: string) => {
    setClients((currentClients) => {
      return currentClients.filter((client) => client.email !== clientEmail);
    });
  }, []);

  const matchClient = (client: client) => {
    const matchInfo = {
      workerEmail: "email1@example.com",
      clientEmail: client.email,
      clientSecretKey: client.secretKey,
    };
    onRemoveClient(client.email);
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Matched client",
      textBody: "Congrats! You accepted the job for client!",
      button: "Close",
    });

    /*
    postMatchClient(matchInfo)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
      */
  };

  const rejectClient = (client: client) => {
    const rejectInfo = {
      workerEmail: "email1@example.com",
      clientEmail: client.email,
      clientSecretKey: client.secretKey,
    };
    onRemoveClient(client.email);
    /*
    postRejectClient(rejectInfo)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
      */
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
          ) : (
            <Text>Still no clients liked you...</Text>
          )}
        </View>
        <View style={styles.clientInfoContainer}>
          {clientSelected === undefined ? (
            clients.length > 0 ? (
              <Text>Touch a client to see his description!</Text>
            ) : (
              <Text>Wait for a client to like you!</Text>
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
    backgroundColor: colors.background,
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
