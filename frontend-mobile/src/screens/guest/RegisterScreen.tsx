import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icon từ Expo
import * as Routes from "@utils/Routes";
import { useDispatch } from "react-redux";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import AuthActions from "@redux/auth/actions";


const RegisterScreen: React.FC = () => {
  const navigation = useNavigationRoot();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleRegister = () => {
    if (!email || !fullName || !mobile) {
      Alert.alert("Enter all fields to register");
      return;
    }

    dispatch({
      type: AuthActions.REGISTER,
      payload: {
        data: { email, fullName, mobile }, 
        onSuccess: (user: any) => {
          navigation.navigate(Routes.BUSINESSCATEGORY_SCREEN);
        },
        onFailed: (message: string) => {
          Alert.alert("Register failed", message);
        },
        onError: (error: any) => {
          Alert.alert("Error", "There are any errors happening during the registration process");
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Hình ảnh minh họa */}
      <Image source={require("@assets/image/Register.png")} style={styles.image} />

      <Text style={styles.title}>Sign up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        placeholderTextColor="gray"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Mobile"
        placeholderTextColor="gray"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
      />

      <Text style={styles.policyText}>
        By signing up, you agree to our{" "}
        <Text style={styles.link}>Terms & Conditions</Text> and{" "}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Joined us before?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("LOGIN_SCREEN")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  policyText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  link: {
    color: "#007bff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 15,
    fontSize: 14,
    color: "#666",
  },
});
