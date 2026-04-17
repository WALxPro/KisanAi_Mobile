import React from "react";
import Svg, { Path } from "react-native-svg";

export const ChevronRightIcon = ({ size = 24, color = "#000" }) => (
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
    <Path d="m9 18 6-6-6-6" />
  </Svg>
);