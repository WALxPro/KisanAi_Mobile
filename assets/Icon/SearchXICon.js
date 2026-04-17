import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export const SearchXIcon = ({
  size = 24,
  color = "#000",
}) => {
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
      {/* magnifying glass circle */}
      <Circle cx="11" cy="11" r="8" />

      {/* search handle */}
      <Path d="m21 21-4.3-4.3" />

      {/* X inside search */}
      <Path d="m13.5 8.5-5 5" />
      <Path d="m8.5 8.5 5 5" />
    </Svg>
  );
};