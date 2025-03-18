import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native"; 
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const PaymentDetailScreen = () => {
  const navigation = useNavigation(); 
  const route = useRoute(); 
  const { paymentMethod: routePaymentMethod } = route.params || {};

  const [paymentMethod, setPaymentMethod] = useState(routePaymentMethod || "visa"); 
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isSuccess = Math.random() > 0.5;
      navigation.navigate(isSuccess ? "SuccessScreen" : "FailureScreen"); 
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment - {paymentMethod}</Text>

      <TextInput
        style={styles.input}
        placeholder="Số thẻ"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày hết hạn"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />
      <TextInput
        style={styles.input}
        placeholder="CVV"
        value={cvv}
        secureTextEntry
        onChangeText={setCvv}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handlePayment}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Pay now</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
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
});

export default PaymentDetailScreen;
