import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";

import MainLayout from "../../components/Layout/MainLayout";
import { Topbar } from "../../components/Layout/TopBar";
import { get } from "../../api/apiClient";

const SingleBlog = ({ route }) => {
  const { id } = route.params;

  const [blog, setBlog] = useState(null); // ✅ object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const fetchBlog = async () => {
  setError(null);
  setLoading(true);

  console.log("BLOG ID:", id);
  console.log("CALLING API:", `blogs/${id}`);

  try {
const response = await get(`blogs/single/${id}`);
    console.log("RAW RESPONSE:", response);
    console.log("HAS BLOG KEY:", response?.blog);

    setBlog(response.blog || response);
  } catch (err) {
    console.log("ERROR FULL:", err);
    console.log("ERROR MESSAGE:", err.message);
    setError("Something went wrong");
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
  fetchBlog();
}, [id]); // ✅ better dependency

  if (loading) return <Text className="text-center mt-5">Loading...</Text>;

  if (error)
    return (
      <Text className="text-center mt-5 text-red-500">{error}</Text>
    );

  if (!blog) return <Text className="text-center mt-5">No Data</Text>;

  return (
    <>
      <Topbar title={blog.category} />

      <MainLayout>
        {/* <ScrollView> */}
          {/* Image */}
          <Image
            source={{ uri: blog.image }}
            className="w-full h-60 rounded-md"
          />

          <View className="p-4">
            
          <View className="self-start bg-secondary rounded-full px-3 py-1 mb-2">
        <Text className="text-xs font-interMedium text-primary">
          {blog.category}
        </Text>
      </View>
            {/* Title */}
            <Text className="text-lg font-interBold text-foreground mb-2">
              {blog.title}
            </Text>

            {/* Description */}
            <Text className="text-base font-inter text-muted-foreground mb-3">
              {blog.description}
            </Text>

            {/* Date */}
            <Text className="text-xs text-gray-400 mt-4">
              {blog.created_at}
            </Text>

              <View className="self-end bg-secondary rounded-full px-3 py-1 mb-2">
        <Text className="text-sm font-interMedium text-primary">
         Author : {blog.author}
        </Text>
      </View>
          </View>
        {/* </ScrollView> */}
      </MainLayout>
    </>
  );
};

export default SingleBlog;