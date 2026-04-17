import React from "react";
import Svg, { Path } from "react-native-svg";

export const BugIcon = ({ size = 24, color = "#000" }) => (
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
    <Path d="M12 20v-9" />
    <Path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" />
    <Path d="M14.12 3.88 16 2" />
    <Path d="M21 21a4 4 0 0 0-3.81-4" />
    <Path d="M21 5a4 4 0 0 1-3.55 3.97" />
    <Path d="M22 13h-4" />
    <Path d="M3 21a4 4 0 0 1 3.81-4" />
    <Path d="M3 5a4 4 0 0 0 3.55 3.97" />
    <Path d="M6 13H2" />
    <Path d="m8 2 1.88 1.88" />
    <Path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" />
  </Svg>
);