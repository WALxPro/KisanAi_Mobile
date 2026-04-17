import React from "react";
import { View } from "react-native";

const Bone = ({ className = "" }) => {
  return (
    <View
      className={`bg-gray-300/60 rounded-xl overflow-hidden ${className}`}
    />
  );
};

const CardSkeleton = () => {
  return (
    <View className="rounded-2xl border border-gray-200 bg-white overflow-hidden mb-5">

      {/* Image skeleton */}
      <Bone className="h-44 w-full rounded-none" />

      <View className="p-5 space-y-3">

        {/* Title */}
        <Bone className="h-5 w-3/4" />

        {/* Description lines */}
        <Bone className="h-4 w-full" />
        <Bone className="h-4 w-2/3" />

        {/* Tags */}
        <View className="flex-row gap-3 pt-1">
          <Bone className="h-7 w-20 rounded-lg" />
          <Bone className="h-7 w-20 rounded-lg" />
        </View>

        {/* Footer */}
        <View className="flex-row items-center justify-between border-t border-gray-200 pt-3">

          <Bone className="h-3 w-24" />

          <View className="flex-row gap-1">
            <Bone className="h-8 w-8 rounded-lg" />
            <Bone className="h-8 w-8 rounded-lg" />
          </View>

        </View>

      </View>
    </View>
  );
};

export default CardSkeleton;