import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native"; 
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as Routes from "@utils/Routes";

const paymentMethods = [
  { id: "visa", name: "Visa" },
  { id: "mastercard", name: "MasterCard" },
  { id: "paypal", name: "PayPal" },
  { id: "momo", name: "Momo" },
];

const PaymentScreen = () => {
  const navigation = useNavigation(); 
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (!paymentMethod) return;
    navigation.navigate("PaymentDetailScreen", { paymentMethod }); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Gateway</Text>
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
            <Text>{method.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Continue</Text>
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

export default PaymentScreen;
