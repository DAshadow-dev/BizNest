import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Routes from "@utils/Routes";

import {
  navigate,
  useNavigationRoot,
} from "@components/navigate/RootNavigation";


const LoginScreen = () => {
    const navigation = useNavigationRoot();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = () => {
    console.log("Đăng nhập thành công!");
    navigation.navigate(Routes.HomeScreen); // Điều hướng đúng cách
  };

  return (
    <View style={styles.container}>
      <Image source={require("@assets/image/Login.png")} style={styles.image} />
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="email-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email ID"
          placeholderTextColor={"gray"}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="lock-outline"
          size={20}
          color="#888"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"gray"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      {/* <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity> */}
      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* OR Section */}
      <Text style={styles.orText}>OR</Text>

      {/* Google Login Button */}
      <TouchableOpacity style={styles.googleButton}>
        <Ionicons name="logo-google" size={20} color="#000" />
        <Text style={styles.googleText}>Login with Google</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <Text style={styles.registerText}>
        New to Logistics?{" "}
        <Text
          style={{ color: "#0164FF" }}
          onPress={() => navigation.navigate("REGISTER_SCREEN")}
        >
          Register
        </Text>
      </Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  forgotPassword: {
    textAlign: "right", // Đẩy về bên phải
    color: "#007bff",
    marginBottom: 15,
    width: "100%", // Đảm bảo nó căn sát bên phải
  },

  loginButton: {
    backgroundColor: "#007bff",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 10,
    fontSize: 16,
    color: "gray",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
  },
  googleText: {
    fontSize: 16,
    marginLeft: 10,
  },
  registerText: {
    marginTop: 20,
    fontSize: 14,
    color: "gray",
  },
};

export default LoginScreen;
