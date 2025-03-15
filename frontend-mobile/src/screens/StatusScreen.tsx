import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const StatusScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { status } = route.params || {}; // Nhận trạng thái từ params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {status === "inactive" ? "Nội dung bị khóa" : "Đang chờ duyệt"}
      </Text>
      <Text style={styles.message}>
        {status === "inactive"
          ? "Nội dung này đã bị khóa. Vui lòng liên hệ quản trị viên."
          : "Nội dung của bạn đang chờ duyệt. Vui lòng quay lại sau."}
      </Text>
      <Button title="Quay lại" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  message: { fontSize: 16, textAlign: "center", marginBottom: 20 },
});

export default StatusScreen;
