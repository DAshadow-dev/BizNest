import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { io } from "socket.io-client";
import ApiConstants from "src/adapter/ApiConstants";

const API_URL = "http:/localhost:5000/api/chat"; 
const socket = io("http://localhost:5000");

const ChatBox = ({ navigation, route }: { navigation: any; route: any }) => {
  const userId = route.params?.userId || "123"; 
  const receiverId = route.params?.receiverId || "456";
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList<any> | null>(null);

  // 🟢 Lấy danh sách tin nhắn khi mở màn hình
  useEffect(() => {
    axios
      .get(ApiConstants.GET_MESSAGES+'?senderId=123&receiverId=456')
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.error("Lỗi lấy tin nhắn:", err));
  }, [userId, receiverId]);

  // 🟢 Kết nối socket để nhận tin nhắn theo thời gian thực
  useEffect(() => {
    socket.emit("userOnline", userId);

    socket.on("receiveMessage", (newMessage) => {
      if (newMessage.senderId === receiverId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [receiverId]);

  // 🔵 Gửi tin nhắn lên server
  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      senderId: userId,
      receiverId,
      message: inputText,
    };

    try {
      const res = await axios.post(`${API_URL}/send`, newMessage);
      setMessages((prevMessages) => [...prevMessages, res.data]);
      socket.emit("sendMessage", res.data);
      setInputText("");
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
    }
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=10" }}
          style={styles.avatar}
        />
        <Text style={styles.headerText}>Chat with Support</Text>
      </View>

      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.senderId === userId ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                item.senderId !== userId ? styles.botText : styles.userText,
              ]}
            >
              {item.message}
            </Text>
          </View>
        )}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="gray"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginLeft: 10,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  message: {
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "75%",
  },
  userMessage: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#D0E8FF",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: "white",
  },
  botText: {
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 20,
  },
});
