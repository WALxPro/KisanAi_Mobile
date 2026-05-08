import React, { useState, useCallback } from "react";
import { Text, ScrollView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import TutorialCard from "./TutorialCard";
import EmptyState from "./EmptyState";
import CardSkeleton from "./CardSkeleton";

import { get } from "../../api/apiClient";

const TutorialList = ({ search = "" }) => {
  const navigation = useNavigation();

  const [tutorialList, setTutorialList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTutorial = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await get("tutorial/public");

      console.log("API RESPONSE:", response);

      setTutorialList(Array.isArray(response) ? response : []);
    } catch (err) {
      console.log("ERROR:", err.message);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTutorial();
    }, [])
  );

  const filteredTutorial = tutorialList.filter((blog) =>
    blog.title
      ?.toLowerCase()
      .includes(search?.toLowerCase() || "")
  );

  if (error) {
    return (
      <Text style={{ color: "red", textAlign: "center" }}>
        {error}
      </Text>
    );
  }

  if (loading) {
    return (
      <ScrollView className="p-2 my-4">
        {[1, 2, 3].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </ScrollView>
    );
  }

  if (!tutorialList.length) {
    return (
      <EmptyState
        title="No Blogs Found"
        description="There are no blogs available right now."
      />
    );
  }

  if (!filteredTutorial.length && search) {
    return (
      <EmptyState
        title="No Blogs Found"
        description={`No blogs match your search for "${search}".`}
      />
    );
  }

  return (
    <ScrollView className="p-2">
      {filteredTutorial.map((blog) => (
        <TutorialCard
          key={blog._id}
          item={blog}
          onPress={() =>
            navigation.navigate("SingleTutorial", {
              id: blog._id,
            })
          }
        />
      ))}
    </ScrollView>
  );
};

export default TutorialList;