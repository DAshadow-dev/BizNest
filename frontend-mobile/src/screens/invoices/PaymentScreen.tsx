import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Routes from "@utils/Routes";
import { useNavigationRoot } from "@components/navigate/RootNavigation";

const paymentMethods = [
  { id: "visa", name: "Visa" },
  { id: "mastercard", name: "MasterCard" },
  { id: "paypal", name: "PayPal" },
  { id: "momo", name: "Momo" },
];

const PaymentScreen = () => {
  const navigation = useNavigationRoot();
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isSuccess = Math.random() > 0.5;
      navigation.navigate(
        isSuccess ? Routes.SuccessScreen : Routes.FailureScreen
      );
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <View style={styles.paymentMethodsContainer}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentMethod,
              paymentMethod === method.id && styles.selectedMethod,
            ]}
            onPress={() => setPaymentMethod(method.id)}
          >
            {/* <Image source={method.image} style={styles.paymentImage} /> */}
            <Text>{method.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
        title=""
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
  paymentMethodsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  paymentMethod: {
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedMethod: { borderColor: "#000", borderWidth: 2 },
  paymentImage: { width: 50, height: 30, marginBottom: 5 },
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

export default PaymentScreen;
