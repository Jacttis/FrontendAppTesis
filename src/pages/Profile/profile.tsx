import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, TextInput, Linking, Alert } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { AddressSuggestion, getLocation } from "../../services/GeoLocationService";
import { getWorker } from "../../connection/requests";

export default function Profile() {
  const { userToken, signOut, email } = useContext(AuthContext);

  type UserProps = {
    email: string;
    name: string;
    address: string;
    picture: string;
    description: string;
    phoneNumber: string;
    birthDate: string;
    profession: string;
    certificate: string;
  };

  useEffect(() => {
    console.log(userToken);
    console.log(email);
    getWorker(userToken, email).then((response) => {
        setProfile(response.data);
      }
      ).catch( (error) => console.log(error)
    );

  }, []);

  const [profile, setProfile] = useState<UserProps>({
    address: "",
    birthDate: "",
    certificate: "",
    description: "",
    email: "",
    name: "",
    phoneNumber: "",
    picture: "https://via.placeholder.com/150",
    profession: ""

  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEdit = (field: React.SetStateAction<null>, value: React.SetStateAction<string>) => {
    setEditingField(field);
    setTempValue(value);
  };

  const handleSave = (field: any) => {
    setProfile({ ...profile, [field]: tempValue });
    setEditingField(null);
  };

  const handleUpdateProfile = () => {
    // Aquí iría la lógica para enviar la información actualizada al backend
    Alert.alert("Perfil Actualizado", "Los cambios en el perfil han sido guardados.");
  };

  const openCertificate = () => {
    Linking.openURL(profile.certificate);
  };

  const renderEditView = (field: string, value: string) => (
    <TextInput
      style={styles.input}
      value={tempValue}
      onChangeText={setTempValue}
      autoFocus
      onBlur={() => handleSave(field)}
    />
  );

  const renderTextView = (field, value) => (
    <TouchableOpacity onPress={() => handleEdit(field, value)}>
      <Text style={styles.textValue}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: profile.picture }}
          style={styles.profilePic}
        />
        <Text style={styles.label}>Name:</Text>
        {editingField === "name" ? renderEditView("name", profile.name) : renderTextView("name", profile.name)}
        <Text style={styles.label}>Email:</Text>
        {editingField === "email" ? renderEditView("email", profile.email) : renderTextView("email", profile.email)}
        <Text style={styles.label}>Phone Number:</Text>
        {editingField === "phoneNumber" ? renderEditView("phoneNumber", profile.phoneNumber) : renderTextView("phoneNumber", profile.phoneNumber)}
        <Text style={styles.label}>Address:</Text>
        {editingField === "address" ? renderEditView("address", profile.address) : renderTextView("address", profile.address)}
        <Text style={styles.label}>Description:</Text>
        {editingField === "description" ? renderEditView("description", profile.description) : renderTextView("description", profile.description)}
        <Text style={styles.label}>Birth Date:</Text>
        <TouchableOpacity>
          <Text style={styles.textValue}>{profile.birthDate}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Professión:</Text>
        <TouchableOpacity>
          <Text style={styles.textValue}>{profile.profession}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Certificate:</Text>
        <TouchableOpacity onPress={openCertificate}>
          <Text style={styles.linkText}>Show Certificate</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Icon name="sign-out" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7"
  },
  profileSection: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1"
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10
  },
  textValue: {
    alignSelf: "flex-start",
    fontSize: 16,
    color: "#333",
    marginBottom: 5
  },
  linkText: {
    alignSelf: "flex-start",
    fontSize: 16,
    color: "#0000FF",
    textDecorationLine: "underline",
    marginBottom: 5
  },
  input: {
    alignSelf: "stretch",
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: 2,
    marginBottom: 5
  },
  updateButton: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  logoutButtonText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 18
  }
});
