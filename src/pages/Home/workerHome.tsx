import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native-animatable";
import ClientCard from "./clientCard";
import { ScrollView, StyleSheet } from "react-native";
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

interface client {
  email: string;
  name: string;
  phoneNumber: string;
  picture: string;
  distanceToWorkerInKm: number;
  birthDate: string;
  secretKey: string;
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
      distanceToWorkerInKm: 10,
      birthDate: "1990-01-15",
      secretKey: "A1231asFA",
      clientProblemDescription: "Me anda mal el termo",
    },
    {
      email: "cliente2@example.com",
      name: "Cliente 2",
      phoneNumber: "987-654-3210",
      picture: "url_de_la_imagen_2.jpg",
      distanceToWorkerInKm: 20,
      birthDate: "1985-08-20",
      secretKey: "A1231asFA",
      clientProblemDescription: "Me anda mal el termo",
    },
    {
      email: "cliente3@example.com",
      name: "Cliente 3",
      phoneNumber: "555-123-4567",
      picture: "url_de_la_imagen_3.jpg",
      distanceToWorkerInKm: 15,
      birthDate: "1995-03-10",
      secretKey: "A1231asFA",
      clientProblemDescription: "Me anda mal el termo",
    },
    {
      email: "cliente5@example.com",
      name: "Cliente 5",
      phoneNumber: "987-654-3210",
      picture: "url_de_la_imagen_2.jpg",
      distanceToWorkerInKm: 20,
      birthDate: "1985-08-20",
      secretKey: "A1231asFA",
      clientProblemDescription: "Me anda mal el termo",
    },
    {
      email: "cliente4@example.com",
      name: "Cliente 4",
      phoneNumber: "555-123-4567",
      picture: "url_de_la_imagen_3.jpg",
      distanceToWorkerInKm: 15,
      birthDate: "1995-03-10",
      secretKey: "A1231asFA",
      clientProblemDescription: "Me anda mal el termo",
    },
    {
      email: "cliente6@example.com",
      name: "Cliente 6",
      phoneNumber: "555-123-4567",
      picture: "url_de_la_imagen_3.jpg",
      distanceToWorkerInKm: 15,
      birthDate: "1995-03-10",
      secretKey: "A1231asFA",
      clientProblemDescription: "Me anda mal el termo",
    },
    {
      email: "cliente7@example.com",
      name: "Cliente 7",
      phoneNumber: "555-123-4567",
      picture: "url_de_la_imagen_3.jpg",
      distanceToWorkerInKm: 15,
      birthDate: "1995-03-10",
      secretKey: "A1231asFA",
      clientProblemDescription:
        "Me anda mal malamalmal daskjdaskjda el aaaaaaaa aa a a aaaaaaaaaaaa aaaaaatermo",
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    width: "80%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 90,
    borderWidth: 1,
    borderStyle: "dotted",
    borderRadius: 20,
  },
  clientInfo: {
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
