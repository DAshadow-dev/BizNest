import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ProductActions from "../../redux/product/actions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/store";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { moderateScale, scale, verticalScale } from "@libs/reactResizeMatter/scalingUtils";
import * as ImagePicker from "expo-image-picker";
import * as Routes from '@utils/Routes';

const CreateProductScreen = () => {
  const navigation = useNavigationRoot();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Thêm state cho Modal
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Permission Denied');
      setErrorMessage('You need to grant permission to access the photo library');
      setErrorModalVisible(true);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  const validateInputs = () => {
    if (!name.trim()) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorMessage('Product name is required');
      setErrorModalVisible(true);
      return false;
    }

    if (!price.trim()) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorMessage('Price is required');
      setErrorModalVisible(true);
      return false;
    }

    if (isNaN(Number(price)) || Number(price) <= 0) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorMessage('Price must be a valid number greater than 0');
      setErrorModalVisible(true);
      return false;
    }

    if (!size.trim()) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorMessage('Size is required');
      setErrorModalVisible(true);
      return false;
    }

    if (!color.trim()) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorMessage('Color is required');
      setErrorModalVisible(true);
      return false;
    }

    if (!brand.trim()) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorMessage('Brand is required');
      setErrorModalVisible(true);
      return false;
    }

    if (!quantity.trim()) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorMessage('Quantity is required');
      setErrorModalVisible(true);
      return false;
    }

    if (isNaN(Number(quantity)) || Number(quantity) <= 0) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorMessage('Quantity must be a valid number greater than 0');
      setErrorModalVisible(true);
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (!validateInputs()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('size', size);
    formData.append('color', color);
    formData.append('brand', brand);
    formData.append('quantity', quantity);
    formData.append('description', description);
    formData.append('categoryId', '67b58b31df51987bf69c9911');
    formData.append('storeId', '67b58b4cdf51987bf69c9914');
  
    if (imageUri) {
      const fileName = imageUri.split('/').pop();
      const fileType = imageUri.split('.').pop();
      formData.append('image', {
        uri: imageUri,
        name: fileName,
        type: `image/${fileType}`,
      } as any);
    }
  
    dispatch({
      type: ProductActions.CREATE_PRODUCT,
      payload: {
        product: formData,
        onSuccess: () => {
          setLoading(false);
          
          // Hiển thị Modal thành công thay vì Toast
          setSuccessMessage('Product created successfully');
          setSuccessModalVisible(true);
          
          // Chuyển màn hình sau khi hiển thị Modal
          setTimeout(() => {
            setSuccessModalVisible(false);
            navigation.navigate(Routes.WareHouse, { refresh: true });
          }, 2000);
        },
        onError: (error: any) => {
          setLoading(false);
          // Hiển thị Modal lỗi thay vì Toast
          setErrorTitle('Error');
          setErrorMessage(error?.message || 'An error occurred');
          setErrorModalVisible(true);
        },
        onFailed: (error: string) => {
          setLoading(false);
          // Hiển thị Modal lỗi thay vì Toast
          setErrorTitle('Failed');
          setErrorMessage(error || 'Failed to create product');
          setErrorModalVisible(true);
        }
      }
    });
  };

  return (
    <View style={styles.mainContainer}>
      {/* Đặt Toast ở đầu View chính để đảm bảo nó hiển thị trên cùng (giữ lại cho các trường hợp khác) */}
      <Toast config={toastConfig} />
      
      {/* Modal thông báo thành công */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={successModalVisible}
        onRequestClose={() => {
          setSuccessModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={50} color="green" />
            </View>
            <Text style={styles.modalTitle}>Success</Text>
            <Text style={styles.modalMessage}>{successMessage}</Text>
          </View>
        </View>
      </Modal>
      
      {/* Modal thông báo lỗi */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={() => {
          setErrorModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.errorIconContainer}>
              <Ionicons name="alert-circle" size={50} color="red" />
            </View>
            <Text style={styles.errorModalTitle}>{errorTitle}</Text>
            <Text style={styles.errorModalMessage}>{errorMessage}</Text>
            <TouchableOpacity 
              style={styles.errorModalButton}
              onPress={() => setErrorModalVisible(false)}
            >
              <Text style={styles.errorModalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create New Product</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.formContainer}>
          {/* Image Picker */}
          <View style={styles.imagePickerContainer}>
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
              ) : (
                <View style={styles.imagePickerPlaceholder}>
                  <FontAwesome name="camera" size={24} color="#6B7280" />
                  <Text style={styles.imagePickerText}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter product name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(value) => {
                if (/^\d*\.?\d*$/.test(value)) {
                  setPrice(value);
                }
              }}
              placeholder="Enter product price"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Size</Text>
            <TextInput
              style={styles.input}
              value={size}
              onChangeText={setSize}
              placeholder="Enter product size"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Color</Text>
            <TextInput
              style={styles.input}
              value={color}
              onChangeText={setColor}
              placeholder="Enter product color"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Brand</Text>
            <TextInput
              style={styles.input}
              value={brand}
              onChangeText={setBrand}
              placeholder="Enter product brand"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={(value) => {
                if (/^\d+$/.test(value) || value === '') {
                  setQuantity(value);
                }
              }}
              placeholder="Enter product quantity"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter product description"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Create Product</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#3B82F6',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 16,
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  imagePickerPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerText: {
    marginTop: 8,
    color: '#6B7280',
    fontSize: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#374151',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Styles cho Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: '80%',
  },
  successIconContainer: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  errorIconContainer: {
    marginBottom: 15,
  },
  errorModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  errorModalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorModalButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  errorModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        backgroundColor: "white",
        marginTop: verticalScale(50),
        zIndex: 9999,
      }}
      contentContainerStyle={{
        paddingHorizontal: verticalScale(0),
      }}
      text1Style={{
        fontSize: moderateScale(16),
        fontWeight: "bold",
        color: "green",
      }}
      text2Style={{
        fontSize: moderateScale(14),
        color: "#333",
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "red",
        backgroundColor: "white",
        marginTop: verticalScale(50),
        zIndex: 9999,
      }}
      contentContainerStyle={{
        paddingHorizontal: verticalScale(15),
      }}
      text1Style={{
        fontSize: moderateScale(16),
        fontWeight: "bold",
        color: "red",
      }}
      text2Style={{
        fontSize: moderateScale(14),
        color: "#333",
      }}
    />
  ),
};

export default CreateProductScreen;
