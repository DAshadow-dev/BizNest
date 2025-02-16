import { useNavigationRoot } from "@components/navigate/RootNavigation";
import React from "react";
import * as Routes from "@utils/Routes";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

const InvoiceScreen = (props: {
  route: {
    params: {
      invoiceId: string;
      amount: string;
      date: string;
      customer: string;
      address: string;
      createdBy: string;
      createdDate: string;
    };
  };
}) => {
  //   const { invoiceId, amount, date, customer, address, createdBy, createdDate } =
  //     props.route.params;
  const navigation = useNavigationRoot();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invoice Details</Text>
      <View style={styles.detailBox}>
        {/* <Text style={styles.label}>Invoice ID: {invoiceId}</Text>
                <Text style={styles.label}>Amount: {amount}</Text>
                <Text style={styles.label}>Date: {date}</Text>
                <Text style={styles.label}>Customer: {customer}</Text>
                <Text style={styles.label}>Address: {address}</Text>
                <Text style={styles.label}>Created By: {createdBy}</Text>
                <Text style={styles.label}>Created Date: {createdDate}</Text> */}

        <Text style={styles.label}>Invoice ID: 10003</Text>
        <Text style={styles.label}>Amount: 30.000.000 VNĐ</Text>
        <Text style={styles.label}>Date: 22/09/2025</Text>
        <Text style={styles.label}>Customer: Truong</Text>
        <Text style={styles.label}>Address: 29.SonLa Str</Text>
        <Text style={styles.label}>Created By: Admin</Text>
        <Text style={styles.label}>Created Date: 22/09/2019</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(Routes.PaymentScreen)}
      >
        <Text style={styles.buttonText}>Pay this invoice</Text>
      </TouchableOpacity>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const DemoScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demo Screen</Text>
      <Button
        title="Go to Invoice"
        onPress={() =>
          navigation.navigate("InvoiceScreen", {
            invoiceId: "INV12345",
            amount: "$250.00",
            date: "2025-02-14",
            customer: "John Doe",
            address: "123 Main St, City, Country",
            createdBy: "Admin",
            createdDate: "2025-02-01",
          })
        }
      />
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
  detailBox: {
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
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

export default InvoiceScreen;
export { DemoScreen };
