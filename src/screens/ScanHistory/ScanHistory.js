import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Topbar } from "../../components/Layout/TopBar";
import MainLayout from "../../components/Layout/MainLayout";
import { CalendarIcon } from "../../../assets/Icon/CalendarIcon";
import { AlertCircleIcon } from "../../../assets/Icon/AlertCircleIcon";
import { TriangleAlertIcon } from "../../../assets/Icon/TriangleAlertIcon";
import { BadgeCheckIcon } from "../../../assets/Icon/BadgeCheckIcon";
import { ChevronRightIcon } from "../../../assets/Icon/ChevronRightIcon";
import LeafIcon from "../../../assets/Icon/Leaficon";
import ScanCard from "../../components/Ui/ScanCard";

const historyData = [
    {
        id: "1",
        predicted_label: "Potato Early Blight",
        confidence: 0.9993,
        date: "2026-04-15",
        time: "3:48 PM",
    },
    {
        id: "2",
        predicted_label: "Tomato Leaf Mold",
        confidence: 0.9412,
        date: "2026-04-12",
        time: "11:20 AM",
    },
];




const ScanHistory = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");

    const confidenceLabel = (confidence) => {
        if (confidence >= 0.9) return "Very Accurate";
        if (confidence >= 0.7) return "Likely";
        return "Uncertain";
    };

    const confidenceColor = (confidence) => {
        if (confidence >= 0.9) return "bg-green-600";
        if (confidence >= 0.7) return "bg-yellow-500";
        return "bg-red-500";
    };




    return (
        <>
            <Topbar title="Scan History" showSearch={true} search={search}
                setSearch={setSearch} />

            <MainLayout  >
                <View className="flex-1 ">

                    {historyData.map((item) => (
                        <ScanCard key={item.id} item={item} />
                    ))}

                </View>
            </MainLayout>

        </>

    );
};

export default ScanHistory;