import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import * as Routes from "@utils/Routes";
import { useDispatch } from "react-redux";
import UserActions from "@redux/user/actions";

const BusinessCategoryScreen = (props: {
  route: { params: { email: string; fullName: string; mobile: string, password: string } };
}) => {
  const { email, fullName, mobile, password } = props.route.params;
  const navigation = useNavigationRoot();
  const dispatch = useDispatch();
  const [businessCategory, setBusinessCategory] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storePhone, setStorePhone] = useState(mobile);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    if (!businessCategory || !storeName) {
      alert("Please fill in all fields!");
      return;
    }

    setIsLoading(true); // Bắt đầu hiển thị loading spinner

    dispatch({
      type: UserActions.REGISTER,
      payload: {
        data: {
          email,
          username: fullName,
          phone: mobile,
          password: password,
          businessCategory,
          storeName,
          storeAddress,
          storePhone,
        },
        onSuccess: (user: any) => {
          setIsLoading(false); // Dừng hiển thị loading spinner
          setIsSuccessModalVisible(true);
        },
        onFailed: (message: string) => {
          setIsLoading(false); // Dừng hiển thị loading spinner
          Alert.alert("Register failed", message);
        },
        onError: (error: any) => {
          setIsLoading(false); // Dừng hiển thị loading spinner
          console.log(error);
          Alert.alert("Error", "There are any errors happening during the registration process");
        },
      },
    });
  };

  const handleGoToLogin = () => {
    setIsSuccessModalVisible(false);
    navigation.navigate(Routes.LOGIN_SCREEN); // Chuyển hướng đến màn hình đăng nhập
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Up Your Store</Text>

      {/* Business Category Selection */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="business" size={20} color="gray" style={styles.icon} />
        <Picker
          selectedValue={businessCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setBusinessCategory(itemValue)}
        >
          <Picker.Item label="Select Business Category" value="" />
          <Picker.Item label="Fashion" value="fashion" />
          <Picker.Item label="Cosmetics" value="cosmetics" />
          <Picker.Item label="Household Items" value="household" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      {/* Store Name Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="storefront-outline" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Store Name"
          placeholderTextColor="gray"
          value={storeName}
          onChangeText={setStoreName}
        />
      </View>

      {/* Store Address Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="map-outline" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Store Address"
          placeholderTextColor="gray"
          value={storeAddress}
          onChangeText={setStoreAddress}
        />
      </View>

      {/* Store Phone Input */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="phone" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Store Phone Number"
          placeholderTextColor="gray"
          keyboardType="phone-pad"
          value={storePhone}
          onChangeText={setStorePhone}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Loading Spinner */}
      {isLoading && (
        <Modal transparent={true} visible={isLoading} animationType="fade">
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Registering, please wait...</Text>
          </View>
        </Modal>
      )}

      {/* Success Modal */}
      <Modal transparent={true} visible={isSuccessModalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle-outline" size={60} color="green" />
            <Text style={styles.modalTitle}>Registration Successful!</Text>
            <Text style={styles.modalText}>
              Your account has been created successfully. Please verify to activate your account.
            </Text>

            {/* Go to Login Button */}
            <TouchableOpacity style={styles.button} onPress={handleGoToLogin}>
              <Text style={styles.buttonText}>Continue to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BusinessCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  loadingText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
});
