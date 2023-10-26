import Geolocation, { GeoPosition } from "react-native-geolocation-service";
import { PermissionsAndroid } from "react-native";

export async function fetchAddressSuggestions(query: string): Promise<AddressSuggestion[]> {
  const baseUrl = "https://nominatim.openstreetmap.org/search";
  const queryParams = `?format=json&q=${encodeURIComponent(query)}&limit=5`; // limitamos a 5 sugerencias

  try {
    const response = await fetch(baseUrl + queryParams, {
      method: "GET",
      headers: {
        "User-Agent": "YourAppName/1.0 (your-email@example.com)"
      }
    });
    const data: AddressSuggestion[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
}

export async function getLocation(): Promise<AddressSuggestion | null> {
  const result = await requestLocationPermission();
  if (!result) {
    return null;
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async position => {
        try {
          console.log(position);
          const address = await reverseGeocode(position.coords.latitude, position.coords.longitude);
          const addressLocation: AddressSuggestion = {
            lat: position.coords.latitude.toString(),
            lon: position.coords.longitude.toString(),
            display_name: address,
            place_id: 1 //TODO:remove this
          };
          resolve(addressLocation);
        } catch (error) {
          console.error('Error processing position:', error);
          resolve(null);
        }
      },
      error => {
        console.log(error.code, error.message);
        resolve(null);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
}



const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Geolocation Permission",
        message: "Can we access your location?",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    console.log("granted", granted);
    if (granted === "granted") {
      console.log("You can use Geolocation");
      return true;
    } else {
      console.log("You cannot use Geolocation");
      return false;
    }
  } catch (err) {
    return false;
  }
};

export async function reverseGeocode(latitude: number, longitude: number): Promise<string> {
  const baseUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "User-Agent": "YourAppName/1.0 (your-email@example.com)"
      }
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data: GeocodeResponse = await response.json();
    return data.display_name;
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error; // Re-throw the error to handle it in the caller function
  }
}

interface GeocodeResponse {

  latitude: string,
  longitude: string,
  display_name: string;

  [key: string]: any;  // Other properties you might be interested in
}


export interface AddressSuggestion {
  display_name: string;
  place_id: number;
  lat: string;
  lon: string;

  [key: string]: any;
}