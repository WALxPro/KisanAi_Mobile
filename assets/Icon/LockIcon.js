import React from "react";
import Svg, { Path } from "react-native-svg"; // ✅ MUST
export const LockIcon = ({ size = 20, color = "#fff" }) => (
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
    <Path d="M6 10V7a6 6 0 0 1 12 0v3" />
    <Path d="M5 10h14v11H5z" />
  </Svg>
);
