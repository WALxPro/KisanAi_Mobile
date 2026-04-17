
import {
  View,
  Text,
  ScrollView,
} from "react-native";
import MainLogo from "../../components/Design/MainLogo";
import Button from "../../components/Ui/Button";
import InputField from "../../components/Ui/InputFeild";
import { MailIcon } from "../../../assets/Icon/MailIcon";
import { LockIcon } from "../../../assets/Icon/LockIcon";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../services/validation/LoginSchema";
import useAuth from "../../hooks/useAuth";
import { loginSuccess } from "../../redux/store/slices/authSlice";

export default function Login({ navigation }) {
  const { loading, error, signin, farmerInfo } = useAuth();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await signin({ email: data.email, password: data.password });

      const farmerResponse = await farmerInfo({ email: data.email });
      const farmer = farmerResponse?.farmer;

      dispatch(
        loginSuccess({
          email: data.email,
          ...farmer,
        }),
      );

      navigation.replace("MainTabs");
    } catch (err) {
      console.log(err, "Login failed");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-login_panel px-6 pt-12 pb-8"
    >
      <View className="mt-12 mb-4 flex-row items-center gap-3">
        <MainLogo size={50} iconSize={30} />
        <Text className="text-2xl mt-2 font-interBold text-primary-foreground">
          KisanAI
        </Text>
      </View>

      <View className="mb-8 mt-4">
        <Text className="text-4xl font-interBold text-primary-foreground">
          Welcome back
        </Text>
        <Text className="mt-2 text-primary-foreground/60 text-lg">
          Sign in with your email and password to continue
        </Text>
      </View>

      <View className="flex-1 space-y-5">
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

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <InputField
              label="Password"
              placeholder="******"
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

        <View className="mt-4">
          <Button onPress={handleSubmit(onSubmit)} disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <View className="mt-5">
            <Text className="text-center text-lg text-primary-foreground/50">
              Don't have an account?{" "}
              <Text
                className="font-interBold text-accent"
                onPress={() => navigation.navigate("SignUp")}
              >
                Register
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
