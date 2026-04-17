import React from "react";
import Svg, { Path } from "react-native-svg";

export default function Sprout({ size = 56, color = "#FFFFFF" }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Main stem */}
      <Path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3" />
      {/* Leaves */}
      <Path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" />
      {/* Ground / base */}
      <Path d="M5 21h14" />
    </Svg>
  );
}