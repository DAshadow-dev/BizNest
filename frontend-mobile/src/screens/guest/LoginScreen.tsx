import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as Routes from "@utils/Routes";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import { RootState } from "@redux/root-reducer";
import UserActions from "@redux/user/actions";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import {
  moderateScale,
  scale,
  verticalScale,
} from "@libs/reactResizeMatter/scalingUtils";

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigationRoot();
  const [email, setEmail] = useState("b1@email.com");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    let valid = true;

    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter a password.");
      valid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    dispatch({
      type: UserActions.LOGIN,
      payload: {
        data: { email, password },
        onSuccess: (user: any) => {
          console.log(user);
          if (user.role == "admin") {
            console.log('1');
            navigation.navigate(Routes.HOME_ADMIN);
          } else if(user.role == "staff"){
            navigation.navigate(Routes.StaffHomeScreen)
          } else {
            console.log('2')
            if (user.status == "inactive" || user.status == "pending") {
              navigation.navigate(Routes.STATUS_SCREEN, {
                status: user.status,
              });
            } else {
              navigation.navigate(Routes.HomeScreen);
            }
          }
        },
        onFailed: (message: string) => {
          Toast.show({
            type: "error",
            text1: "Error!",
            text2: "Username or password are incorrect",
            position: "top",
            visibilityTime: 2000,
          });
        },
        onError: (error: any) => {
          Toast.show({
            type: "error",
            text1: "Error!",
            text2: "Username or password are incorrect",
            position: "top",
            visibilityTime: 2000,
          });
        },
      },
    });
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!validateEmail(text)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
    }
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
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

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
          onChangeText={handlePasswordChange}
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
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

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
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 5,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  forgotPassword: {
    textAlign: "right", // Aligns to the right
    color: "#007bff",
    marginBottom: 15,
    width: "100%", // Ensures it aligns to the right
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
});

// 🎨 Tuỳ chỉnh giao diện Toast
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        backgroundColor: "white",
        marginTop: scale(0),
      }}
      contentContainerStyle={{ paddingHorizontal: verticalScale(15) }}
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
        marginTop: scale(0),
      }}
      contentContainerStyle={{ paddingHorizontal: verticalScale(15) }}
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
export default LoginScreen;
