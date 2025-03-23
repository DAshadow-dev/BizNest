import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";

import { createInvoice } from "@redux/invoice/actions";

const CreateInvoiceScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState([
    { description: "Graphic Design Service", quantity: 1, price: 300 },
    { description: "Website Development", quantity: 1, price: 1200 }
  ]);

  const handleCreateInvoice = () => {
    if (!invoiceNumber || !customerName || !customerEmail || !totalAmount || !dueDate || items.length === 0) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (isNaN(parseFloat(totalAmount))) {
      Alert.alert("Error", "Total amount must be a valid number");
      return;
    }

    const formattedDate = new Date(dueDate);
    if (isNaN(formattedDate.getTime())) {
      Alert.alert("Error", "Invalid due date format. Use YYYY-MM-DD.");
      return;
    }

    const newInvoice = {
      invoiceNumber,
      customerName,
      customerEmail,
      items,
      totalAmount: parseFloat(totalAmount),
      issuedDate: new Date().toISOString(),
      dueDate: formattedDate.toISOString(),
      status: "Pending",
    };

    console.log("Invoice Data Sent:", newInvoice);

    dispatch(createInvoice(newInvoice))
      .then(() => {
        Alert.alert("Success", "Invoice created successfully!");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Error", `Failed to create invoice: ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Invoice</Text>
      <TextInput
        style={styles.input}
        placeholder="Invoice Number"
        value={invoiceNumber}
        onChangeText={setInvoiceNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={customerName}
        onChangeText={setCustomerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Customer Email"
        value={customerEmail}
        onChangeText={setCustomerEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Total Amount"
        value={totalAmount}
        onChangeText={(text) => setTotalAmount(text.replace(/[^0-9.]/g, ""))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Due Date (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateInvoice}>
        <Text style={styles.buttonText}>Create Invoice</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    textAlign: "center",
    color: "#007AFF",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateInvoiceScreen;
