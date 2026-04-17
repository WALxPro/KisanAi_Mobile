import { forwardRef } from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Button = forwardRef(
  (
    {
      children,
      variant = "default",
      className = "",
      loading = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const textVariants = {
      default: "text-white font-interBold text-lg",
      outline: "text-primary-foreground font-interBold text-lg",
    };

    // ✅ DEFAULT (GRADIENT BUTTON)
    if (variant === "default") {
      return (
        <TouchableOpacity
          ref={ref}
          activeOpacity={0.8}
          disabled={isDisabled}
          {...props}
          style={{
            height: 56,
            marginTop: 12,
            borderRadius: 12,
            overflow: "hidden",
            opacity: isDisabled ? 0.6 : 1,
          }}
        >
          <LinearGradient
            colors={["#0f7a4f", "#14b8a6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                className={`${
                  textVariants[variant] || textVariants.default
                } text-center`}
              >
                {children}
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    // ✅ OUTLINE BUTTON
    return (
      <TouchableOpacity
        ref={ref}
        activeOpacity={0.8}
        disabled={isDisabled}
        {...props}
        className={`h-[56px] mt-3 px-5 rounded-lg border border-primary-foreground/20 items-center justify-center ${
          isDisabled ? "opacity-50" : ""
        } ${className}`}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text
            className={`${
              textVariants[variant] || textVariants.default
            } text-center`}
          >
            {children}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
);

// Button.displayName = "Button";

export default Button;