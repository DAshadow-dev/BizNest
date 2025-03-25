"use client";

import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import * as Routes from "@utils/Routes";
import { useAppSelector } from "@redux/store";
import type { RootState } from "@redux/root-reducer";
import type { Customer } from "@type/user.types";
import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import CustomerActions from "@redux/customer/actions";

const CustomerDetailScreen = (props: any) => {
  const { id } = props.route.params;
  const transactions = useAppSelector(
    (state: RootState) => state.Transaction.ListTransaction
  );

  const [order, setOrder] = useState<any>([]);
  const navigation = useNavigationRoot();
  const customers: Array<Customer> = useAppSelector(
    (state: RootState) => state.Customer.ListCustomer
  );
  const [customer, setCustomer] = useState<Customer>({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const findOrder = transactions.filter((e: any) => e.customerId._id === id);
    setOrder(findOrder);
  }, [transactions, id]);

  useEffect(() => {
    const findCustomer = customers.filter((e: Customer) => e._id == id);
    setCustomer(findCustomer[0]);
    setLoading(false);
  }, [customers, id]);

  const handleDeleteCustomer = () => {
    dispatch({
      type: CustomerActions.DELET_CUSTOMER,
      payload: {
        data: { id: id },
        onSuccess: (data: any) => {
          navigation.navigate(Routes.CUSTOMER_LIST, {
            showToast: true,
            message: "Delete customer successfully",
          });
        },
        onError: (error: any) => {
          console.log(error);
        },
        onFailed: (MsgNo: string) => {
          console.log("Delete unsuccess");
        },
      },
    });
  };

  const renderTransactionItem = ({ item }: { item: any }) => {
    // Calculate total quantity of products
    const totalQuantity =
      item.products?.reduce(
        (sum: number, product: any) => sum + product.quantity,
        0
      ) || 0;

    return (
      <TouchableOpacity
        style={styles.orderItem}
        onPress={() =>
          navigation.navigate(Routes.InvoiceScreen, {
            id: item._id,
          })
        }
      >
        <View style={styles.orderInfo}>
          <Text style={styles.orderId} numberOfLines={1} ellipsizeMode="middle">
            Order ID: {item._id}
          </Text>
          <Text style={styles.orderText}>Products: {totalQuantity}</Text>
          <Text style={styles.orderText}>
            Total: {new Intl.NumberFormat("vi-VN").format(item.totalPrice)} đ
          </Text>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: getStatusColor(item.status) },
              ]}
            />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          <Text style={styles.orderDate}>
            Created:{" "}
            {item.createdAt
              ? format(
                  parseISO(item.createdAt.toString()),
                  "HH:mm:ss dd/MM/yyyy"
                )
              : "N/A"}
          </Text>
        </View>
        <View style={styles.chevronContainer}>
          <Ionicons name="chevron-forward" size={20} color="#555" />
        </View>
      </TouchableOpacity>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "#4CAF50";
      case "pending":
        return "#FFC107";
      case "cancelled":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4a90e2" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.CUSTOMER_LIST)}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Customer Details</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={handleDeleteCustomer}
              style={styles.headerButton}
            >
              <Ionicons name="trash-outline" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Routes.CREATE_CUSTOMER, {
                  idUpdate: id,
                });
              }}
              style={styles.headerButton}
            >
              <Ionicons name="pencil-outline" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {customer && (
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.customerNameContainer}>
              <Ionicons
                name="person-circle-outline"
                size={24}
                color="#4a90e2"
              />
              <Text style={styles.customerName}>{customer.fullname}</Text>
            </View>
            <Text style={styles.label}>
              Created on:{" "}
              <Text style={styles.value}>
                {customer.createdAt
                  ? format(
                      parseISO(customer.createdAt.toString()),
                      "dd/MM/yyyy"
                    )
                  : "N/A"}
              </Text>
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#4a90e2"
              />
              <Text style={styles.sectionTitle}>Personal Information</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={16} color="#666" />
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{customer.email || "N/A"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={16} color="#666" />
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={styles.infoValue}>{customer.phone || "N/A"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.infoLabel}>Birthday:</Text>
              <Text style={styles.infoValue}>
                {customer.date_of_birth
                  ? format(new Date(customer.date_of_birth), "dd/MM/yyyy")
                  : "N/A"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons
                name={customer.gender ? "male-outline" : "female-outline"}
                size={16}
                color="#666"
              />
              <Text style={styles.infoLabel}>Gender:</Text>
              <Text style={styles.infoValue}>
                {customer.gender ? "Male" : "Female"}
              </Text>
            </View>
          </View>

          <View style={styles.transactionsContainer}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="receipt-outline" size={20} color="#4a90e2" />
              <Text style={styles.sectionTitle}>Transaction History</Text>
            </View>

            {order.length === 0 ? (
              <View style={styles.emptyTransactions}>
                <Ionicons name="cart-outline" size={40} color="#ccc" />
                <Text style={styles.emptyText}>No transactions found</Text>
              </View>
            ) : (
              <FlatList
                data={order}
                keyExtractor={(item: any) => item._id.toString()}
                renderItem={renderTransactionItem}
                contentContainerStyle={styles.transactionsList}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
              />
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
  },
  header: {
    backgroundColor: "#4a90e2",
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  headerActions: {
    flexDirection: "row",
  },
  headerButton: {
    padding: 8,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  customerNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  value: {
    color: "#333",
    fontWeight: "500",
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4a90e2",
    marginLeft: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
    width: 60,
    marginLeft: 8,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  transactionsContainer: {
    flex: 1,
  },
  transactionsList: {
    paddingBottom: 20,
  },
  emptyTransactions: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
    fontWeight: "500",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4a90e2",
    marginBottom: 4,
    width: "90%",
  },
  orderText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  orderDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  chevronContainer: {
    padding: 4,
  },
});

export default CustomerDetailScreen;
