import React from "react";
import { View, Text } from "react-native";
import { AlertCircleIcon } from "../../../assets/Icon/AlertCircleIcon";

const EmptyState = ({
  title = "No data found",
  description = "There's nothing here yet.",
}) => {
  return (
    <View className="flex-1 items-center justify-center py-20 px-6">
      
      {/* Icon container */}
      <View className="h-20 w-20 items-center justify-center rounded-2xl bg-gray-200 mb-5">
              <AlertCircleIcon size={40} color="#EF4444" />
      </View>

      {/* Title */}
      <Text className="text-xl font-semibold text-foreground/80 mb-1.5">
        {title}
      </Text>

      {/* Description */}
      <Text className="text-sm text-gray-500 text-center max-w-sm mb-6">
        {description}
      </Text>

      
    </View>
  );
};

export default EmptyState;