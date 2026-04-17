import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import LeafIcon from "../../../assets/Icon/Leaficon";
import { View } from "react-native";

export default function MainLogo({ size = 112, iconSize = 56 }) {
  return (
    <LinearGradient
      colors={["#0f7a4f", "#14b8a6"]} 
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }} 
      style={{
        height: size,
        width: size,
        borderRadius: size / 4.66, 
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4.65,
        elevation: 8,
      }}
    >
      <LeafIcon size={iconSize} color="#FFFFFF" />
    </LinearGradient>
  );
}