import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import * as Routes from "@utils/Routes";
import { useDispatch } from "react-redux";
import CustomerActions from "@redux/customer/actions";
import { useAppSelector } from "@redux/store";
import { RootState } from "@redux/root-reducer";

const CustomerListScreen = () => {
  const navigation = useNavigationRoot();
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>('');
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);

  const customers = useAppSelector((state: RootState) => state.Customer.ListCustomer);

  useEffect(() => {
    dispatch({
      type: CustomerActions.FETCH_LIST_CUSTOMER,
      payload: {
        onError: (error: any) => {
          console.log(error);
        },
        onFailed: (MsgNo: string) => {
          console.log(MsgNo);
        },
      },
    });
  }, []);

  useEffect(() => {
    if (search === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter((customer: any) =>
        customer.phone.includes(search) || customer.fullname.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  }, [search, customers]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.navigate(Routes.ONBOARDING_SCREEN)}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>List Customer</Text>
          <TouchableOpacity>
            <Ionicons name="options-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search customer by phone or name..."
            value={search}
            onChangeText={(value: string) => setSearch(value)}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Ionicons name="search-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ margin: 16, position: "relative", flex: 1 }}>
        <FlatList
          data={filteredCustomers}
          keyExtractor={(item: any) => item._id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.customerItem}
              onPress={() => navigation.navigate(Routes.CUSTOMER_DETAIL, { id: item._id })}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <View style={{ flexDirection: "row", alignItems: "center", width: "80%" }}>
                  <View>
                    <Text style={styles.customerText}>Name: {item.fullname}</Text>
                    <Text style={{ color: "#615e5e", fontSize: 14 }}>SĐT: {item.phone}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward-outline" size={20} color="#555" />
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate(Routes.CREATE_CUSTOMER, { idUpdate: -1 })}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.buttonText}>New</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    backgroundColor: "#4a90e2",
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
  },
  headerTop: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  searchContainer: {
    width: "80%",
    position: "relative",
  },
  searchBar: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 10,
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 40,
  },
  searchIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  customerItem: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  customerText: {
    fontSize: 18,
    color: "#333",
  },
  floatingButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#3478f6",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "500",
  },
});

export default CustomerListScreen;
