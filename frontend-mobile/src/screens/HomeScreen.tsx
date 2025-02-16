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
    </View>
  );
};
export default HomeScreen;
