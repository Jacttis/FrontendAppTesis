/*
import React, { useState } from "react";
import Geolocation from 'react-native-geolocation-service';
import { View, TextInput, Button, StyleSheet, PermissionsAndroid } from "react-native";



type ClienteProps = {
  email: string;
  name: string;
  picture: string;
  latitude: string;
  longitude: string;
  location:boolean;
  password: string;
  birthDate: string;
};


const ClientRegister: React.FC = () => {
  const [cliente, setCliente] = useState<ClienteProps>({
    email: "",
    name: "",
    picture: "",
    latitude: "",
    longitude: "",
    location:false,
    password: "",
    birthDate: ""
  });

  // Function to get permission for location
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };





  const handleChange = (field: keyof Cliente, value: string) => {
    setCliente({
      ...cliente,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    console.log(cliente);
    // Aquí puedes hacer la lógica de registro (ej. llamada API)
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={cliente.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <TextInput
        label="Name"
        value={cliente.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      {/!* Puedes agregar un selector de imágenes para el campo "picture" *!/}
      <TextInput
        label="Latitude"
        value={cliente.latitude}
        onChangeText={(value) => handleChange('latitude', value)}
      />
      <TextInput
        label="Longitude"
        value={cliente.longitude}
        onChangeText={(value) => handleChange('longitude', value)}
      />
      <TextInput
        label="Password"
        value={cliente.password}
        secureTextEntry
        onChangeText={(value) => handleChange('password', value)}
      />
      {/!* Puedes agregar un selector de fecha para el campo "birthDate" *!/}
      <Button title="Register" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ClientRegister;*/
