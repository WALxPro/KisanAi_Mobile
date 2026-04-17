import React, { useState,useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal,FlatList } from "react-native";
import Button from "../../components/Ui/Button";
import { ArrowLeftIcon } from "../../../assets/Icon/ArrowLeftIcon";
import { MapPinIcon } from "../../../assets/Icon/MapPinIcon";
import { CloudyIcon } from "../../../assets/Icon/CloudyIcon";
import { WheatIcon } from "../../../assets/Icon/WheatIcon";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";
import { saveCrop, resetForm } from "../../redux/store/slices/formSlice";

import useAuth from "../../hooks/useAuth";
import { cropSchema } from "../../services/validation/RegisterSchema";

export default function CropDetails({ navigation }) {
  const dispatch = useDispatch();
  const { signup, loading, error } = useAuth();

  const formData = useSelector((state) => state.form);
  console.log("Form Data in crop Screen:", formData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: "",
      season: "",
      irrigation: "",
      crop: "",
    },
    resolver: yupResolver(cropSchema),
  });

  const onSubmit = async (data) => {
  try {
    // Save crop to redux first
    dispatch(saveCrop(data));

    // Build final payload correctly
    const finalPayload = {
      fullname: formData.basic.fullName,
      email: formData.basic.email,
      password: formData.basic.password,
      phone: formData.basic.phone,
      profilePicture: formData.profileUrl, // just string URL
      cropDetail: {
        cropName: data.crop,
        season: data.season,
        irrigationType: data.irrigation,
        city: data.city,
      },
    };

    await signup(finalPayload);
    dispatch(resetForm());
    await persistor.purge();


    navigation.navigate("Login");
  } catch (err) {
    console.log("Signup failed:", err);
  }
};

  const currentStep = 4;

  return (
    <ScrollView className="bg-login_panel px-6 pt-12 pb-8">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="flex-row items-center gap-2"
      >
        <ArrowLeftIcon size={20} color="#FFFFFF80" />
        <Text className="text-lg text-primary-foreground/50">Back</Text>
      </TouchableOpacity>

      <Text className="mt-3 text-accent">Step {currentStep} of 4</Text>

      <Text className="text-4xl text-primary-foreground mt-4">
        Crop Details
      </Text>

      {/* CITY */}
      <Controller
        control={control}
        name="city"
        render={({ field: { value, onChange } }) => (
          <DropdownSelect
            label="City"
            icon={MapPinIcon}
            value={value}
            onChange={onChange}
            options={cities}
            placeholder="Select city"
          />
        )}
      />
      {errors.city && (
        <Text className="text-red-500">{errors.city.message}</Text>
      )}

      {/* SEASON */}
      <Controller
        control={control}
        name="season"
        render={({ field: { value, onChange } }) => (
          <DropdownSelect
            label="Season"
            icon={CloudyIcon}
            value={value}
            onChange={onChange}
            options={season}
            placeholder="Select season"
          />
        )}
      />
      {errors.season && (
        <Text className="text-red-500">{errors.season.message}</Text>
      )}

      {/* IRRIGATION */}
      <Controller
        control={control}
        name="irrigation"
        render={({ field: { value, onChange } }) => (
          <DropdownSelect
            label="Irrigation"
            icon={CloudyIcon}
            value={value}
            onChange={onChange}
            options={irrigationTypes}
            placeholder="Select irrigation"
          />
        )}
      />
      {errors.irrigation && (
        <Text className="text-red-500">{errors.irrigation.message}</Text>
      )}

      {/* CROP */}
      <Controller
        control={control}
        name="crop"
        render={({ field: { value, onChange } }) => (
          <DropdownSelect
            label="Crop"
            icon={WheatIcon}
            value={value}
            onChange={onChange}
            options={crops}
            placeholder="Select crop"
          />
        )}
      />
      {errors.crop && (
        <Text className="text-red-500">{errors.crop.message}</Text>
      )}

      {/* API ERROR */}
      {error && <Text className="text-red-500 text-center mt-3">{error}</Text>}

      <Button onPress={handleSubmit(onSubmit)} disabled={loading}>
        {loading ? "Creating Account..." : "Complete Registration"}
      </Button>
    </ScrollView>
  );
}
const cities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Hyderabad",
  "Sialkot",
  "Rawalpindi",
];
const irrigationTypes = [
  "Canal",
  "Tube Well",
  "Drip",
  "Sprinkler",
  "Rain-fed",
  "Flood",
];
const crops = [
  "Wheat",
  "Rice",
  "Corn",
  "Sugarcane",
  "Potato",
];
const season = ["Rabi", "Kharif", "Zaid"];
export const DropdownSelect = ({
  label,
  icon: Icon,
  value,
  onChange,
  options,
  placeholder,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState(null);
  const triggerRef = useRef(null);

  const openDropdown = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setDropdownLayout({ x, y: y + height, width });
      setOpen(true);
    });
  };

  return (
    <View className={`my-2 ${className}`}>
      {label && (
        <Text className="text-lg mb-2 text-primary-foreground/70">{label}</Text>
      )}

      <View className="relative justify-center">
        {Icon && (
          <View
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: [{ translateY: -10 }],
              zIndex: 10,
            }}
          >
            <Icon size={20} color="#9CA3AF" />
          </View>
        )}

        <TouchableOpacity
          ref={triggerRef}
          onPress={openDropdown}
          style={{
            height: 56,
            paddingLeft: Icon ? 48 : 16,
            paddingRight: 16,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.2)",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 12,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: value ? "#FFFFFF" : "rgba(255,255,255,0.3)",
              fontSize: 16,
            }}
          >
            {value || placeholder}
          </Text>
        </TouchableOpacity>
      </View>

      {/* MODAL DROPDOWN */}
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          {dropdownLayout && (
            <View
              style={{
                position: "absolute",
                top: dropdownLayout.y + 4,
                left: dropdownLayout.x,
                width: dropdownLayout.width,
                maxHeight: 220,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.2)",
                backgroundColor: "#1F2937",
                borderRadius: 12,
                overflow: "hidden",
                elevation: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              }}
            >
              <FlatList
                data={options}
                keyExtractor={(item) => item}
                nestedScrollEnabled
                showsVerticalScrollIndicator
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      onChange(item);
                      setOpen(false);
                    }}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 13,
                      backgroundColor:
                        value === item ? "rgba(20,184,166,0.15)" : "transparent",
                      borderBottomWidth: 0.5,
                      borderBottomColor: "rgba(255,255,255,0.07)",
                    }}
                  >
                    <Text
                      style={{
                        color: value === item ? "#14B8A6" : "rgba(255,255,255,0.85)",
                        fontWeight: value === item ? "600" : "400",
                        fontSize: 15,
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
