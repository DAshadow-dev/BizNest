
import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, StatusBar } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { Ionicons } from "@expo/vector-icons"
import { useAppSelector } from "@redux/store"
import { RootState } from "@redux/root-reducer"
import { goBack, useNavigationRoot } from "@components/navigate/RootNavigation";
import * as Routes from "@utils/Routes";
// Sample data to mimic your web app


const months = ["All", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const BusinessDashboard = () => {
  const customers = useAppSelector((state: RootState) => state.Customer.ListCustomer);
  const transactions = useAppSelector(
    (state: RootState) => state.Transaction.ListTransaction
  );
  const sampleData = {
    customers,
    transactions
  }
  
  const [selectedMonth, setSelectedMonth] = useState("All")
  const [filteredTransactions, setFilteredTransactions] = useState(sampleData.transactions)
  const [isPickerVisible, setIsPickerVisible] = useState(false)

  // Filter transactions when month changes
  useEffect(() => {
    if (selectedMonth === "All") {
      setFilteredTransactions(sampleData.transactions)
    } else {
      const monthIndex = months.indexOf(selectedMonth) - 1 // -1 because "All" is at index 0
      setFilteredTransactions(sampleData.transactions.filter((t: any) => new Date(t.createdAt).getMonth() === monthIndex))
    }
  }, [selectedMonth])

  // Calculate total revenue
  const calculateRevenue = (transactions: any) => {
    return transactions.reduce((total: any, transaction: any) => total + transaction.totalPrice, 0)
  }

  // Prepare monthly revenue data
  const getMonthlyRevenue = () => {
    const monthlyRevenue = Array(12).fill(0)
    sampleData.transactions.forEach((transaction: any ) => {
      const month = new Date(transaction.createdAt).getMonth()
      monthlyRevenue[month] += transaction.totalPrice
    })
    return monthlyRevenue
  }

  const monthlyRevenue = getMonthlyRevenue()
  const screenWidth = Dimensions.get("window").width - 40
  const navigation = useNavigationRoot();

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].slice(0, 6),
    datasets: [
      {
        data: monthlyRevenue.slice(0, 6),
        color: (opacity = 1) => `rgba(55, 80, 178, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Monthly Revenue"],
  }

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(55, 80, 178, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#3750B2",
    },
    formatYLabel: (value: any) => `$${Number.parseInt(value).toLocaleString()}`,
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3750B2" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Month Filter */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.pickerButton} onPress={() => setIsPickerVisible(!isPickerVisible)}>
            <Text style={styles.pickerButtonText}>{selectedMonth}</Text>
            <Ionicons name="chevron-down" size={20} color="#3750B2" />
          </TouchableOpacity>

          {isPickerVisible && (
            <View style={styles.pickerContainer}>
              {months.map((month) => (
                <TouchableOpacity
                  key={month}
                  style={[styles.monthOption, selectedMonth === month && styles.selectedMonthOption]}
                  onPress={() => {
                    setSelectedMonth(month)
                    setIsPickerVisible(false)
                  }}
                >
                  <Text style={[styles.monthOptionText, selectedMonth === month && styles.selectedMonthOptionText]}>
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Overview Cards */}
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.cardLabel}>Revenue</Text>
                <Text style={styles.cardValue}>${calculateRevenue(filteredTransactions).toLocaleString()}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Ionicons name="cash-outline" size={24} color="#3750B2" />
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.cardLabel}>Transactions</Text>
                <Text style={styles.cardValue}>{filteredTransactions.length}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Ionicons name="card-outline" size={24} color="#3750B2" />
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.cardLabel}>Customers</Text>
                <Text style={styles.cardValue}>{sampleData.customers.length}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Ionicons name="people-outline" size={24} color="#3750B2" />
              </View>
            </View>
          </View>
        </View>

        {/* Revenue Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Revenue</Text>
          <LineChart
            data={chartData}
            width={screenWidth}
            height={280}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#3750B2",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  filterButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  filterContainer: {
    marginBottom: 20,
    zIndex: 100,
  },
  pickerButton: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#3750B2",
    fontWeight: "500",
  },
  pickerContainer: {
    position: "absolute",
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1000,
    maxHeight: 300,
  },
  monthOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedMonthOption: {
    backgroundColor: "#f0f5ff",
  },
  monthOptionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedMonthOptionText: {
    color: "#3750B2",
    fontWeight: "600",
  },
  cardsContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3750B2",
  },
  iconContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: "#EEF1FF",
    justifyContent: "center",
    alignItems: "center",
  },
  chartCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
})

export default BusinessDashboard

