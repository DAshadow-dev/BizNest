import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Footer from "@components/Footer";

const CreateInvoiceProductScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const addProduct = () => {
    if (productName && price && quantity) {
      setProducts([...products, { name: productName, price, quantity }]);
      setProductName("");
      setPrice("");
      setQuantity("");
    }
  };

  const handleCreateInvoice = () => {
    navigation.navigate("CreateInvoiceScreen", { products });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products Added</Text>
      {products.length === 0 ? (
        <Text style={styles.noProducts}>No products added yet.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text>
                {item.name} - ${item.price} x {item.quantity}
              </Text>
            </View>
          )}
        />
      )}

      <Text style={styles.title}>Add Products</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <View style={{ flexDirection: "row" }} justifyContent="space-between">
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          width="66%"
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          width="32%"

          onChangeText={setQuantity}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={addProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateInvoice}>
        <Text style={styles.buttonText}>Create Invoice</Text>
      </TouchableOpacity>

      <Footer />
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
  productItem: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginVertical: 5,
  },
  noProducts: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
});

export default CreateInvoiceProductScreen;
