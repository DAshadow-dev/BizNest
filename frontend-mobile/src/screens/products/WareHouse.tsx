import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, ActivityIndicator, FlatList, Image } from "react-native";
import { useDispatch } from "react-redux";
import ProductActions from "../../redux/product/actions";
import { useAppSelector } from "@redux/store";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import * as Routes from '@utils/Routes';
import { moderateScale, scale, verticalScale } from "@libs/reactResizeMatter/scalingUtils";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import { RootState } from "@redux/root-reducer";

const WareHouse = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useAppSelector((state) => state.Product);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const productsPerPage = 10;
  const Auth = useAppSelector((state: RootState) => state.User.Auth);
  console.log('Auth: ', Auth)
  
  const navigation = useNavigationRoot();
  const route = useRoute();

  // Thêm state để kiểm soát loading state tốt hơn
  const [initialLoad, setInitialLoad] = useState(true);
  
  useFocusEffect(
    useCallback(() => {
      const params = route.params as any;
      if (params?.refresh) {
        fetchProducts();
      }
    }, [route.params])
  );

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
      // Đặt timeout để đảm bảo không bị loading mãi
      const timer = setTimeout(() => {
        setInitialLoad(false);
      }, 5000);
      return () => clearTimeout(timer);
    }, [dispatch])
  );

  useEffect(() => {
    // Cập nhật initialLoad state khi products thay đổi
    if (products.length > 0 || error) {
      setInitialLoad(false);
    }
  }, [products, error]);

  useEffect(() => {
    if (products.length > 0) {
      applyFiltersAndPagination();
    }
  }, [products, searchQuery, page]);

  const fetchProducts = () => {
    console.log('Fetching products with storeId:', Auth?.storeId);
    // Kiểm tra storeId
    if (!Auth?.storeId) {
      console.warn('No storeId available in Auth:', Auth);
    }
    
    dispatch({ 
      type: ProductActions.FETCH_PRODUCTS, 
      payload: { storeId: Auth?.storeId } 
    });
    setRefreshing(false);
    setPage(1); // Reset to first page when fetching new data
  };

  const applyFiltersAndPagination = () => {
    const filtered = products.filter((product: any) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // If we're on page 1, replace the displayed products
    // Otherwise, append to the existing list
    if (page === 1) {
      setDisplayedProducts(filtered.slice(0, productsPerPage));
    } else {
      const endIndex = page * productsPerPage;
      const newItems = filtered.slice(0, endIndex);
      setDisplayedProducts(newItems);
    }
    
    setLoadingMore(false);
  };

  const handleSearch = () => {
    setIsSearching(true);
    setPage(1); // Reset to first page when searching
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setPage(1); // Reset to first page when clearing search
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const handleLoadMore = () => {
    const filteredProducts = products.filter((product: any) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Check if there are more products to load
    if (displayedProducts.length < filteredProducts.length) {
      setLoadingMore(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderProductItem = ({ item }: { item: any }) => {
    // Xử lý hiển thị category name
    const categoryName = item.categoryId && typeof item.categoryId === 'object' && item.categoryId.name 
      ? item.categoryId.name 
      : 'General Category';
    
    return (
      <TouchableOpacity
        style={styles.productItem}
        onPress={() => navigation.navigate(Routes.ProductDetailScreen, { product: item })}
      >
        <View style={styles.productInfo}>
          {item.image ? (
            <Image 
              source={{ uri: item.image }} 
              style={styles.productImage}
            />
          ) : (
            <View style={styles.productImagePlaceholder}>
              <Text style={styles.productImagePlaceholderText}>
                {item.name.charAt(0)}
              </Text>
            </View>
          )}
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productCategory}>{categoryName}</Text>
            <Text style={styles.productPrice}>${item.price.toLocaleString() || '0.00'}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward-outline" size={18} color="#3B82F6" />
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#3B82F6" />
        <Text style={styles.footerText}>Loading more products...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Toast config={toastConfig} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Product Management</Text>
        <Ionicons name="settings-outline" size={24} color="white" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {isSearching && (
            <ActivityIndicator size="small" color="#3B82F6" style={styles.searchLoader} />
          )}
          {searchQuery.length > 0 && !isSearching && (
            <TouchableOpacity 
              onPress={handleClearSearch}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={18} color="#B3B3B3" />
            </TouchableOpacity>
          )}
          {!isSearching && (
            <TouchableOpacity 
              onPress={handleSearch}
              style={styles.searchButton}
            >
              <Ionicons name="search" size={20} color="#3B82F6" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Product List */}
      {loading && initialLoad ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={50} color="#f87171" />
          <Text style={styles.errorText}>
            {typeof error === 'string' 
              ? error 
              : 'An error occurred while loading products. Please try again.'}
          </Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchProducts}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={displayedProducts}
          renderItem={renderProductItem}
          keyExtractor={(item, index) => item._id || index.toString()}
          contentContainerStyle={styles.productList}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchQuery.length > 0 
                  ? `No products found matching "${searchQuery}"`
                  : "No products found"}
              </Text>
            </View>
          }
        />
      )}

      {/* New Product Button */}
      <View style={styles.newButtonContainer}>
        <TouchableOpacity 
          style={styles.newButton} 
          onPress={() => navigation.navigate(Routes.ProductCreateScreen)}
        >
          <Ionicons name="add-outline" size={18} color="white" />
          <Text style={styles.newButtonText}>New Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    paddingTop: 35, // Adjust for status bar
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: '#3B82F6',
    padding: 16,
    paddingTop: 0,
  },
  searchBox: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  productList: {
    padding: 16,
  },
  productItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#E5E7EB',
  },
  productImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  productImagePlaceholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 14,
    color: '#6B7280',
  },
  newButtonContainer: {
    padding: 16,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  newButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  newButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#6B7280',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
  searchLoader: {
    marginLeft: 8,
  },
  clearButton: {
    padding: 4,
  },
  searchButton: {
    padding: 8,
    marginLeft: 4,
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  footerText: {
    marginLeft: 8,
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
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

export default WareHouse;
