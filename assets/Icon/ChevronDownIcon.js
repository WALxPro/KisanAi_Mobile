import React from "react";
import Svg, { Path } from "react-native-svg";

export const ChevronDownIcon = ({ size = 24, color = "#9CA3AF" }) => (
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
    <Path d="m6 9 6 6 6-6" />
  </Svg>
);
