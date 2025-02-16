import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView // Import ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker để chọn ảnh

const EditProductScreen = ({ route }) => {
  const navigation = useNavigation();
  const { product } = route.params; // Lấy thông tin sản phẩm từ route

  // State cho các trường thông tin
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [size, setSize] = useState(product.size);
  const [color, setColor] = useState(product.color);
  const [brand, setBrand] = useState(product.brand);
  const [image, setImage] = useState(product.image); // Để lưu ảnh

  // Hàm chọn ảnh từ thư viện
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Lưu ảnh đã chọn vào state
    }
  };

  // Lưu thông tin sau khi chỉnh sửa
  const handleSave = () => {
    if (!name || !price || !size || !color || !brand || !image) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const updatedProduct = {
      name,
      price: parseFloat(price),
      size,
      color,
      brand,
      image
    };

    console.log('Sản phẩm sau khi chỉnh sửa:', updatedProduct);
    Alert.alert('Thành công', 'Sản phẩm đã được cập nhật!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={styles.container}> {/* Bọc tất cả trong ScrollView */}
        <View style={styles.arrowBack}>
            <Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={15} color="black" />
                </TouchableOpacity> 
            </Text>
        </View>
        <Text style={styles.title}>Chỉnh sửa Sản Phẩm</Text>

        {/* Hiển thị ảnh đã chọn */}
        {image && <Image source={image} style={styles.productImage} />}
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Chọn ảnh</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Tên sản phẩm"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Giá"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Kích thước"
          value={size}
          onChangeText={setSize}
        />
        <TextInput
          style={styles.input}
          placeholder="Màu sắc"
          value={color}
          onChangeText={setColor}
        />
        <TextInput
          style={styles.input}
          placeholder="Thương hiệu"
          value={brand}
          onChangeText={setBrand}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  arrowBack: {
    marginBottom: 10,
  }
});

export default EditProductScreen;
