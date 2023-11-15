import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Modal,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { StackActions, useNavigation } from "@react-navigation/native";
import {
  fetchAddressSuggestions,
  AddressSuggestion,
  getLocation,
} from "../../../services/GeoLocationService";
import { registerWorker } from "../../../connection/requests";
import { AuthContext } from "../../../context/AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../../../assets/colors";
import { FreelancerProfession } from "./professions";
import { Picker } from "@react-native-picker/picker";

export default function RegisterWorker() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<
    AddressSuggestion[]
  >([]);
  const [address, setAddress] = useState<string>("");
  const { signIn, setIsLoading } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedProfession, setSelectedProfession] =
    useState<FreelancerProfession>(FreelancerProfession.Unselected);
  const [emailError, setEmailError] = useState("");
  const showDatepicker = () => {
    setShow(true);
  };

  useEffect(() => {
    setIsLoading(true);
    getLocation().then((location: AddressSuggestion | null) => {
      if (location != null) {
        setAddress(location.display_name);
        setWorker((prevWorker: WorkerProps) => ({
          ...prevWorker,
          address: location.display_name,
          latitude: location.lat,
          longitude: location.lon,
        }));
      }
    });
    setIsLoading(false);
  }, []);

  const checkWorkerIsFullySetted = () => {
    return (
      worker.address != "" &&
      worker.name != "" &&
      worker.email != "" &&
      worker.password != "" &&
      worker.phoneNumber != "" &&
      worker.profession != FreelancerProfession.Unselected
    );
  };

  const makeRegisterWorker = () => {
    setIsLoading(true);
    if (checkWorkerIsFullySetted()) {
      registerWorker(worker)
        .then((response) => {
          const { accessToken, refreshToken, role } = response.data;
          signIn(accessToken, refreshToken, role, worker.email);
          //navigation.dispatch(StackActions.replace('bottomTabs'));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return Alert.alert("Please complete every field");
    }

    setIsLoading(false);
  };

  type WorkerProps = {
    email: string;
    name: string;
    latitude: string;
    address: string;
    longitude: string;
    password: string;
    phoneNumber: string;
    birthDate: string;
    profession: string;
  };

  const [worker, setWorker] = useState<WorkerProps>({
    email: "",
    name: "",
    latitude: "",
    longitude: "",
    address: "",
    password: "",
    phoneNumber: "",
    birthDate: "",
    profession: "",
  });

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

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

  const validateEmail = (email: string) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(email.toLowerCase())) {
      setEmailError("");
      return true;
    } else {
      setEmailError("Please enter a valid email address.");
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.viewMain}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.viewHeader}
      >
        <Text style={styles.message}>Register</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={500} style={styles.viewForm}>
        <Text style={styles.title}>Email Address</Text>
        <TextInput
          placeholder="yourname@example.com"
          placeholderTextColor="#000000"
          value={worker.email}
          onChangeText={(value) => {
            setWorker({ ...worker, email: value });
          }}
          style={styles.input}
          onEndEditing={(e) => validateEmail(e.nativeEvent.text)}
        />
        {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
        <Text style={styles.title}>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#000000"
          value={worker.name}
          onChangeText={(value) => {
            setWorker({ ...worker, name: value });
          }}
          style={styles.input}
        />

        <Text style={styles.title}>Password</Text>

        <View style={styles.viewPassword}>
          <TextInput
            placeholder="**********"
            value={worker.password}
            onChangeText={(value) => {
              setWorker({ ...worker, password: value });
            }}
            placeholderTextColor="#000000"
            style={styles.inputPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword((prevShow) => !prevShow)}
            style={{
              position: "absolute",
              right: 10,
              height: "100%",
              justifyContent: "center",
            }}
          >
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Phone number</Text>
        <TextInput
          placeholder="Phone Number (e.g., 2915123456)"
          placeholderTextColor="#000000"
          keyboardType="numeric"
          value={worker.phoneNumber}
          onChangeText={(value) => {
            setWorker({ ...worker, phoneNumber: value });
          }}
          style={styles.input}
        />
        <Text style={styles.title}>Birth Date</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.textBirthDate}>
            {new Date().toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate != undefined) {
                const year = selectedDate.getFullYear();
                const month = selectedDate.getMonth() + 1;
                const day = selectedDate.getDate();

                const dateString = `${year}-${month}-${day}`;

                setWorker({ ...worker, birthDate: dateString });
                setShow(false);
              }
            }}
          />
        )}

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Address</Text>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={styles.addressContainer}
          >
            <FontAwesome name="map-marker" size={20} color="#000" />
            <Text style={styles.addressText}>
              {worker.address ?? "Enter an address"}
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Your Address</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <FontAwesome name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <TextInput
                placeholder="Insert your address"
                value={address}
                onChangeText={handleAddressChange}
                placeholderTextColor="#000000"
                style={styles.inputModal}
                autoFocus
              />
              <FlatList
                data={addressSuggestions}
                keyExtractor={(item) => item.place_id.toString()}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    underlayColor="#DDDDDD"
                    onPress={() => {
                      setWorker((prevWorker) => ({
                        ...prevWorker,
                        address: item.display_name,
                        latitude: item.lat,
                        longitude: item.lon,
                      }));
                      setAddress(item.display_name);
                      setIsModalVisible(false);
                    }}
                    style={styles.item}
                  >
                    <Text style={styles.itemText}>{item.display_name}</Text>
                  </TouchableHighlight>
                )}
              />
            </View>
          </Modal>
          <Text style={styles.title}>Profession</Text>
          <Picker
            selectedValue={selectedProfession}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedProfession(itemValue);
              setWorker({ ...worker, profession: itemValue });
            }}
          >
            {Object.values(FreelancerProfession).map((profession, index) => (
              <Picker.Item key={index} label={profession} value={profession} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => {
            makeRegisterWorker();
          }}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewMain: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  viewPassword: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ced4da",
    backgroundColor: "#f8f9fa",
    color: "#495057",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 30, // espacio para el ícono
    marginBottom: 12,
  },
  viewHeader: {
    marginTop: "7%",
    marginBottom: "8%",
    marginStart: "5%",
  },
  title: {
    fontSize: 18,
    color: "#212529",
    marginBottom: 8,
    fontFamily: "Roboto",
    fontWeight: "500",
  },
  viewForm: {
    backgroundColor: "#ffffff",
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 11,
    paddingHorizontal: 20,
  },
  message: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  input: {
    paddingTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ced4da",
    marginBottom: 12,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
    color: "#495057",
  },
  inputPassword: {
    fontSize: 16,
    backgroundColor: "#f8f9fa",
    color: "#495057",
    paddingHorizontal: 10,
    flex: 1,
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
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: "500",
  },
  buttonRegister: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 0 },
  },
  item: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3, // para Android
  },
  itemText: {
    fontSize: 16,
    color: "#333", // Considera un color que se ajuste a tu tema
  },
  addressContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ced4da",
    backgroundColor: "#f8f9fa",
    color: "#495057",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15, // espacio para el ícono
    marginBottom: 12,
  },
  addressText: {
    marginLeft: 10,
    backgroundColor: "#f8f9fa",
    fontFamily: "Roboto",
    color: "#333",
  },
  modalView: {
    marginTop: 20,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    // Estas sombras son más pronunciadas para una mayor profundidad
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    // Un borde ligero puede ayudar a que el modal destaque más
    borderWidth: 1,
    borderColor: "#ddd", // Un color gris claro para el borde
    height: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputModal: {
    borderWidth: 1,
    borderColor: "#ddd", // Borde sutil para el campo de texto
    padding: 10,
    borderRadius: 5,
    width: "100%", // Asegurarse de que ocupa el ancho completo dentro del modal
    marginTop: 8, // Espacio después del título
    backgroundColor: "#f8f9fa",
  },
  closeButton: {
    position: "absolute", // Posicionar absolutamente para que esté en la esquina superior derecha
    top: 10,
    right: 10,
  },
  textBirthDate: {
    paddingTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ced4da",
    marginBottom: 12,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
    color: "#333",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 5,
  },
});
