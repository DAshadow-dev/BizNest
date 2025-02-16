import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Animated, Image, TextInput } from 'react-native';
import * as Routes from '@utils/Routes';
import { useNavigationRoot } from '@components/navigate/RootNavigation';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

const StaffListScreen = () => {
  const navigation = useNavigationRoot();

  const [open, setOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(-240)).current;
  const [searchQuery, setSearchQuery] = useState('');

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: -240,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuVisible(false));
  };

  const sampleStaff = [
    { fullname: 'Nguyễn Văn A', email: 'a@domain.com', phone: '123456789', role: 'Staff', image: require('@assets/image/avatar-mac-dinh-30xJKPDu_enhanced.png') },
    { fullname: 'Trần Thị B', email: 'b@domain.com', phone: '987654321', role: 'Staff', image: require('@assets/image/avatar-mac-dinh-30xJKPDu_enhanced.png') },
    { fullname: 'Lê Minh C', email: 'c@domain.com', phone: '555123456', role: 'Staff', image: require('@assets/image/avatar-mac-dinh-30xJKPDu_enhanced.png') },
  ];

  // Lọc nhân viên theo tên
  const filteredStaff = sampleStaff.filter((item) =>
    item.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.staffItem}
      onPress={() => navigation.navigate(Routes.StaffDetailScreen, { staff: item })}
    >
      <Image source={item.image} style={styles.staffImage} />
      <View style={styles.staffInfo}>
        <Text style={styles.staffName}>{item.fullname}</Text>
        <Text>{item.role}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
            <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
                <Feather name="menu" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                style={styles.searchInput}
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChangeText={setSearchQuery}
                />
            </View>
      </View>
      <FlatList
        data={filteredStaff} // Hiển thị nhân viên đã lọc
        keyExtractor={(item) => item.email}
        renderItem={renderItem}
      />
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate(Routes.CreateStaffScreen)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
    height: 40,
  },
  menuButton: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    marginLeft: 10,
    
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1, 
    height: 40, 
    fontSize: 16, 
    color: '#000', 
  },
  staffItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  staffImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  staffInfo: {
    justifyContent: 'center',
  },
  staffName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
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
    zIndex: 2,
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
});

export default StaffListScreen;
