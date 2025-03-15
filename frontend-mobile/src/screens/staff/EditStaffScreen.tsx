import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Platform, Modal } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { useNavigationRoot } from '@components/navigate/RootNavigation';
import staffActions from '../../redux/staff/actions';
import * as Routes from '@utils/Routes';
import { moderateScale, scale, verticalScale } from '@libs/reactResizeMatter/scalingUtils';
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

interface RouteParams {
  staff: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    status: string;
    image: string | null;
    _id: string;
    username?: string;
  };
}

const EditStaffScreen = ({ route }: { route: { params: RouteParams } }) => {
  const navigation = useNavigationRoot();
  const dispatch = useDispatch();
  const { staff } = route.params;
  const scrollViewRef = useRef<ScrollView>(null);

  const [firstName, setFirstName] = useState(staff.firstName);
  const [lastName, setLastName] = useState(staff.lastName);
  const [email, setEmail] = useState(staff.email);
  const [phone, setPhone] = useState(staff.phone);
  const [role, setRole] = useState(staff.role);
  const [status, setStatus] = useState(staff.status);
  const [imageUri, setImageUri] = useState<string | null>(staff.image);
  const [imageChanged, setImageChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log('🔍 EditStaffScreen - Initial image from staff:', staff.image);
  }, [staff.image]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Permission Denied');
      setErrorMessage('You need to grant permission to access the photo library');
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
      console.log('🔄 EditStaffScreen - Image changed to new image:', result.assets[0].uri.substring(0, 50) + '...');
      setImageUri(result.assets[0].uri);
      setImageChanged(true);
    }
  };

  const validateInputs = () => {
    if (!firstName.trim()) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorMessage('First name is required');
      setErrorModalVisible(true);
      return false;
    }

    if (!lastName.trim()) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorMessage('Last name is required');
      setErrorModalVisible(true);
      return false;
    }

    if (!email.trim()) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorMessage('Email is required');
      setErrorModalVisible(true);
      return false;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorMessage('Please enter a valid email address');
      setErrorModalVisible(true);
      return false;
    }

    if (!phone.trim()) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorMessage('Phone number is required');
      setErrorModalVisible(true);
      return false;
    }

    if (!role.trim()) {
      // Hiển thị Modal lỗi thay vì Toast
      setErrorTitle('Validation Error');
      setErrorMessage('Role is required');
      setErrorModalVisible(true);
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (!validateInputs()) return;

    setLoading(true);
    console.log('🔄 UPDATE STAFF - Starting submission with ID:', staff._id);
    console.log('🔄 UPDATE STAFF - Image changed?', imageChanged);
    console.log('🔄 UPDATE STAFF - Current imageUri:', imageUri ? imageUri.substring(0, 50) + '...' : 'null');

    const staffData: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      role: string;
      status: string;
      storeId: string;
      image?: string | null;
    } = {
      firstName,
      lastName,
      email,
      phone,
      role,
      status,
      storeId: '67b58b4cdf51987bf69c9914'
    };

    // Luôn gửi thông tin ảnh hiện tại, bất kể có thay đổi hay không
    staffData.image = imageUri;
    console.log('🔄 UPDATE STAFF - Including image in request:', imageUri ? 'Yes' : 'No');

    dispatch({
      type: staffActions.UPDATE_STAFF,
      payload: {
        id: staff._id,
        staff: staffData,
        onSuccess: () => {
          setLoading(false);
          
          // Hiển thị Modal thành công
          setSuccessMessage('Staff updated successfully');
          setSuccessModalVisible(true);
          
          // Tăng thời gian chờ để đảm bảo người dùng thấy thông báo
          setTimeout(() => {
            setSuccessModalVisible(false);
            dispatch({ type: staffActions.FETCH_STAFFS });
            navigation.navigate(Routes.StaffListScreen, { refresh: true });
          }, 2000);
        },
        onFailed: (error: string) => {
          setLoading(false);
          // Hiển thị Modal lỗi thay vì Toast
          setErrorTitle('Failed');
          setErrorMessage(error || 'Failed to update staff');
          setErrorModalVisible(true);
        },
        onError: (error: any) => {
          setLoading(false);
          // Hiển thị Modal lỗi thay vì Toast
          setErrorTitle('Error');
          setErrorMessage(error?.message || 'An error occurred');
          setErrorModalVisible(true);
        }
      }
    });
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
      
      <ScrollView 
        style={styles.container}
        ref={scrollViewRef}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Staff</Text>
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
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter first name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter last name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Role</Text>
            <TextInput
              style={styles.input}
              value={role}
              onChangeText={setRole}
              placeholder="Enter role (e.g. Manager, Staff)"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.statusContainer}>
              <TouchableOpacity
                style={[
                  styles.statusOption,
                  status === 'active' && styles.statusOptionActive
                ]}
                onPress={() => setStatus('active')}
              >
                <Text
                  style={[
                    styles.statusText,
                    status === 'active' && styles.statusTextActive
                  ]}
                >
                  Active
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.statusOption,
                  status === 'inactive' && styles.statusOptionActive
                ]}
                onPress={() => setStatus('inactive')}
              >
                <Text
                  style={[
                    styles.statusText,
                    status === 'inactive' && styles.statusTextActive
                  ]}
                >
                  Inactive
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Update Staff</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

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
    zIndex: 1, // Đảm bảo ảnh avatar có zIndex thấp hơn Toast
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
  statusContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  statusOption: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  statusOptionActive: {
    backgroundColor: '#3B82F6',
  },
  statusText: {
    fontSize: 16,
    color: '#374151',
  },
  statusTextActive: {
    color: 'white',
    fontWeight: 'bold',
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
  
  // Styles for success modal
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

// Cấu hình Toast cục bộ
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        backgroundColor: "white",
        marginTop: verticalScale(50),
        zIndex: 9999,
        elevation: 20, // Tăng elevation cho Android
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        shadowColor: "#000", // Thêm shadow cho iOS
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
        elevation: 20, // Tăng elevation cho Android
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        shadowColor: "#000", // Thêm shadow cho iOS
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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

export default EditStaffScreen;
