import React, { useState, useRef } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigationRoot } from '@components/navigate/RootNavigation';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import * as Routes from '@utils/Routes';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width * 0.2;
const PADDING = width * 0.05;

const ProductListScreen = () => {
  const navigation = useNavigationRoot();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(-240)).current; // Dùng useRef để giữ giá trị đúng

  // Mở menu
  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Đóng menu
  const closeMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: -240,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuVisible(false));
  };

  const sampleProducts = [
    { name: 'Áo thun nam cổ tròn', price: 150, image: require('../../../assets/image/Áo thun nam cổ tròn_enhanced.png'), category: 'Áo thun', size: 'M', color: 'Đen', brand: 'Nike' },
    { name: 'Quần jean nữ', price: 350, image: require('../../../assets/image/Quần jean nữ_enhanced.png'), category: 'Quần', size: 'L', color: 'Xanh đen', brand: 'Adidas' },
    { name: 'Áo sơ mi nam dài tay', price: 450, image: require('../../../assets/image/Áo sơ mi nam dài tay_enhanced.png'), category: 'Áo sơ mi', size: 'XL', color: 'Trắng', brand: 'Uniqlo' },
    { name: 'Chân váy nữ', price: 200, image: require('../../../assets/image/Chân váy nữ_enhanced.png'), category: 'Váy', size: 'S', color: 'Đỏ', brand: 'Zara' },
  ];

  const filteredProducts = selectedCategory
    ? sampleProducts.filter(item => item.category === selectedCategory)
    : sampleProducts;

  return (
    <View style={styles.container}>
      {/* Thanh điều hướng với menu, dropdown */}
      <View style={styles.topBar}>
        {/* Nút mở menu sidebar */}
        <TouchableOpacity style={styles.menuButton} onPress={openMenu} >
          <Feather name="menu" size={24} color="black" />
        </TouchableOpacity>

        {/* Dropdown chọn danh mục */}
        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={open}
            value={selectedCategory}
            items={[
              { label: 'Tất cả', value: ''},
              { label: 'Áo thun', value: 'Áo thun' },
              { label: 'Quần', value: 'Quần' },
              { label: 'Áo khoác', value: 'Áo khoác' },
              { label: 'Áo sơ mi', value: 'Áo sơ mi' },
              { label: 'Váy', value: 'Váy' },
            ]}
            setOpen={setOpen}
            setValue={setSelectedCategory}
            placeholder="Tất cả"
            style={styles.pickerInput}
            containerStyle={styles.dropdownContainer}
          />
        </View>
        
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate(Routes.ProductDetailScreen, { product: item })}  style={styles.productContainer}>
            <Image source={item.image} style={styles.productImage} resizeMode="contain" />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>Price: ${item.price}</Text>
              <Text>Category: {item.category}</Text>
              <Text>Size: {item.size}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate(Routes.CreateProductScreen)}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>

      {/* Menu sidebar */}
      {menuVisible && (
        <TouchableOpacity style={styles.overlay} onPress={closeMenu} activeOpacity={1}>
          <Animated.View style={[styles.menuContainer, { left: menuAnimation }]}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(Routes.HomeScreen)}>
              <Ionicons name="home-outline" size={24} color="black" />
              <Text style={styles.menuText}>Trang chủ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
              <Feather name="settings" size={24} color="black" />
              <Text style={styles.menuText}>Cài đặt</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

/** 📌 Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
    height: 50
  },
  menuButton: {
    padding: 10,
  },
  dropdownWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    zIndex: 100, // Đảm bảo dropdown hiển thị trên cùng
  },
  pickerInput: {
    
  },
  dropdownContainer: {
    width: '35%',
  },
  productContainer: {
    flexDirection: 'row',
    padding: PADDING,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  productImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
  },
  productDetails: {
    marginLeft: PADDING,
    justifyContent: 'center',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 240,
    backgroundColor: 'white',
    paddingVertical: 50,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 5, height: 0 },
    elevation: 5,
    zIndex: 2, // Đảm bảo menu hiện lên trên cùng
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  // Floating Action Button (FAB)
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
});

export default ProductListScreen;
