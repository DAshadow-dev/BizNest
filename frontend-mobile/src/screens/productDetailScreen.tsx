import React, { useState } from 'react';
import * as Routes from '@utils/Routes';
import { useNavigationRoot } from '@components/navigate/RootNavigation';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductDetailScreen = ({ route }) => {
  const navigation = useNavigationRoot();
  const { product } = route.params; // Lấy thông tin sản phẩm từ route

  return (
    <View style={styles.container}>
      {/* Hiển thị ảnh sản phẩm */}
      <View>
          <View style={styles.arrowBack}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={15} color="black" />
                </TouchableOpacity> 
          </View>
      <Image source={ product.image } style={styles.productImage} />
      </View>
      

      {/* Thông tin sản phẩm */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>Price: ${product.price}</Text>
        <Text style={styles.productText}>Category: {product.category}</Text>
        <Text style={styles.productText}>Size: {product.size}</Text>
        <Text style={styles.productText}>Color: {product.color}</Text>
        <Text style={styles.productText}>Brand: {product.brand}</Text>
      </View>

      {/* Nút Edit */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate(Routes.EditProductScreen, { product: product })}
      >
        <Ionicons name="create" size={24} color="white" />
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  productDetails: {
    marginBottom: 20,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 18,
    marginVertical: 5,
  },
  productText: {
    fontSize: 16,
    color: '#555',
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  arrowBack: {
    marginBottom: 10,
  }
});

export default ProductDetailScreen;
