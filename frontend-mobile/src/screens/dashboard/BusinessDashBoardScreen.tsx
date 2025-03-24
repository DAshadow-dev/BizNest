import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "@libs/reactResizeMatter/scalingUtils";
import IconBack from "@assets/svg/header/ic_back.svg";
import { FontAwesome } from "@expo/vector-icons";
import { CommonColors, Fonts } from "@utils/CommonStyles";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/store";
import { RootState } from "@redux/root-reducer";
import CustomerActions from "@redux/customer/actions";

const BusinessDashBoardScreen = () => {
  const screenWidth = Dimensions.get("window").width - 40;
  const dispatch = useDispatch();
  const customers = useAppSelector((state: RootState) => state.Customer.ListCustomer);

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: [5000, 7000, 8000, 12000, 15000, 18000, 0, 10000, 20000, 15000, 2000, 12300],
        strokeWidth: 2,
      },
    ],
  };

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
    }, [customers]);

  return (
    <ScrollView style={styles.container}>
      <View style={{height: verticalScale(60), width: scale(393), backgroundColor: '#3750B2', flexDirection: 'row', alignItems: "flex-end"}}>
          <View style={{width: scale(50), height: verticalScale(50), justifyContent: "center", alignItems: "center"}}>
              <TouchableOpacity
                  onPress={()=>{
                  }}
              >
                  <IconBack/>
              </TouchableOpacity>
          </View>
          <View style={{width: scale(293), height: verticalScale(50), justifyContent: "center", alignItems: "center"}}>
              <Text style={{fontSize: moderateScale(22), color: CommonColors.white, ...Fonts.defaultRegular}}>Dash Board</Text>
          </View>
          <View style={{width: scale(50), height: verticalScale(50),flexDirection: 'row', justifyContent: "center", alignItems: "center"}}>
              <TouchableOpacity
                  onPress={()=>{
                  }}
                  style={{marginRight: scale(10)}}
              >   
                  <FontAwesome name="filter" size={moderateScale(20)} color={CommonColors.white} />
              </TouchableOpacity>
              
          </View>
      </View>
      {/* Tổng quan */}
      <View style={styles.overviewContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Tổng Doanh Thu</Text>
          <Text style={styles.value}>$50,000</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Tổng Đơn Hàng</Text>
          <Text style={styles.value}>1,200</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Customers</Text>
          <Text style={styles.value}>{customers.length}</Text>
        </View>
      </View>

      {/* Biểu đồ doanh thu */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Doanh Thu Hàng Tháng</Text>
        <LineChart
          data={revenueData}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            strokeWidth: 2,
          }}
          bezier
          style={{ marginVertical: 10, borderRadius: 10 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  overviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(20),
  },
  card: {
    justifyContent: 'center',
    flex: 1,
    width: scale(200),
    height: verticalScale(150),
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: verticalScale(5),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: verticalScale(5),
  },
  chartContainer: {
    backgroundColor: "white",
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginBottom: verticalScale(10),
  },
});

export default BusinessDashBoardScreen;
