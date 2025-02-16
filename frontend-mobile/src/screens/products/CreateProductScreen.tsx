import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  Button
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

const CreateProductScreen = () => {
  const navigation = useNavigation();

  // State của form
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State cho URL ảnh từ mạng

const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Xử lý lưu sản phẩm
  const handleSave = () => {
    if (!name || !color || (!image && !imageUrl) || !size || !price || !quantity || !description || !brand) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const newProduct = {
      name,
      color,
      image: image || imageUrl, // Chấp nhận cả ảnh từ thư viện và từ URL
      size: parseInt(size),
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description,
      brand,
    };

    console.log('Sản phẩm mới:', newProduct);

    Alert.alert('Thành công', 'Sản phẩm đã được thêm!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
        <View>
            <Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={15} color="black" />
                </TouchableOpacity> 
            </Text>
            <Text style={styles.title}>Thêm Sản Phẩm Mới</Text>
        </View>

      <TextInput style={styles.input} placeholder="Tên sản phẩm" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Màu sắc" value={color} onChangeText={setColor} />
      <TextInput style={styles.input} placeholder="Kích thước (Số)" keyboardType="numeric" value={size} onChangeText={setSize} />
      <TextInput style={styles.input} placeholder="Giá ($)" keyboardType="numeric" value={price} onChangeText={setPrice} />
      <TextInput style={styles.input} placeholder="Số lượng" keyboardType="numeric" value={quantity} onChangeText={setQuantity} />
      <TextInput style={styles.input} placeholder="Mô tả" multiline value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Thương hiệu" value={brand} onChangeText={setBrand} />


        <View style={styles.imageContainer}>
            {/* Nhập URL ảnh từ mạng */}
            <TextInput
                style={styles.input}
                placeholder="Hoặc nhập URL ảnh"
                value={imageUrl}
                onChangeText={(text) => {
                setImageUrl(text);
                setImage(''); // Xóa ảnh từ thư viện nếu nhập URL
                }}
            />

            {/* Hiển thị ảnh nếu nhập URL */}
            {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.image} />
            ) : null}
            {/* Chọn ảnh sản phẩm từ thư viện */}
            <View style={styles.imageButton}>
                <Button title="Pick an image" onPress={pickImage} />
            </View>
            {image && <Image source={{ uri: image }} style={styles.image} />}

            
        </View>
      

      {/* Nút lưu sản phẩm */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu sản phẩm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

/** 📌 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  imagePicker: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer:{
    flexDirection: 'row'
  },
  imageButton: {
    width: '40%',
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal: 10,
  }
});

export default CreateProductScreen;
