import React, { forwardRef, useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { SearchIcon } from "../../../assets/Icon/SearchIcon";

const SearchInput = forwardRef(
  (
    {
      value,
      onChangeText,
      placeholder = "Search...",
      style = {},
      containerStyle = {},
      showClear = true,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    return (
      <View
      >
        {/* Inner Box */}
        <View
          style={[
            {
              width: "100%", // ✅ responsive width
              height: 56,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 16,

              // 🎨 PERFECT COLOR COMBO
              backgroundColor: "#ffffff",
              borderWidth: 1,
              borderColor: focused ? "#14b8a6" : "#e5e7eb",

              paddingHorizontal: 16,

              // Shadow (important for floating effect)
              elevation: 5,
            },
            containerStyle,
          ]}
        >
          <SearchIcon size={20} color="#6b7280" />

          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            style={[
              {
                flex: 1,
                color: "#1e2a3a",
                marginLeft: 10,
              },
              style,
            ]}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />

          {showClear && value?.length > 0 && (
            <TouchableOpacity onPress={() => onChangeText("")}>
              <Text style={{ color: "#6b7280", fontSize: 16 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

export default SearchInput;