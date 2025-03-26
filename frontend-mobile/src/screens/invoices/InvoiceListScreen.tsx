import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import * as Routes from "@utils/Routes";
import { useDispatch } from "react-redux";
import TransactionActions from "@redux/transaction/actions";
import { useAppSelector } from "@redux/store";
import { RootState } from "@redux/root-reducer";

import { format, parseISO } from "date-fns";

const InvoiceListScreen = () => {
  const navigation = useNavigationRoot();
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const [filteredtransactions, setFilteredtransactions] = useState<any[]>([]);

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

  useEffect(() => {

      setFilteredtransactions(transactions);
  }, [search, transactions]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>List Transaction</Text>
          <TouchableOpacity>
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

      <View style={{ margin: 16, position: "relative", flex: 1 }}>
        { transactions.length != 0 &&
        <FlatList
        data={filteredtransactions}
        keyExtractor={(item: any, index: number) => index.toString()}
        renderItem={({ item }) => {
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
                  Tổng giá trị: {new Intl.NumberFormat('vi-VN').format(item.totalPrice)} đ
                </Text>
                <Text style={styles.orderText}>
                  Trạng thái: {item.status}
                </Text>
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
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
      />}
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
  },
  orderDate: {
    fontSize: 12,
    color: "#615e5e",
  },
  
});

export default InvoiceListScreen;
