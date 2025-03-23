import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "@redux/invoice/actions";
import { RootState } from "@redux/rootReducer";

const InvoiceListScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const { invoices = [], loading, error } = useSelector((state: RootState) => {
    const invoiceData = state.Invoice || { invoices: [], loading: false, error: null };
    console.log("Raw API Response:", invoiceData); // Debugging API response
    return {
      ...invoiceData,
      invoices: invoiceData.invoices || [],
    };
  });

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const handleInvoicePress = (item: any) => {
    navigation.navigate("InvoiceDetail", item);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid": return "#28A745";
      case "pending": return "#FFC107";
      case "overdue": return "#FF5733";
      default: return "#777";
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleInvoicePress(item)}>
      <Text style={styles.itemTitle}>Invoice #{item.invoiceNumber}</Text>
      <Text style={styles.itemSubtitle}>Customer: {item.customerName} ({item.customerEmail})</Text>
      <Text style={styles.itemTotal}>Total: ${item.totalAmount}</Text>
      <Text style={[styles.itemStatus, { color: getStatusColor(item.status) }]}>Status: {item.status}</Text>
      <Text style={styles.itemDate}>Due Date: {new Date(item.dueDate).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error?.message || "An unexpected error occurred."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invoices</Text>
      {Array.isArray(invoices) && invoices.length > 0 ? (
        <FlatList
          data={invoices}
          renderItem={renderItem}
          keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
        />
      ) : (
        <Text style={styles.noInvoices}>No invoices available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#007AFF",
  },
  item: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#007AFF",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 8,
  },
  itemStatus: {
    fontSize: 14,
    marginTop: 5,
  },
  itemDate: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  noInvoices: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
    marginTop: 20,
  },
});

export default InvoiceListScreen;