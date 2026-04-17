import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { ChevronRightIcon } from "../../../assets/Icon/ChevronRightIcon";
import { BugIcon } from "../../../assets/Icon/BugIcon";
import { TriangleAlertIcon } from "../../../assets/Icon/TriangleAlertIcon";

const ScanCard = ({ item, isHeader = false }) => {
  const navigation = useNavigation();

  if (!item) return null;

  const confidencePercent = (item.confidence * 100).toFixed(1);

  const confidenceLabel = (confidence) => {
    if (confidence >= 0.9) return "Very Accurate";
    if (confidence >= 0.7) return "Likely";
    return "Uncertain";
  };

  const confidenceBg = (confidence) => {
    if (confidence >= 0.9) return "bg-green-100";
    if (confidence >= 0.7) return "bg-yellow-100";
    return "bg-red-100";
  };

  const confidenceText = (confidence) => {
    if (confidence >= 0.9) return "text-green-700";
    if (confidence >= 0.7) return "text-yellow-700";
    return "text-red-700";
  };

  return (
    <View>

      {/* 🔹 HEADER ONLY FOR FIRST CARD */}
      {isHeader && (
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-bold">
            Last Scan Result
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("ScanHistory")}
            className="flex-row items-center"
          >
            <Text className="text-sm font-semibold text-green-700 mr-1">
              View All
            </Text>
            <ChevronRightIcon size={14} color="#15803d" />
          </TouchableOpacity>
        </View>
      )}

      {/* 🔹 CARD */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ScanResult", { item })
        }
        className="mb-4 rounded-3xl overflow-hidden"
        activeOpacity={0.9}
      >
        <View
          className="px-4 py-6 shadow-sm bg-card border border-yellow-100 rounded-3xl"
        >

          {/* Badge */}
          <View
            className={`flex-row items-center px-3 py-2 rounded-full self-start mb-3 ${confidenceBg(
              item.confidence
            )}`}
          >
            <TriangleAlertIcon size={12} color="#d97706" />
            <Text
              className={`ml-1 text-[10px] font-semibold ${confidenceText(
                item.confidence
              )}`}
            >
              {confidenceLabel(item.confidence)}
            </Text>
          </View>

          {/* Content */}
          <View className="flex-row items-center">

            {/* Icon */}
            <View className="w-14 h-14 rounded-xl bg-red-200 items-center justify-center mr-3">
              <BugIcon size={25} color="#dc2626" />
            </View>

            {/* Text */}
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-900">
                {item.predicted_label}
              </Text>

              <Text className="text-sm text-gray-500 mt-1">
                Confidence: {confidencePercent}%
              </Text>
            </View>

            <ChevronRightIcon size={16} color="#9ca3af" />
          </View>

        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ScanCard;