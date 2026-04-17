import React, { useState } from "react";
import { View, Text, Image, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import Button from "../../components/Ui/Button";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Topbar } from "../../components/Layout/TopBar";
import MainLayout from "../../components/Layout/MainLayout";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const API_URL = "http://192.168.100.16:8000/disease/predict";

const Scan = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  // ─── jab bhi screen focus mein aaye, state reset ho jaye ───
  useFocusEffect(
    React.useCallback(() => {
      setImage(null);
      setError(null);
    }, [])
  );

  // ─── image ko backend pe bhejta hai aur result screen pe navigate karta hai ───
  const uploadToAPI = async (uri) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("image", {
        uri,
        name: `scan_${Date.now()}.jpg`,
        type: "image/jpeg",
      });
      formData.append("image_name", `scan_${Date.now()}.jpg`);
      formData.append("user_email", "test@gmail.com");

      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigation.navigate("ScanResult", {
        result: res.data,
        imageUri: uri,
      });
    } catch (err) {
      console.log("❌ Error:", err.response?.data || err.message);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── camera se photo leta hai ───
  const pickFromCamera = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Denied", "Camera access is required to scan.");
        return;
      }

      const res = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsEditing: true,
      });

      if (!res.canceled) {
        const uri = res.assets[0].uri;
        setImage(uri);
        await uploadToAPI(uri);
      }
    } catch (err) {
      setError("Could not open camera.");
    }
  };

  // ─── gallery se image pick karta hai ───
  const pickFromGallery = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Denied", "Gallery access is required.");
        return;
      }

      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsEditing: true,
      });

      if (!res.canceled) {
        const uri = res.assets[0].uri;
        setImage(uri);
        await uploadToAPI(uri);
      }
    } catch (err) {
      setError("Could not open gallery.");
    }
  };

  // ─── selected image hata deta hai ───
  const clearImage = () => {
    setImage(null);
    setError(null);
  };

  return (
    <>
      <Topbar title="Scan" />
      <MainLayout showBottomNav={true}>
        <View style={{ flex: 1, padding: 16 }}>

          {/* ─── IMAGE PREVIEW BOX ─── */}
          <View
            style={{
              width: "100%",
              height: 300,
              borderWidth: 1,
              borderColor: "#e2e8f0",
              borderRadius: 16,
              marginBottom: 8,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              backgroundColor: "#f8fafc",
            }}
          >
            {loading ? (
              // ─── uploading state ───
              <View style={{ alignItems: "center", gap: 12 }}>
                <ActivityIndicator size="large" color="#14B8A6" />
                <Text style={{ color: "#64748b", fontSize: 14 }}>
                  Analyzing image...
                </Text>
              </View>
            ) : image ? (
              // ─── image preview + clear button ───
              <>
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={clearImage}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "rgba(0,0,0,0.55)",
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 12 }}>✕ Clear</Text>
                </TouchableOpacity>
              </>
            ) : (
              // ─── empty state ───
              <View style={{ alignItems: "center", gap: 8 }}>
                <Text style={{ fontSize: 40 }}>🌿</Text>
                <Text style={{ color: "#94a3b8", fontSize: 14 }}>
                  Take or upload a photo to scan
                </Text>
              </View>
            )}
          </View>

          {/* ─── ERROR MESSAGE ─── */}
          {error && (
            <Text
              style={{
                color: "#ef4444",
                textAlign: "center",
                marginBottom: 12,
                fontSize: 13,
              }}
            >
              {error}
            </Text>
          )}

          {/* ─── HINT TEXT ─── */}
          {!image && !loading && (
            <Text
              style={{
                color: "#94a3b8",
                textAlign: "center",
                fontSize: 12,
                marginBottom: 16,
              }}
            >
              Best results with clear, well-lit photos
            </Text>
          )}

          {/* ─── ACTION BUTTONS ─── */}
          <View style={{ gap: 12, marginTop: 8 }}>
            <Button onPress={pickFromCamera} disabled={loading}>
              {loading ? "Processing..." : "📷  Take Photo"}
            </Button>

            <Button onPress={pickFromGallery} disabled={loading}>
              🖼️  Upload from Gallery
            </Button>
          </View>

        </View>
      </MainLayout>
    </>
  );
};

export default Scan;