import IconBack from "@assets/svg/header/ic_back.svg";
import { moderateScale, scale, verticalScale } from "@libs/reactResizeMatter/scalingUtils";
import { CommonColors, Fonts } from "@utils/CommonStyles";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FormProvider, useForm } from 'react-hook-form';
import FormInput from "@components/input/FormInput";
import { required } from '@utils/Validator';
import { useNavigationRoot } from '@components/navigate/RootNavigation';
import * as Routes from '@utils/Routes';
import { Customer } from "@type/user.types";
import { useEffect, useState } from "react";
import { useAppSelector } from "@redux/store";
import { RootState } from "@redux/root-reducer";
import TransactionAction from "@redux/transaction/actions";
import { useDispatch } from "react-redux";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install this package

// Define Product type
interface Product {
  _id: string;
  name: string;
  price: number;
  quantity?: number;
}

// Define selected product type with quantity
interface SelectedProduct extends Product {
  quantity: number;
}

const CreateTransactionScreen = () => {
  const navigation = useNavigationRoot();
  const dispatch = useDispatch();
  
  // Get customers from Redux store
  const customers: Array<Customer> = useAppSelector((state: RootState) => state.Customer.ListCustomer);
  // Mock products data - replace with your actual products from Redux
  const products: Array<any> = useAppSelector((state: RootState) => state.Product.products);

  
  // States
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerSearch, setCustomerSearch] = useState("");
  const [showCustomerResults, setShowCustomerResults] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [showProductList, setShowProductList] = useState(false);
  
  // Form methods
  const methods = useForm({
    defaultValues: {
      customerId: "",
      customerName: "",
      customerPhone: "",
    },
  });
  
  // Calculate total
  const totalAmount = selectedProducts.reduce((sum, product) => {
    return sum + (product.price * product.quantity);
  }, 0);
  
  // Handle customer selection
  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    methods.setValue("customerId", customer._id || "");
    methods.setValue("customerName", customer.fullname || "");
    methods.setValue("customerPhone", customer.phone || "");
    setShowCustomerResults(false);
  };
  
  // Handle product selection
  const handleSelectProduct = (product: Product) => {
    // Check if product is already selected
    const existingIndex = selectedProducts.findIndex(p => p._id === product._id);
    
    if (existingIndex >= 0) {
      // If already selected, increment quantity
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingIndex].quantity += 1;
      setSelectedProducts(updatedProducts);
    } else {
      // Add new product with quantity 1
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
    
    setShowProductList(false);
  };
  
  // Update product quantity
  const updateProductQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      // Remove product if quantity is 0 or less
      setSelectedProducts(selectedProducts.filter(p => p._id !== productId));
    } else {
      // Update quantity
      setSelectedProducts(selectedProducts.map(p => 
        p._id === productId ? { ...p, quantity } : p
      ));
    }
  };
  
  // Handle transaction submission
  const handleSubmitTransaction = () => {
    if (!selectedCustomer) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Please select a customer",
        position: "top",
        visibilityTime: 2000
      });
      return;
    }
    
    if (selectedProducts.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Please add at least one product",
        position: "top",
        visibilityTime: 2000
      });
      return;
    }
    
    // Create transaction data
    const transactionData = {
      customerId: selectedCustomer._id,
      products: selectedProducts.map(p => ({
        productId: p._id,
        quantity: p.quantity,
      })),
      totalAmount: totalAmount
    };

    dispatch({type: TransactionAction.CREATE_TRANSACTION, payload: {
      data: transactionData, 
      onSuccess: () => {
        methods.reset();
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: "Transaction created successfully",
          position: "top",
          visibilityTime: 2000
        });
        setTimeout(() => {
          navigation.navigate(Routes.InvoiceListScreen);
        }, 2500)
      },
      onError: () => {
        Toast.show({
            type: "error",
            text1: "Error!",
            text2: "Required or invalid data",
            position: "top",
            visibilityTime: 2000
        });
      },
      onFailed: () => {
        Toast.show({
            type: "error",
            text1: "Fail!",
            text2: "Create customer unsuccessfully",
            position: "top",
            visibilityTime: 2000
        });    
      }
    }}
  )
    

    
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ height: verticalScale(60), width: scale(393), backgroundColor: '#4a90e2', flexDirection: 'row', alignItems: "flex-end" }}>
        <View style={{ width: scale(50), height: verticalScale(50), justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
        </View>
        <View style={{ width: scale(293), height: verticalScale(50), justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: moderateScale(22), color: CommonColors.white, ...Fonts.defaultRegular, fontWeight: "bold" }}>
            Create Transaction
          </Text>
        </View>
      </View>
      
      <FormProvider {...methods}>
        <View style={{ flex: 1, marginHorizontal: scale(20) }}>
          {/* Customer Selection */}
          <View style={styles.formInput}>
            <Text style={styles.textLabel}>Customer</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name or phone"
                value={customerSearch}
                onChangeText={(text) => {
                  setCustomerSearch(text);
                  setShowCustomerResults(text.length > 0);
                }}
              />
              {selectedCustomer && (
                <View style={styles.selectedCustomerContainer}>
                  <Text style={styles.selectedCustomerText}>
                    {selectedCustomer.fullname} - {selectedCustomer.phone}
                  </Text>
                </View>
              )}
            </View>
            
            {/* Customer search results */}
            {showCustomerResults && (
              <View style={styles.searchResults}>
                <FlatList
                  data={customers}
                  keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.searchResultItem}
                      onPress={() => handleSelectCustomer(item)}
                    >
                      <Text style={styles.searchResultText}>
                        {item.fullname} - {item.phone}
                      </Text>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={
                    <Text style={styles.emptyResultText}>No customers found</Text>
                  }
                  style={{ maxHeight: verticalScale(150) }}
                />
              </View>
            )}
          </View>
          
          {/* Product Selection */}
          <View style={styles.formInput}>
            <Text style={styles.textLabel}>Products</Text>
            <TouchableOpacity
              style={styles.addProductButton}
              onPress={() => setShowProductList(!showProductList)}
            >
              <Text style={styles.addProductButtonText}>
                {showProductList ? "Hide Products" : "Add Product"}
              </Text>
            </TouchableOpacity>
            
            {/* Product list */}
            {showProductList && (
              <View style={styles.productList}>
                <FlatList
                  data={products}
                  keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.productItem}
                      onPress={() => handleSelectProduct(item)}
                    >
                      <Text style={styles.productName}>{item.name}</Text>
                      <Text style={styles.productPrice}>${item.price}</Text>
                    </TouchableOpacity>
                  )}
                  style={{ maxHeight: verticalScale(150) }}
                />
              </View>
            )}
            
            {/* Selected products */}
            {selectedProducts.length > 0 && (
              <View style={styles.selectedProductsContainer}>
                <Text style={styles.selectedProductsTitle}>Selected Products:</Text>
                <FlatList
                  data={selectedProducts}
                  keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
                  renderItem={({ item }) => (
                    <View style={styles.selectedProductItem}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.selectedProductName}>{item.name}</Text>
                        <Text style={styles.selectedProductPrice}>${item.price}</Text>
                      </View>
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => updateProductQuantity(item._id, item.quantity - 1, )}
                        >
                          <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => updateProductQuantity(item._id, item.quantity + 1)}
                        >
                          <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  style={{ maxHeight: verticalScale(200) }}
                />
              </View>
            )}
          </View>
          
          {/* Total Amount */}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalAmount}>${totalAmount.toLocaleString()}</Text>
          </View>
          
          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleSubmitTransaction}
            >
              <Text style={styles.confirmButtonText}>Confirm Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </FormProvider>
      
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  formInput: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    marginTop: verticalScale(16),
    width: scale(353),
  },
  textLabel: {
    ...Fonts.defaultBold,
    color: '#5B5B5B',
    textAlign: 'left',
    fontSize: moderateScale(16),
    fontStyle: 'normal',
    lineHeight: verticalScale(24),
    marginBottom: verticalScale(8),
  },
  searchContainer: {
    marginBottom: verticalScale(10),
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: moderateScale(10),
    fontSize: moderateScale(14),
  },
  selectedCustomerContainer: {
    marginTop: verticalScale(8),
    padding: moderateScale(10),
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
  },
  selectedCustomerText: {
    fontSize: moderateScale(14),
    color: '#333',
  },
  searchResults: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: verticalScale(4),
  },
  searchResultItem: {
    padding: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchResultText: {
    fontSize: moderateScale(14),
  },
  emptyResultText: {
    padding: moderateScale(10),
    textAlign: 'center',
    color: '#999',
  },
  addProductButton: {
    backgroundColor: '#4a90e2',
    padding: moderateScale(10),
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  addProductButtonText: {
    color: 'white',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  productList: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: verticalScale(4),
  },
  productItem: {
    padding: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: moderateScale(14),
  },
  productPrice: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  selectedProductsContainer: {
    marginTop: verticalScale(16),
  },
  selectedProductsTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
  },
  selectedProductItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedProductName: {
    fontSize: moderateScale(14),
  },
  selectedProductPrice: {
    fontSize: moderateScale(14),
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: scale(30),
    height: verticalScale(30),
    backgroundColor: '#eee',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: scale(10),
    fontSize: moderateScale(16),
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(20),
    padding: moderateScale(15),
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  totalLabel: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },
  cancelButton: {
    width: scale(162.5),
    height: verticalScale(44),
    backgroundColor: "white",
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: moderateScale(16),
    color: CommonColors.redColor,
    ...Fonts.defaultMedium,
  },
  confirmButton: {
    width: scale(162.5),
    height: verticalScale(44),
    backgroundColor: "#3478f6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: moderateScale(16),
    color: CommonColors.white,
    ...Fonts.defaultMedium,
  },
});

// Toast configuration
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green", backgroundColor: "white", marginTop: scale(15) }}
      contentContainerStyle={{ paddingHorizontal: verticalScale(15) }}
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
      style={{ borderLeftColor: "red", backgroundColor: "white", marginTop: scale(15) }}
      contentContainerStyle={{ paddingHorizontal: verticalScale(15) }}
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

export default CreateTransactionScreen;