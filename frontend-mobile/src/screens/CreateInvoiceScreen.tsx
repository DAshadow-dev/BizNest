import { useNavigationRoot } from "@components/navigate/RootNavigation";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";

type InvoiceScreenProps = {
  route: {
    params?: {
      invoiceId?: string;
      amount?: string;
      date?: string;
      customer?: string;
      address?: string;
      createdBy?: string;
      createdDate?: string;
    };
  };
};

const CreateInvoiceScreen: React.FC<InvoiceScreenProps> = () => {
  const navigation = useNavigationRoot();

  const [invoiceId, setInvoiceId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Invoice</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Customer"
          value={customer}
          onChangeText={setCustomer}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="End Date"
          value={createdDate}
          onChangeText={setCreatedDate}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          console.log({
            invoiceId,
            amount,
            date,
            customer,
            address,
            createdBy,
            createdDate,
          })
        }
      >
        <Text style={styles.buttonText}>Create new invoice</Text>
      </TouchableOpacity>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputBox: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
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

export default CreateInvoiceScreen;
