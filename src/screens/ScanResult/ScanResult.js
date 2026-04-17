import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Topbar } from "../../components/Layout/TopBar";
import MainLayout from "../../components/Layout/MainLayout";

const ScanResult = ({ route, navigation }) => {
  const { result, imageUri } = route.params;
  const { prediction } = result;

  const confidencePercent = (prediction.confidence * 100).toFixed(1);

  // ✅ Better labeling (not "severity")
  const confidenceLabel = (confidence) => {
    if (confidence >= 0.9) return "Very Accurate";
    if (confidence >= 0.7) return "Likely";
    return "Uncertain";
  };

  // ✅ Dynamic color based on confidence
  const confidenceColor = (confidence) => {
    if (confidence >= 0.9) return "bg-green-600";
    if (confidence >= 0.7) return "bg-yellow-500";
    return "bg-red-500";
  };

  const diseaseDetails = prediction.disease_details || {};

  const formatClassName = (cls) =>
    cls?.replace(/___/g, " › ").replace(/_/g, " ") || cls;

  return (
    <>
      <Topbar title="Scan Result" />

      <MainLayout>
        <View className="pb-10">

          {/* IMAGE */}
          <View className="w-full h-64 relative rounded-b-2xl overflow-hidden">
            <Image
              source={{ uri: imageUri }}
              className="w-full h-full"
              resizeMode="cover"
            />

            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
              className="absolute bottom-0 left-0 right-0 h-28"
            />

            <View className="absolute bottom-4 left-4">
              <Text className="text-white text-sm">Scanned Crop</Text>
              <Text className="text-white text-lg font-bold">
                {prediction.predicted_label}
              </Text>
            </View>
          </View>

          {/* MAIN RESULT CARD */}
          <View className="bg-white mx-4 mt-4 p-4 rounded-2xl border border-green-200 shadow-sm">

            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-xl">🌿</Text>

              <View className="px-3 py-1 rounded-full bg-gray-100">
                <Text className="text-xs font-bold text-gray-700">
                  {confidenceLabel(prediction.confidence)}
                </Text>
              </View>
            </View>

            <Text className="text-xl font-extrabold text-green-900">
              {prediction.predicted_label}
            </Text>

            <Text className="text-sm text-gray-500 italic mb-3">
              {formatClassName(prediction.predicted_class)}
            </Text>

            {/* Confidence */}
            <View className="flex-row justify-between mb-1">
              <Text className="text-sm text-gray-500">
                Confidence Score
              </Text>
              <Text className="text-sm font-bold text-green-900">
                {confidencePercent}%
              </Text>
            </View>

            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View
                className={`h-full ${confidenceColor(prediction.confidence)}`}
                style={{ width: `${confidencePercent}%` }}
              />
            </View>
          </View>

          {/* DISEASE DETAILS */}
          <View className="bg-white mx-4 mt-4 p-4 rounded-2xl border border-gray-200">

            <Text className="text-base font-bold mb-3">
              Disease Details
            </Text>

            <Text className="text-sm font-extrabold text-green-900 mb-2">
              {diseaseDetails.disease_name}
            </Text>

            {diseaseDetails.simple_description && (
              <Text className="text-sm text-gray-700 mb-2">
                📋 {diseaseDetails.simple_description}
              </Text>
            )}

            {diseaseDetails.what_farmer_should_do_now && (
              <View className="bg-red-50 border border-red-200 p-2 rounded-lg mb-2">
                <Text className="text-sm text-red-700">
                  ⚠️ {diseaseDetails.what_farmer_should_do_now}
                </Text>
              </View>
            )}

            {diseaseDetails.prevention_tips && (
              <Text className="text-sm text-gray-700 mb-2">
                💊 {diseaseDetails.prevention_tips}
              </Text>
            )}

            {diseaseDetails.when_to_seek_expert_help && (
              <Text className="text-sm text-gray-700">
                🛡️ {diseaseDetails.when_to_seek_expert_help}
              </Text>
            )}
          </View>

          {/* TOP PREDICTIONS CARD */}
          {prediction.top_predictions?.length > 1 && (
            <View className="bg-white mx-4 mt-4 p-4 rounded-2xl border border-gray-200">

              <Text className="font-bold mb-3">
                Other Possibilities
              </Text>

              {prediction.top_predictions.slice(1).map((item, index) => {
                const percent = (item.confidence * 100).toFixed(2);

                return (
                  <View key={index} className="mb-3">
                    
                    <View className="flex-row justify-between">
                      <Text className="text-sm text-gray-700">
                        {item.display_name}
                      </Text>
                      <Text className="text-sm font-semibold">
                        {percent}%
                      </Text>
                    </View>

                    <View className="h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                      <View
                        className={`h-full ${confidenceColor(item.confidence)}`}
                        style={{ width: `${percent}%` }}
                      />
                    </View>

                  </View>
                );
              })}
            </View>
          )}

          {/* BUTTONS */}
          <View className="flex-row gap-3 mx-4 mt-6 mb-10">

            <TouchableOpacity
              onPress={() => navigation.replace("Scan")}
              className="flex-1 h-12 border-2 border-green-600 rounded-xl items-center justify-center bg-white"
            >
              <Text className="text-green-600 font-bold">
                Scan Again
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("History")}
              className="flex-1 h-12 rounded-xl overflow-hidden"
            >
              <LinearGradient
                colors={["#16A34A", "#15803D"]}
                className="flex-1 items-center justify-center rounded-xl"
              >
                <Text className="text-white font-bold">
                  View History
                </Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>

        </View>
      </MainLayout>
    </>
  );
};

export default ScanResult;