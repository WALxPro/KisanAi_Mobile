import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

export const SearchIcon = ({ size = 20, color = "#9CA3AF" }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    {/* Circle */}
    <Circle
      cx="11"
      cy="11"
      r="8"
      stroke={color}
      strokeWidth={2}
    />

    {/* Handle */}
    <Path
      d="m21 21-4.34-4.34"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);