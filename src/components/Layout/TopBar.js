import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ArrowLeftIcon } from "../../../assets/Icon/ArrowLeftIcon";
import SearchInput from "../Ui/SearchInput";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

export const Topbar = ({ title, showSearch = false , complaint=true , search, setSearch}) => {
  
  const navigation = useNavigation();

  return (
    <View className="overflow-hidden">
      <LinearGradient
        colors={["#0f7a4f", "#14b8a6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className={`px-5 pt-12 ${showSearch ? "pb-8" : "pb-0"}`}
      >
        <View className="flex-row items-center justify-between mb-4 mt-2">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="h-10 w-10 rounded-xl bg-white/15 items-center justify-center"
            >
              <ArrowLeftIcon width={20} height={20} color="white" />
            </TouchableOpacity>
            <Text className="text-2xl font-interBold text-white">{title}</Text>
            
          </View>
          
        </View>

        {showSearch && <SearchInput value={search} onChangeText={setSearch} />}
      </LinearGradient>
    </View>
  );
};
