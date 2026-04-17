import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons"; // Expo vector icons
import logo from "../../../assets/images/logo.png"; // Keep your path correct
import Button from "../../components/Ui/Button";
import MainLogo from "../../components/Design/MainLogo";
import Sprout from "../../../assets/Icon/Sprout.js"; // Importing the sprout SVG as a React component

export default function WelcomeScreen({ navigation }) {
  return (
    <View className="flex-1 bg-login_panel justify-between px-5 py-[50px]">
      <View className="flex-1 items-center justify-center relative">
        <View className="absolute top-20 left-8 h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 animate-fade-in">
          <Feather name="sun" size={24} color="#14B8A6" />
        </View>
        <View className="absolute top-32 right-10 h-10 w-10 items-center justify-center rounded-xl bg-wheat/15 animate-fade-in">
          <Feather name="droplet" size={20} color="#EAB308" />
        </View>
        <View className="absolute bottom-24 left-12 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 animate-fade-in">
          <Sprout size={20} color="#0f7a4f" />
        </View>

        <MainLogo />

        <Text className="text-4xl font-bold text-primary-foreground z-10 mt-5 mb-2">
          KisanAI
        </Text>

        <Text className=" text-center text-lg text-primary-foreground/60 max-w-[280px] z-10">
          Empowering Farmers with AI-Driven Insights
        </Text>
      </View>

      <View>
        <Button variant="default" onPress={() => navigation.navigate("Login")}>
          Login
        </Button>

        <Button
          variant="outline"
          onPress={() => navigation.navigate("SignUp")}
          className="mt-3"
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
}
