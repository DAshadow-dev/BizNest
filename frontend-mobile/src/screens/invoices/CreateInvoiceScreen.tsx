import { useNavigationRoot } from "@components/navigate/RootNavigation";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Footer from "@components/Footer";

const CreateInvoiceScreen = ({ navigation }) => {
  const [invoiceId, setInvoiceId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [currency, setCurrency] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const getDateNow = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    const formattedDate = selectedDate.toLocaleDateString();
    setDate(formattedDate);
    hideDatePicker();
  };

  const handleContinue = () => {
    navigation.navigate("CreareInvoiceProductScreen", {
      invoiceId,
      amount,
      date,
      customer,
      address,
      createdBy,
      createdDate,
      currency,
    });
  };

  return (
    <View height="100%">
      <Text style={styles.title} paddingHorizontal="15">Create Invoice</Text>
      <View style={styles.inputBox} paddingHorizontal="15">
        <Text style={styles.titleInvoice}>Invoice ID: VN-1000</Text>
        <Text style={styles.titleInvoice}>Invoice Date: {getDateNow()}</Text>
        <TextInput
          style={styles.input}
          placeholder="Company"
          onChangeText={setCustomer}
        />
        <TextInput style={styles.input} placeholder="Tax code" />
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput
          style={styles.input}
          placeholder="Due Date"
          value={date}
          onFocus={showDatePicker}
          onChangeText={setDate}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#f8f9fa",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  titleInvoice: { fontSize: 16, marginBottom: 10 },
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
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default CreateInvoiceScreen;
