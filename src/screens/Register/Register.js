import React from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/Ui/Button";
import InputField from "../../components/Ui/InputFeild";
import { PhoneIcon } from "../../../assets/Icon/PhoneIcon";
import { LockIcon } from "../../../assets/Icon/LockIcon";
import { UserIcon } from "../../../assets/Icon/UserIcon";
import { MailIcon } from "../../../assets/Icon/MailIcon";
import { registerSchema } from "../../services/validation/RegisterSchema";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { saveBasic } from "../../redux/store/slices/formSlice";

// Schema same

export default function Register({ navigation }) {
  const currentStep = 1;
  const { loading, error, sendOtpAPI, VerifyOtp } = useAuth();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      dispatch(
        saveBasic({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
      );
      await sendOtpAPI({ email: data.email });
      navigation.navigate("VerifyOtp", { email: data.email });
    } catch (err) {
      console.log(err, "OTP failed");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 48,
        paddingBottom: 32,
      }}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      className="bg-login_panel"
    >
      <Text className="mb-1 text-base mt-3 font-medium uppercase tracking-wider text-accent">
        Step {currentStep} of 4
      </Text>

      <View className="mb-4 mt-4">
        <Text className="text-4xl font-interBold text-primary-foreground">
          Create Account
        </Text>
        <Text className="mt-2 text-primary-foreground/60 text-lg">
          Enter your personal details
        </Text>
      </View>

      <View className="flex-1">
        <Controller
          control={control}
          name="fullName"
          render={({ field: { value, onChange } }) => (
            <InputField
              label="Full Name"
              placeholder="Muhammad Ahmad"
              value={value}
              onChangeText={onChange}
              icon={<UserIcon size={20} color="#14b8a6" />}
              error={errors.fullName?.message}
            />
          )}
        />

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <InputField
              label="Email"
              placeholder="you@example.com"
              value={value}
              onChangeText={onChange}
              icon={<MailIcon size={20} color="#14b8a6" />}
              error={errors.email?.message}
            />
          )}
        />

        {/* Phone */}
        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange } }) => (
            <InputField
              label="Phone Number"
              placeholder="0300-1234567"
              value={value}
              onChangeText={onChange}
              icon={<PhoneIcon size={20} color="#14b8a6" />}
              error={errors.phone?.message}
            />
          )}
        />

        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <InputField
              label="Password"
              placeholder="••••••"
              psd
              value={value}
              onChangeText={onChange}
              icon={<LockIcon size={20} color="#14b8a6" />}
              error={errors.password?.message}
            />
          )}
        />
        {error && (
          <Text className="text-red-500 text-center mt-2">{error}</Text>
        )}
        <View className="mt-6">
          <Button onPress={handleSubmit(onSubmit)} disabled={loading}>
            {loading ? "Sending OTP..." : "Continue"}
          </Button>

          <View className="flex-row items-center justify-center mt-8 gap-2">
            {[1, 2, 3, 4].map((s) => (
              <View
                key={s}
                className={`h-2.5 w-2.5 rounded-full ${
                  s === currentStep ? "bg-accent" : "bg-primary-foreground/15"
                }`}
              />
            ))}
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
