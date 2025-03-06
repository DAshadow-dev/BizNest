import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./redux/productActions"; // Action creator
// import BottomBar from "./BottomBar";

const WareHouse = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts(
      (data) => console.log('Data fetched successfully', data),  // onSuccess callback
      (message) => console.log('Error message', message),  // onFailed callback
      (error) => console.log('Error occurred', error)  // onError callback
    ));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WareHouse</Text>
      </View>

      <View style={{ margin: 16 }}>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <ScrollView>
            {products.map((product, index) => (
              <TouchableOpacity key={index} style={styles.productItem}>
                <Text style={styles.productText}>{product.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <TouchableOpacity style={styles.floatingButton}>
          <Text style={styles.buttonText}>New</Text>
        </TouchableOpacity>
      </View>

      {/* <BottomBar /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { backgroundColor: "#4a90e2", padding: 16 },
  headerTitle: { fontSize: 20, color: "white" },
  productItem: { padding: 16, backgroundColor: "#fff", marginBottom: 8 },
  productText: { fontSize: 16 },
  floatingButton: { position: "absolute", bottom: 16, right: 16, backgroundColor: "#0078d4", padding: 12, borderRadius: 50 },
  buttonText: { color: "white" },
});

export default WareHouse;
