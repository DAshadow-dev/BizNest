import React from "react";
import { View, Text, Button } from "react-native";
import * as Routes from "@utils/Routes";
import {
  navigate,
  useNavigationRoot,
} from "@components/navigate/RootNavigation";

const HomeScreen = () => {
  const navigation = useNavigationRoot();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Admin Dashboard"
        onPress={() => navigation.navigate(Routes.AdminDashboardScreen)}
      />
      <Button
        title="Go to InvoiceListScreen"
        onPress={() => navigation.navigate(Routes.InvoiceListScreen)}
      />
      <Button
        title="Go to ProductListScreen"
        onPress={() => navigation.navigate(Routes.ProductListScreen)}
      />
      <Button
        title="Go to StaffListScreen"
        onPress={() => navigation.navigate(Routes.StaffListScreen)}
      />
      <Button
        title="Go to CustomerListScreen"
        onPress={() => navigation.navigate(Routes.CUSTOMER_LIST)}
      />
      <Button
        title="Go to BusinessDashboard"
        onPress={() => navigation.navigate(Routes.BUSINESS_DASHBOARD)}
      />
    </View>
  );
};
export default HomeScreen;
