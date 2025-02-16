import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigationRoot } from '@components/navigate/RootNavigation';
import * as ImagePicker from 'expo-image-picker';

const EditStaffScreen = ({ route }) => {
  const navigation = useNavigationRoot();
  const { staff } = route.params;

  const [fullname, setFullname] = useState(staff.fullname);
  const [email, setEmail] = useState(staff.email);
  const [phone, setPhone] = useState(staff.phone);
  const [role, setRole] = useState(staff.role);
  const [image, setImage] = useState(staff.image); // Existing image of the staff

  // Function to pick an image from gallery or camera
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the selected image URI
    }
  };

  const handleSave = () => {
    if (!fullname || !email || !phone || !role) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    // Call API or save to database here
    Alert.alert('Thành công', 'Thông tin nhân viên đã được cập nhật!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Chỉnh Sửa Nhân Viên</Text>

      {image && <Image source={ image } style={styles.imagePreview} />} {/* Display selected image */}

      <TouchableOpacity onPress={pickImage} style={styles.pickImageButton}>
        <Text style={styles.pickImageText}>Chọn Ảnh</Text>
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Họ tên" value={fullname} onChangeText={setFullname} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Số điện thoại" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Vai trò" value={role} onChangeText={setRole} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu Thay Đổi</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  pickImageButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  pickImageText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditStaffScreen;
