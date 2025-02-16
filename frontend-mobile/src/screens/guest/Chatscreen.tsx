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

const ChatBox = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello! How can I assist you?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botReply = {
        id: Date.now().toString(),
        text: "I received your message!",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 1000);
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
          source={{ uri: "https://i.pravatar.cc/150?img=10" }} // Bot Avatar
          style={styles.avatar}
        />
        <Text style={styles.headerText}>Support Center</Text>
      </View>

      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                item.sender === "bot" ? styles.botText : styles.userText,
              ]}
            >
              {item.text}
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
