import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useNavigationRoot } from '@components/navigate/RootNavigation';
import staffActions from '../../redux/staff/actions';
import * as Routes from '@utils/Routes';
import { moderateScale, scale, verticalScale } from '@libs/reactResizeMatter/scalingUtils';
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

interface Staff {
  _id: string;
  username: string; // Thay đổi từ firstName, lastName thành username
  email: string;
  phone: string;
  role: string;
  status: string;
  image: string | null;
}


const StaffListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigationRoot();
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // Lưu trữ từ khóa tìm kiếm thực tế
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = () => {
    setLoading(true);
    dispatch({
      type: staffActions.FETCH_STAFFS,
      payload: {
        onSuccess: (data: Staff[]) => {
          setStaffList(data);
          setLoading(false);
          setRefreshing(false);
        },
        onFailed: (error: string) => {
          setTimeout(() => {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: error || 'Failed to fetch staff list',
              position: 'top',
              visibilityTime: 2000
            });
          }, 500);
          setLoading(false);
          setRefreshing(false);
        },
        onError: (error: any) => {
          setTimeout(() => {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: error?.message || 'An error occurred',
              position: 'top',
              visibilityTime: 2000
              });
          }, 500);
          setLoading(false);
          setRefreshing(false);
        }
      }
    });
  };

  const handleSearch = () => {
    // Nếu ô tìm kiếm trống, hiển thị lại toàn bộ danh sách
    if (!search.trim()) {
      setSearchQuery('');
      fetchStaffList();
      return;
    }

    // Lưu từ khóa tìm kiếm hiện tại
    setSearchQuery(search);
    setSearchLoading(true);
    
    dispatch({
      type: staffActions.SEARCH_STAFFS,
      payload: {
        query: search,
        onSuccess: (data: Staff[]) => {
          setStaffList(data);
          setSearchLoading(false);
        },
        onFailed: (error: string) => {
          setTimeout(() => {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: error || 'Failed to search staff',
              position: 'top',
              visibilityTime: 2000
            });
          }, 500);
          setSearchLoading(false);
        },
        onError: (error: any) => {
          setTimeout(() => {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: error?.message || 'An error occurred',
              position: 'top',
              visibilityTime: 2000
            });
          }, 500);
          setSearchLoading(false);
        }
      }
    });
  };

  const handleClearSearch = () => {
    setSearch('');
    setSearchQuery('');
    fetchStaffList();
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setSearch('');
    setSearchQuery('');
    fetchStaffList();
  };

  const navigateToStaffDetail = (staff: Staff) => {
    navigation.navigate(Routes.StaffDetailScreen, { staff });
  };

  const navigateToCreateStaff = () => {
    navigation.navigate(Routes.CreateStaffScreen);
  };

  // Hàm lấy chữ cái đầu từ username
  const getNameInitials = (username: string) => {
    if (!username) return '';
    const nameParts = username.split(' ');
    if (nameParts.length >= 2) {
      return nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0);
    }
    return username.charAt(0);
  };

  const renderStaffItem = ({ item }: { item: Staff }) => (
    <TouchableOpacity 
      style={styles.staffItem} 
      onPress={() => navigateToStaffDetail(item)}
    >
      <View style={styles.staffInfo}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.staffImage} />
        ) : (
          <View style={styles.staffImagePlaceholder}>
            <Text style={styles.staffImagePlaceholderText}>
              {getNameInitials(item.username)}
            </Text>
          </View>
        )}
        <View style={styles.staffDetails}>
          <Text style={styles.staffName}>{item.username}</Text>
          <Text style={styles.staffRole}>{item.role || 'Staff'}</Text>
          <Text style={styles.staffEmail}>{item.email}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward-outline" size={18} color="#3B82F6" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Toast config={toastConfig} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Staff Management</Text>
        <Ionicons name="settings-outline" size={24} color="white" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          {/* <Ionicons name="search-outline" size={18} color="#B3B3B3" style={styles.searchIcon} /> */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search staff..."
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {searchLoading && (
            <ActivityIndicator size="small" color="#3B82F6" style={styles.searchLoader} />
          )}
          {search.length > 0 && !searchLoading && (
            <TouchableOpacity 
              onPress={handleClearSearch}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={18} color="#B3B3B3" />
            </TouchableOpacity>
          )}
          {!searchLoading && (
            <TouchableOpacity 
              onPress={handleSearch}
              style={styles.searchButton}
            >
              <Ionicons name="search" size={20} color="#3B82F6" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Staff List */}
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={staffList}
          renderItem={renderStaffItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.staffList}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {searchQuery.length > 0 
                  ? `No staff found matching "${searchQuery}"`
                  : "No staff found"}
              </Text>
            </View>
          }
        />
      )}

      {/* New Button */}
      <View style={styles.newButtonContainer}>
        <TouchableOpacity style={styles.newButton} onPress={navigateToCreateStaff}>
          <Ionicons name="add-outline" size={18} color="white" />
          <Text style={styles.newButtonText}>New Staff</Text>
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
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  staffList: {
    padding: 16,
  },
  staffItem: {
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
  staffInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  staffImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  staffImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  staffImagePlaceholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  staffDetails: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  staffRole: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  staffEmail: {
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
  loadingText: {
    marginTop: 8,
    color: '#6B7280',
    fontSize: 16,
  },
  searchButton: {
    padding: 8,
    marginLeft: 4,
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

export default StaffListScreen;