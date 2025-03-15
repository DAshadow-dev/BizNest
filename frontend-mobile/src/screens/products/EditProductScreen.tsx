import React, { useState, useRef } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Modal } from 'react-native';
import ProductActions from "../../redux/product/actions";
import { useDispatch } from "react-redux";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import * as Routes from '@utils/Routes';
import { scale, verticalScale, moderateScale } from '@libs/reactResizeMatter/scalingUtils';

interface RouteParams {
  product: {
    name: string;
    price: number;
    size: string;
    color: string;
    brand: string;
    quantity: number;
    image: string | null;
    description: string;
    _id: string;
    category: string;
  };
}

const EditProductScreen = ({ route }: { route: { params: RouteParams } }) => {
  const navigation = useNavigationRoot();
  const dispatch = useDispatch();
  const { product } = route.params;

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [size, setSize] = useState(product.size);
  const [color, setColor] = useState(product.color);
  const [brand, setBrand] = useState(product.brand);
  const [quantity, setQuantity] = useState(product.quantity.toString());
  const [imageUri, setImageUri] = useState<string | null>(product.image);
  const [loading, setLoading] = useState(false); // Trạng thái chờ
  const [errorMessage, setErrorMessage] = useState(""); // Lưu thông báo lỗi
  const scrollViewRef = useRef<ScrollView>(null); // Tham chiếu tới ScrollView
  
  // Thêm state cho Modal
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorModalMessage, setErrorModalMessage] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Permission Denied');
      setErrorModalMessage('You need to grant permission to access the photo library');
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
    if (!name || !price || !size || !color || !brand || !quantity || !imageUri) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorModalMessage('All fields are required');
      setErrorModalVisible(true);
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true }); // Cuộn lên đầu trang
      return false;
    }
    if (isNaN(Number(price)) || isNaN(Number(quantity))) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorModalMessage('Price and Quantity must be numbers');
      setErrorModalVisible(true);
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true }); // Cuộn lên đầu trang
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const onSubmit = async () => {
    if (!validateInputs()) return; // Kiểm tra validate trước khi submit

    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('size', size);
    formData.append('color', color);
    formData.append('brand', brand);
    formData.append('categoryId', '67b58b31df51987bf69c9911');
    formData.append('storeId', '67b58b4cdf51987bf69c9914');
    formData.append('description', product.description);
    formData.append('quantity', quantity); // Đảm bảo quantity là chuỗi cho FormData

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
        type: ProductActions.UPDATE_PRODUCT,
        payload: {
            id: product._id,
            product: formData,
            onSuccess: () => {
                setLoading(false);
                
                // Hiển thị Modal thành công thay vì Toast
                setSuccessMessage('Product updated successfully');
                setSuccessModalVisible(true);
                
                // Chuyển màn hình sau khi hiển thị Modal
                setTimeout(() => {
                    setSuccessModalVisible(false);
                    dispatch({ type: ProductActions.FETCH_PRODUCTS });
                    navigation.navigate(Routes.WareHouse, { refresh: true });
                }, 2000);
            },
            onError: (error: any) => {
                setLoading(false);
                // Hiển thị Modal lỗi thay vì Toast
                setErrorTitle('Error');
                setErrorModalMessage(error?.message || 'An error occurred');
                setErrorModalVisible(true);
            },
            onFailed: (error: string) => {
                setLoading(false);
                // Hiển thị Modal lỗi thay vì Toast
                setErrorTitle('Failed');
                setErrorModalMessage(error || 'Failed to update product');
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
            <Text style={styles.errorModalMessage}>{errorModalMessage}</Text>
            <TouchableOpacity 
              style={styles.errorModalButton}
              onPress={() => setErrorModalVisible(false)}
            >
              <Text style={styles.errorModalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <ScrollView 
        style={styles.container}
        ref={scrollViewRef}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Product</Text>
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
                  <Text style={styles.imagePickerText}>Change Photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
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
              onChangeText={setPrice}
              placeholder="Enter price"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Size</Text>
            <TextInput
              style={styles.input}
              value={size}
              onChangeText={setSize}
              placeholder="Enter size"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Color</Text>
            <TextInput
              style={styles.input}
              value={color}
              onChangeText={setColor}
              placeholder="Enter color"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Brand</Text>
            <TextInput
              style={styles.input}
              value={brand}
              onChangeText={setBrand}
              placeholder="Enter brand"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={setQuantity}
              placeholder="Enter quantity"
              keyboardType="numeric"
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
              <Text style={styles.submitButtonText}>Update Product</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Styles
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
    borderRadius: 50,
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
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
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
        marginTop: verticalScale(30),
        zIndex: 9999,
      }}
      contentContainerStyle={{
        paddingHorizontal: verticalScale(15),
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
        marginTop: verticalScale(30),
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

export default EditProductScreen;
