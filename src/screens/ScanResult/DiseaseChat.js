import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Topbar } from "../../components/Layout/TopBar";
import MainLayout from "../../components/Layout/MainLayout";
import axios from "axios";
import { useSelector } from "react-redux";

const API_BASE_URL = "http://192.168.10.12:8000";

const DiseaseChat = ({ route, navigation }) => {
  const { predictionId, diseaseLabel } = route.params;
  const farmer = useSelector((state) => state.auth.user);
  const flatListRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [chatInfo, setChatInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (predictionId) {
      initializeChat();
    } else {
      setError("No prediction ID provided");
    }
  }, [predictionId]);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const initializeChat = async () => {
    try {
      setLoading(true);
      console.log("🔄 Initializing chat with predictionId:", predictionId);
      console.log("👤 Farmer ID:", farmer?.id || farmer?.email);

      const response = await axios.post(
        `${API_BASE_URL}/disease-chat/start-chat/${predictionId}?farmer_id=${farmer?.id || farmer?.email}`
      );

      console.log("✅ Chat initialized:", response.data);
      const { chat_id, remaining_chats, can_continue, message } = response.data;
      setChatId(chat_id);
      setChatInfo({
        remaining_chats,
        can_continue,
        message,
      });
      setError(null);
    } catch (err) {
      console.log("❌ Chat Init Error:", err);
      console.log("❌ Error Response:", err.response?.data);
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        "Failed to start chat. Please try again.";
      setError(errorMessage);
      Alert.alert("Chat Initialization Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !chatId) return;

    const userMessage = inputText.trim();
    const wordCount = userMessage.split(" ").length;

    if (wordCount > 50) {
      Alert.alert(
        "Message Too Long",
        `Your message has ${wordCount} words. Maximum is 50 words.`
      );
      return;
    }

    if (!chatInfo?.can_continue) {
      Alert.alert(
        "Chat Limit Reached",
        "You have reached the maximum number of chat messages for this disease."
      );
      return;
    }

    setSending(true);
    setInputText("");

    try {
      console.log("📤 Sending message...");
      console.log("   Chat ID:", chatId);
      console.log("   Message:", userMessage);
      
      const response = await axios.post(`${API_BASE_URL}/disease-chat/send-message`, {
        prediction_id: chatId,
        user_message: userMessage,
      });

      console.log("✅ Message response:", response.data);

      const { user_message, ai_response, remaining_chats, can_continue } =
        response.data;

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: "user",
          content: user_message,
          timestamp: new Date(),
        },
        {
          id: Math.random().toString(),
          role: "assistant",
          content: ai_response,
          timestamp: new Date(),
        },
      ]);

      setChatInfo((prev) => ({
        ...prev,
        remaining_chats,
        can_continue,
      }));

      if (!can_continue) {
        Alert.alert(
          "Chat Limit Reached",
          "You have used all available chat messages for this disease. Kaku will miss talking to you! 😊"
        );
      }
    } catch (err) {
      console.log("❌ Message Error:", err.response?.data || err.message);
      Alert.alert(
        "Error",
        err.response?.data?.detail || "Failed to send message"
      );
      setInputText(userMessage);
    } finally {
      setSending(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={{
        marginBottom: 12,
        flexDirection: item.role === "user" ? "row-reverse" : "row",
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          maxWidth: "85%",
          backgroundColor: item.role === "user" ? "#14B8A6" : "#F3F4F6",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 16,
          borderBottomLeftRadius: item.role === "user" ? 16 : 0,
          borderBottomRightRadius: item.role === "user" ? 0 : 16,
        }}
      >
        <Text
          style={{
            color: item.role === "user" ? "#fff" : "#1F2937",
            fontSize: 14,
            lineHeight: 20,
          }}
        >
          {item.content}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: item.role === "user" ? "rgba(255,255,255,0.7)" : "#9CA3AF",
            marginTop: 4,
          }}
        >
          {new Date(item.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <>
        <Topbar title="Chat with Kaku" />
        <MainLayout>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#14B8A6" />
            <Text style={{ marginTop: 12, color: "#64748B" }}>
              Starting chat...
            </Text>
          </View>
        </MainLayout>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Topbar title="Chat with Kaku" />
        <MainLayout>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <Text style={{ fontSize: 40, marginBottom: 12 }}>😕</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                color: "#1F2937",
                marginBottom: 8,
              }}
            >
              Unable to Start Chat
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#64748B",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              {error}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: "#14B8A6",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <Topbar title="Chat with Kaku" />
      <MainLayout showBottomNav={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={100}
        >
          <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
            {/* Header Info */}
            <View
              style={{
                backgroundColor: "#fff",
                borderBottomWidth: 1,
                borderBottomColor: "#E2E8F0",
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={{ fontSize: 12, color: "#64748B" }}>
                    Discussing about
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#1F2937",
                    }}
                  >
                    {diseaseLabel}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: chatInfo?.can_continue
                      ? "#D1FAE5"
                      : "#FEE2E2",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
                      color: chatInfo?.can_continue ? "#047857" : "#DC2626",
                    }}
                  >
                    {chatInfo?.remaining_chats} left
                  </Text>
                </View>
              </View>

              {/* Info message */}
              <Text
                style={{
                  fontSize: 11,
                  color: "#94A3B8",
                  marginTop: 8,
                }}
              >
                📝 Maximum 50 words per message
              </Text>
            </View>

            {/* Messages */}
            {messages.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ fontSize: 50, marginBottom: 12 }}>🌾</Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#1F2937",
                    textAlign: "center",
                    marginBottom: 8,
                  }}
                >
                  Hi there! I'm Kaku 👋
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#64748B",
                    textAlign: "center",
                    lineHeight: 20,
                  }}
                >
                  I'm an AI agriculture expert here to help you understand and
                  manage the detected disease. Ask me anything about treatments,
                  prevention, or what to do next!
                </Text>
              </View>
            ) : (
              <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingVertical: 16 }}
                onContentSizeChange={() =>
                  flatListRef.current?.scrollToEnd({ animated: true })
                }
              />
            )}

            {/* Input Area */}
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#E2E8F0",
                backgroundColor: "#fff",
                paddingHorizontal: 12,
                paddingVertical: 12,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  gap: 8,
                }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    backgroundColor: "#F3F4F6",
                    borderRadius: 20,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    fontSize: 14,
                    maxHeight: 100,
                    color: "#1F2937",
                  }}
                  placeholder="Ask Kaku anything..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  value={inputText}
                  onChangeText={setInputText}
                  editable={chatInfo?.can_continue && !sending}
                />
                <TouchableOpacity
                  onPress={sendMessage}
                  disabled={
                    sending || !inputText.trim() || !chatInfo?.can_continue
                  }
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor:
                      sending || !inputText.trim() || !chatInfo?.can_continue
                        ? "#CBD5E1"
                        : "#14B8A6",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {sending ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={{ fontSize: 18 }}>📤</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </MainLayout>
    </>
  );
};

export default DiseaseChat;
