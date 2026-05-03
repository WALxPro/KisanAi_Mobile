import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Topbar } from "../../components/Layout/TopBar";
import MainLayout from "../../components/Layout/MainLayout";
import LeafIcon from "../../../assets/Icon/Leaficon";
import Button from "../../components/Ui/Button";
import { formatDateTime } from "../../utils/time";
import { useSelector } from "react-redux";

const ScanResult = ({ route, navigation }) => {
  const farmer = useSelector((state) => state.auth.user);

  const { result, imageUri } = route.params;
  const { prediction } = result;

  const confidencePercent = (prediction.confidence * 100).toFixed(1);

  const confidenceLabel = (confidence) => {
    if (confidence >= 0.9) return "Very Accurate";
    if (confidence >= 0.7) return "Likely";
    return "Uncertain";
  };

  const confidenceColor = (confidence) => {
    if (confidence >= 0.9) return "bg-green-600";
    if (confidence >= 0.7) return "bg-yellow-500";
    return "bg-red-500";
  };

  const diseaseDetails = prediction.disease_details || {};

  const formatClassName = (cls) =>
    cls?.replace(/___/g, " › ").replace(/_/g, " ") || cls;

  const createdAt = result?.prediction?.createdAt;

  const { date, time } = formatDateTime(createdAt);
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

            <Text className="text-2xl font-extrabold mb-2 text-green-900">
              {prediction.predicted_label}
            </Text>

            <Text className="text-sm text-gray-500 italic mb-3">
              {formatClassName(prediction.predicted_class)}
            </Text>

            {/* Confidence */}
            <View className="flex-row justify-between mb-3">
              <Text className="text-base text-gray-500">Confidence Score</Text>
              <Text className="text-base font-bold text-green-900">
                {confidencePercent}%
              </Text>
            </View>

            <View className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
              <View
                className={`h-full ${confidenceColor(prediction.confidence)}`}
                style={{ width: `${confidencePercent}%` }}
              />
            </View>

            {diseaseDetails.simple_description && (
              <Text className="text-base text-gray-700 mb-2 mt-2">
                {diseaseDetails.simple_description}
              </Text>
            )}
          </View>

          {prediction.top_predictions?.length > 1 && (
            <View className="bg-white mx-4 mt-4 p-4 rounded-2xl border border-gray-200">
              <Text className=" text-2xl font-bold mb-3">
                Other Possibilities
              </Text>

              {prediction.top_predictions.slice(1).map((item, index) => {
                const percent = (item.confidence * 100).toFixed(2);

                return (
                  <View key={index} className="mb-3">
                    <View className="flex-row justify-between mb-3">
                      <Text className="text-base text-gray-500">
                        {item.display_name}
                      </Text>
                      <Text className="text-base font-semibold">
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

          <View className="bg-white mx-4 mt-4 p-4 rounded-2xl border border-gray-200">
            <Text className=" text-2xl font-bold mb-3">Disease Details</Text>

            <InfoCard
              title="Disease Name"
              value={diseaseDetails.disease_name}
              icon={<LeafIcon size={20} color="#fff" />}
              color="green"
            />

            {diseaseDetails.simple_description && (
              <InfoCard
                title="Description"
                value={diseaseDetails.simple_description}
                icon={<LeafIcon size={20} color="#fff" />}
                color="blue"
              />
            )}

            {diseaseDetails.what_farmer_should_do_now && (
              <InfoCard
                title="What To Do Now"
                value={diseaseDetails.what_farmer_should_do_now}
                icon={<LeafIcon size={20} color="#fff" />}
                color="red"
              />
            )}

            {diseaseDetails.prevention_tips && (
              <InfoCard
                title="Prevention Tips"
                value={diseaseDetails.prevention_tips}
                icon={<LeafIcon size={20} color="#fff" />}
                color="yellow"
              />
            )}

            {diseaseDetails.when_to_seek_expert_help && (
              <InfoCard
                title="When to Seek Help"
                value={diseaseDetails.when_to_seek_expert_help}
                icon={<LeafIcon size={20} color="#fff" />}
                color="green"
              />
            )}
          </View>
          <View className="bg-white mx-4 mt-4 p-4 rounded-2xl border border-gray-200">
            <Text className=" text-2xl font-bold mb-3">User Information</Text>
            <SimpleInfoCard
              title="User Name"
              value={`${farmer.name || "N/A"}`}
              icon={<Text>👤</Text>}
            />

            <SimpleInfoCard
              title="Scan Date"
              value={date}
              icon={<Text>📅</Text>}
            />

            <SimpleInfoCard
              title="Scan Time"
              value={time}
              icon={<Text>⏰</Text>}
            />
          </View>

          {/* TOP PREDICTIONS CARD */}

          {/* BUTTONS */}
          <View className="flex-row gap-3 mx-4 mt-6 mb-4">
            <Button
              onPress={() => navigation.replace("Scan")}
              className="w-[50%]"
            >
              Scan Again
            </Button>

            <Button
              onPress={() => navigation.navigate("ScanHistory")}
              className="w-[50%]"
            >
              View History
            </Button>
          </View>

          {/* CHAT BUTTON */}
          <View className="mx-4 mb-10">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DiseaseChat", {
                  predictionId: prediction._id,
                  diseaseLabel: prediction.predicted_label,
                })
              }
              style={{
                backgroundColor: "#14B8A6",
                paddingVertical: 12,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Text style={{ fontSize: 18 }}>💬</Text>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Chat with Kaku
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </MainLayout>
    </>
  );
};

export default ScanResult;

const InfoCard = ({ title, value, icon, color = "green" }) => {
  const colorMap = {
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
    yellow: "from-yellow-500 to-yellow-600",
    blue: "from-blue-500 to-blue-600",
  };

  return (
    <View className="mx-4 mt-4 rounded-2xl overflow-hidden">
      <LinearGradient
        colors={
          color === "red"
            ? ["#ef4444", "#dc2626"]
            : color === "yellow"
              ? ["#f59e0b", "#d97706"]
              : color === "blue"
                ? ["#3b82f6", "#2563eb"]
                : ["#22c55e", "#16a34a"]
        }
        className="p-4 rounded-2xl"
      >
        <View className="flex-row items-start">
          {/* Icon */}
          <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-3">
            {icon}
          </View>

          {/* Content */}
          <View className="flex-1">
            <Text className="text-white text-xs opacity-80">{title}</Text>

            <Text className="text-white text-base font-bold mt-1">{value}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const SimpleInfoCard = ({ title, value, icon }) => {
  return (
    <View className="mx-4 mt-4 bg-white border border-gray-200 rounded-2xl p-4">
      <View className="flex-row items-center mb-2">
        <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
          {icon}
        </View>

        <Text className="text-base font-bold text-gray-800">{title}</Text>
      </View>

      <Text className="text-sm text-gray-600 ml-12">{value}</Text>
    </View>
  );
};
