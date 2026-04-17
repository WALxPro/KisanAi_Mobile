import { Text, TouchableOpacity, View } from "react-native";

const tabs = [
  { key: "submit", label: "New Complaint" },
  { key: "history", label: "My Complaints" },
];

const ComplaintTab = ({ activeTab, setActiveTab }) => {
  return (
    <View className="pt-1">
      <View
        className="flex-row rounded-xl p-1"
        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              className="flex-1 rounded-lg items-center py-2"
              style={{
                backgroundColor: isActive ? "white" : "transparent",
              }}
            >
              <Text
                className="text-[13px] font-extrabold"
                style={{
                  color: isActive ? "#0f7a4f" : "rgba(255,255,255,0.85)",
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ComplaintTab;
