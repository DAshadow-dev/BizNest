import React, { useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '@screens/HomeScreen';
import InvoiceListScreen from '@screens/invoices/InvoiceListScreen';  
import InvoiceScreen from '@screens/invoices/InvoiceScreen';  
import PaymentScreen from '@screens/invoices/PaymentScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Routes from '@utils/Routes';
import { RootParamList } from '@utils/RootParamList';
import { createStackNavigator } from '@react-navigation/stack';
//product
import ProductListScreen from '@screens/products/ProductListScreen';
import CreateProductScreen from '@screens/products/CreateProductScreen';
import ProductDetailScreen from '@screens/products/productDetailScreen';
import EditProductScreen from '@screens/products/EditProductScreen';
//staff
import CreateStaffScreen from '@screens/staff/CreateStaffScreen';
import EditStaffScreen from '@screens/staff/EditStaffScreen';
import StaffListScreen from '@screens/staff/StaffListScreen';
import StaffDetailScreen from '@screens/staff/StaffDetailScreen';
import AdminDashboardScreen from '@screens/admin/AdminDashboardScreen';
import AccountListScreen from '@screens/admin/AccountListScreen';
import PendingAccountScreen from '@screens/admin/PendingAccountScreen';
import AccountDetailScreen from '@screens/admin/AccountDetailScreen';
import CreateInvoiceScreen from '@screens/invoices/CreateInvoiceScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PasswordScreen from '@screens/profile/PasswordScreen';
import { FontAwesome } from "@expo/vector-icons";
import CustomerListScreen from '@screens/customer/CustomerListScreen';
import CreateCustomerScreen from '@screens/customer/CreateCustomerScreen';
import CustomerDetailScreen from '@screens/customer/CustomerDetailScreen';
import BusinessDashBoardScreen from '@screens/dashboard/BusinessDashBoardScreen';
import OnboardingScreen from '@screens/guest/OnboardingScreen';
import LoginScreen from '@screens/guest/LoginScreen';
import RegisterScreen from '@screens/guest/RegisterScreen';
import BusinessCategoryScreen from '@screens/guest/BusinessCategoryScreen';
// import HomeScreen from '@screens/guest/HomeScreen';
import Chatscreen from '@screens/guest/Chatscreen';
import {Provider} from 'react-redux';
import { store } from '@redux/store';


const Stack = createStackNavigator<RootParamList>();
const Tab = createBottomTabNavigator();


function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Routes.PROFILE}>
        <Stack.Screen name={Routes.ONBOARDING_SCREEN} component={OnboardingScreen} />
        <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={Routes.REGISTER_SCREEN} component={RegisterScreen} />
        <Stack.Screen name={Routes.BUSINESSCATEGORY_SCREEN} component={BusinessCategoryScreen} />
        <Stack.Screen name={Routes.HomeScreen} component={HomeScreen} />
        {/* <Stack.Screen name={Routes.HOME_SCREEN} component={HomeScreen} /> */}
        <Stack.Screen name={Routes.CHAT_SCREEN} component={Chatscreen} />
        <Stack.Screen name={Routes.AdminDashboardScreen} component={AdminDashboardScreen} />
        <Stack.Screen name={Routes.AccountListScreen} component={AccountListScreen}/>
        <Stack.Screen name={Routes.AccountDetailScreen} component={AccountDetailScreen}/>
        <Stack.Screen name={Routes.PendingAccountsScreen} component={PendingAccountScreen} />
        <Stack.Screen name={Routes.InvoiceListScreen} component={InvoiceListScreen} />
        <Stack.Screen name={Routes.InvoiceScreen} component={InvoiceScreen} />
        <Stack.Screen name={Routes.CreateInvoiceScreen} component={CreateInvoiceScreen} />
        <Stack.Screen name={Routes.PaymentScreen} component={PaymentScreen} />
        <Stack.Screen name={Routes.ProductListScreen} component={ProductListScreen} />
        <Stack.Screen name={Routes.CreateProductScreen} component={CreateProductScreen} />
        <Stack.Screen name={Routes.ProductDetailScreen} component={ProductDetailScreen} />
        <Stack.Screen name={Routes.EditProductScreen} component={EditProductScreen} />
        {/* staff */}
        <Stack.Screen name={Routes.PROFILE_SCREEN} component={ProfileScreen} />
        <Stack.Screen name={Routes.CreateStaffScreen} component={CreateStaffScreen} />
        <Stack.Screen name={Routes.EditStaffScreen} component={EditStaffScreen} />
        <Stack.Screen name={Routes.StaffDetailScreen} component={StaffDetailScreen} />
        <Stack.Screen name={Routes.StaffListScreen} component={StaffListScreen} />

        <Stack.Screen name={Routes.PROFILE} component={MyProfile} />
        <Stack.Screen name={Routes.CUSTOMER_LIST} component={CustomerListScreen} />
        <Stack.Screen name={Routes.CREATE_CUSTOMER} component={CreateCustomerScreen} />
        <Stack.Screen name={Routes.CUSTOMER_DETAIL} component={CustomerDetailScreen} />
        <Stack.Screen name={Routes.BUSINESS_DASHBOARD} component={BusinessDashBoardScreen} />
    </Stack.Navigator>
  );
}

function MyProfile() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff", // Màu nền của tab bar
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          height: 60,
          paddingBottom: 10,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === Routes.PROFILE_SCREEN) {
            return <FontAwesome name="user" size={size} color={color} />;          
          } else if (route.name === Routes.PASSWORD_SCREEN) {
            return <FontAwesome name="lock" size={size} color={color} />;          
          }        },
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color, fontSize: 14, fontWeight: focused ? "bold" : "normal" }}>
            {route.name === Routes.PROFILE_SCREEN ? "Profile" : "Password"}
          </Text>
        ),
        tabBarActiveTintColor: "#000000", // Màu khi active
        tabBarInactiveTintColor: "#888", // Màu khi không active
      })}
      
      initialRouteName={Routes.PROFILE_SCREEN}>
      <Tab.Screen name={Routes.PROFILE_SCREEN} component={ProfileScreen} />
      <Tab.Screen name={Routes.PASSWORD_SCREEN} component={PasswordScreen} />
    </Tab.Navigator>
  );
}
export default function App() {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('@assets/fonts/Roboto-Black.ttf'),
    'Poppins-Bold': require('@assets/fonts/Roboto-BlackItalic.ttf'),
    'Roboto-Bold': require('@assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Italic': require('@assets/fonts/Roboto-Italic.ttf'),
    'Roboto-Light': require('@assets/fonts/Roboto-Light.ttf'),
    'Roboto-LightItalic': require('@assets/fonts/Roboto-LightItalic.ttf'),
    'Roboto-Medium': require('@assets/fonts/Roboto-Medium.ttf'),
    'Roboto-MediumItalic': require('@assets/fonts/Roboto-MediumItalic.ttf'),
    'Roboto-Regular': require('@assets/fonts/Roboto-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  SplashScreen.hideAsync();
  
  
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" />
          <NavigationContainer>
            <MyStack/>
          </NavigationContainer>
        </SafeAreaProvider>
      </View>
    </Provider>
  );
}