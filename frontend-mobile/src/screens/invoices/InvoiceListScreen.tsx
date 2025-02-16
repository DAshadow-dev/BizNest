import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import * as Routes from "@utils/Routes";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import NextArrow from "@assets/svg/NextArrow";
import Footer from "@components/Footer";

const invoices = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  number: `${1000 + index}`,
  amount: (Math.random() * 500).toFixed(2),
  date: new Date().toISOString().split("T")[0],
}));

const InvoiceListScreen = () => {
  const navigation = useNavigationRoot();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.invoiceItem}
      onPress={() => navigation.navigate(Routes.InvoiceScreen)}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../upload/google.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.invoiceDetails}>
        <Text style={styles.invoiceText}>Invoice ID: #{item.number}</Text>
        <Text style={styles.invoiceText}>Amount: ${item.amount}</Text>
        <Text style={styles.invoiceText}>Date: {item.date}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <NextArrow />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invoice List</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(Routes.CreateInvoiceScreen)}
      >
        <Text style={styles.buttonText}>Create new invoice</Text>
      </TouchableOpacity>
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9E9",
  },

  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  invoiceItem: {
    marginHorizontal: 15,
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  invoiceDetails: {
    flex: 7,
    paddingLeft: 10,
  },
  invoiceText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 3,
  },
  arrowContainer: {
    flex: 2,
    alignItems: "flex-end",
  },
  button: {
    marginHorizontal: 15,

    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
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
    marginTop: 10,
    alignItems: "center",
  },
  buttonTextSecondary: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InvoiceListScreen;
