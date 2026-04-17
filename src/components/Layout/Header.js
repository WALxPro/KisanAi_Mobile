import { LinearGradient } from "expo-linear-gradient";
import MainLogo from "../Design/MainLogo";
import { SettingsIcon } from "../../../assets/Icon/SettingsIcon";
import { LogOutIcon } from "../../../assets/Icon/LogOutIcon";
import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { persistor } from "../../redux/store";
import { logout as clearAuth } from "../../redux/store/slices/authSlice";

export const Header = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Kya aap app se logout karna chahte hain?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            dispatch(clearAuth());
            await persistor.flush();
            await persistor.purge();

            navigation.getParent()?.reset({
              index: 0,
              routes: [{ name: "Welcome" }],
            });
          } catch (error) {
            Alert.alert(
              "Logout failed",
              error?.message || "Logout complete nahi ho saka. Dobara try karein."
            );
          }
        },
      },
    ]);
  };

  return (
    <View className="overflow-hidden">
      <LinearGradient
        colors={["#0f7a4f", "#14b8a6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-5 pt-12 pb-4"
      >
        <View className="flex-row items-center justify-between mb-2 mt-2">
          <View className="flex-row items-center gap-3">
            <MainLogo size={40} iconSize={15} />
            <Text className="text-lg mt-2 font-interBold text-white">
              KisanAI
            </Text>
          </View>

          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              onPress={() => navigation.navigate("Settings")}
              className="h-10 w-10 rounded-xl bg-white/15 items-center justify-center"
            >
              <SettingsIcon width={20} height={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              disabled={loading}
              className="h-10 w-10 rounded-xl bg-white/15 items-center justify-center"
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <LogOutIcon width={20} height={20} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};