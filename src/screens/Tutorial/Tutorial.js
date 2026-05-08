import React, { useState } from "react";

import { View } from "react-native";

import MainLayout from "../../components/Layout/MainLayout";
import TutorialList from "../../components/Ui/TutorialList";
import { Topbar } from "../../components/Layout/TopBar";


const categories = ["All", "Getting Started", "Features", "Account", "Support"];

 const Tutorial = () => {
      const [search, setSearch] = useState("");
  
  return (
    <>
      <Topbar title="Tutorial" showSearch={true} search={search} setSearch={setSearch}/>
    
    <MainLayout showBottomNav={true}>
      <View className="flex-1 ">
        <TutorialList search={search}/>
      </View>
    </MainLayout>
    </>
  );
};
export default Tutorial
