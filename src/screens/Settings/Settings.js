import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import MainLayout from "../../components/Layout/MainLayout";
import Button from "../../components/Ui/Button";
import InputField from "../../components/Ui/InputFeild";
import {
  passwordSchema,
  profileSchema,
} from "../../services/validation/SettingSchema";

import { CameraIcon } from "../../../assets/Icon/CameraIcon";
import { LockIcon } from "../../../assets/Icon/LockIcon";
import { MailIcon } from "../../../assets/Icon/MailIcon";
import { MapPinIcon } from "../../../assets/Icon/MapPinIcon";
import { PhoneIcon } from "../../../assets/Icon/PhoneIcon";
import { UserIcon } from "../../../assets/Icon/UserIcon";
import { Alert } from "react-native";
import { pickFromCamera, pickFromGallery } from "../../utils/imagePicker";
import { Image } from "react-native";
import { uploadToCloudinary } from "../../services/cloudnairy/uploadImage";
import { setFarmerInfo } from "../../redux/store/slices/authSlice";
import { put } from "../../api/apiClient";
import { Topbar } from "../../components/Layout/TopBar";

const Settings = () => {
  const farmer = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(
    farmer?.profilePicture || "",
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  console.log("[Settings] Screen render:", farmer);
  const handleImageSelected = async (uri) => {
    console.log("[Settings] Selected local image:", uri);

    if (!uri) {
      console.log("[Settings] No image selected");
      return;
    }
    if (!farmer?.email) {
  console.log("[Settings] Farmer email missing, backend update skipped");
  setUploadingImage(false);
  return;
}
    // UI ko foran local preview dikhao
    setPreviewImage(uri);
    setUploadingImage(true);

    try {
      // Agar tum upload bhi kar rahe ho
      const uploadedUrl = await uploadToCloudinary(uri);
      console.log("[Settings] Uploaded image URL:", uploadedUrl);

      // Final hosted image preview me lagao
      setPreviewImage(uploadedUrl);

    dispatch(setFarmerInfo({ profilePicture: uploadedUrl }));

const encodedEmail = encodeURIComponent(farmer?.email);
const updateData = {
  profilePicture: uploadedUrl,
};

const response = await put(`farmers/update/${encodedEmail}`, updateData);
console.log("[Settings] Backend update response:", response);

    } catch (error) {
      console.log("[Settings] Image upload failed:", error);

      // old image pe wapas
      setPreviewImage(farmer?.profilePicture || "");
    } finally {
      setUploadingImage(false);
    }
  };
  useEffect(() => {
  setPreviewImage(farmer?.profilePicture || "");
}, [farmer?.profilePicture]);

  const onPhotoPress = () => {
    console.log("[Settings] Change image pressed");

    Alert.alert("Select Image", "Choose an option", [
      {
        text: "Camera",
        onPress: async () => {
          console.log("[Settings] Camera selected");
          const uri = await pickFromCamera();
          await handleImageSelected(uri);
        },
      },
      {
        text: "Gallery",
        onPress: async () => {
          console.log("[Settings] Gallery selected");
          const uri = await pickFromGallery();
          await handleImageSelected(uri);
        },
      },
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => console.log("[Settings] Picker cancelled"),
      },
    ]);
  };

  return (
    <>
    <Topbar title="Setting"  />
    <MainLayout>
      <ScrollView className="flex-1 px-4 pt-2">
        <View className="mb-4">
          <Text className="text-2xl font-bold text-foreground">Settings</Text>
          <Text className="text-muted-foreground">
            Manage your profile and preferences.
          </Text>
        </View>

        <ProfileCard
          farmer={farmer}
          previewImage={previewImage}
          uploadingImage={uploadingImage}
          onPhotoPress={onPhotoPress}
        />

        <View className="rounded-2xl border border-border bg-card p-4 py-6 mb-6">
          <Text className="text-2xl font-bold text-foreground/70 mb-4">
            Profile Information
          </Text>
          <ProfileSettings farmer={farmer} />
        </View>

        <SecuritySettings farmer={farmer} />
      </ScrollView>
    </MainLayout>
    </>
    
  );
};

const ProfileCard = ({
  farmer,
  previewImage,
  uploadingImage,
  onPhotoPress,
}) => {
  const displayName = farmer?.fullname || farmer?.name || "Farmer";
  const displayEmail = farmer?.email || "No email";
  const imageSource = previewImage || farmer?.profilePicture || "";

  console.log("[ProfileCard] Render:", {
    displayName,
    displayEmail,
    imageSource,
    uploadingImage,
  });
  

  return (
    <View className="rounded-2xl border border-border bg-card overflow-hidden mb-6">
      <View className="h-28 bg-secondary" />
      <View className="px-4 pb-4 -mt-10 flex-row items-end gap-4">
        <View className="relative">
          <View className="h-20 w-20 rounded-2xl bg-primary overflow-hidden">
            {imageSource ? (
              <Image source={{ uri: imageSource }} className="h-full w-full" />
            ) : (
              <View className="flex-1 items-center justify-center">
                <UserIcon size={30} color="white" />
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={onPhotoPress}
            className="absolute -bottom-1 -right-1 h-7 w-7 bg-primary rounded-full items-center justify-center"
          >
            <CameraIcon size={14} color="white" />
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-lg font-bold text-foreground/70">
            {displayName}
          </Text>
          <Text className="text-sm text-muted-foreground mb-4">
            {displayEmail}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ProfileSettings = ({ farmer }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
    },
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    reset({
      fullName: farmer?.fullname || farmer?.name || "",
      email: farmer?.email || "",
      phone: farmer?.phone || "",
      city: farmer?.city || farmer?.cropDetail?.city || "",
    });
  }, [farmer, reset]);

  const onSubmit = (data) => {
    console.log("[Settings] Save Changes clicked");
    console.log("[Settings] Profile form data:", data);
  };

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="fullName"
        render={({ field: { value, onChange } }) => (
          <InputField
            label="Full Name"
            labelColor="#1e2a3a"
            value={value}
            onChangeText={onChange}
            icon={<UserIcon size={20} color="#14b8a6" />}
            error={errors.fullName?.message}
            inputStyle={{ borderColor: "#e5e7eb", color: "#1e2a3a" }}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { value } }) => (
          <InputField
            label="Email"
            readOnly
            labelColor="#1e2a3a"
            value={value}
            icon={<MailIcon size={20} color="#14b8a6" />}
            inputStyle={{
              borderColor: "#e5e7eb",
              color: "#1e2a3a",
              backgroundColor: "#f1f5f9",
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { value, onChange } }) => (
          <InputField
            label="Phone Number"
            labelColor="#1e2a3a"
            value={value}
            onChangeText={onChange}
            icon={<PhoneIcon size={20} color="#14b8a6" />}
            error={errors.phone?.message}
            inputStyle={{ borderColor: "#e5e7eb", color: "#1e2a3a" }}
          />
        )}
      />

      <Controller
        control={control}
        name="city"
        render={({ field: { value, onChange } }) => (
          <InputField
            label="City"
            labelColor="#1e2a3a"
            value={value}
            onChangeText={onChange}
            icon={<MapPinIcon size={20} color="#14b8a6" />}
            error={errors.city?.message}
            inputStyle={{ borderColor: "#e5e7eb", color: "#1e2a3a" }}
          />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)}>Save Changes</Button>
    </View>
  );
};

const SecuritySettings = ({ farmer }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(passwordSchema),
  });

  useEffect(() => {
    reset({
      currentPassword: farmer?.password || "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [farmer, reset]);

  const onSubmit = (data) => {
    console.log("[Settings] Update Password clicked");
    console.log("[Settings] Password form data:", data);
  };

  return (
    <View className="rounded-2xl border border-border bg-card p-4 mb-10">
      <Text className="text-lg font-bold text-foreground mb-3">Security</Text>

      <View className="gap-4">
        <Controller
          control={control}
          name="currentPassword"
          render={({ field: { value, onChange } }) => (
            <InputField
              label="Current Password"
              labelColor="#1e2a3a"
              containerMarginVertical={2}
              placeholder="Enter current password"
              psd
              value={value}
              onChangeText={onChange}
              icon={<LockIcon size={20} color="#14b8a6" />}
              error={errors.currentPassword?.message}
              inputStyle={{ borderColor: "#e5e7eb", color: "#1e2a3a" }}
            />
          )}
        />

        <Controller
          control={control}
          name="newPassword"
          render={({ field: { value, onChange } }) => (
            <InputField
              label="New Password"
              labelColor="#1e2a3a"
              containerMarginVertical={2}
              placeholder="Enter new password"
              psd
              value={value}
              onChangeText={onChange}
              icon={<LockIcon size={20} color="#14b8a6" />}
              error={errors.newPassword?.message}
              inputStyle={{ borderColor: "#e5e7eb", color: "#1e2a3a" }}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <InputField
              label="Confirm Password"
              labelColor="#1e2a3a"
              containerMarginVertical={2}
              placeholder="Confirm new password"
              psd
              value={value}
              onChangeText={onChange}
              icon={<LockIcon size={20} color="#14b8a6" />}
              error={errors.confirmPassword?.message}
              inputStyle={{ borderColor: "#e5e7eb", color: "#1e2a3a" }}
            />
          )}
        />

        <Button onPress={handleSubmit(onSubmit)}>Update Password</Button>
      </View>
    </View>
  );
};

export default Settings;
