import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, ViewStyle, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    viewMain: {
      flex: 1,
      backgroundColor: "#215a6d"
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
      fontFamily: "Roboto"
    },
    buttonRegister: {
      backgroundColor: "#215a6d",
      width: "100%",
      paddingVertical: 8,
      marginTop: 14,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15,
    }
  });

  return (
    <SafeAreaView style={styles.viewMain}>

      <Animatable.View animation="fadeInLeft" delay={500} style={styles.viewHeader}>
        <Text style={styles.message}>Welcome!</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={500} style={styles.viewForm}>
        <Text style={styles.title}>What's your email?</Text>
        <TextInput
          placeholder="Insert your email"
          placeholderTextColor="#000000"
          style={styles.input}
        />

        <Text style={styles.title}>Password</Text>
        <TextInput
          placeholder="Insert your password"
          placeholderTextColor="#000000"
          style={styles.input}
        />

        <TouchableOpacity style={styles.buttonLogIn}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

      </Animatable.View>

    </SafeAreaView>
    /*<SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 50 }}> Login </Text>
        <Button onPress={() => navigation.navigate("bottomTabs")}>
          <Text>a que no te da pa clickear</Text>
        </Button>
      </View>
    </SafeAreaView>;*/
  );
}