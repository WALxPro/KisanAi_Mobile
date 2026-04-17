import React from "react";
import Svg, { Path } from "react-native-svg"; // ✅ MUST
export const EyeIcon = ({ size = 20, color = "#fff" }) => (
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
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
    <Path d="M12 12a3 3 0 1 0 0.001-6.001A3 3 0 0 0 12 12z" />
  </Svg>
);
