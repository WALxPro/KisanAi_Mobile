import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView ,ScrollView} from "react-native";
import TutorialCard from "./TutorialCard";
import { useNavigation } from "@react-navigation/native";
import EmptyState from "./EmptyState";
import CardSkeleton from "./CardSkeleton";
import { get } from "../../api/apiClient";

// Single Tutorial Card Componen

// Tutorial List Component
const TutorialList = ({ search = ""}) => {
    const navigation = useNavigation();
    const [Tutoriallist, setTutorial] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTutorial = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await get("tutorial/all");
      console.log("API RESPONSE:", response);
setTutorial(response);    } catch (err) {
      console.log("ERROR:", err.message);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchTutorial(); // pehli baar load

  // const interval = setInterval(() => {
  //   fetchTutorial(); // har 30 second baad
  // }, 30000);

  // return () => clearInterval(interval); // screen chhodni toh band
}, []);

    const filteredTutorial = Tutoriallist.filter((blog) =>
    blog.title?.toLowerCase().includes(search.toLowerCase())
  );
  if(!filteredTutorial.length && search){
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
  if (!Tutoriallist.length) {
    return (
      <EmptyState
        title="No Blogs Found"
        description="There are no blogs available right now."
      />
    );
  }


  return (
      <ScrollView className="p-2 my-4">
      {filteredTutorial.map((blog) => (
        <TutorialCard
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

export default TutorialList;