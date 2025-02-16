import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import * as Routes from "@utils/Routes";
import { useNavigationRoot } from "@components/navigate/RootNavigation";

const invoices = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  number: `${1000 + index}`,
  amount: (Math.random() * 500).toFixed(2),
  date: new Date().toISOString().split("T")[0],
}));

const InvoiceListScreen = () => {
  const navigation = useNavigationRoot();

  const renderItem = ({ item }) => (
    <View style={styles.invoiceItem}>
      <Text style={styles.invoiceText}>Invoice ID: #{item.number}</Text>
      <Text style={styles.invoiceText}>Amount: ${item.amount}</Text>
      <Text style={styles.invoiceText}>Date: {item.date}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          //   navigation.navigate(Routes.InvoiceScreen, { invoice: item })
          navigation.navigate(Routes.InvoiceScreen)
        }
      >
        <Text style={styles.buttonText}>More detail</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(Routes.HomeScreen)}>
        <Text style={styles.buttonTextSecondary}>Home</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Invoice List</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(Routes.CreateInvoiceScreen)
        }
      >
        <Text style={styles.buttonText}>Create new invoice</Text>
      </TouchableOpacity>
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      {/* Navigate to Home */}
      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigation.navigate(Routes.HomeScreen)}
      >
        <Text style={styles.buttonTextSecondary}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#E9E9E9",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  invoiceItem: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 100, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  invoiceText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecondary: {
    backgroundColor: "#E3F2FD",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 180,
    alignItems: "center",
  },
  buttonTextSecondary: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InvoiceListScreen;
