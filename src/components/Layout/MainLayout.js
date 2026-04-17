import React from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";

const MainLayout = ({ children,showBottomNav }) => {
  return (
    <View className="flex-1 bg-white">
      

      <SafeAreaView className="flex-1  bg-white mb-[50px]">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
          className="p-4"
        >
          {children}
        </ScrollView>
      </SafeAreaView>

      {showBottomNav && <BottomNav />}
    </View>
  );
};

export default MainLayout;