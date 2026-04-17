import React from "react";
import Svg, { Path } from "react-native-svg";

export const WindIcon = ({ size = 24, color = "#14b8a6" }) => (
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
    <Path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
    <Path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
    <Path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
  </Svg>
);