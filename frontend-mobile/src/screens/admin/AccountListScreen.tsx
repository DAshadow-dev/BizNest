import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigationRoot } from '@components/navigate/RootNavigation';
import * as Routes from '@utils/Routes';

const CustomerScreen = () => {
  const navigation= useNavigationRoot();

  return (
    <View style={styles.container}>
       
       <View style={styles.header}>
    <View style={styles.headerTop}>
      <TouchableOpacity>
        <Ionicons size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Account</Text>
      <TouchableOpacity>
        <Ionicons name="options-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>

    <View style={styles.searchContainer}>
      <TextInput style={styles.searchBar} placeholder="Search here..." />
      <TouchableOpacity style={styles.searchIcon}>
        <Ionicons name="search-outline" size={20} color="#333" />
      </TouchableOpacity>
    </View>
</View>

      
       
       
        <View style={{margin:16, position: 'relative'}}>
       
       
     
      <ScrollView>
        {['An san', 'Trường san', 'Cường san', 'Diễn Thiện', 'Nguyên san', 'Beo'].map((name, index) => (
          <TouchableOpacity key={index} style={styles.customerItem}
          onPress={()=> {navigation.navigate(Routes.AccountDetailScreen)}}>
            <Text style={styles.customerText}>{name}</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#555" />
          </TouchableOpacity>
        ))}
      </ScrollView>
     
      <TouchableOpacity style={styles.floatingButton}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.buttonText}>New</Text>
      </TouchableOpacity>
        </View>
        
     
        
        {/* <BottomBar/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    
  },
  header: {
    backgroundColor: "#4a90e2", // Màu xanh theo hình
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
  },
  headerTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20, // Tách phần search với header
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  searchContainer: {
    width: "70%",
    position: "relative",
  },
  searchBar: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 10,
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 40,
  },
  searchIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
//   title: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
  // searchBar: {
  //   backgroundColor: '#ffffff',
  //   borderRadius: 20,
  //   paddingVertical: 10,
  //   marginBottom: 16,
  //   fontSize: 16,
  //   paddingLeft: 20,
  // },
  customerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  customerText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0078d4',
    borderRadius: 8,
    padding: 12,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 4,
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: -60,
    backgroundColor: "#3478f6",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "500",
  },
});

export default CustomerScreen;
