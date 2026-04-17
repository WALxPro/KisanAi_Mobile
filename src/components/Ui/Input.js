import { forwardRef } from "react";
import { TextInput } from "react-native";

const Input = forwardRef(
  ({ readOnly = false, style = {}, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        editable={!readOnly}
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={[
          {
            height: 56,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.2)",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: 12,
            color: "#fff",
            paddingHorizontal: 16,
          },
          style, // ✅ allow override (important)
        ]}
        {...props}
      />
    );
  }
);

// Input.displayName = "Input";

export default Input;