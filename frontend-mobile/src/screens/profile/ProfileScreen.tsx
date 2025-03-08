// ProfileScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import * as Routes from "@utils/Routes";
import IconBack from "@assets/svg/header/ic_back.svg";
import { moderateScale, scale, verticalScale } from "@libs/reactResizeMatter/scalingUtils";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@components/input/FormInput";
import { required } from "@utils/Validator";
import { CommonColors, Fonts } from "@utils/CommonStyles";
import UserActions from "@redux/user/actions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/store";
import { RootState } from "@redux/root-reducer";
import * as ImagePicker from "expo-image-picker";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const ProfileScreen: React.FC = () => {
  const navigation = useNavigationRoot();
  const dispatch = useDispatch();
  const Auth = useAppSelector((state: RootState) => state.User.Auth);
  const [image, setImage] = useState<string>(
    !Auth.image 
      ? 'https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg' 
      : Auth.image
    );

  const methods = useForm({
      defaultValues: {
        username: Auth.username,
        email: Auth.email,
        phone: Auth.phone,
      },
  });

  const onSubmit = (data: any) => {
    data= {...data, image: image}
    dispatch({type: UserActions.UPDATE_INFORMATION, payload: {
      data, 
      onSuccess: (data: any) => {
        Toast.show({
            type: "success",
            text1: "Success!",
            text2: "Update information successfully",
            position: "top",
            visibilityTime: 2000
        });
      },
      onError: (error: any) => {
        Toast.show({
            type: "error",
            text1: "Error!",
            text2: error,
            position: "top",
            visibilityTime: 2000
        });
      },
      onFailed: (MsgNo: string) => {
        Toast.show({
            type: "error",
            text1: "Fail!",
            text2: "Update information unsuccessfully",
            position: "top",
            visibilityTime: 2000
        });    
      }
    }})
  };


  const pickImage = async () => {
    // Yêu cầu quyền truy cập thư viện
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Bạn cần cấp quyền để chọn ảnh!");
      return;
    }

    // Mở thư viện ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1], 
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleButtonCancel= () => {
    methods.reset({
      username: Auth.username,
      email: Auth.email,
      phone: Auth.phone,
    });
    setImage(Auth.image)
  }
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
            onPress={()=>{
                navigation.navigate(Routes.HomeScreen)
            }}
          style={{position: 'absolute', left: scale(25), top: verticalScale(25)}}
        >
            <IconBack/>
        </TouchableOpacity>        
          <Image          
            source={{ uri: (image !== '' ? image : "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg") }}
            style={styles.avatar} />
          <View style={{
            position: 'absolute', 
            top: verticalScale(120), 
            left: scale(230), 
            width: scale(30), 
            height: scale(30), 
            backgroundColor: 'grey', 
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center"
          }}>
            <TouchableOpacity
               onPress={pickImage}
            >
            <FontAwesome name="camera" size={20} color='white'  />
            </TouchableOpacity>
          </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={16} color="white" />
          <TouchableOpacity
            onPress={pickImage}
          >
            <Text style={styles.editButtonText}>Edit profile</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      {/* Information Section */}
      <FormProvider {...methods}>
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>View information</Text>
          
          <Text style={{...styles.label, marginBottom: verticalScale(10)}}>Email</Text>
          <FormInput
              fieldName="email"
              placeHolder={"Enter your email"}
              validate={[required]}
              inputStyle={{
                  minHeight: verticalScale(44),
              }}
              defaultValue={Auth.email}
              edittable={false}
          />

          <Text style={{...styles.label, marginBottom: verticalScale(10)}}>UserName</Text>         
          <FormInput
              fieldName="username"
              placeHolder={"Enter your username"}
              validate={[required]}
              inputStyle={{
                  minHeight: verticalScale(44),
              }}
              defaultValue={Auth.username}
          />

          <Text style={{...styles.label, marginBottom: verticalScale(10)}}>Phone Number</Text>
          <FormInput
              fieldName="phone"
              placeHolder={"Enter your phone"}
              validate={[required]}
              inputStyle={{
                  minHeight: verticalScale(44),
              }}
              defaultValue={Auth.phone}
          />
        </View>
        <View style={{width: scale(353), height: verticalScale(50),margin: scale(20), flexDirection: 'row', justifyContent: "space-between", marginTop: verticalScale(20)}}>
          <TouchableOpacity
              onPress={handleButtonCancel}
          >
              <View style={{width: scale(162.5), height: verticalScale(44), backgroundColor: "white", borderColor: 'red', borderWidth: 1, borderRadius: 8, justifyContent: "center", alignItems: "center"}}>
                  <Text style={{fontSize: moderateScale(16), color: CommonColors.redColor, ...Fonts.defaultMedium}}>Cancel</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={methods.handleSubmit(onSubmit)}
          >
              <View style={{width: scale(162.5), height: verticalScale(44), backgroundColor: "#1e88e5", borderRadius: 8, justifyContent: "center", alignItems: "center"}}>
                  <Text style={{fontSize: moderateScale(16), color: CommonColors.white, ...Fonts.defaultMedium}}>Save</Text>
              </View>
          </TouchableOpacity>
      </View>
      </FormProvider>
      <Toast config={toastConfig}/>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f1f6",
  },
  header: {
    backgroundColor: "#1e88e5",
    alignItems: "center",
    paddingVertical: 40,
    position: "relative",
  },
  backIcon: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: "#42a5f5",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginTop: 12,
  },
  input: {
    fontSize: 16,
    color: "#555",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: "#1e88e5",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  saveButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});


// 🎨 Tuỳ chỉnh giao diện Toast
const toastConfig = {
  success: (props: any) => (
      <BaseToast
          {...props}
          style={{ borderLeftColor: "green", backgroundColor: "white", marginTop: scale(15)}}
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
          style={{ borderLeftColor: "red", backgroundColor: "white", marginTop: scale(15)}}
          contentContainerStyle={{ paddingHorizontal: verticalScale(15)}}
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
export default ProfileScreen;