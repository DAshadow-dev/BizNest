import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import * as Routes from "@utils/Routes";
import { navigate, useNavigationRoot } from "@components/navigate/RootNavigation";
import ProductActions from "@redux/product/actions";
import { useAppSelector } from "@redux/store";
import { useDispatch } from "react-redux";
import { RootState } from "@redux/root-reducer";
import CustomerActions from "@redux/customer/actions";
import TransactionActions from "@redux/transaction/actions";

const HomePage = () => {
  const navigation = useNavigationRoot();
  const [activeTab, setActiveTab] = useState("home");
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  
  const categories = [
    { id: "1", name: "Product", icon: "storefront", route: Routes.WareHouse },
    { id: "2", name: "Staff", icon: "receipt", route: Routes.StaffListScreen },
    { id: "3", name: "Customer", icon: "people", route: Routes.CUSTOMER_LIST },
    { id: "4", name: "Business dashboard", icon: "bar-chart", route: Routes.BUSINESS_DASHBOARD },
    { id: "5", name: "Invoice", icon: "account-balance-wallet", route: Routes.InvoiceListScreen },
  ];

  const dispatch = useDispatch();
  const Auth = useAppSelector((state: RootState) => state.User.Auth);

  useEffect(() => {
    dispatch({ 
      type: ProductActions.FETCH_PRODUCTS, 
      payload: { storeId: Auth?.storeId } 
    });
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
    dispatch({
      type: TransactionActions.FETCH_LIST_TRANSACTION,
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

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    navigation.navigate(Routes.LOGIN_SCREEN);
  };

  const handleTabPress = (tabName: string, route: string) => {
    setActiveTab(tabName);
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dashboard</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </TouchableOpacity>
            <View style={{width: 10}}/>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Doanh thu gần đây</Text>
          <LineChart
            data={{
              labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
              datasets: [{ data: [30000, 45000, 32000, 40000, 48000, 50000] }],
            }}
            width={350}
            height={200}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            }}
            bezier
            style={{ borderRadius: 10 }}
          />
        </View>

        <View style={styles.categoryContainer}>
          {categories.map((item) => (
            <TouchableOpacity key={item.id} style={styles.categoryItem} onPress={() => navigation.navigate(item.route)}>
              <MaterialIcons name={item.icon} size={32} color="#007AFF" />
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Xác nhận đăng xuất</Text>
            <Text style={styles.modalText}>Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.logoutButton]} 
                onPress={confirmLogout}
              >
                <Text style={styles.logoutButtonText}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Enhanced Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('customers', Routes.CUSTOMER_LIST)}
        >
          <View style={[styles.iconContainer, activeTab === 'customers' && styles.activeIconContainer]}>
            <MaterialIcons 
              name="people" 
              size={24} 
              color={activeTab === 'customers' ? "#007AFF" : "white"} 
            />
          </View>
          <Text style={[styles.tabLabel, activeTab === 'customers' && styles.activeTabLabel]}>
            Customer
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('products', Routes.WareHouse)}
        >
          <View style={[styles.iconContainer, activeTab === 'products' && styles.activeIconContainer]}>
            <Ionicons 
              name="cart" 
              size={24} 
              color={activeTab === 'products' ? "#007AFF" : "white"} 
            />
          </View>
          <Text style={[styles.tabLabel, activeTab === 'products' && styles.activeTabLabel]}>
            Product
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('home', Routes.HOME_SCREEN)}
        >
          <View style={styles.homeButton}>
            <Ionicons name="home" size={28} color="white" />
          </View>
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.activeTabLabel]}>
            Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('stats', Routes.BUSINESS_DASHBOARD)}
        >
          <View style={[styles.iconContainer, activeTab === 'stats' && styles.activeIconContainer]}>
            <Ionicons 
              name="stats-chart" 
              size={24} 
              color={activeTab === 'stats' ? "#007AFF" : "white"} 
            />
          </View>
          <Text style={[styles.tabLabel, activeTab === 'stats' && styles.activeTabLabel]}>
            Dashboard
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => handleTabPress('profile', Routes.PROFILE)}
        >
          <View style={[styles.iconContainer, activeTab === 'profile' && styles.activeIconContainer]}>
            <Ionicons 
              name="person" 
              size={24} 
              color={activeTab === 'profile' ? "#007AFF" : "white"} 
            />
          </View>
          <Text style={[styles.tabLabel, activeTab === 'profile' && styles.activeTabLabel]}>
            Inforamtion
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerButton: {
    padding: 5,
  },
  chartContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 80, // Add extra padding at bottom to account for nav bar
  },
  categoryItem: {
    backgroundColor: "white",
    width: "30%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryText: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
  // Enhanced Bottom Navigation Styles
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#007AFF",
    paddingTop: 8,
    paddingBottom: 5,
    height: 70,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconContainer: {
    backgroundColor: "white",
  },
  homeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#0056b3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  tabLabel: {
    color: "white",
    fontSize: 11,
    marginTop: 2,
  },
  activeTabLabel: {
    color: "#e6f2ff",
    fontWeight: "bold",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f2f2f2',
  },
  cancelButtonText: {
    color: '#555',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
