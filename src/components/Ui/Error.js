import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AlertCircleIcon } from "../../../assets/Icon/AlertCircleIcon";

const Error = ({
    title = "Something went wrong",
    description = "Please try again.",
}) => {
    return (
        <View className="flex-1 items-center justify-center py-20 px-6">

            {/* Icon */}
            <View className="h-20 w-20 items-center justify-center rounded-2xl bg-red-100 mb-5">
                <AlertCircleIcon width={20} height={20} color="#EF4444" />
            </View>

            {/* Title */}
            <Text className="text-lg font-semibold text-black mb-1.5">
                {title}
            </Text>

            {/* Description */}
            <Text className="text-sm text-gray-500 text-center max-w-sm mb-6">
                {description}
            </Text>


        </View>
    );
};

export default Error;