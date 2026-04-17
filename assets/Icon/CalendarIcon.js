import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

export const CalendarIcon = ({ size = 24, color = "#000" }) => (
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
    {/* Top lines */}
    <Path d="M8 2v4" />
    <Path d="M16 2v4" />

    {/* Main box */}
    <Rect x="3" y="4" width="18" height="18" rx="2" />

    {/* Divider line */}
    <Path d="M3 10h18" />
  </Svg>
);