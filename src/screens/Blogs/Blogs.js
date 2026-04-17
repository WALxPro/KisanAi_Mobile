import React, { useState } from "react";

import { View, Text, TouchableOpacity } from "react-native";

import MainLayout from "../../components/Layout/MainLayout";
import BlogList from "../../components/Ui/BlogList";
import { Topbar } from "../../components/Layout/TopBar";



 const Blogs = () => {
    const [search, setSearch] = useState("");

  return (
    <>
  <Topbar title="Blogs" showSearch={true} search={search}
        setSearch={setSearch} />
    <MainLayout showBottomNav={true} >
      <View className="flex-1 ">
        <BlogList search={search}/>
      </View>
    </MainLayout>
        </>
  );
};
export default Blogs
