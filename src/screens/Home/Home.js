import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MainLayout from "../../components/Layout/MainLayout";
import WeatherCard from "../../components/Ui/WeatherCard";
import BlogCard from "../../components/Ui/BlogCard";
import TutorialCard from "../../components/Ui/TutorialCard";
import { useSelector } from "react-redux";
import { Header } from "../../components/Layout/Header";
import ScanCard from "../../components/Ui/ScanCard";

const WEATHER_API_KEY = "50e1795745e14d5bbf6194642262603";

const BLOG = {
  _id: "1",
  title: "Wheat Disease Prevention in Punjab",
  description:
    "Learn the best practices to protect your wheat crop from rust and blight this season.",
  category: "Farming Tips",
  date: "Mar 25, 2026",
  author: "John Doe",
  image:
    "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80",
};

const TUTORIAL = {
  id: "1",
  title: "How to Use AI Crop Scanner",
  summary: "Step-by-step guide to scan your crop and get instant diagnosis.",
  category: "Tutorial",
  duration: "3:45",
  level: "Beginner",
  thumbnail:
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80",
};
const historyData = [
    {
        id: "1",
        predicted_label: "Potato Early Blight",
        confidence: 0.9993,
        date: "2026-04-15",
        time: "3:48 PM",
    },
    
];
const mandiRates = [
  { name: "Wheat", rate: "2500 PKR/40kg", emoji: "🌾" },
  { name: "Onion", rate: "120 PKR/kg", emoji: "🧅" },
  { name: "Potato", rate: "45 PKR/kg", emoji: "🥔" },
];

const SectionHeader = ({ title }) => (
  <Text className="text-lg font-bold text-foreground mb-2 mt-4">{title}</Text>
);

const MandiCard = () => (
  <View className="bg-gray-100 rounded-2xl p-4 my-4">
    <Text className="text-lg font-bold mb-2">Mandi Rates</Text>

    {mandiRates.map((item) => (
      <View key={item.name} className="flex-row justify-between py-2">
        <Text>
          {item.emoji} {item.name}
        </Text>
        <Text className="font-bold">{item.rate}</Text>
      </View>
    ))}
  </View>
);

const Home = () => {
  const farmer = useSelector((state) => state.auth.user);

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Karachi`,
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.log("Weather Error:", err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <>
    <Header />
    <MainLayout showBottomNav={true}>
      <View className="px-4">
        
        {weather?.current ? (
          <WeatherCard weather={weather} />
        ) : (
          <Text className="text-center mt-4">Loading weather...</Text>
        )}
        {historyData.map((item) => (
          <ScanCard key={item.id} item={item} isHeader={true} />
        ))}
        
        {/* <MandiCard /> */}
        <SectionHeader title="Latest Blog" />
        <BlogCard
          key={BLOG._id}
          item={BLOG}
          onPress={() => console.log("Open blog", BLOG._id)}
        />
        <SectionHeader title="Latest Tutorial" />
        <TutorialCard item={TUTORIAL} />
      </View>
    </MainLayout>
    </>
    
  );
};

export default Home;
