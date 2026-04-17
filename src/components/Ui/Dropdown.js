import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Dropdown({ label, options = [], value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <View className="mb-5">
      {label && (
        <Text className="mb-2 text-[15px] font-semibold text-foreground">
          {label}
        </Text>
      )}

      {/* Selected Box */}
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        className="h-[54px] border border-[#d1d5db] rounded-xl px-4 flex-row items-center justify-between bg-white"
      >
        <Text className="text-[#111827]">
          {value || "Select"}
        </Text>

        <Ionicons name="chevron-down" size={20} color="#6b7280" />
      </TouchableOpacity>

      {/* Dropdown List */}
      {open && (
        <View className="border border-[#e5e7eb] rounded-xl mt-2 bg-white overflow-hidden">
          {options.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onChange(item);
                setOpen(false);
              }}
              className="px-4 py-3 border-b border-[#f1f5f9]"
            >
              <Text className="text-[#111827]">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}