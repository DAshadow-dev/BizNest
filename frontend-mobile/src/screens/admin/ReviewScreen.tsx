import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import * as Routes from "@utils/Routes";

interface Review {
  id: string;
  user: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    user: "Duy An",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    comment: "Great app! Highly recommend. The interface is intuitive and the features are exactly what I needed for my business.",
    date: "2023-05-15"
  },
  {
    id: "2",
    user: "Hoang Cuong",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 4,
    comment: "Very useful, but could use some improvements. The reporting feature is excellent but I'd like to see more customization options.",
    date: "2023-06-22"
  },
  {
    id: "3",
    user: "Thien Duyen",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 3,
    comment: "It's okay, but I've seen better. The app sometimes lags when processing large orders.",
    date: "2023-07-10"
  },
  { 
    id: "4", 
    user: "Hoang Nguyen", 
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 3, 
    comment: "It's okay. Basic functionality works well but nothing special compared to competitors.",
    date: "2023-08-05"
  },
  {
    id: "5",
    user: "Minh Trang",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    rating: 5,
    comment: "Absolutely love this app! It has transformed how I manage my inventory and track sales. The customer support is also excellent.",
    date: "2023-09-18"
  },
  {
    id: "6",
    user: "Thanh Tung",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 4,
    comment: "Good app with solid features. I appreciate the regular updates and improvements.",
    date: "2023-10-03"
  }
];

const ReviewScreen: React.FC = () => {
  const navigation = useNavigationRoot();
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterRating, setFilterRating] = useState<number | null>(null);

  // Lọc và sắp xếp danh sách đánh giá
  const filteredReviews = mockReviews
    .filter(
      (review) =>
        (review.user.toLowerCase().includes(searchText.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchText.toLowerCase())) &&
        (filterRating === null || review.rating === filterRating)
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
    );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <View style={styles.userInfo}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{item.user.charAt(0)}</Text>
            </View>
          )}
          <View>
            <Text style={styles.userName}>{item.user}</Text>
            <Text style={styles.reviewDate}>{formatDate(item.date)}</Text>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <MaterialIcons
              key={index}
              name="star"
              size={18}
              color={index < item.rating ? "#FFD700" : "#E0E0E0"}
              style={styles.starIcon}
            />
          ))}
        </View>
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  const renderRatingFilter = () => (
    <View style={styles.ratingFilterContainer}>
      <TouchableOpacity
        style={[styles.ratingFilterButton, filterRating === null && styles.activeRatingFilter]}
        onPress={() => setFilterRating(null)}
      >
        <Text style={styles.ratingFilterText}>All</Text>
      </TouchableOpacity>
      {[5, 4, 3, 2, 1].map((rating) => (
        <TouchableOpacity
          key={rating}
          style={[styles.ratingFilterButton, filterRating === rating && styles.activeRatingFilter]}
          onPress={() => setFilterRating(rating)}
        >
          <Text style={styles.ratingFilterText}>{rating} ⭐</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="star-outline" size={60} color="#CCCCCC" />
      <Text style={styles.emptyText}>No reviews found</Text>
      <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4a90e2" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>User Reviews</Text>
          <TouchableOpacity>
            <Ionicons name="options-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="white" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search reviews..."
            placeholderTextColor="white"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.content}>
        {/* Rating Filter */}
        {renderRatingFilter()}

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={sortOrder}
              onValueChange={(itemValue) => setSortOrder(itemValue)}
              style={styles.picker}
              dropdownIconColor="#4a90e2"
            >
              <Picker.Item label="Highest Rating First" value="desc" />
              <Picker.Item label="Lowest Rating First" value="asc" />
            </Picker>
          </View>
        </View>

        {/* Reviews Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{mockReviews.length}</Text>
            <Text style={styles.summaryLabel}>Total Reviews</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {(mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length).toFixed(1)}
            </Text>
            <Text style={styles.summaryLabel}>Average Rating</Text>
          </View>
        </View>

        {/* Reviews List */}
        <FlatList
          data={filteredReviews}
          keyExtractor={(item) => item.id}
          renderItem={renderReview}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    backgroundColor: "#4a90e2",
    paddingTop: Platform.OS === 'ios' ? 50 : 25,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 16,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "white",
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  ratingFilterContainer: {
    flexDirection: "row",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  ratingFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#EAEEF2",
    marginRight: 8,
    marginBottom: 8,
  },
  activeRatingFilter: {
    backgroundColor: "#4a90e2",
  },
  ratingFilterText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
    color: "#333",
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
  },
  picker: {
    color: "#333",
  },
  summaryContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 10,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a90e2",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  listContent: {
    paddingBottom: 20,
  },
  reviewContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4a90e2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: "#888",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  starIcon: {
    marginLeft: 2,
  },
  comment: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
    textAlign: "center",
  },
});

export default ReviewScreen;
