import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import * as Routes from "@utils/Routes";
import { useAppSelector } from "@redux/store";
import { RootState } from "@redux/root-reducer";
import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import TransactionActions from "@redux/transaction/actions";

const OrderDetailScreen = (props: any) => {
  const { id } = props.route.params;
  const navigation = useNavigationRoot();
  const orders = useAppSelector(
    (state: RootState) => state.Transaction.ListTransaction
  );

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const findOrder = orders.find((e: any) => e._id === id);
    setOrder(findOrder);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Order not found</Text>
      </View>
    );
  }

  const dispatch= useDispatch();

  const handleDeleteCustomer= () => {
    dispatch({
      type: TransactionActions.DELETE_TRANSACTION,
      payload: {
        data: {id: id},
        onSuccess:() => {
          console.log('1');
          navigation.goBack();
          console.log('2');
        },
        onError: (error: any) => {
          console.log(error);
        },
        onFailed: (MsgNo: string) => {
          console.log("Delete unsuccess")
        },
      },
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detail Transaction</Text>
          <TouchableOpacity onPress={handleDeleteCustomer}>
            <Ionicons name="trash" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ padding: 16 }}>
        {/* Thông tin khách hàng */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
          <Text style={styles.label}>
            Tên: <Text style={styles.value}>{order.customerId.fullname}</Text>
          </Text>
          <Text style={styles.label}>
            Email: <Text style={styles.value}>{order.customerId.email}</Text>
          </Text>
          <Text style={styles.label}>
            Số điện thoại:{" "}
            <Text style={styles.value}>{order.customerId.phone}</Text>
          </Text>
          <Text style={styles.label}>
            Ngày sinh:
            <Text style={styles.value}>
              {order.customerId.date_of_birth
                ? format(new Date(order.customerId.date_of_birth), "dd/MM/yyyy")
                : "N/A"}
            </Text>
          </Text>
        </View>

        {/* Danh sách sản phẩm */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Danh sách sản phẩm</Text>
          {order.products.map((product: any, index: number) => (
            <TouchableOpacity 
              key={index} 
              style={styles.productRow}
              onPress={() => navigation.navigate(Routes.ProductDetailScreen, { product: product.productId })}
            >
              <Image
                source={{ uri: product.productId.image }}
                style={styles.productImage}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.productName}>{product.productId.name}</Text>
                <Text style={styles.productDetail}>
                  Màu sắc: {product.productId.color}
                </Text>
                <Text style={styles.productDetail}>
                  Size: {product.productId.size}
                </Text>
                <Text style={styles.productDetail}>
                  Đơn giá: {product.productId.price.toLocaleString()}đ
                </Text>
                <Text style={styles.productDetail}>
                  Số lượng: {product.quantity}
                </Text>
                <Text style={styles.productTotal}>
                  Thành tiền:{" "}
                  {(
                    product.productId.price * product.quantity
                  ).toLocaleString()}
                  đ
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tổng cộng */}
        <View
          style={{
            ...styles.card,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...styles.totalText }}>Tổng cộng:</Text>
          <Text style={styles.totalText}>
            {" "}
            {order.totalPrice.toLocaleString()}đ
          </Text>
        </View>

        {/* Trạng thái đơn hàng */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Trạng thái đơn hàng</Text>
          <View style={{ justifyContent: "center", alignItems: "center"}}>
            <Text
              style={{
                ...styles.statusText,
                borderColor: "gray",
                borderWidth: 1,
                padding: 12,
                borderRadius: 16,
                backgroundColor: "#4a90e2",
              }}
            >
              {order.status}
            </Text>
          </View>
          {/* <TouchableOpacity style={styles.changeStatusButton}>
            <Text style={styles.changeStatusText}>Thay đổi trạng thái</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#4a90e2",
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginLeft: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1e4cff",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },
  value: {
    fontWeight: "bold",
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDetail: {
    fontSize: 14,
    color: "#555",
  },
  productTotal: {
    fontSize: 14,
    color: "#ff5733",
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff5733",
    textAlign: "right",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  changeStatusButton: {
    backgroundColor: "#ff5733",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  changeStatusText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
  },
});

export default OrderDetailScreen;
