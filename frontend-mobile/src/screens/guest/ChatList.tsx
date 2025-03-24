import React, { useEffect } from "react";
import * as Routes from '@utils/Routes';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import ChatActions from "@redux/chat/actions";
import { RootState } from "@redux/root-reducer";
import { LinearGradient } from "expo-linear-gradient";

const ChatList = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const userId = "123"; 
  const chatList = useSelector((state: RootState) => state.Chat.chatList);

  useEffect(() => {
    dispatch({
      type: ChatActions.FETCH_CHAT_LIST,
      payload: { data: { userId } },
    });
  }, [dispatch, userId]);

  const goToChat = (receiverId: string, receiverName: string, receiverAvatar: string) => {
    navigation.navigate(Routes.CHAT_SCREEN, { userId, receiverId, receiverName, receiverAvatar });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#6a51ae", "#b966d6"]}
        style={styles.header}
      >
        <Text style={styles.headerText}>Your chat box</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <FlatList
        data={chatList}
        keyExtractor={(item) => item.receiverId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => goToChat(item.receiverId, item.name, item.avatar)}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.timestamp}>
              {new Date(item.lastMessageTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No chats yet</Text>}
      />
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "gray",
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});