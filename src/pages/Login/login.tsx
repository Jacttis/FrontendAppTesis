import React, { useContext, useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { StackActions, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { loginClient, loginWorker } from "../../connection/requests";
import { Modal } from "react-native";
import { colors } from "../../assets/colors";

const Login: React.FC = () => {
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

  const [isModalVisible, setModalVisible] = useState(false);

  const [rol, setRole] = useState("");

  const makeLogin = async () => {
    setIsLoading(true);
    try {
      let response;
      if (rol == "client") {
        response = await loginClient(user);
      } else {
        response = await loginWorker(user);
      }

      const { accessToken, refreshToken, role } = response.data;
      signIn(accessToken, refreshToken, role, user.email);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Email or password invalid, try again");
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.header}>
        <Text style={styles.greeting}>Welcome!</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={500} style={styles.form}>
        <TextInput
          placeholder="Insert your email"
          style={styles.input}
          value={user.email}
          onChangeText={(email) => setUser({ ...user, email })}
        />

        <TextInput
          placeholder="Insert your password"
          secureTextEntry={true}
          style={styles.input}
          value={user.password}
          onChangeText={(password) => setUser({ ...user, password })}
        />
        <Text>Select your role:</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setRole("client")}
          >
            <Text style={styles.radioText}>Client</Text>
            <View
              style={
                rol === "client"
                  ? styles.radioCircleSelected
                  : styles.radioCircle
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setRole("worker")}
          >
            <Text style={styles.radioText}>Worker</Text>
            <View
              style={
                rol === "worker"
                  ? styles.radioCircleSelected
                  : styles.radioCircle
              }
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={makeLogin}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Log in</Text>
          )}
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.fullScreenModal}>
            <Text style={styles.modalQuestion}>
              Do you want to register as a client or as a worker?
            </Text>
            <TouchableOpacity
              style={styles.fullScreenButton}
              onPress={() => {
                navigation.dispatch(StackActions.replace("registerClient"));
              }}
            >
              <Text style={styles.buttonText}>Client</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fullScreenButton}
              onPress={() => {
                navigation.dispatch(StackActions.replace("registerWorker"));
              }}
            >
              <Text style={styles.buttonText}>Worker</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#215a6d",
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  header: {
    flex: 1,
    justifyContent: "center",
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  form: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 18,
    color: "#333",
  },
  button: {
    backgroundColor: "#215a6d",
    borderRadius: 15,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonSecondary: {
    backgroundColor: "#3c7a8e",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  radioText: {
    marginRight: 8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#215a6d",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  fullScreenModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF", // Puedes cambiar el color de fondo si lo deseas
  },
  modalQuestion: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  fullScreenButton: {
    backgroundColor: "#215a6d",
    borderRadius: 20,
    padding: 15,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default Login;
