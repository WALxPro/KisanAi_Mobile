
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import Button from "../../components/Ui/Button";
import { ArrowLeftIcon } from "../../../assets/Icon/ArrowLeftIcon";
import { UserIcon } from "../../../assets/Icon/UserIcon";
import { pickFromCamera, pickFromGallery } from "../../utils/imagePicker";
import { uploadToCloudinary } from "../../services/cloudnairy/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile } from "../../redux/store/slices/formSlice";
import { profileSchema } from "../../services/validation/RegisterSchema";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ProfileImage({ navigation }) {
  
      const formData = useSelector((state) => state.form);
      console.log("Form Data in profile Screen:", formData); // Debugging line
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentStep = 3;

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: "",
    },
    resolver: yupResolver(profileSchema),
  });

  const handleImagePick = async (picker) => {
    try {
      setLoading(true);

      const uri = await picker();
      if (!uri) {
        setLoading(false);
        return;
      }

      setPreview(uri);

      const cloudUri = await uploadToCloudinary(uri);
      console.log("Cloudinary URI:", cloudUri);

      // ✅ form value set karo (IMPORTANT)
      setValue("image", cloudUri);

      // ✅ redux save
dispatch(saveProfile(cloudUri));
      setLoading(false);
    } catch (err) {
      console.log("Upload failed:", err);
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    console.log("Final Image URL:", data.image);
    navigation.navigate("CropDetails");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-login_panel px-6 pt-12 pb-8">
      
      {/* Back */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="mt-3 flex-row items-center gap-2">
        <ArrowLeftIcon size={20} color="#FFFFFF80" />
        <Text className="text-lg text-primary-foreground/50">Back</Text>
      </TouchableOpacity>

      <Text className="mb-1 text-base mt-3 font-medium uppercase tracking-wider text-accent">
        Step {currentStep} of 4
      </Text>

      {/* Heading */}
      <View className="mb-4 mt-4">
        <Text className="text-4xl font-interBold text-primary-foreground">Profile Picture</Text>
      </View>

      {/* Preview */}
      <View className="items-center mt-4 mb-4">
        <View className="h-40 w-40 items-center justify-center overflow-hidden rounded-full border-4 border-accent/20 bg-primary-foreground/5">
          {preview ? (
            <Image source={{ uri: preview }} className="h-full w-full" />
          ) : (
            <UserIcon size={64} color="rgba(255,255,255,0.2)" />
          )}
        </View>
      </View>

      {/* ❌ Validation Error */}
      {errors.image && (
        <Text className="text-red-500 text-center mb-2">
          {errors.image.message}
        </Text>
      )}

      {/* Buttons */}
      <View className="mt-4 space-y-3">
        <Button onPress={() => handleImagePick(pickFromCamera)} disabled={loading}>
          {loading ? "Uploading..." : "Take a Photo"}
        </Button>

        <Button onPress={() => handleImagePick(pickFromGallery)} disabled={loading}>
          {loading ? "Uploading..." : "Upload from Gallery"}
        </Button>

        <Button onPress={handleSubmit(onSubmit)} disabled={loading}>
          Continue
        </Button>
      </View>

    </ScrollView>
  );
}