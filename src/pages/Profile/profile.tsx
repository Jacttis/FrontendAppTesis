import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AuthContext } from "../../context/AuthContext";
import {
  getClient,
  getWorker,
  getWorkerRating,
} from "../../connection/requests";
import { Image } from "react-native-animatable";
import { Avatar } from "react-native-paper";
import { colors } from "../../assets/colors";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { role, userToken, signOut, email } = useContext(AuthContext);
  const navigation = useNavigation();

  const [averageRating, setAverageRating] = useState(1);

  type UserProps = {
    email: string;
    name: string;
    address: string;
    picture: string;
    description: string;
    phoneNumber: string;
    birthDate: Date;
    profession: {
      professionName: string;
    };
    certificate: string;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserInfo();
    });

    return unsubscribe;
  }, [navigation]);

  const getUserInfo = () => {
    if (role === "worker") {
      getWorkerAverageRating();
      getWorker(userToken, email)
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => console.log(error));
    } else {
      getClient(userToken, email)
        .then((response) => {
          setProfile(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  // Estado inicial del perfil
  const [profile, setProfile] = useState<UserProps>({
    name: "",
    email: "",
    phoneNumber: "",
    picture: "",
    address: "",
    description: "",
    profession: { professionName: "" },
    certificate: "",
    birthDate: new Date(),
  });

  const getWorkerAverageRating = () => {
    let workerInfo = {
      email: email,
    };
    getWorkerRating(workerInfo)
      .then((response) => {
        console.log(response.data);
        setAverageRating(parseFloat(response.data.averageRating));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Gestionar los campos de edición
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  // Función para iniciar la edición de un campo
  const handleEdit = (field: any, currentValue: any) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  // Función para guardar la edición de un campo
  const handleSave = (field: any) => {
    setProfile({ ...profile, [field]: tempValue });
    setEditingField(null);
  };

  // Función para renderizar la vista de edición
  const renderEditView = (field: any, value: any) => (
    <TextInput
      style={styles.input}
      value={tempValue}
      onChangeText={setTempValue}
      autoFocus
      onEndEditing={() => handleSave(field)}
    />
  );

  // Función para renderizar la vista de texto
  const CustomTextView = ({ field, value }: { field: any; value: any }) => (
    <TouchableOpacity
      style={{ width: 200 }}
      onPress={() => handleEdit(field, value)}
    >
      <Text style={styles.textValue}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileContainer}>
          {profile.picture === null || profile.picture === "" ? (
            <Avatar.Text
              style={styles.profileAvatar}
              labelStyle={{ fontSize: 50 }}
              label={profile?.name.charAt(0)}
            ></Avatar.Text>
          ) : (
            <Image
              style={styles.profileImage}
              source={{ uri: profile.picture }}
            />
          )}

          <Text style={styles.nameText}>{profile.name}</Text>
          {role === "worker" ? (
            <View style={styles.ratingContainer}>
              <Icon
                name="star"
                size={18}
                color="#000"
                style={styles.iconStyle}
              />
              {/*<Text style={styles.ratingText}>{averageRating}</Text>*/}
            </View>
          ) : (
            <Text></Text>
          )}
        </View>

        <View style={styles.detailsContainer}>
          <Icon
            name="envelope"
            size={18}
            color="#000"
            style={styles.iconStyle}
          />
          {editingField === "email" ? (
            renderEditView("email", profile.email)
          ) : (
            <CustomTextView field={"email"} value={profile.email} />
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Icon name="phone" size={18} color="#000" style={styles.iconStyle} />
          {editingField === "phoneNumber" ? (
            renderEditView("phoneNumber", profile.phoneNumber)
          ) : (
            <CustomTextView field={"phoneNumber"} value={profile.phoneNumber} />
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Icon
            name="map-marker-alt"
            size={18}
            color="#000"
            style={styles.iconStyle}
          />
          <CustomTextView field={"address"} value={profile.address} />
        </View>
        <View style={styles.detailsContainer}>
          <Icon
            name="birthday-cake"
            size={18}
            color="#000"
            style={styles.iconStyle}
          />
          <CustomTextView
            field={"birthDate"}
            value={profile.birthDate.toString()}
          />
        </View>
        {role === "worker" ? (
          <View style={styles.detailsContainer}>
            <Icon
              name="user-tie"
              size={18}
              color="#000"
              style={styles.iconStyle}
            />
            <CustomTextView
              field={"profession"}
              value={profile.profession.professionName}
            />
          </View>
        ) : (
          <View></View>
        )}

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    alignItems: "center",
    paddingVertical: 20,
    flex: 1,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#d3d3d3",
    marginBottom: 10,
  },
  profileAvatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#d3d3d3",
    backgroundColor: colors.primaryBlue,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 16,
    color: "#808080",
    marginBottom: 15,
  },
  detailsContainer: {
    width: "100%",
    justifyContent: "center",
    gap: 20,
    flexDirection: "row",
    marginLeft: 60,
  },
  iconStyle: {
    width: 25,
    height: 50,
    textAlign: "left",
    paddingVertical: 10,
  },
  textValue: {
    fontSize: 16,
    color: "#000",
    paddingVertical: 10,
  },
  input: {
    fontSize: 16,
    color: "#000",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
    width: "100%",
  },
  button: {
    backgroundColor: colors.primaryBlue,
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  ratingContainer: {
    alignItems: "center",
    gap: 2,
    flexDirection: "row",
  },
});

export default ProfileScreen;
