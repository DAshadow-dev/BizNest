import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const StaffScreen = () => {
  const [search, setSearch] = useState('');

  const staffList = [
    'An san', 'Trường san', 'Cường san', 'Diên Thiện', 'Nguyên san', 'Beo'
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Staff</Text>
        <Ionicons name="settings-outline" size={24} color="white" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#B3B3B3" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search here..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Staff List */}
      <ScrollView contentContainerStyle={styles.staffList}>
        {staffList.map((staff, index) => (
          <View key={index} style={styles.staffItem}>
            <Text>{staff}</Text>
            <Ionicons name="chevron-forward-outline" size={18} color="#3B82F6" />
          </View>
        ))}
      </ScrollView>

      {/* New Button */}
      <View style={styles.newButtonContainer}>
        <TouchableOpacity style={styles.newButton}>
          <Ionicons name="add-outline" size={18} color="white" />
          <Text style={styles.newButtonText}>New</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={18} color="#B3B3B3" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="trending-up-outline" size={18} color="#B3B3B3" />
          <Text style={styles.navText}>Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNav]}>
          <Ionicons name="people-outline" size={18} color="#3B82F6" />
          <Text style={[styles.navText, styles.activeNavText]}>Staff</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cube-outline" size={18} color="#B3B3B3" />
          <Text style={styles.navText}>Warehouse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={18} color="#B3B3B3" />
          <Text style={styles.navText}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="storefront-outline" size={18} color="#B3B3B3" />
          <Text style={styles.navText}>Store</Text>
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
    flex: 1,
    textAlign: 'center', // Đảm bảo chữ 'Staff' ở giữa
  },
  searchContainer: {
    backgroundColor: '#3B82F6',
    padding: 16,
  },
  searchBox: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    width: '100%',
    paddingLeft: 30,
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: 12,
    transform: [{ translateY: -10 }],
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  newButtonContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  newButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9999,
  },
  newButtonText: {
    color: 'white',
    marginLeft: 8,
  },
  bottomNav: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#B3B3B3',
  },
  activeNav: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  activeNavText: {
    color: '#3B82F6',
  },
});

export default StaffScreen;
