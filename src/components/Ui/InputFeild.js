import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Input from "./Input";
import { EyeIcon } from "../../../assets/Icon/EyeIcon";
import { EyeOffIcon } from "../../../assets/Icon/EyeOffIcon";

const InputField = ({
  label,
  placeholder,
  className = "",
  psd = false,
  fsd = false,
  value,
  onChangeText,
  error,
  labelColor,
  icon,
  inputStyle,
  readOnly,
  fontSize,
  fontBold,
  containerMarginVertical = 8,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ marginVertical: containerMarginVertical }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {label && (
          <Text
            style={{
              fontSize:fontSize  || 16,
              marginBottom: 6,
              color: labelColor || "rgba(255,255,255,0.7)",
              fontWeight : fontBold
            }}
          >
            {label}
          </Text>
        )}

        {fsd && (
          <TouchableOpacity>
            <Text style={{ color: "#14b8a6", fontSize: 14 }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ justifyContent: "center" }}>
        {icon && (
          <View
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: [{ translateY: -12 }],
              zIndex: 10,
            }}
          >
            {icon}
          </View>
        )}

        <Input
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={psd && !showPassword}
          style={[
            {
              paddingLeft: icon ? 48 : 16,
              paddingRight: psd ? 48 : 16,
            },
            inputStyle,
          ]}
          editable={!readOnly} // 👈 forward
        />

        {psd && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: [{ translateY: -12 }],
            }}
          >
            {showPassword ? (
              <EyeOffIcon size={20} color="rgba(255,255,255,0.5)" />
            ) : (
              <EyeIcon size={20} color="rgba(255,255,255,0.5)" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Error */}
      {error ? (
        <Text style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default InputField;
