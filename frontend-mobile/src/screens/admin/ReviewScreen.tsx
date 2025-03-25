import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    user: "Duy An",
    rating: 5,
    comment: "Great app! Highly recommend.",
  },
  {
    id: "2",
    user: "Hoang Cuong",
    rating: 4,
    comment: "Very useful, but could use some improvements.",
  },
  {
    id: "3",
    user: "Thien Duyen",
    rating: 3,
    comment: "It’s okay, but I’ve seen better.",
  },
  { id: "4", user: "Hoang Nguyen", rating: 3, comment: "It’s okay." },
];

const ReviewScreen: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Lọc và sắp xếp danh sách đánh giá
  const filteredReviews = mockReviews
    .filter(
      (review) =>
        review.user.toLowerCase().includes(searchText.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
    );

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewContainer}>
      <View style={styles.header}>
        <Text style={styles.userName}>{item.user}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <MaterialIcons
              key={index}
              name="star"
              size={18}
              color={index < item.rating ? "#FFD700" : "#ddd"}
            />
          ))}
        </View>
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⭐ User Reviews</Text>

      {/* Ô nhập tìm kiếm */}
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Tìm kiếm..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Bộ lọc sắp xếp */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sắp xếp:</Text>
        <Picker
          selectedValue={sortOrder}
          onValueChange={(itemValue) => setSortOrder(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="⭐ Cao → Thấp" value="desc" />
          <Picker.Item label="⭐ Thấp → Cao" value="asc" />
        </Picker>
      </View>

      {/* Danh sách đánh giá */}
      <FlatList
        data={filteredReviews}
        keyExtractor={(item) => item.id}
        renderItem={renderReview}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  picker: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
  reviewContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  comment: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});

export default ReviewScreen;
