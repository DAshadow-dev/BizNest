import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import * as Routes from "@utils/Routes";
import {
  navigate,
  useNavigationRoot,
} from "@components/navigate/RootNavigation";

const HomeAdminScreen = () => {
  const navigation = useNavigationRoot();
  const categories = [
    {
      id: "1",
      name: "Pending",
      icon: "receipt",
      route: Routes.PendingAccountsScreen,
    },
    {
      id: "2",
      name: "List Onwer",
      icon: "people",
      route: Routes.AccountListScreen,
    },
    {
      id: "3",
      name: "Dashboard",
      icon: "bar-chart",
      route: Routes.AdminDashboardScreen,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dashboard Admin</Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="notifications-outline" size={24} color="white" />
            <View style={{ width: 10 }} />
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.LOGIN_SCREEN)}
            >
              <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>{" "}
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Revenue</Text>
          <LineChart
            data={{
              labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
              datasets: [{ data: [30000, 45000, 32000, 40000, 48000, 50000] }],
            }}
            width={350}
            height={200}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            }}
            bezier
            style={{ borderRadius: 10 }}
          />
        </View>

        <View style={styles.categoryContainer}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryItem}
              onPress={() => navigation.navigate(item.route)}
            >
              <MaterialIcons name={item.icon} size={32} color="#007AFF" />
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* 
      <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate("CHAT_SCREEN")}>
        <Ionicons name="chatbubble" size={28} color="white" />
      </TouchableOpacity> */}
    </View>
  );
};

export default HomeAdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  chartContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15,
  },
  categoryItem: {
    backgroundColor: "white",
    width: "30%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryText: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
  chatButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    height: 60,
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});
