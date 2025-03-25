import React, { useCallback, useState } from 'react';
import * as Routes from '@utils/Routes';
import { useNavigationRoot } from '@components/navigate/RootNavigation';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductActions from '@redux/product/actions';
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { moderateScale, scale, verticalScale } from "@libs/reactResizeMatter/scalingUtils";
import { useDispatch } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
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
    quantity: number;
    image: string | null;
    description: string;
    _id: string;
    categoryId: string | Category;
  };
}

const ProductDetailScreen = ({ route }: { route: { params: RouteParams } }) => {
  const navigation = useNavigationRoot();
  const { product } = route.params;
  const dispatch = useDispatch();
  const Auth = useAppSelector((state: RootState) => state.User.Auth);
  
  // Thêm state cho Modal
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteProduct(id)
        }
      ]
    );
  };
  
  const deleteProduct = (id: string) => {
    dispatch({
      type: ProductActions.DELETE_PRODUCT, 
      payload: {
        id,
        onSuccess: (product: any) => {
          // Hiển thị Modal thành công thay vì Toast
          setSuccessMessage('Product deleted successfully');
          setSuccessModalVisible(true);
          
          // Tăng thời gian chờ để đảm bảo người dùng thấy thông báo
          setTimeout(() => {
            setSuccessModalVisible(false);
            dispatch({ type: ProductActions.FETCH_PRODUCTS });
            navigation.navigate(Routes.WareHouse, { refresh: true });
          }, 2000);
        },
        onError: (error: any) => {
          // Hiển thị Modal lỗi thay vì Toast
          setErrorTitle('Error');
          setErrorMessage(error?.message || 'An error occurred');
          setErrorModalVisible(true);
        },
        onFailed: (error: string) => {
          // Hiển thị Modal lỗi thay vì Toast
          setErrorTitle('Failed');
          setErrorMessage(error || 'Failed to delete product');
          setErrorModalVisible(true);
        }
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      dispatch({ 
        type: ProductActions.FETCH_PRODUCT_DETAIL, 
        payload: { 
          id: product._id,
          storeId: Auth?.storeId
        } 
      });
    }, [dispatch, product._id, Auth?.storeId])
  );

  return (
    <View style={styles.container}>
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
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity onPress={() => handleDelete(product._id)}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Product Image */}
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: product.image || "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg" }}
            style={styles.productImage} 
          />
          <Text style={styles.productName}>{product.name || 'N/A'}</Text>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>${product.price || '0.00'}</Text>
          </View>
        </View>

        {/* Product Information */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Product Information</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="pricetag-outline" size={20} color="#3B82F6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Category</Text>
              <Text style={styles.infoValue}>
                {product.categoryId && typeof product.categoryId === 'object' && product.categoryId.name 
                  ? product.categoryId.name 
                  : 'Không có danh mục'}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="resize-outline" size={20} color="#3B82F6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Size</Text>
              <Text style={styles.infoValue}>{product.size || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="color-palette-outline" size={20} color="#3B82F6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Color</Text>
              <Text style={styles.infoValue}>{product.color || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="business-outline" size={20} color="#3B82F6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Brand</Text>
              <Text style={styles.infoValue}>{product.brand || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="cube-outline" size={20} color="#3B82F6" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Quantity</Text>
              <Text style={styles.infoValue}>{product.quantity || '0'}</Text>
            </View>
          </View>

          {product.description && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Description</Text>
              <Text style={styles.descriptionText}>{product.description}</Text>
            </>
          )}
        </View>

        {/* Edit Button */}
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => {
            // Đảm bảo lấy categoryId chính xác từ product
            let categoryId;
            if (product.categoryId) {
              if (typeof product.categoryId === 'object' && product.categoryId._id) {
                categoryId = product.categoryId._id.toString();
              } else {
                categoryId = product.categoryId.toString();
              }
            } else {
              categoryId = '1'; // Default category ID nếu không có
            }
            
            navigation.navigate(Routes.EditProductScreen, { 
              product: {
                ...product,
                image: product.image || '',
                categoryId: categoryId,
                quantity: product.quantity?.toString() || '0'
              } 
            });
          }}
        >
          <Text style={styles.editButtonText}>Edit Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
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
  content: {
    flex: 1,
  },
  profileImageContainer: {
    alignItems: 'center',
    padding: 20,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#E5E7EB',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  priceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    marginBottom: 16,
    backgroundColor: '#EBF5FF',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#374151',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#111827',
  },
  descriptionText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  editButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  editButtonText: {
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

// Toast configuration
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

export default ProductDetailScreen;
