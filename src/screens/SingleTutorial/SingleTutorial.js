import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { get } from "../../api/apiClient";
import { WebView } from "react-native-webview";
import { Video, ResizeMode } from "expo-av";
import { ArrowLeftIcon } from "../../../assets/Icon/ArrowLeftIcon";

const { width } = Dimensions.get("window");
const VIDEO_HEIGHT = (width * 9) / 16;

const extractYoutubeId = (url) => {
  if (!url || typeof url !== "string") return null;
  const patterns = [
    /youtu\.be\/([^?&#]+)/,
    /youtube\.com\/watch\?(?:.*&)?v=([^&#]+)/,
    /youtube\.com\/shorts\/([^?&#]+)/,
    /youtube\.com\/embed\/([^?&#]+)/,
    /youtube\.com\/v\/([^?&#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
};

const isCloudinaryVideo = (url) =>
  url && url.includes("cloudinary.com") && /\.(mp4|mov|avi|mkv|webm)/i.test(url);

const YoutubePlayer = ({ videoId }) => {
  const [loading, setLoading] = useState(true);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <View style={{ width, height: VIDEO_HEIGHT, backgroundColor: "#000" }}>
      {loading && (
        <View style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          alignItems: "center", justifyContent: "center", zIndex: 10,
        }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      <WebView
        source={{ uri: embedUrl }}
        style={{ flex: 1 }}
        allowsFullscreenVideo
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};

const CloudinaryPlayer = ({ videoUrl }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={{ width, height: VIDEO_HEIGHT, backgroundColor: "#000" }}>
      {loading && !error && (
        <View style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          alignItems: "center", justifyContent: "center", zIndex: 10,
        }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      {error ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "#ffffff80", fontSize: 13 }}>Failed to load video.</Text>
        </View>
      ) : (
        <Video
          source={{ uri: videoUrl }}
          style={{ flex: 1 }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onReadyForDisplay={() => setLoading(false)}
          onError={() => { setLoading(false); setError(true); }}
        />
      )}
    </View>
  );
};

const SingleTutorial = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;

  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTutorial = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await get(`tutorial/single/${id}`);
      setTutorial(response);
    } catch (err) {
      setError("Could not load tutorial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchTutorial(); }, [id]));

  const renderVideoPlayer = () => {
    const videoUrl = tutorial?.video;
    if (!videoUrl) return null;
    const ytId = extractYoutubeId(videoUrl);
    if (ytId) return <YoutubePlayer videoId={ytId} />;
    return <CloudinaryPlayer videoUrl={videoUrl} />;
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#1a1a1a", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#1a1a1a", alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}>
        <Text style={{ color: "#ff6b6b", textAlign: "center", fontSize: 14 }}>{error}</Text>
        <TouchableOpacity onPress={fetchTutorial} style={{ marginTop: 14, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 10 }}>
          <Text style={{ color: "#ffffffcc", fontSize: 14 }}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1a1a1a" }}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <ScrollView bounces={false} style={{ backgroundColor: "#1a1a1a" }}>

        {/* ── Video Player — full width, black bg, centered ── */}
        <View style={{ width: "100%", backgroundColor: "#000", alignItems: "center", justifyContent: "center" }}>
          {renderVideoPlayer()}
        </View>

        {/* ── Content ── */}
        <View style={{ padding: 20, gap: 14 }}>

          {/* Category badge */}
          {tutorial?.category && (
            <View style={{
              alignSelf: "flex-start",
              backgroundColor: "rgba(255,255,255,0.07)",
              borderRadius: 999,
              paddingHorizontal: 12,
              paddingVertical: 5,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.12)",
            }}>
              <Text style={{ color: "#ffffff70", fontSize: 12 }}>
                {tutorial.category}
              </Text>
            </View>
          )}

          {/* Title */}
          <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "700", lineHeight: 28 }}>
            {tutorial?.title}
          </Text>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: "rgba(255,255,255,0.07)" }} />

          {/* Description */}
          {tutorial?.description && (
            <Text style={{ color: "#ffffffb0", fontSize: 14, lineHeight: 24 }}>
              {tutorial.description}
            </Text>
          )}
        </View>
      </ScrollView>

      {/* ── Back button floating ── */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 52,
          left: 16,
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: 999,
          width: 36,
          height: 36,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 20,
        }}
      >
        {/* <Text style={{ color: "#fff", fontSize: 18, lineHeight: 20 }}>←</Text> */}
        <ArrowLeftIcon width={20} height={20} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SingleTutorial;