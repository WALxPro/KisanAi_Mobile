import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ArrowLeftIcon } from "../../../assets/Icon/ArrowLeftIcon";
import { KeyRoundIcon } from "../../../assets/Icon/KeyRoundIcon";
import Button from "../../components/Ui/Button";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { markOtpVerified } from "../../redux/store/slices/formSlice";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpSchema } from "../../services/validation/RegisterSchema";

export default function OTP({ navigation, route }) {
  const { email } = route.params;
    const formData = useSelector((state) => state.form);
    console.log("Form Data in OTP Screen:", formData); // Debugging line
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [resendLoading, setResendLoading] = useState(false);

  const refs = useRef([]);

  const { verifyOtpAPI, sendOtpAPI, loading, error } = useAuth();
  const dispatch = useDispatch();

  const currentStep = 2;

  // ✅ React Hook Form
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
    resolver: yupResolver(otpSchema),
  });

  // ✅ Handle input
  const handleChange = (i, val) => {
    if (!/^\d$/.test(val)) return;

    const next = [...otp];
    next[i] = val;
    setOtp(next);

    // form sync
    setValue("otp", next.join(""));

    if (i < 5) refs.current[i + 1]?.focus();
  };

  // backspace handling
  const handleKeyPress = (i, key) => {
  if (key === "Backspace") {
    const next = [...otp];
    if (next[i]) {
      // Clear the current input
      next[i] = "";
      setOtp(next);
      setValue("otp", next.join(""));
    } else if (i > 0) {
      // Move focus back if current is already empty
      refs.current[i - 1]?.focus();
    }
  }
};

  // ✅ Verify OTP
  const onSubmit = async (data) => {
    try {
      await verifyOtpAPI({ email, otp: data.otp });

      // ✅ correct dispatch
      dispatch(markOtpVerified());
navigation.navigate("ProfileImage", { email });
    } catch (err) {
      setOtp(Array(6).fill(""));
      refs.current[0]?.focus();
    }
  };

  // ✅ Resend OTP
  const handleResend = async () => {
    try {
      setResendLoading(true);
      await sendOtpAPI({ email });
    } catch (err) {
      console.log("Resend OTP failed:", err);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-login_panel px-6 pt-12 pb-8"
    >
      {/* Back */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="mt-3 flex-row items-center gap-2"
      >
        <ArrowLeftIcon size={20} color="#FFFFFF80" />
        <Text className="text-lg text-primary-foreground/50">Back</Text>
      </TouchableOpacity>

      {/* Step */}
      <Text className="mb-1 text-base mt-6 font-medium uppercase tracking-wider text-accent">
        Step {currentStep} of 4
      </Text>

      {/* Icon */}
      <View className="mb-4 mt-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15">
        <KeyRoundIcon size={32} color="#14B8A6" />
      </View>

      {/* Heading */}
      <View className="mb-4 mt-4">
        <Text className="text-4xl font-interBold text-primary-foreground">
          Verify Number
        </Text>
        <Text className="mt-2 text-primary-foreground/60 text-lg">
          Enter the 6-digit code sent to your email
        </Text>
      </View>

      {/* OTP Inputs */}
      <View className="flex-row justify-between mb-2">
        {otp.map((d, i) => (
          <TextInput
            key={i}
            ref={(el) => (refs.current[i] = el)}
            value={d}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(val) => handleChange(i, val)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(i, nativeEvent.key)
            }
            className="h-14 w-12 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 text-center text-xl font-bold text-primary-foreground"
          />
        ))}
      </View>

      {/* ✅ Yup Error */}
      {errors.otp && (
        <Text className="text-center text-red-500 mb-2">
          {errors.otp.message}
        </Text>
      )}

      {/* ✅ API Error */}
      {error && (
        <Text className="text-center text-red-500 mb-2">{error}</Text>
      )}

      {/* Resend */}
      <Text className="text-center text-lg text-primary-foreground/50 mb-6">
        Didn't receive code?{" "}
        <Text className="font-semibold text-accent" onPress={handleResend}>
          {resendLoading ? "Sending..." : "Resend"}
        </Text>
      </Text>

      {/* Button */}
      <Button onPress={handleSubmit(onSubmit)} disabled={loading}>
        {loading ? "Verifying..." : "Verify & Continue"}
      </Button>

      {/* Progress */}
      <View className="flex-row items-center justify-center mt-8 gap-2">
        {[1, 2, 3, 4].map((s) => (
          <View
            key={s}
            className={`h-2.5 ${
              s === currentStep
                ? "w-2.5 rounded-full bg-accent"
                : "w-2.5 rounded-full bg-primary-foreground/15"
            }`}
          />
        ))}
      </View>
    </ScrollView>
  );
}