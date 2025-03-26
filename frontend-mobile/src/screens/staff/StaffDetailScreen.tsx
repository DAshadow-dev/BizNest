import { useCallback, useEffect, useState } from "react"
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  TextInput,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useDispatch } from "react-redux"
import { useNavigationRoot } from "@components/navigate/RootNavigation"
import staffActions from "../../redux/staff/actions"
import * as Routes from "@utils/Routes"
import { moderateScale, verticalScale } from "@libs/reactResizeMatter/scalingUtils"
import { useFocusEffect } from "@react-navigation/native"
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message"
import { useAppSelector } from "@redux/store"
import type { RootState } from "@redux/root-reducer"
import DateTimePicker from "@react-native-community/datetimepicker"

interface Staff {
  _id: string
  username: string
  email: string
  phone?: string
  role: string
  image?: string
  status: string
  storeId?: string
  createdAt?: string
  updatedAt?: string
}

interface RouteParams {
  staff: Staff
}

interface DailyTransactionSummary {
  date: string
  formattedDate: string
  transactions: any[]
  orderCount: number
  totalAmount: number
}

const StaffDetailScreen = ({ route }: { route: { params: RouteParams } }) => {
  const navigation = useNavigationRoot()
  const dispatch = useDispatch()
  const { staff } = route.params
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorModalVisible, setErrorModalVisible] = useState(false)
  const [errorTitle, setErrorTitle] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({})
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [filterDateFrom, setFilterDateFrom] = useState<Date | null>(null)
  const [filterDateTo, setFilterDateTo] = useState<Date | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFromDatePicker, setShowFromDatePicker] = useState(false)
  const [showToDatePicker, setShowToDatePicker] = useState(false)

  // Lấy thông tin user và storeId từ Redux store
  const auth = useAppSelector((state: RootState) => state.User.Auth)
  const currentStoreId = auth?.storeId
  const userRole = auth?.role as string | undefined

  const transactions = useAppSelector((state: RootState) => state.Transaction.ListTransaction)

  // Kiểm tra quyền truy cập thông tin nhân viên
  useEffect(() => {
    // Kiểm tra nếu nhân viên không thuộc cửa hàng hiện tại
    if (staff.storeId && currentStoreId && staff.storeId !== currentStoreId) {
      setErrorMessage("You do not have permission to view this staff member.")
      setErrorModalVisible(true)
      // Delay navigation to allow modal to be seen
      setTimeout(() => {
        navigation.goBack()
      }, 2000)
    }
  }, [currentStoreId, staff.storeId, navigation])

  // Refresh staff details when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (staff?._id) {
        dispatch({
          type: staffActions.FETCH_STAFF_DETAIL,
          payload: {
            id: staff._id,
            onSuccess: () => {},
            onFailed: (error: string) => {
              // Hiển thị Modal lỗi thay vì Toast
              setErrorTitle("Error")
              setErrorMessage(error || "Failed to fetch staff details")
              setErrorModalVisible(true)
            },
            onError: (error: any) => {
              // Hiển thị Modal lỗi thay vì Toast
              setErrorTitle("Error")
              setErrorMessage(error?.message || "An error occurred")
              setErrorModalVisible(true)
            },
          },
        })
      }
    }, [staff?._id, dispatch]),
  )

  const handleDelete = (id: string) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this staff member?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteStaff(id),
      },
    ])
  }

  const deleteStaff = (id: string) => {
    console.log("🗑️ DELETE STAFF - Starting deletion for ID:", id)
    dispatch({
      type: staffActions.DELETE_STAFF,
      payload: {
        id,
        onSuccess: () => {
          console.log("✅ DELETE STAFF - Success callback triggered")

          // Hiển thị Modal thành công
          setSuccessMessage("Staff deleted successfully")
          setSuccessModalVisible(true)

          // Tăng thời gian chờ để đảm bảo người dùng thấy thông báo
          setTimeout(() => {
            setSuccessModalVisible(false)
            dispatch({ type: staffActions.FETCH_STAFFS })
            navigation.navigate(Routes.StaffListScreen, { refresh: true })
          }, 2000)
        },
        onFailed: (error: string) => {
          console.error("❌ DELETE STAFF - Failed callback triggered:", error)
          // Hiển thị Modal lỗi thay vì Toast
          setErrorTitle("Failed")
          setErrorMessage(error || "Failed to delete staff")
          setErrorModalVisible(true)
        },
        onError: (error: any) => {
          console.error("❌ DELETE STAFF - Error callback triggered:", error?.message)
          // Hiển thị Modal lỗi thay vì Toast
          setErrorTitle("Error")
          setErrorMessage(error?.message || "An error occurred")
          setErrorModalVisible(true)
        },
      },
    })
  }

  const navigateToEditStaff = () => {
    // Split username into firstName and lastName
    const { firstName, lastName } = convertUsernameToNames(staff.username)

    // Chuyển đổi kiểu dữ liệu nếu cần để phù hợp với kiểu tham số của màn hình EditStaffScreen
    const staffParams = {
      ...staff,
      firstName,
      lastName,
      phone: staff.phone || "", // Đảm bảo phone luôn là string, không phải undefined
      image: staff.image || null, // Ensure image is string | null, not undefined
    }

    console.log("🔄 StaffDetailScreen - Navigating to EditStaffScreen with staffParams:", staffParams)
    navigation.navigate(Routes.EditStaffScreen, { staff: staffParams })
  }

  const convertUsernameToNames = (username: string) => {
    if (!username) return { firstName: "", lastName: "" }

    const nameParts = username.split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : ""

    return { firstName, lastName }
  }

  const getNameInitials = (username: string) => {
    if (!username) return ""

    const nameParts = username.split(" ")
    if (nameParts.length >= 2) {
      return nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
    }
    return username.charAt(0)
  }

  const getDisplayName = () => {
    return staff.username || "Staff Member"
  }

  const getStaffTransactions = () => {
    if (!transactions || !staff._id) return []

    const filteredTransactions = transactions.filter((transaction) => {
      // Check if transaction belongs to this staff
      const isStaffTransaction = transaction.userId?._id === staff._id

      if (!isStaffTransaction) return false

      // Apply status filter if set
      if (filterStatus && transaction.status !== filterStatus) return false

      // Apply date range filter if set
      if (filterDateFrom || filterDateTo) {
        const transactionDate = new Date(transaction.createdAt)

        if (filterDateFrom && transactionDate < filterDateFrom) return false
        if (filterDateTo) {
          const endDate = new Date(filterDateTo)
          endDate.setHours(23, 59, 59, 999) // End of the day
          if (transactionDate > endDate) return false
        }
      }

      // Apply search filter if set
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const customerId = transaction.customerId?._id?.toString().toLowerCase() || ""
        const customerName = transaction.customerId?.fullname?.toLowerCase() || ""
        const orderId = transaction._id?.toString().toLowerCase() || ""

        return customerId.includes(query) || customerName.includes(query) || orderId.includes(query)
      }

      return true
    })

    return filteredTransactions
  }

  const getTransactionsByDate = (): DailyTransactionSummary[] => {
    const staffTransactions = getStaffTransactions()

    // Group transactions by date
    const groupedByDate: Record<string, any[]> = {}

    staffTransactions.forEach((transaction) => {
      const date = new Date(transaction.createdAt)
      const dateString = date.toISOString().split("T")[0] // YYYY-MM-DD format

      if (!groupedByDate[dateString]) {
        groupedByDate[dateString] = []
      }

      groupedByDate[dateString].push(transaction)
    })

    // Convert to array and calculate summaries
    const result: DailyTransactionSummary[] = Object.keys(groupedByDate)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) // Sort by date descending
      .map((dateString) => {
        const transactions = groupedByDate[dateString]
        const totalAmount = transactions.reduce((sum, t) => sum + t.totalPrice, 0)

        return {
          date: dateString,
          formattedDate: formatDateString(dateString),
          transactions,
          orderCount: transactions.length,
          totalAmount,
        }
      })

    return result
  }

  const formatDateString = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const toggleDateExpanded = (date: string) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }))
  }

  const isDateExpanded = (date: string): boolean => {
    return !!expandedDates[date]
  }

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.transactionItem}
      onPress={() => navigation.navigate(Routes.InvoiceScreen, { id: item._id })}
    >
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionId}>Order #{item._id}</Text>
        <View
          style={[
            styles.statusBadge,
            item.status === "completed"
              ? styles.statusCompleted
              : item.status === "pending"
                ? styles.statusPending
                : styles.statusCancelled,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.transactionDetails}>
        <Text style={styles.transactionLabel}>Customer:</Text>
        <Text style={styles.transactionValue}>{item.customerId?.fullname || "Unknown"}</Text>
      </View>

      <View style={styles.transactionDetails}>
        <Text style={styles.transactionLabel}>Products:</Text>
        <Text style={styles.transactionValue}>{item.products?.length || 0} items</Text>
      </View>

      <View style={styles.transactionDetails}>
        <Text style={styles.transactionLabel}>Total:</Text>
        <Text style={styles.transactionValue}>{formatCurrency(item.totalPrice)}</Text>
      </View>

      <View style={styles.transactionDetails}>
        <Text style={styles.transactionLabel}>Time:</Text>
        <Text style={styles.transactionValue}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
      </View>
    </TouchableOpacity>
  )

  const renderDailySummary = ({ item }: { item: DailyTransactionSummary }) => (
    <View style={styles.dailySummaryContainer}>
      <TouchableOpacity style={styles.dailySummaryHeader} onPress={() => toggleDateExpanded(item.date)}>
        <View>
          <Text style={styles.dailySummaryDate}>{item.formattedDate}</Text>
          <Text style={styles.dailySummarySubtitle}>
            {item.orderCount} orders • {formatCurrency(item.totalAmount)}
          </Text>
        </View>
        <Ionicons name={isDateExpanded(item.date) ? "chevron-up" : "chevron-down"} size={24} color="#6B7280" />
      </TouchableOpacity>

      {isDateExpanded(item.date) && (
        <FlatList
          data={item.transactions}
          keyExtractor={(transaction) => transaction._id.toString()}
          renderItem={renderTransactionItem}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  )

  const onFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || filterDateFrom
    setShowFromDatePicker(Platform.OS === "ios")
    setFilterDateFrom(currentDate)
  }

  const onToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || filterDateTo
    setShowToDatePicker(Platform.OS === "ios")
    setFilterDateTo(currentDate)
  }

  const renderFilterSection = () => (
    <View style={styles.filterContainer}>
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>Filters</Text>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
          <Ionicons name={showFilters ? "chevron-up" : "chevron-down"} size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filterContent}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by order ID or customer"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            ) : null}
          </View>

          <Text style={styles.filterLabel}>Status</Text>
          <View style={styles.statusFilterContainer}>
            <TouchableOpacity
              style={[styles.statusFilterButton, filterStatus === null && styles.statusFilterActive]}
              onPress={() => setFilterStatus(null)}
            >
              <Text style={styles.statusFilterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusFilterButton, filterStatus === "completed" && styles.statusFilterActive]}
              onPress={() => setFilterStatus("completed")}
            >
              <Text style={styles.statusFilterText}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusFilterButton, filterStatus === "pending" && styles.statusFilterActive]}
              onPress={() => setFilterStatus("pending")}
            >
              <Text style={styles.statusFilterText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusFilterButton, filterStatus === "cancelled" && styles.statusFilterActive]}
              onPress={() => setFilterStatus("cancelled")}
            >
              <Text style={styles.statusFilterText}>Cancelled</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.filterLabel}>Date Range</Text>
          <View style={styles.dateFilterContainer}>
            <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowFromDatePicker(true)}>
              <Text style={styles.datePickerText}>
                {filterDateFrom ? new Date(filterDateFrom).toLocaleDateString() : "From Date"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowToDatePicker(true)}>
              <Text style={styles.datePickerText}>
                {filterDateTo ? new Date(filterDateTo).toLocaleDateString() : "To Date"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Date Pickers */}
          {showFromDatePicker && (
            <DateTimePicker
              testID="fromDatePicker"
              value={filterDateFrom || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onFromDateChange}
            />
          )}

          {showToDatePicker && (
            <DateTimePicker
              testID="toDatePicker"
              value={filterDateTo || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onToDateChange}
            />
          )}

          <View style={styles.filterActions}>
            <TouchableOpacity
              style={styles.resetFilterButton}
              onPress={() => {
                setFilterStatus(null)
                setFilterDateFrom(null)
                setFilterDateTo(null)
                setSearchQuery("")
              }}
            >
              <Text style={styles.resetFilterText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )

  const dailyTransactions = getTransactionsByDate()
  const totalTransactions = getStaffTransactions().length
  const totalRevenue = getStaffTransactions().reduce((sum, t) => sum + t.totalPrice, 0)

  return (
    <View style={styles.mainContainer}>
      {/* Đặt Toast ở đầu View chính để đảm bảo nó hiển thị trên cùng (giữ lại cho các trường hợp khác) */}
      <Toast config={toastConfig} />

      {/* Modal thông báo thành công */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(false)
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={50} color="green" />
            </View>
            <Text style={styles.modalTitle}>Success</Text>
            <Text style={styles.modalMessage}>{successMessage}</Text>
          </View>
        </View>
      </Modal>

      {/* Modal thông báo lỗi */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => {
          setErrorModalVisible(false)
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.errorIconContainer}>
              <Ionicons name="alert-circle" size={50} color="red" />
            </View>
            <Text style={styles.errorModalTitle}>{errorTitle}</Text>
            <Text style={styles.errorModalMessage}>{errorMessage}</Text>
            <TouchableOpacity style={styles.errorModalButton} onPress={() => setErrorModalVisible(false)}>
              <Text style={styles.errorModalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Staff Details</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => handleDelete(staff._id)} style={{ marginRight: 10 }}>
            <Ionicons name="trash-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToEditStaff}>
            <Ionicons name="pencil-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          {staff.image ? (
            <Image source={{ uri: staff.image }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImagePlaceholderText}>{getNameInitials(staff.username)}</Text>
            </View>
          )}
          <Text style={styles.staffName}>{getDisplayName()}</Text>
          <View style={[styles.statusBadge, staff.status === "active" ? styles.statusActive : styles.statusInactive]}>
            <Text style={styles.statusText}>{staff.status}</Text>
          </View>
        </View>

        {/* Staff Information */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="mail-outline" size={20} color="#3B82F6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{staff.email}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="call-outline" size={20} color="#3B82F6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{staff.phone}</Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Role Information</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="briefcase-outline" size={20} color="#3B82F6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Role</Text>
              <Text style={styles.infoValue}>{staff.role || "Staff"}</Text>
            </View>
          </View>
        </View>

        {/* Transactions Summary */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Transactions Summary</Text>

          <View style={styles.summaryStatsContainer}>
            <View style={styles.summaryStatItem}>
              <View style={styles.summaryStatIconContainer}>
                <Ionicons name="receipt-outline" size={24} color="#3B82F6" />
              </View>
              <Text style={styles.summaryStatValue}>{totalTransactions}</Text>
              <Text style={styles.summaryStatLabel}>Total Orders</Text>
            </View>

            <View style={styles.summaryStatItem}>
              <View style={styles.summaryStatIconContainer}>
                <Ionicons name="cash-outline" size={24} color="#3B82F6" />
              </View>
              <Text style={styles.summaryStatValue}>{formatCurrency(totalRevenue)}</Text>
              <Text style={styles.summaryStatLabel}>Total Revenue</Text>
            </View>
          </View>
        </View>

        {/* Transactions Filter */}
        {renderFilterSection()}

        {/* Transactions By Date */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Transactions By Date</Text>

          {dailyTransactions.length > 0 ? (
            <FlatList
              data={dailyTransactions}
              keyExtractor={(item) => item.date}
              renderItem={renderDailySummary}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={<Text style={styles.emptyListText}>No transactions found</Text>}
            />
          ) : (
            <Text style={styles.emptyListText}>No transactions found</Text>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    backgroundColor: "#3B82F6",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  profileImageContainer: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImagePlaceholderText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#6B7280",
  },
  staffName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    marginBottom: 16,
  },
  statusActive: {
    backgroundColor: "#DEF7EC",
  },
  statusInactive: {
    backgroundColor: "#FDE8E8",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#374151",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EBF5FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
    justifyContent: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: "#111827",
  },
  editButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "80%",
  },
  successIconContainer: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  errorIconContainer: {
    marginBottom: 15,
  },
  errorModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  errorModalMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  errorModalButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  errorModalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  transactionItem: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  transactionId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  transactionDetails: {
    flexDirection: "row",
    marginBottom: 4,
  },
  transactionLabel: {
    fontSize: 14,
    color: "#6B7280",
    width: 80,
  },
  transactionValue: {
    fontSize: 14,
    color: "#111827",
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 8,
  },
  emptyListText: {
    textAlign: "center",
    color: "#6B7280",
    padding: 16,
  },
  statusCompleted: {
    backgroundColor: "#DEF7EC",
  },
  statusPending: {
    backgroundColor: "#FEF3C7",
  },
  statusCancelled: {
    backgroundColor: "#FDE8E8",
  },
  dailySummaryContainer: {
    marginBottom: 12,
  },
  dailySummaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  dailySummaryDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  dailySummarySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  summaryStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  summaryStatItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryStatIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EBF5FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryStatValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  summaryStatLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  filterContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
  },
  filterContent: {
    marginTop: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 12,
    marginBottom: 8,
  },
  statusFilterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  statusFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
    marginBottom: 8,
  },
  statusFilterActive: {
    backgroundColor: "#EBF5FF",
    borderWidth: 1,
    borderColor: "#3B82F6",
  },
  statusFilterText: {
    fontSize: 14,
    color: "#374151",
  },
  dateFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  datePickerButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
    alignItems: "center",
  },
  datePickerText: {
    fontSize: 14,
    color: "#374151",
  },
  filterActions: {
    alignItems: "center",
    marginTop: 8,
  },
  resetFilterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resetFilterText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
  },
})

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        backgroundColor: "white",
        marginTop: verticalScale(50),
        zIndex: 9999,
        elevation: 20,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      contentContainerStyle={{
        paddingHorizontal: verticalScale(15),
      }}
      text1Style={{
        fontSize: moderateScale(16),
        fontWeight: "bold",
        color: "green",
      }}
      text2Style={{
        fontSize: moderateScale(14),
        color: "#333",
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "red",
        backgroundColor: "white",
        marginTop: verticalScale(50),
        zIndex: 9999,
        elevation: 20,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      contentContainerStyle={{
        paddingHorizontal: verticalScale(15),
      }}
      text1Style={{
        fontSize: moderateScale(16),
        fontWeight: "bold",
        color: "red",
      }}
      text2Style={{
        fontSize: moderateScale(14),
        color: "#333",
      }}
    />
  ),
}

export default StaffDetailScreen

