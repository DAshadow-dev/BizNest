import { Fonts } from '@utils/CommonStyles';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '@screens/HomeScreen';
import DetailsScreen from '@screens/DetailsScreen';
import InvoiceListScreen from '@screens/InvoiceListScreen';  
import InvoiceScreen from '@screens/InvoiceScreen';  
import CreateInvoiceScreen from '@screens/CreateInvoiceScreen';  
import PaymentScreen from '@screens/PaymentScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Routes from '@utils/Routes';
import { RootParamList } from '@utils/RootParamList';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator<RootParamList>();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Routes.HomeScreen}>
        <Stack.Screen name={Routes.HomeScreen} component={HomeScreen} />
        <Stack.Screen name={Routes.DetailsScreen} component={DetailsScreen} />
        <Stack.Screen name={Routes.InvoiceListScreen} component={InvoiceListScreen} />
        <Stack.Screen name={Routes.InvoiceScreen} component={InvoiceScreen} />
        <Stack.Screen name={Routes.CreateInvoiceScreen} component={CreateInvoiceScreen} />
        <Stack.Screen name={Routes.PaymentScreen} component={PaymentScreen} />
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