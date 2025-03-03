import { useNavigationRoot } from "@components/navigate/RootNavigation";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import Factories from "@redux/invoice/factories";

const CreateInvoiceScreen = () => {
  const navigation = useNavigationRoot();

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [createdBy, setCreatedBy] = useState("User123"); // Replace with actual user
  const [loading, setLoading] = useState(false);

  const handleCreateInvoice = async () => {
    if (!amount || !date || !customer || !address) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    Keyboard.dismiss();
    setLoading(true);

    try {
      const newInvoice = await Factories.createInvoice({
        amount,
        date,
        customer,
        address,
        createdBy,
      });

      Alert.alert("Success", "Invoice created successfully.");
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]); // Reset to today
      setCustomer("");
      setAddress("");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to create invoice.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Invoice</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          keyboardType="numeric"
          onChangeText={setAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
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
      </View>
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleCreateInvoice}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating..." : "Create Invoice"}
        </Text>
      </TouchableOpacity>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
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
  buttonDisabled: {
    backgroundColor: "#AAB8C2",
  },
});

export default CreateInvoiceScreen;
