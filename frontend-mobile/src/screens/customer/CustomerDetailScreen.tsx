import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import * as Routes from "@utils/Routes";
import { moderateScale, scale, verticalScale } from "@libs/reactResizeMatter/scalingUtils";
import { useAppSelector } from "@redux/store";
import { RootState } from "@redux/root-reducer";
import { Customer } from "@type/user.types";
import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import CustomerActions from "@redux/customer/actions";

const CustomerDetailScreen = (props: any) => {
    const {id}= props.route.params
    const transactions = [
        { id: 1, date: "21/2/2025", price: "$20" },
        { id: 2, date: "21/2/2025", price: "$20" },
    ];
    const navigation = useNavigationRoot();
    const customers: Array<Customer> = useAppSelector((state: RootState) => state.Customer.ListCustomer);
    const [customer, setCustomer]= useState<Customer>({});
    const [loading, setLoading]= useState(true);
    useEffect(()=> {
      const findCustomer= customers.filter((e: Customer) => e._id == id);
      setCustomer(findCustomer[0])
      setLoading(false)
    },[])

    const dispatch= useDispatch();
    const handleDeleteCustomer= () => {
      dispatch({
        type: CustomerActions.DELET_CUSTOMER,
        payload: {
          data: {id: id},
          onSuccess:(data: any) => {
            navigation.navigate(Routes.CUSTOMER_LIST, { showToast: true, message: "Delete customer successfully" });
          },
          onError: (error: any) => {
            console.log(error);
          },
          onFailed: (MsgNo: string) => {
            console.log("Delete unsuccess")
          },
        },
      });
    }
  return (
    <View style={styles.container}>
      {
        loading ? <ActivityIndicator/>
         : 
          <View>
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <TouchableOpacity
                  onPress={() => { navigation.navigate(Routes.CUSTOMER_LIST)}}
                >
                  <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detail Customer</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={handleDeleteCustomer}
                  >
                    <Ionicons name="trash" size={24} color="white" />
                  </TouchableOpacity>
                  <View style={{marginRight: verticalScale(10)}}/>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(Routes.CREATE_CUSTOMER, {idUpdate: id});
                    }}
                  >
                    <Ionicons name="pencil" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <ScrollView style={{ margin: 16 }}>
              <View style={styles.card}>
                <Text style={styles.customerName}>{customer.fullname}</Text>
                <Text style={styles.label}>
                  Date created: 
                  <Text style={styles.value}>
                  {customer.createdAt 
                    ? format(parseISO(customer.createdAt.toString()), "HH:mm:ss dd/MM/yyyy") 
                    : "N/A"}
                  </Text>
                </Text>
              </View>
      
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Information</Text>
                <Text style={styles.label}>
                  Email: <Text style={styles.value}>{customer.email}</Text>
                </Text>
                <Text style={styles.label}>
                  Phone number: <Text style={styles.value}>{customer.phone}</Text>
                </Text>
                <Text style={styles.label}>
                  Date Of Birth: 
                  <Text style={styles.value}>
                    {customer.date_of_birth 
                      ? format(new Date(customer.date_of_birth), "dd/MM/yyyy") 
                      : "N/A"}
                  </Text>
                </Text>
                <Text style={styles.label}>
                  Gender: <Text style={styles.value}>{customer.gender ? "Male" : "Female"}</Text>
                </Text>
              </View>
      
              {/* <Text style={styles.sectionTitle}>Transaction history</Text> */}
      
              {/* <FlatList
                  data={transactions}
                  keyExtractor={(item, index) => index.toString()} // Đảm bảo key là string
                  renderItem={({ item }) => (
                      <TouchableOpacity
                          onPress={()=> {
                              // navigation.navigate(Routes.InvoiceScreen)
                          }}
                      >
                          <View style={{
                                backgroundColor: "white",
                                borderRadius: 16,
                                padding: 16,
                                marginBottom: 12,
                                shadowColor: "#000",
                                shadowOpacity: 0.1,
                                shadowOffset: { width: 0, height: 2 },
                                shadowRadius: 4,
                                elevation: 3,
                                flexDirection: 'row'
                          }}>
                              <View style={{width: '20%'}}>
                                  <View style={{
                                      width: scale(50), 
                                      height: scale(50), 
                                      backgroundColor: "#757373", 
                                      borderRadius: 100,
                                      justifyContent: "center",
                                      alignItems: "center"
                                  }}>
                                      <Text style={{color: 'white', fontSize: 18}}>{item.id}</Text>
                                  </View>
                              </View>
                              <View>
                                  <Text style={styles.label}>
                                      Date created: <Text style={styles.value}>{item.date}</Text>
                                  </Text>
                                  <Text style={styles.label}>
                                      Price: <Text style={styles.value}>{item.price}</Text>
                                  </Text>
                              </View>
                          </View>
                      </TouchableOpacity>
                  )}
                  contentContainerStyle={{ paddingBottom: 20 }} // Tránh che mất item cuối cùng
                  /> */}
            </ScrollView>
          </View>
      }      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    backgroundColor: "#4a90e2", // Màu xanh theo hình
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
    marginBottom: 20, // Tách phần search với header
  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  searchContainer: {
    width: "70%",
    position: "relative",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e4cff",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e4cff",
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },
  value: {
    fontWeight: "bold",
  },
});



export default CustomerDetailScreen;