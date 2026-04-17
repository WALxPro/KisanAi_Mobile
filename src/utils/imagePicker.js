import * as ImagePicker from "expo-image-picker";
import { Alert, Platform } from "react-native";

// Camera
export const pickFromCamera = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission required",
      "Camera access is needed to take a photo"
    );
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,  // basic square crop
    aspect: [1, 1],       // square aspect
    quality: 0.8,
  });

  if (!result.canceled && result.assets?.[0]?.uri) {
    console.log("Camera image URI:", result.assets[0].uri);
    return result.assets[0].uri;
  }

  return null;
};

// Gallery
export const pickFromGallery = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission required",
      "Gallery access is needed to select a photo"
    );
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (!result.canceled && result.assets?.[0]?.uri) {
    console.log("Gallery image URI:", result.assets[0].uri);
    return result.assets[0].uri;
  }

  return null;
};