import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Routes from '@utils/Routes';
import { useNavigationRoot } from '@components/navigate/RootNavigation';

const StaffDetailScreen = ({ route }) => {
  const navigation = useNavigationRoot();
  const { staff } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={20} color="black" />
      </TouchableOpacity>
      
      <Image source={staff.image} style={styles.staffImage} />
      <Text style={styles.name}>{staff.fullname}</Text>
      <Text>Email: {staff.email}</Text>
      <Text>Phone: {staff.phone}</Text>
      <Text>Role: {staff.role}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate(Routes.EditStaffScreen, { staff })}
      >
        <Text style={styles.editButtonText}>Chỉnh Sửa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  staffImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center', // Để ảnh nằm ở trung tâm
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StaffDetailScreen;
