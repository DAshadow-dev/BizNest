import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { navigate, useNavigationRoot } from "@components/navigate/RootNavigation";
import * as Routes from "@utils/Routes";
import { Picker } from "@react-native-picker/picker";
const BusinessCategoryScreen = () => {
    const navigation = useNavigationRoot();
  const [businessCategory, setBusinessCategory] = useState("");
  const [storeName, setStoreName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleNext = () => {
    if (!businessCategory || !storeName || !password || !confirmPassword) {
      alert("Please fill in all fields!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Show success modal
    setIsSuccessModalVisible(true);
  };

  const handleGoToLogin = () => {
    setIsSuccessModalVisible(false);
    navigation.navigate(Routes.LOGIN_SCREEN);  // Navigate to login screen
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

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Create Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal
        transparent={true}
        visible={isSuccessModalVisible}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle-outline" size={60} color="green" />
            <Text style={styles.modalTitle}>Registration Successful!</Text>
            <Text style={styles.modalText}>Your account has been created successfully.</Text>

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
