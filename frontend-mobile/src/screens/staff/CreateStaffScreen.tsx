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
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const CreateStaffScreen = () => {
  const navigation = useNavigation();

  // State của form
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State cho URL ảnh từ mạng

  // Chọn ảnh từ thư viện
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

  // Xử lý lưu nhân viên
  const handleSave = () => {
    if (!fullname || !email || !phone || !role || !image) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin và chọn ảnh!');
      return;
    }

    const newStaff = {
      fullname,
      email,
      phone,
      role,
      image: image || imageUrl, // Chấp nhận ảnh từ thư viện hoặc URL
    };

    console.log('Nhân viên mới:', newStaff);

    Alert.alert('Thành công', 'Nhân viên đã được thêm!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Thêm Nhân Viên Mới</Text>
      </View>

      <TextInput style={styles.input} placeholder="Họ tên" value={fullname} onChangeText={setFullname} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Số điện thoại" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Vai trò" value={role} onChangeText={setRole} />

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

        {/* Chọn ảnh nhân viên từ thư viện */}
        <View style={styles.imageButton}>
          <Button title="Chọn ảnh" onPress={pickImage} />
        </View>

        {/* Hiển thị ảnh đã chọn từ thư viện */}
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>

      {/* Nút lưu nhân viên */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu Nhân Viên</Text>
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
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  imageButton: {
    width: '40%',
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateStaffScreen;
