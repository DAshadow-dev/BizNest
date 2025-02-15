import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Routes from '@utils/Routes';
import { RootParamList } from '@utils/RootParamList';
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from '@screens/profile/ProfileScreen';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PasswordScreen from '@screens/profile/PasswordScreen';
import { FontAwesome } from "@expo/vector-icons";
import CustomerListScreen from '@screens/customer/CustomerListScreen';
import CreateCustomerScreen from '@screens/customer/CreateCustomerScreen';
import CustomerDetailScreen from '@screens/customer/CustomerDetailScreen';
import BusinessDashBoardScreen from '@screens/dashboard/BusinessDashBoardScreen';

const Stack = createStackNavigator<RootParamList>();
const Tab = createBottomTabNavigator();


function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.BUSINESS_DASHBOARD}>
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