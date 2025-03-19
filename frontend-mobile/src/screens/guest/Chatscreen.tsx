import React, { useEffect, useState, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import ChatActions from "@redux/chat/actions";
import { RootState } from "@redux/root-reducer";

const socket = io("http://localhost:5000");

const ChatBox = ({ navigation, route }: { navigation: any; route: any }) => {
  // Lấy dữ liệu từ Redux
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.Chat.messages);
  // Nhận userId, receiverId từ route (nếu có)
  const userId = route.params?.userId || "123";
  const receiverId = route.params?.receiverId || "456";

  const [inputText, setInputText] = useState("");
  const flatListRef = useRef<FlatList<any> | null>(null);

  // 🟢 Lấy danh sách tin nhắn khi mở màn hình qua Redux Saga
  useEffect(() => {
    dispatch({
      type: ChatActions.FETCH_MESSAGES,
      payload: { data: { senderId: userId, receiverId } },
    });
  }, [dispatch, userId, receiverId,messages]);

  // 🟢 Kết nối socket để nhận tin nhắn theo thời gian thực
  useEffect(() => {
    socket.emit("userOnline", userId);

    // Khi có tin nhắn mới từ server
    socket.on("receiveMessage", (newMessage) => {
      // Gửi action để reducer cập nhật messages
      dispatch({
        type: ChatActions.RECEIVE_MESSAGE,
        payload: { data: newMessage },
      });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [dispatch, userId]);

  // 🔵 Gửi tin nhắn
  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      senderId: userId,
      receiverId,
      message: inputText,
    };

    // Dispatch action cho Redux Saga gọi API
    dispatch({
      type: ChatActions.SEND_MESSAGE,
      payload: { data: newMessage },
    });

    // Xóa nội dung input
    setInputText("");
  };

  // Cuộn FlatList xuống cuối khi có tin nhắn mới
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
        data={Array.isArray(messages.messages) ? messages.messages : []}
        keyExtractor={(item) =>
          item._id?.toString() || Math.random().toString()
        }
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
              {item.message || "No message"}
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
