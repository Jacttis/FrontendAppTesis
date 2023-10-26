import React, { useContext, useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ViewStyle,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { StackActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../../context/AuthContext";
import { loginClient, registerClient } from "../../connection/requests";
import { ActivityIndicator } from "react-native";

export default function Login() {
  const { isLoading, signIn, setIsLoading } = useContext(AuthContext);
  const navigation = useNavigation();

  type UserProps = {
    email: string;
    password: string;
  };

  const [user, setUser] = useState<UserProps>({
    email: "",
    password: "",
  });

  const makeLoginClient = () => {
    setIsLoading(true);
    loginClient(user)
      .then((response) => {
        const { accessToken, refreshToken, role } = response.data;
        console.log(response.data);
        signIn(accessToken, refreshToken, role);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "Email or password invalid, try again");
      });
    setIsLoading(false);
  };

  const styles = StyleSheet.create({
    viewMain: {
      flex: 1,
      backgroundColor: "#215a6d",
    },
    viewHeader: {
      marginTop: "14%",
      marginBottom: "8%",
      marginStart: "5%",
    },
    title: {
      fontSize: 20,
      marginTop: 28,
      color: "#2d2d29",
      fontFamily: "Roboto",
    },
    viewForm: {
      backgroundColor: "#FFF",
      flex: 1,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingStart: "5%",
      paddingEnd: "5%",
    },
    message: {
      color: "#FFF",
      fontSize: 28,
      fontWeight: "bold",
      fontFamily: "Roboto",
    },
    input: {
      borderBottomWidth: 1,
      height: 40,
      marginBottom: 12,
      fontSize: 16,
      color: "#000000",
    },
    buttonLogIn: {
      backgroundColor: "#215a6d",
      width: "100%",
      borderRadius: 15,
      paddingVertical: 8,
      marginTop: 14,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 18,
      fontFamily: "Roboto",
    },
    buttonRegister: {
      backgroundColor: "#215a6d",
      width: "100%",
      paddingVertical: 8,
      marginTop: 14,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
    },
  });

  return (
    <SafeAreaView style={styles.viewMain}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.viewHeader}
      >
        <Text style={styles.message}>Welcome!</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={500} style={styles.viewForm}>
        <Text style={styles.title}>What's your email?</Text>
        <TextInput
          placeholder="Insert your email"
          placeholderTextColor="#000000"
          style={styles.input}
          value={user.email}
          onChangeText={(value) => {
            setUser({ ...user, email: value });
          }}
        />

        <Text style={styles.title}>Password</Text>
        <TextInput
          placeholder="Insert your password"
          placeholderTextColor="#000000"
          value={user.password}
          style={styles.input}
          onChangeText={(value) => {
            setUser({ ...user, password: value });
          }}
        />

        <TouchableOpacity
          style={styles.buttonLogIn}
          onPress={() => {
            makeLoginClient();
          }}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" /> // Puedes cambiar el tamaño y el color a tu preferencia
        ) : null}

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => {
            navigation.dispatch(StackActions.replace("register"));
          }}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}
