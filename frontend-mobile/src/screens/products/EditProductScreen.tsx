import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Modal, FlatList } from 'react-native';
import ProductActions from "../../redux/product/actions";
import CategoryActions from "../../redux/category/actions";
import { useDispatch } from "react-redux";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import * as Routes from '@utils/Routes';
import { scale, verticalScale, moderateScale } from '@libs/reactResizeMatter/scalingUtils';
import { useAppSelector } from "@redux/store";
import { RootState } from "@redux/root-reducer";

interface Category {
  _id: string | number;
  name: string;
  description?: string;
  image?: string;
}

interface RouteParams {
  product: {
    name: string;
    price: number;
    size: string;
    color: string;
    brand: string;
    quantity: string | number;
    image: string | null;
    description: string;
    _id: string;
    categoryId: string | number;
  };
}

const EditProductScreen = ({ route }: { route: { params: RouteParams } }) => {
  const navigation = useNavigationRoot();
  const dispatch = useDispatch();
  const { product } = route.params;
  const Auth = useAppSelector((state: RootState) => state.User.Auth);
  
  // Get categories to display the correct category name
  const { categories, loading: categoriesLoading } = useAppSelector((state: RootState) => state.Category);
  
  // State for category selection
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | number>(product.categoryId);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  
  // Find the current category name
  const [categoryName, setCategoryName] = useState('Không có danh mục');
  
  useEffect(() => {
    // Fetch categories when component mounts
    dispatch({ 
      type: CategoryActions.FETCH_CATEGORIES,
      payload: {
        onError: (error: any) => {
          setErrorTitle('Error');
          setErrorModalMessage('Failed to fetch categories: ' + error.message);
          setErrorModalVisible(true);
        }
      }
    });
  }, [dispatch]);
  
  useEffect(() => {
    // Update category name when categories load or selected ID changes
    if (categories && categories.length > 0) {
      const category = categories.find((cat: any) => cat._id.toString() === selectedCategoryId.toString());
      if (category) {
        setCategoryName(category.name);
      }
    }
  }, [categories, selectedCategoryId]);

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

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => {
        setSelectedCategoryId(item._id);
        setCategoryModalVisible(false);
      }}
    >
      <Text style={[
        styles.categoryItemText, 
        selectedCategoryId.toString() === item._id.toString() ? styles.selectedCategoryText : {}
      ]}>
        {item.name}
      </Text>
      {selectedCategoryId.toString() === item._id.toString() && (
        <Ionicons name="checkmark" size={20} color="#3B82F6" />
      )}
    </TouchableOpacity>
  );

  const onSubmit = async () => {
    if (!validateInputs()) return; // Kiểm tra validate trước khi submit

    setLoading(true);

    try {
      // Chuẩn bị FormData
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('size', size);
      formData.append('color', color);
      formData.append('brand', brand);
      formData.append('categoryId', selectedCategoryId.toString());
      formData.append('storeId', Auth?.storeId?.toString() || '');
      formData.append('description', product.description);
      formData.append('quantity', quantity); // Đảm bảo quantity là chuỗi cho FormData

      // Log thông tin FormData
      console.log('[EditProduct] FormData prepared with fields:');
      console.log('- name:', name);
      console.log('- price:', price);
      console.log('- size:', size);
      console.log('- color:', color);
      console.log('- brand:', brand);
      console.log('- categoryId:', selectedCategoryId.toString());
      console.log('- storeId:', Auth?.storeId?.toString() || '');
      console.log('- description:', product.description);
      console.log('- quantity:', quantity);

      if (imageUri) {
          const fileName = imageUri.split('/').pop();
          const fileType = imageUri.split('.').pop();
          formData.append('image', {
              uri: imageUri,
              name: fileName,
              type: `image/${fileType}`,
          } as any);
          console.log('- image:', fileName);
      } else {
          console.log('- No image attached');
      }

      // Thay đổi cách xử lý cập nhật sản phẩm
      // Không sử dụng Redux Saga mà trực tiếp gọi API để kiểm soát tốt hơn
      try {
        console.log('[EditProduct] Đang cập nhật sản phẩm...');
        
        // Trước tiên, tạo một Promise để đợi token đã được khởi tạo
        // Sử dụng setTimeout với Promise để đảm bảo bất đồng bộ hoạt động đúng
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Khởi tạo biến đếm số lần thử
        let attempts = 0;
        const maxAttempts = 3;
        let success = false;
        let lastError = null;
        
        // Thử lại tối đa 3 lần
        while (attempts < maxAttempts && !success) {
          attempts++;
          console.log(`[EditProduct] Lần thử ${attempts}/${maxAttempts}`);
          
          try {
            // Trực tiếp dispatch action để cập nhật sản phẩm
            // Sử dụng Promise để đợi kết quả từ action
            const result = await new Promise((resolve, reject) => {
              dispatch({
                type: ProductActions.UPDATE_PRODUCT,
                payload: {
                  id: product._id,
                  product: formData,
                  onSuccess: (data: any) => {
                    console.log('[EditProduct] Cập nhật thành công:', data);
                    resolve(data);
                  },
                  onError: (error: any) => {
                    console.error('[EditProduct] Lỗi:', error);
                    reject(error);
                  },
                  onFailed: (msg: string) => {
                    console.error('[EditProduct] Thất bại:', msg);
                    reject(new Error(msg));
                  }
                }
              });
            });
            
            // Nếu không có lỗi, đánh dấu thành công
            success = true;
            
            // Hiển thị thông báo thành công
            setLoading(false);
            setSuccessMessage('Sản phẩm đã được cập nhật thành công');
            setSuccessModalVisible(true);
            
            // Chuyển màn hình sau 2 giây
            setTimeout(() => {
              setSuccessModalVisible(false);
              dispatch({ type: ProductActions.FETCH_PRODUCTS });
              navigation.navigate(Routes.WareHouse, { refresh: true });
            }, 2000);
            
          } catch (error: any) {
            lastError = error;
            
            // Log chi tiết lỗi
            if (error.response) {
              console.error('[EditProduct] Lỗi server:', error.response.status, error.response.data);
            } else if (error.request) {
              console.error('[EditProduct] Không nhận được phản hồi:', error.request);
            } else {
              console.error('[EditProduct] Lỗi thiết lập request:', error.message);
            }
            
            // Nếu là lỗi mạng, thử lại sau 2 giây
            if (error.message?.includes('network') || 
                error.code === 'ECONNABORTED' || 
                !error.response) {
              
              console.log(`[EditProduct] Đợi 2 giây trước khi thử lại...`);
              await new Promise(resolve => setTimeout(resolve, 2000));
              continue;
            } else {
              // Nếu không phải lỗi mạng, không cần thử lại
              break;
            }
          }
        }
        
        // Xử lý kết quả cuối cùng
        if (!success) {
          setLoading(false);
          setErrorTitle('Cập Nhật Thất Bại');
          setErrorModalMessage(
            lastError?.response?.data?.msgNo || 
            lastError?.message || 
            'Không thể cập nhật sản phẩm sau nhiều lần thử'
          );
          setErrorModalVisible(true);
        }
        
      } catch (innerError: any) {
        console.error('[EditProduct] Lỗi trong quá trình cập nhật:', innerError);
        setLoading(false);
        setErrorTitle('Lỗi Cập Nhật');
        setErrorModalMessage(innerError?.message || 'Đã xảy ra lỗi trong quá trình cập nhật');
        setErrorModalVisible(true);
      }
    } catch (error: any) {
      console.error('[EditProduct] Lỗi không mong đợi:', error.message);
      setLoading(false);
      setErrorTitle('Lỗi');
      setErrorModalMessage(error?.message || 'Đã xảy ra lỗi không mong đợi');
      setErrorModalVisible(true);
    }
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
      
      {/* Modal chọn danh mục */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={categoryModalVisible}
        onRequestClose={() => {
          setCategoryModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.categoryModalContent}>
            <View style={styles.categoryModalHeader}>
              <Text style={styles.categoryModalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setCategoryModalVisible(false)}>
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            
            {categoriesLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text style={styles.loadingText}>Loading categories...</Text>
              </View>
            ) : categories && categories.length > 0 ? (
              <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={styles.categoryList}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No categories available</Text>
              </View>
            )}
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
            <Text style={styles.label}>Product Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter product name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity 
              style={styles.categorySelector}
              onPress={() => setCategoryModalVisible(true)}
            >
              <Text style={styles.categorySelectorText}>
                {categoryName}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>
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
  categorySelector: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categorySelectorText: {
    fontSize: 16,
    color: '#374151',
  },
  // Styles cho Category Selector Modal
  categoryModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    maxHeight: '70%',
    padding: 0,
    overflow: 'hidden',
  },
  categoryModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  categoryList: {
    padding: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryItemText: {
    fontSize: 16,
    color: '#374151',
  },
  selectedCategoryText: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
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
