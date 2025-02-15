import { Fonts } from '@utils/CommonStyles';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '@screens/HomeScreen';
import DetailsScreen from '@screens/DetailsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Routes from '@utils/Routes';
import { RootParamList } from '@utils/RootParamList';
import { createStackNavigator } from '@react-navigation/stack';
//product
import ProductListScreen from '@screens/ProductListScreen';
import CreateProductScreen from '@screens/CreateProductScreen';
import ProductDetailScreen from '@screens/productDetailScreen';
import EditProductScreen from '@screens/EditProductScreen';
//staff
import CreateStaffScreen from '@screens/staff/CreateStaffScreen';
import EditStaffScreen from '@screens/staff/EditStaffScreen';
import StaffListScreen from '@screens/staff/StaffListScreen';
import StaffDetailScreen from '@screens/staff/StaffDetailScreen';
  
const Stack = createStackNavigator<RootParamList>();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Routes.StaffListScreen}>
        <Stack.Screen name={Routes.HomeScreen} component={HomeScreen} />
        <Stack.Screen name={Routes.DetailsScreen} component={DetailsScreen} />
        <Stack.Screen name={Routes.ProductListScreen} component={ProductListScreen} />
        <Stack.Screen name={Routes.CreateProductScreen} component={CreateProductScreen} />
        <Stack.Screen name={Routes.ProductDetailScreen} component={ProductDetailScreen} />
        <Stack.Screen name={Routes.EditProductScreen} component={EditProductScreen} />
        {/* staff */}
        <Stack.Screen name={Routes.CreateStaffScreen} component={CreateStaffScreen} />
        <Stack.Screen name={Routes.EditStaffScreen} component={EditStaffScreen} />
        <Stack.Screen name={Routes.StaffDetailScreen} component={StaffDetailScreen} />
        <Stack.Screen name={Routes.StaffListScreen} component={StaffListScreen} />




    </Stack.Navigator>
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
    <View style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <MyStack/>
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
}