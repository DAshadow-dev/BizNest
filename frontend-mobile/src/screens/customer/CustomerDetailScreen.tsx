import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconBack from "@assets/svg/header/ic_back.svg";
import { moderateScale, scale, verticalScale } from "@libs/reactResizeMatter/scalingUtils";
import { CommonColors, Fonts } from "@utils/CommonStyles";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigationRoot } from '@components/navigate/RootNavigation';
import * as Routes from '@utils/Routes';
import { FlatList } from "react-native-gesture-handler";

const CustomerDetailScreen= () =>{
    const navigation= useNavigationRoot();
    const data= [1,2];
    return(
        <View style={{flex: 1}}>
            <View style={{height: verticalScale(60), width: scale(393), backgroundColor: '#3750B2', flexDirection: 'row', alignItems: "flex-end"}}>
                <View style={{width: scale(50), height: verticalScale(50), justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity
                        onPress={()=>{
                            navigation.navigate(Routes.CUSTOMER_LIST)
                        }}
                    >
                        <IconBack/>
                    </TouchableOpacity>
                </View>
                <View style={{width: scale(293), height: verticalScale(50), justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontSize: moderateScale(22), color: CommonColors.white, ...Fonts.defaultRegular}}>Customer Detail</Text>
                </View>
                <View style={{width: scale(50), height: verticalScale(50), justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity
                        onPress={()=>{
                            navigation.navigate(Routes.CREATE_CUSTOMER, { idUpdate:  1});
                        }}
                    >
                        <FontAwesome name="edit" size={moderateScale(20)} color={CommonColors.white} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1, paddingHorizontal: scale(20), paddingBottom: verticalScale(20)}}>
                <View style={styles.card}>
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Image
                            source={require('@assets/images/avatar.jpg')}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.name}>Lê Kim Hoàng Nguyên</Text>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoText}>Phone Number: 0934726073</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoText}>Email: lkhnguyen3006@gmail.com</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoText}>Address: 650 Tran Cao Van Steert, Xuan Ha, Thanh Khe, Da Nang City.</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{width: scale(393), marginTop: verticalScale(20)}}>
                    <Text style={{fontSize: moderateScale(20), ...Fonts.defaultBold}}>Lịch sử giao dịch</Text>
                    <FlatList
                        data={data} 
                        keyExtractor={(item) => item.toString()}
                        showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
                        renderItem={({ item }) => ( 
                            <TouchableOpacity
                                onPress={() => {navigation.navigate(Routes.CUSTOMER_DETAIL)}}
                            >
                               <View style={{paddingHorizontal: scale(10), paddingVertical: verticalScale(10), marginTop: verticalScale(20), width: scale(353), height: verticalScale(100), backgroundColor: CommonColors.white, borderRadius: 8, borderWidth: 1, borderColor: CommonColors.black}}>
                                    <Text style={{fontSize: moderateScale(17), ...Fonts.defaultBold}}>ID: 1504922</Text>
                                    <Text style={{fontSize: moderateScale(17), ...Fonts.defaultBold}}>Price: 12.50$</Text>
                                    <Text style={{fontSize: moderateScale(17), ...Fonts.defaultBold}}>Create at: 12:03:22 AM 12/03/2024</Text>
                               </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </View>
    );
}

const styles= StyleSheet.create({
    containerCustomer:{
        flexDirection: 'row',
        marginTop: verticalScale(20),
        width: scale(353), 
        height: verticalScale(100), 
        backgroundColor: CommonColors.white, 
        borderRadius: 16, 
        borderColor: CommonColors.black, 
        borderWidth: 1,
        alignItems: 'center'
    },
    card: { 
        backgroundColor: "white", 
        borderRadius: 16, 
        overflow: "hidden", 
        shadowColor: "#000", 
        shadowOpacity: 0.1, 
        shadowRadius: 4,
        elevation: 3 
    },
    image: { 
        width: scale(200), 
        height: verticalScale(200), 
        borderRadius: 100 
    },
    content: { 
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(16) 
    },
    name: { 
        fontSize: moderateScale(24), 
        fontWeight: "bold", 
        color: "#1f2937" 
    },
    member: { 
        color: "#6b7280", 
        marginBottom: verticalScale(12) 
    },
    infoContainer: { 
        marginTop: verticalScale(8)
    },
    infoItem: { 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 8, 
        marginBottom: verticalScale(6)
    },
    infoText: { 
        fontSize: moderateScale(16), 
        color: "#374151" 
    },
})
export default CustomerDetailScreen;

