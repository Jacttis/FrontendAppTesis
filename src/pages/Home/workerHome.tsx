import { useEffect, useState } from "react";
import { Text, View } from "react-native-animatable";
import ClientCard from "./clientCard";
import { ScrollView, StyleSheet } from "react-native";
import { postMatchClient, postRejectClient } from "../../connection/requests";

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
  const [clients, setClients] = useState<client[]>([
    {
      email: "cliente1@example.com",
      name: "Ramon Martinez",
      phoneNumber: "123-456-7890",
      picture: "url_de_la_imagen_1.jpg",
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
      clientProblemDescription: "Me anda mal malamalmal daskjdaskjda el termo",
    },
  ]);

  useEffect(() => {
    //setClients([]);
  }, []);

  const matchClient = (client: client) => {
    const matchInfo = {
      workerEmail: "email1@example.com",
      clientEmail: client.email,
      clientSecretKey: client.secretKey,
    };

    postMatchClient(matchInfo)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectClient = (client: client) => {
    const rejectInfo = {
      workerEmail: "email1@example.com",
      clientEmail: client.email,
      clientSecretKey: client.secretKey,
    };

    postRejectClient(rejectInfo)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={{ fontWeight: "700", color: "black" }}>
          Clients who liked you
        </Text>
      </View>
      <ScrollView
        style={styles.resultsContainer}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          padding: 10,
        }}
      >
        {clients.length > 0 ? (
          clients.map((client) => {
            return (
              <ClientCard
                key={client.email}
                clientInfo={client}
                onMatch={(client: client) => matchClient(client)}
                onReject={(client: client) => rejectClient(client)}
              />
            );
          })
        ) : (
          <Text>Still no clients liked you...</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topSection: {
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  resultsContainer: {
    width: "100%",
    height: "80%",
  },
});
