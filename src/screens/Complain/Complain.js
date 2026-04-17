import React, { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

import MainLayout from "../../components/Layout/MainLayout";
import { Topbar } from "../../components/Layout/TopBar";
import Button from "../../components/Ui/Button";
import InputField from "../../components/Ui/InputFeild";
import Dropdown from "../../components/Ui/Dropdown";
import { complainSchema } from "../../services/validation/complainSchema";
import { post } from "../../api/apiClient";

const categories = [
  "Crop Issue",
  "Payment Issue",
  "Delivery Issue",
  "Technical Issue",
  "Other",
];

const StatusColors = {
  Pending: { bg: "#fffbeb", text: "#f59e0b", dot: "#f59e0b" },
  "In Review": { bg: "#eff6ff", text: "#3b82f6", dot: "#3b82f6" },
  Resolved: { bg: "#edf5ee", text: "#0f7a4f", dot: "#22c55e" },
};

const mockComplaints = [
  {
    id: "CMP-001",
    title: "Late Payment",
    category: "Payment Issue",
    description: "Payment abhi tak receive nahi hui.",
    status: "Pending",
  },
  {
    id: "CMP-002",
    title: "Wrong Delivery",
    category: "Delivery Issue",
    description: "Mujhe ghalat product deliver hua hai.",
    status: "In Review",
  },
];

const ComplaintCard = ({ complaint }) => {
  const colors = StatusColors[complaint.status] || StatusColors.Pending;

  return (
    <View
      className="p-4 mb-3 rounded-xl shadow"
      style={{ backgroundColor: colors.bg }}
    >
      <Text className="font-bold text-lg">{complaint.title}</Text>
      <Text className="text-sm text-gray-500">{complaint.category}</Text>
      <Text className="mt-2">{complaint.description}</Text>

      <View className="mt-2 flex-row items-center">
        <View
          className="w-2.5 h-2.5 rounded-full mr-2"
          style={{ backgroundColor: colors.dot }}
        />
        <Text className="font-semibold" style={{ color: colors.text }}>
          {complaint.status}
        </Text>
      </View>
    </View>
  );
};

const Complain = () => {
  const farmer = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("submit");
  const [complaints, setComplaints] = useState(mockComplaints);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(complainSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    if (submitting) return;

    setSubmitting(true);
    console.log("[Complain] Form Values:", data);

    try {
      const response = await post("complain/create", {
        ...data,
        farmer_id: farmer?._id,
      });

      const newComplaint = {
        id: `CMP-${complaints.length + 1}`,
        title: data.title,
        category: data.category,
        description: data.description,
        status: "Pending",
      };

      setComplaints((prev) => [newComplaint, ...prev]);
      reset();
      Alert.alert("Success", "Complaint Submitted Successfully!");
      setActiveTab("history");

      return response;
    } catch (e) {
      console.log("[Complain] Error submitting complaint:", e);

      const message =
        e?.response?.data?.detail ||
        e?.message ||
        "Something went wrong. Please try again later.";

      Alert.alert("Error", message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Topbar
        title="Submit Complaint"
        showComplaintTab={true}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <MainLayout showBottomNav={true}>
        {activeTab === "submit" ? (
          <>
            <Controller
              control={control}
              name="title"
              render={({ field: { value, onChange } }) => (
                <InputField
                  label="Title"
                  labelColor="#1e2a3a"
                  placeholder="Complaint Title..."
                  value={value}
                  onChangeText={onChange}
                  error={errors.title?.message}
                  inputStyle={{ borderColor: "#e5e7eb", color: "#1e2a3a" }}
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              render={({ field: { value, onChange } }) => (
                <Dropdown
                  label="Category"
                  options={categories}
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <View className="mb-5">
                  <Text className="mb-2 text-[15px] font-semibold text-foreground">
                    Description
                  </Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Describe your issue in detail..."
                    multiline
                    maxLength={1000}
                    className="w-full px-4 py-5 rounded-2xl border border-gray-200 text-gray-800 placeholder-foreground text-sm"
                    style={{ textAlignVertical: "top", minHeight: 150 }}
                  />
                  <Text className="text-xs text-gray-400 mt-1 text-right">
                    {value.length}/1000
                  </Text>
                  {errors.description && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.description.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Button onPress={handleSubmit(onSubmit)} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Complaint"}
            </Button>
          </>
        ) : (
          <View className="mt-2">
            <Text className="text-base font-semibold text-foreground mb-3">
              Complaint History
            </Text>

            {complaints.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </View>
        )}
      </MainLayout>
    </>
  );
};

export default Complain;
