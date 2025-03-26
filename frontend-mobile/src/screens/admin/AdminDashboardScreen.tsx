"use client"

import { useNavigationRoot } from "@components/navigate/RootNavigation"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
} from "react-native"
import { LineChart } from "react-native-chart-kit"
import * as Routes from "@utils/Routes"
import { useEffect, useState, useMemo } from "react"
import AdminActions from "@redux/admin/actions"
import { useDispatch } from "react-redux"
import { useAppSelector } from "@redux/store"
import type { RootState } from "@redux/root-reducer"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")
const chartWidth = width - 40

// Full month names for better readability
const MONTHS = [
  "All",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Short month names for chart labels
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

const AdminDashboardScreen = () => {
  const navigation = useNavigationRoot()
  const dispatch = useDispatch()
  const bussinessOnwers: any = useAppSelector((state: RootState) => state.Admin.ListBussinessOnwer)
  const [activeAccount, setActiveAccount] = useState<any[]>([])
  const [pendingAccount, setPendingAccount] = useState<any[]>([])
  const [selectedMonth, setSelectedMonth] = useState<string>("All")
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)

  // Monthly revenue data
  const monthlyRevenueData = [100000, 120000, 130000, 0, 0, 0]

  // Calculate filtered data based on selected month
  const filteredData = useMemo(() => {
    if (selectedMonth === "All") {
      return {
        labels: MONTH_LABELS,
        datasets: [
          {
            data: monthlyRevenueData,
            color: (opacity = 1) => `rgba(71, 117, 234, ${opacity})`,
            strokeWidth: 2,
          },
        ],
      }
    } else {
      // Get the month index (0-11)
      const monthIndex = MONTHS.indexOf(selectedMonth) - 1

      // For single month view, show daily data (simulated here)
      // In a real app, you would fetch daily data for the selected month
      const daysInMonth = new Date(2025, monthIndex + 1, 0).getDate()
      const dailyLabels = Array.from({ length: Math.min(7, daysInMonth) }, (_, i) => `${i + 1}`)

      // Generate simulated daily data based on the monthly value
      const monthValue = monthlyRevenueData[monthIndex]
      const dailyValues = Array.from({ length: Math.min(7, daysInMonth) }, () =>
        Math.floor((monthValue / daysInMonth) * (0.7 + Math.random() * 0.6)),
      )

      return {
        labels: dailyLabels,
        datasets: [
          {
            data: dailyValues,
            color: (opacity = 1) => `rgba(71, 117, 234, ${opacity})`,
            strokeWidth: 2,
          },
        ],
      }
    }
  }, [selectedMonth])

  // Calculate total revenue based on filter
  const totalRevenue = useMemo(() => {
    if (selectedMonth === "All") {
      // Sum of all months
      return monthlyRevenueData.reduce((sum, value) => sum + value, 0)
    } else {
      // Revenue for selected month
      const monthIndex = MONTHS.indexOf(selectedMonth) - 1
      return monthlyRevenueData[monthIndex] || 0
    }
  }, [selectedMonth])

  // Format currency with commas
  const formatCurrency = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  useEffect(() => {
    dispatch({
      type: AdminActions.FETCH_LIST_BUSSINESS_OWNER,
      payload: {
        onError: (error: any) => {
          console.log(error)
        },
        onFailed: (MsgNo: string) => {
          console.log(MsgNo)
        },
      },
    })
  }, [])

  useEffect(() => {
    getAccounts()
  }, [bussinessOnwers])

  const getAccounts = () => {
    const activeAccountsList = bussinessOnwers.filter((u: any) => u.status == "active")
    const pendingAccounts = bussinessOnwers.filter((u: any) => u.status === "pending")
    setActiveAccount(activeAccountsList)
    setPendingAccount(pendingAccounts)
  }

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(71, 117, 234, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: "#4775EA",
    },
    formatYLabel: (value: any) => {
      const num = Number.parseInt(value)
      if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`
      if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`
      return `$${num}`
    },
    fillShadowGradientFrom: "rgba(71, 117, 234, 0.8)",
    fillShadowGradientTo: "rgba(71, 117, 234, 0.1)",
    useShadowColorFromDataset: false,
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FF" />

      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={styles.welcomeText}>WELCOME BACK</Text>
          <Text style={styles.userName}>Admin</Text>
        </View>

        <TouchableOpacity style={styles.profileContainer}>
          <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-WnN5V2rTKW7-7j_7lM-9m-uqyGbzkXxOGw&s" }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Month Filter */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterVisible(!isFilterVisible)}>
            <Text style={styles.filterButtonText}>{selectedMonth}</Text>
            <Ionicons name={isFilterVisible ? "chevron-up" : "chevron-down"} size={20} color="#4775EA" />
          </TouchableOpacity>

          {isFilterVisible && (
            <View style={styles.monthsDropdown}>
              <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false}>
                {MONTHS.map((month) => (
                  <TouchableOpacity
                    key={month}
                    style={[styles.monthOption, selectedMonth === month && styles.selectedMonthOption]}
                    onPress={() => {
                      setSelectedMonth(month)
                      setIsFilterVisible(false)
                    }}
                  >
                    <Text style={[styles.monthOptionText, selectedMonth === month && styles.selectedMonthOptionText]}>
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Dashboard Overview</Text>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={[styles.card, styles.activeCard]}
            onPress={() => navigation.navigate(Routes.AccountListScreen)}
          >
            <View style={styles.cardIconContainer}>
              <Ionicons name="people" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.cardTitle}>Active Accounts</Text>
            <Text style={[styles.cardValue, { color: "#4CAF50" }]}>{activeAccount.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.pendingCard]}
            onPress={() => navigation.navigate(Routes.PendingAccountsScreen)}
          >
            <View style={styles.cardIconContainer}>
              <Ionicons name="time" size={24} color="#FFC107" />
            </View>
            <Text style={styles.cardTitle}>Pending Accounts</Text>
            <Text style={[styles.cardValue, { color: "#FFC107" }]}>{pendingAccount.length}</Text>
          </TouchableOpacity>

          <View style={[styles.card, styles.transactionsCard]}>
            <View style={styles.cardIconContainer}>
              <Ionicons name="card" size={24} color="#F44336" />
            </View>
            <Text style={styles.cardTitle}>Transactions</Text>
            <Text style={[styles.cardValue, { color: "#F44336" }]}>10</Text>
          </View>

          <View style={[styles.card, styles.revenueCard]}>
            <View style={styles.cardIconContainer}>
              <Ionicons name="cash" size={24} color="#4775EA" />
            </View>
            <Text style={styles.cardTitle}>Revenue</Text>
            <Text style={[styles.cardValue, { color: "#4775EA" }]}>${formatCurrency(totalRevenue)}</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>
              {selectedMonth === "All" ? "Monthly Revenue" : `${selectedMonth} Revenue (Daily)`}
            </Text>
            <View style={styles.chartLegend}>
              <View style={styles.legendDot} />
              <Text style={styles.legendText}>
                {selectedMonth === "All" ? "2025 Revenue" : `${selectedMonth} 2025`}
              </Text>
            </View>
          </View>

          <LineChart
            data={filteredData}
            width={chartWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withInnerLines={false}
            withOuterLines={true}
            withVerticalLines={false}
            withHorizontalLines={true}
            withVerticalLabels={true}
            withHorizontalLabels={true}
            fromZero={true}
            yAxisInterval={1}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FF",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F5F7FF",
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  welcomeText: {
    fontSize: 12,
    color: "#757575",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  profileContainer: {
    padding: 2,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#4775EA",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  filterContainer: {
    marginBottom: 20,
    zIndex: 100,
    position: "relative",
  },
  filterButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
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
  filterButtonText: {
    fontSize: 14,
    color: "#4775EA",
    fontWeight: "500",
  },
  monthsDropdown: {
    position: "absolute",
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
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
    borderBottomColor: "#F0F0F0",
  },
  selectedMonthOption: {
    backgroundColor: "#F0F5FF",
  },
  monthOptionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedMonthOptionText: {
    color: "#4775EA",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333333",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  activeCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  pendingCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#FFC107",
  },
  transactionsCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#F44336",
  },
  revenueCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#4775EA",
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  chartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  chartHeader: {
    marginBottom: 15,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
  },
  chartLegend: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4775EA",
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#757575",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  summaryContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#757575",
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
})

export default AdminDashboardScreen

