import React, { useContext, useState } from "react";
import { Text, SafeAreaView, StyleSheet, TextInput, View, TouchableOpacity, FlatList } from "react-native";
import * as Animatable from "react-native-animatable";
import { StackActions, useNavigation } from "@react-navigation/native";
import { fetchAddressSuggestions, AddressSuggestion, getLocation } from "../../services/GeoLocationService";
import { registerClient } from "../../connection/requests";
import { AuthContext } from "../../context/AuthContext";


export default function Register() {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    viewMain: {
      flex: 1,
      backgroundColor: "#215a7d"
    },
    viewPassword: {
      width: "100%",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center"
    },
    viewHeader: {
      marginTop: "14%",
      marginBottom: "8%",
      marginStart: "5%"
    },
    title: {
      fontSize: 20,
      marginTop: 28,
      color: "#2d2d29",
      fontFamily: "Roboto"
    },
    viewForm: {
      backgroundColor: "#FFF",
      flex: 1,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingStart: "5%",
      paddingEnd: "5%"
    },
    message: {
      color: "#FFF",
      fontSize: 28,
      fontWeight: "bold",
      fontFamily: "Roboto"
    },
    input: {
      borderBottomWidth: 1,
      height: 40,
      marginBottom: 12,
      fontSize: 16,
      color: "#000000"
    },
    inputPassword: {

      borderBottomWidth: 1,
      height: 40,
      marginBottom: 12,
      fontSize: 16,
      color: "#000000",
      width: "100%",
      flex: 1
    },
    buttonLogIn: {
      backgroundColor: "#215a6d",
      width: "100%",
      borderRadius: 15,
      paddingVertical: 8,
      marginTop: 14,
      justifyContent: "center",
      alignItems: "center"

    },
    buttonText: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 18,
      fontFamily: "Roboto"
    },
    buttonRegister: {
      backgroundColor: "#215a6d",
      width: "100%",
      paddingVertical: 8,
      marginTop: 14,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<AddressSuggestion[]>([]);
  const [address, setAddress] = useState<string>("");
  const { isLoading, signIn, setIsLoading } = useContext(AuthContext);

  const makeRegisterClient = () => {
    setIsLoading(true);
    registerClient(client).then((response) => {
      const { accessToken, refreshToken } = response.data;
      signIn(accessToken, refreshToken);
      navigation.dispatch(StackActions.replace('bottomTabs'));
    }).catch((error) => {
      console.log(error);
    });
    setIsLoading(false);
  };

  type ClientProps = {
    email: string;
    name: string;
    latitude: string;
    address: string;
    longitude: string;
    password: string;
  };

  const [client, setClient] = useState<ClientProps>({
    email: "",
    name: "",
    latitude: "",
    longitude: "",
    address: "",
    password: ""
  });

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const handleAddressChange = (address: string) => {
    setAddress(address);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(async () => {
      const newSuggestions = await fetchAddressSuggestions(address);
      setAddressSuggestions(newSuggestions);
    }, 3000);

    setDebounceTimer(timer);
  };


  return (
    <SafeAreaView style={styles.viewMain}>

      <Animatable.View animation="fadeInLeft" delay={500} style={styles.viewHeader}>
        <Text style={styles.message}>Register</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={500} style={styles.viewForm}>
        <Text style={styles.title}>What's your email?</Text>
        <TextInput
          placeholder="Insert your email"
          placeholderTextColor="#000000"
          value={client.email}
          onChangeText={(value) => {
            setClient({ ...client, email: value });
          }}
          style={styles.input}
        />
        <Text style={styles.title}>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#000000"
          value={client.name}
          onChangeText={(value) => {
            setClient({ ...client, name: value });
          }}
          style={styles.input}
        />

        <Text style={styles.title}>Password</Text>

        <View style={styles.viewPassword}>
          <TextInput
            placeholder="Insert your password"
            value={client.password}
            onChangeText={(value) => {
              setClient({ ...client, password: value });
            }}
            placeholderTextColor="#000000"
            style={styles.inputPassword}
            secureTextEntry={!showPassword}

          />
          <TouchableOpacity onPress={() => setShowPassword(prevShow => !prevShow)}>
            <Text>{showPassword ? "Hide" : "Show"}</Text>
          </TouchableOpacity>

        </View>
        <View>
          <Text style={styles.title}>Address</Text>
          <TextInput
            placeholder="Insert your address"
            value={address}
            onChangeText={handleAddressChange}
            placeholderTextColor="#000000"
            style={styles.input}
          />
          <FlatList<AddressSuggestion>
            data={addressSuggestions}
            keyExtractor={(item: AddressSuggestion) => item.place_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setClient((prevClient: ClientProps) => ({
                ...prevClient,
                address: item.display_name,
                latitude: item.lat,
                longitude: item.lon
              }))}>
                <Text>{item.display_name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.buttonLogIn}
            onPress={() => {
              getLocation().then((location: AddressSuggestion | null) => {
                if (location != null) {
                  setAddress(location.display_name);
                  setClient((prevClient: ClientProps) => ({
                    ...prevClient,
                    address: location.display_name,
                    latitude: location.lat,
                    longitude: location.lon
                  }));
                }

              });
            }
            }>
            <Text style={styles.buttonText}>My actual location</Text>

          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => {
            makeRegisterClient();

          }
          }>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

      </Animatable.View>

    </SafeAreaView>
  );


}

