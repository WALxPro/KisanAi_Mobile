import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import MainLayout from "../../components/Layout/MainLayout";
import WeatherCard from "../../components/Ui/WeatherCard";
import BlogCard from "../../components/Ui/BlogCard";
import TutorialCard from "../../components/Ui/TutorialCard";
import ScanCard from "../../components/Ui/ScanCard";

import { Header } from "../../components/Layout/Header";
import { ChevronRightIcon } from "../../../assets/Icon/ChevronRightIcon";

import { get } from "../../api/apiClient";
import CardSkeleton from "../../components/Ui/CardSkeleton";

const WEATHER_API_KEY = "50e1795745e14d5bbf6194642262603";

const historyData = [
  {
    id: "1",
    predicted_label: "Potato Early Blight",
    confidence: 0.9993,
    date: "2026-04-15",
    time: "3:48 PM",
  },
];

const SectionHeader = ({ title, navigateTo }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between mt-4 mb-2">
      <Text className="text-lg font-bold text-foreground">
        {title}
      </Text>

      {navigateTo && (
        <TouchableOpacity
          onPress={() => navigation.navigate(navigateTo)}
          className="flex-row items-center"
        >
          <Text className="text-sm font-semibold text-green-700 mr-1">
            View All
          </Text>

          <ChevronRightIcon size={14} color="#15803d" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const Home = () => {
  const farmer = useSelector((state) => state.auth.user);

  const [weather, setWeather] = useState(null);

  const [latestBlog, setLatestBlog] = useState(null);
  const [latestTutorial, setLatestTutorial] = useState(null);

  const [loading, setLoading] = useState(true);

  // FETCH ALL DATA
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        // WEATHER
        const weatherRes = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Karachi`
        );

        const weatherData = await weatherRes.json();

        setWeather(weatherData);

        // BLOG
        const blogResponse = await get("blogs/public");

        setLatestBlog(blogResponse?.[0] || null);

        // TUTORIAL
        const tutorialResponse = await get("tutorial/public");

        setLatestTutorial(tutorialResponse?.[0] || null);

      } catch (err) {
        console.log("HOME ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <>
      <Header />

      <MainLayout showBottomNav={true}>
        <View className="px-4">

          {/* FULL PAGE SKELETON */}
          {loading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              {/* WEATHER */}
              {weather?.current && (
                <WeatherCard weather={weather} />
              )}

              {/* LAST SCAN */}
              <SectionHeader
                title="Last Scan Result"
                navigateTo={"ScanHistory"}
              />

              {historyData.map((item) => (
                <View key={item.id}>
                  <ScanCard item={item} />
                </View>
              ))}

              {/* BLOG */}
              <SectionHeader
                title="Latest Blog"
                navigateTo={"Blogs"}
              />

              {latestBlog ? (
                <BlogCard
                  item={latestBlog}
                  onPress={() =>
                    console.log(
                      "Open blog",
                      latestBlog._id
                    )
                  }
                />
              ) : (
                <Text className="text-center mt-2">
                  No blog found
                </Text>
              )}

              {/* TUTORIAL */}
              <SectionHeader
                title="Latest Tutorial"
                navigateTo={"Tutorials"}
              />

              {latestTutorial ? (
                <TutorialCard
                  item={latestTutorial}
                  onPress={() =>
                    console.log(
                      "Open tutorial",
                      latestTutorial._id
                    )
                  }
                />
              ) : (
                <Text className="text-center mt-2">
                  No tutorial found
                </Text>
              )}
            </>
          )}

        </View>
      </MainLayout>
    </>
  );
};

export default Home;