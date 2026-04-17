import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { HouseIcon } from "../../../assets/Icon/HouseIcon";
import { FileTextIcon } from "../../../assets/Icon/FileTextIcon";
import { BookOpenIcon } from "../../../assets/Icon/BookOpenIcon";
import { CameraIcon } from "../../../assets/Icon/CameraIcon";
import { SafeAreaView } from "react-native-safe-area-context";
const navItems = [
  { icon: HouseIcon, label: "Home", route: "Home" },
  { icon: FileTextIcon, label: "Blogs", route: "Blogs" },
  { icon: null, label: "Scan", route: "Scan", isCenter: true },
  { icon: BookOpenIcon, label: "Tutorial", route: "Tutorial" },
  { icon: AlertCircleIcon, label: "Complain", route: "Complain" },
];
import { useNavigation, useRoute } from "@react-navigation/native";
import { AlertCircleIcon } from "../../../assets/Icon/AlertCircleIcon";

export const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeName = route?.name ?? "";

  return (
    <View className="absolute bottom-0 left-0 right-0 items-center">
      <SafeAreaView edges={["bottom"]} className="w-full bg-white border-t border-border">
        <View className="flex-row items-end justify-between px-4 pt-1 pb-4">
          {navItems.map((item) => {
            const isActive = routeName === item.route;

            return item.isCenter ? (
              <TouchableOpacity
                key={item.label}
                onPress={() => navigation.navigate(item.route)}
                className="items-center"
                style={{ marginTop: -24 }}
              >
                <View className="h-14 w-14 items-center justify-center ml-4  rounded-full bg-[#14b8a6] border-4 border-white">
                  <CameraIcon size={24} color="white" />
                </View>

                <Text className="mt-1 text-[10px] ml-4  text-muted-foreground">
                  Scan
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={item.label}
                onPress={() => navigation.navigate(item.route)}
                className="items-center pt-2"
              >
                {item.icon && (
                  <item.icon
                    size={isActive ? 22 : 20}
                    color={isActive ? "#14b8a6" : "#6b7280"}
                  />
                )}

                <Text className={`text-[10px] ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
};
