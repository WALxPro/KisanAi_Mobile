import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { get } from "../../api/apiClient";
import { useNavigation } from "@react-navigation/native";
import BlogCard from "./BlogCard";
import CardSkeleton from "./CardSkeleton";
import EmptyState from "./EmptyState";
import Error from "./Error";



const BlogList = ({ search = ""}) => {
  const navigation = useNavigation();
  const [bloglist, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await get("blogs/all");
      console.log("API RESPONSE:", response);
      setBlogs(response);
    } catch (err) {
      console.log("ERROR:", err.message);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchBlogs(); // pehli baar load

  // const interval = setInterval(() => {
  //   fetchBlogs(); // har 30 second baad
  // }, 30000);

  // return () => clearInterval(interval); // screen chhodni toh band
}, []);

    const filteredBlogs = bloglist.filter((blog) =>
    blog.title?.toLowerCase().includes(search.toLowerCase())
  );
  if(!filteredBlogs.length && search){
    return (
      <EmptyState
        title="No Blogs Found"
        description={`No blogs match your search for "${search}". Try a different keyword.`}
      />
    );
  }

  // ✅
if (error) {
  return <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>;
}

 // 🔥 LOADING (SKELETON)
  if (loading) {
    return (
      <ScrollView className="p-2 my-4">
        {[1, 2, 3].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </ScrollView>
    );
  }
  if (!bloglist.length) {
    return (
      <EmptyState
        title="No Blogs Found"
        description="There are no blogs available right now."
      />
    );
  }

  return (
    <ScrollView className="p-2 my-4">
      {filteredBlogs.map((blog) => (
        <BlogCard
          key={blog._id}
          item={blog} // Pass the entire blog object
          onPress={() =>
            navigation.navigate("SingleBlog", {
              id: blog._id,
            })
          }
        />
      ))}
    </ScrollView>
  );
};

export default BlogList;