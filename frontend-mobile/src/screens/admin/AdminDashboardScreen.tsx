import { useNavigationRoot } from "@components/navigate/RootNavigation";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import * as Routes from "@utils/Routes";

const AdminDashboardScreen = () => {
  const navigation = useNavigationRoot();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Button title="Go back" onPress={() => navigation.goBack()} />
          <Text style={styles.welcomeText}>WELCOME BACK</Text>
          <Text style={styles.userName}>Admin</Text>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#4CAF50" }]}
            onPress={() => navigation.navigate(Routes.AccountListScreen)}
          >
            <Text style={styles.cardTitle}>Active Accounts</Text>
            <Text style={styles.cardValue}>23</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: "#FFC107" }]}
            onPress={() => navigation.navigate(Routes.PendingAccountsScreen)}
          >
            <Text style={styles.cardTitle}>Pending Accounts</Text>
            <Text style={styles.cardValue}>5</Text>
          </TouchableOpacity>
          <View style={[styles.card, { backgroundColor: "#F44336" }]}>
            <Text style={styles.cardTitle}>Transactions</Text>
            <Text style={styles.cardValue}>10</Text>
          </View>
          <View style={[styles.card, { backgroundColor: "#9E9E9E" }]}>
            <Text style={styles.cardTitle}>Revenue</Text>
            <Text style={styles.cardValue}>200$</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>User Statistics</Text>
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  data: [1500, 2000, 3000, 2500, 4000, 5000],
                },
              ],
            }}
            width={290}
            height={220}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: "#e3e3e3",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 8 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 14,
    color: "#757575",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 14,
    color: "#fff",
  },
  cardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default AdminDashboardScreen;
