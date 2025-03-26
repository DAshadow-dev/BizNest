import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import * as Routes from "@utils/Routes";
import { useDispatch } from "react-redux";
import TransactionActions from "@redux/transaction/actions";
import { useAppSelector } from "@redux/store";
import { RootState } from "@redux/root-reducer";
import DateTimePicker from '@react-native-community/datetimepicker';

import { format, parseISO, isWithinInterval, startOfDay, endOfDay } from "date-fns";

interface DailySummary {
  date: string;
  formattedDate: string;
  transactions: any[];
  orderCount: number;
  totalAmount: number;
}

const InvoiceListScreen = () => {
  const navigation = useNavigationRoot();
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterDateFrom, setFilterDateFrom] = useState<Date | null>(null);
  const [filterDateTo, setFilterDateTo] = useState<Date | null>(null);
  const [groupByDate, setGroupByDate] = useState(false);
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({});
  const [dailySummaries, setDailySummaries] = useState<DailySummary[]>([]);
  
  // Date picker states
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  const transactions = useAppSelector(
    (state: RootState) => state.Transaction.ListTransaction
  );

  useEffect(() => {
    dispatch({
      type: TransactionActions.FETCH_LIST_TRANSACTION,
      payload: {
        onError: (error: any) => {
          console.log(error);
        },
        onFailed: (MsgNo: string) => {
          console.log(MsgNo);
        },
      },
    });
  }, []);

  const applyFilters = useCallback(() => {
    if (!transactions) return;

    let filtered = [...transactions];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item._id.toString().toLowerCase().includes(searchLower) ||
          item.customerId?.fullname?.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filterStatus) {
      filtered = filtered.filter((item) => item.status === filterStatus);
    }

    // Apply date range filter
    if (filterDateFrom || filterDateTo) {
      filtered = filtered.filter((item) => {
        const transactionDate = new Date(item.createdAt);
        
        if (filterDateFrom && filterDateTo) {
          return isWithinInterval(transactionDate, {
            start: startOfDay(filterDateFrom),
            end: endOfDay(filterDateTo)
          });
        } else if (filterDateFrom) {
          return transactionDate >= startOfDay(filterDateFrom);
        } else if (filterDateTo) {
          return transactionDate <= endOfDay(filterDateTo);
        }
        
        return true;
      });
    }

    setFilteredTransactions(filtered);

    // Process daily summaries if grouping by date
    if (groupByDate) {
      const groupedByDate: Record<string, any[]> = {};
      
      filtered.forEach(transaction => {
        const date = new Date(transaction.createdAt);
        const dateString = format(date, 'yyyy-MM-dd');
        
        if (!groupedByDate[dateString]) {
          groupedByDate[dateString] = [];
        }
        
        groupedByDate[dateString].push(transaction);
      });
      
      const summaries: DailySummary[] = Object.keys(groupedByDate)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map(dateString => {
          const transactions = groupedByDate[dateString];
          const totalAmount = transactions.reduce((sum, t) => sum + t.totalPrice, 0);
          
          return {
            date: dateString,
            formattedDate: format(new Date(dateString), 'EEEE, dd MMMM yyyy'),
            transactions,
            orderCount: transactions.length,
            totalAmount
          };
        });
      
      setDailySummaries(summaries);
    }
  }, [transactions, search, filterStatus, filterDateFrom, filterDateTo, groupByDate]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters, transactions, search, filterStatus, filterDateFrom, filterDateTo, groupByDate]);

  const resetFilters = () => {
    setFilterStatus(null);
    setFilterDateFrom(null);
    setFilterDateTo(null);
    setSearch("");
  };

  const toggleDateExpanded = (date: string) => {
    setExpandedDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  const isDateExpanded = (date: string): boolean => {
    return !!expandedDates[date];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  };

  const getTotalSummary = () => {
    const totalOrders = filteredTransactions.length;
    const totalAmount = filteredTransactions.reduce((sum, item) => sum + item.totalPrice, 0);
    
    return { totalOrders, totalAmount };
  };

  // Date picker handlers
  const onFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || filterDateFrom;
    setShowFromDatePicker(Platform.OS === 'ios');
    setFilterDateFrom(currentDate);
  };

  const onToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || filterDateTo;
    setShowToDatePicker(Platform.OS === 'ios');
    setFilterDateTo(currentDate);
  };

  const renderTransactionItem = ({ item }: { item: any }) => {
    // Tính tổng số lượng sản phẩm
    const totalQuantity =
      item.products?.reduce(
        (sum: number, product: any) => sum + product.quantity,
        0
      ) || 0;

    return (
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() =>
          navigation.navigate(Routes.InvoiceScreen, { id: item._id })
        }
      >
        <View style={styles.orderInfo}>
          <Text style={styles.orderText}>Mã đơn hàng: {item._id}</Text>
          <Text style={styles.orderText}>
            Khách hàng: {item.customerId.fullname}
          </Text>
          <Text style={styles.orderText}>
            Số lượng sản phẩm: {totalQuantity}
          </Text>
          <Text style={styles.orderText}>
            Tổng giá trị: {formatCurrency(item.totalPrice)}
          </Text>
          <View style={styles.statusContainer}>
            <Text style={styles.orderText}>Trạng thái: </Text>
            <View style={[
              styles.statusBadge,
              item.status === "completed" ? styles.statusCompleted :
              item.status === "pending" ? styles.statusPending : styles.statusCancelled
            ]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
          <Text style={styles.orderDate}>
            Ngày tạo:{" "}
            {item.createdAt
              ? format(
                  parseISO(item.createdAt.toString()),
                  "HH:mm:ss dd/MM/yyyy"
                )
              : "N/A"}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward-outline"
          size={20}
          color="#555"
        />
      </TouchableOpacity>
    );
  };

  const renderDailySummary = ({ item }: { item: DailySummary }) => (
    <View style={styles.dailySummaryContainer}>
      <TouchableOpacity 
        style={styles.dailySummaryHeader}
        onPress={() => toggleDateExpanded(item.date)}
      >
        <View>
          <Text style={styles.dailySummaryDate}>{item.formattedDate}</Text>
          <Text style={styles.dailySummarySubtitle}>
            {item.orderCount} đơn hàng • {formatCurrency(item.totalAmount)}
          </Text>
        </View>
        <Ionicons 
          name={isDateExpanded(item.date) ? "chevron-up" : "chevron-down"} 
          size={24} 
          color="#6B7280" 
        />
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
  );

  const { totalOrders, totalAmount } = getTotalSummary();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.HomeScreen)}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>List Transaction</Text>
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <Ionicons name="options-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search transaction by Id or Name"
            value={search}
            onChangeText={(value: string) => setSearch(value)}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Ionicons name="search-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Ionicons name="receipt-outline" size={24} color="#4a90e2" />
          <Text style={styles.summaryValue}>{totalOrders}</Text>
          <Text style={styles.summaryLabel}>Tổng đơn hàng</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Ionicons name="cash-outline" size={24} color="#4a90e2" />
          <Text style={styles.summaryValue}>{formatCurrency(totalAmount)}</Text>
          <Text style={styles.summaryLabel}>Tổng doanh thu</Text>
        </View>
      </View>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Bộ lọc</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <Text style={styles.filterLabel}>Trạng thái</Text>
              <View style={styles.statusFilterContainer}>
                <TouchableOpacity
                  style={[
                    styles.statusFilterButton,
                    filterStatus === null && styles.statusFilterActive
                  ]}
                  onPress={() => setFilterStatus(null)}
                >
                  <Text style={styles.statusFilterText}>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.statusFilterButton,
                    filterStatus === "completed" && styles.statusFilterActive
                  ]}
                  onPress={() => setFilterStatus("completed")}
                >
                  <Text style={styles.statusFilterText}>Hoàn thành</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.statusFilterButton,
                    filterStatus === "pending" && styles.statusFilterActive
                  ]}
                  onPress={() => setFilterStatus("pending")}
                >
                  <Text style={styles.statusFilterText}>Đang xử lý</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.statusFilterButton,
                    filterStatus === "cancelled" && styles.statusFilterActive
                  ]}
                  onPress={() => setFilterStatus("cancelled")}
                >
                  <Text style={styles.statusFilterText}>Đã hủy</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.filterLabel}>Khoảng thời gian</Text>
              <View style={styles.dateFilterContainer}>
                <TouchableOpacity 
                  style={styles.datePickerButton}
                  onPress={() => setShowFromDatePicker(true)}
                >
                  <Text style={styles.datePickerText}>
                    {filterDateFrom ? format(filterDateFrom, 'dd/MM/yyyy') : "Từ ngày"}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.datePickerButton}
                  onPress={() => setShowToDatePicker(true)}
                >
                  <Text style={styles.datePickerText}>
                    {filterDateTo ? format(filterDateTo, 'dd/MM/yyyy') : "Đến ngày"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Date Pickers */}
              {showFromDatePicker && (
                <DateTimePicker
                  testID="fromDatePicker"
                  value={filterDateFrom || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onFromDateChange}
                />
              )}
              
              {showToDatePicker && (
                <DateTimePicker
                  testID="toDatePicker"
                  value={filterDateTo || new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onToDateChange}
                />
              )}

              <Text style={styles.filterLabel}>Hiển thị</Text>
              <View style={styles.displayOptionContainer}>
                <TouchableOpacity
                  style={[
                    styles.displayOptionButton,
                    !groupByDate && styles.displayOptionActive
                  ]}
                  onPress={() => setGroupByDate(false)}
                >
                  <Text style={styles.displayOptionText}>Danh sách</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.displayOptionButton,
                    groupByDate && styles.displayOptionActive
                  ]}
                  onPress={() => setGroupByDate(true)}
                >
                  <Text style={styles.displayOptionText}>Nhóm theo ngày</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={resetFilters}
              >
                <Text style={styles.resetButtonText}>Đặt lại</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.applyButtonText}>Áp dụng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ margin: 16, position: "relative", flex: 1 }}>
        {transactions.length !== 0 && !groupByDate && (
          <FlatList
            data={filteredTransactions}
            keyExtractor={(item: any, index: number) => index.toString()}
            renderItem={renderTransactionItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}

        {transactions.length !== 0 && groupByDate && (
          <FlatList
            data={dailySummaries}
            keyExtractor={(item) => item.date}
            renderItem={renderDailySummary}
            contentContainerStyle={{ paddingBottom: 20 }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}

        {transactions.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>Không có đơn hàng nào</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() =>
            navigation.navigate(Routes.CreateInvoiceScreen, { idUpdate: -1 })
          }
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.buttonText}>New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    backgroundColor: "#4a90e2",
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
  },
  headerTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  searchContainer: {
    width: "80%",
    position: "relative",
  },
  searchBar: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 10,
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 40,
  },
  searchIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  customerItem: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  customerText: {
    fontSize: 16,
    color: "#333",
  },
  floatingButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#3478f6",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "500",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  orderInfo: {
    flexDirection: "column",
    flex: 1,
  },
  orderText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: "#615e5e",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalContent: {
    padding: 16,
    maxHeight: "70%",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  resetButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4a90e2",
    width: "48%",
    alignItems: "center",
  },
  resetButtonText: {
    color: "#4a90e2",
    fontWeight: "bold",
  },
  applyButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#4a90e2",
    width: "48%",
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  statusFilterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  statusFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    marginRight: 8,
    marginBottom: 8,
  },
  statusFilterActive: {
    backgroundColor: "#e6f0ff",
    borderWidth: 1,
    borderColor: "#4a90e2",
  },
  statusFilterText: {
    fontSize: 14,
    color: "#333",
  },
  dateFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datePickerButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    marginRight: 8,
    alignItems: "center",
  },
  datePickerText: {
    fontSize: 14,
    color: "#333",
  },
  displayOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  displayOptionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    marginRight: 8,
    alignItems: "center",
  },
  displayOptionActive: {
    backgroundColor: "#e6f0ff",
    borderWidth: 1,
    borderColor: "#4a90e2",
  },
  displayOptionText: {
    fontSize: 14,
    color: "#333",
  },
  summaryContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 16,
    marginBottom: 0,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "#eee",
    marginHorizontal: 10,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
  },
  dailySummaryContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  dailySummaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dailySummaryDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  dailySummarySubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
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
});

export default InvoiceListScreen;
