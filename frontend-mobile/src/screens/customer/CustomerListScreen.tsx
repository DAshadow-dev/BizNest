import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconBack from "@assets/svg/header/ic_back.svg";
import { moderateScale, scale, verticalScale } from "@libs/reactResizeMatter/scalingUtils";
import { CommonColors, Fonts } from "@utils/CommonStyles";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigationRoot } from '@components/navigate/RootNavigation';
import * as Routes from '@utils/Routes';

const CustomerListScreen= () =>{
    const list=[1];
    const navigation= useNavigationRoot();

    return(
        <View style={{flex: 1}}>
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
                    <Text style={{fontSize: moderateScale(22), color: CommonColors.white, ...Fonts.defaultRegular}}>List Customer</Text>
                </View>
                <View style={{width: scale(50), height: verticalScale(50),flexDirection: 'row', justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity
                        onPress={()=>{
                        }}
                        style={{marginRight: scale(10)}}
                    >   
                        <FontAwesome name="filter" size={moderateScale(20)} color={CommonColors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            navigation.navigate(Routes.CREATE_CUSTOMER, { idUpdate: -1 });
                        }}
                        style={{marginRight: scale(10)}}
                    >   
                        <FontAwesome name="plus" size={moderateScale(20)} color={CommonColors.white} />
                    </TouchableOpacity>
                    
                </View>
            </View>
            <View style={{flex: 1, paddingHorizontal: scale(20), paddingBottom: verticalScale(20)}}>
                <FlatList
                    data={list} 
                    keyExtractor={(item) => item.toString()}
                    showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
                    renderItem={({ item }) => ( 
                        <TouchableOpacity
                            onPress={() => {navigation.navigate(Routes.CUSTOMER_DETAIL)}}
                        >
                            <View style={style.containerCustomer}>
                                <View style={{width: scale(100), height: verticalScale(100), justifyContent: "center", alignItems: "center"}}>
                                    <Image 
                                        source={require('@assets/images/avatar.jpg')}
                                        style={{width: scale(70), height: verticalScale(70), borderRadius: 100}}
                                    />
                                </View>
                                <View style={{width: scale(253), height: verticalScale(90), paddingVertical: verticalScale(10), flexDirection: 'column', justifyContent: "space-between"}}>
                                    <Text style={{fontSize: moderateScale(17), ...Fonts.defaultBold}}>ID: 1504922</Text>
                                    <Text style={{fontSize: moderateScale(15), ...Fonts.defaultMedium}}>
                                        <FontAwesome name="user" size={moderateScale(22)} color={CommonColors.black} />
                                        : Lê Kim Hoàng Nguyên
                                    </Text>
                                    <Text style={{fontSize: moderateScale(15), ...Fonts.defaultMedium}}>
                                        <FontAwesome name="phone" size={moderateScale(22)} color={CommonColors.black} />
                                        : 0934726073
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

const style= StyleSheet.create({
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
    }
})
export default CustomerListScreen;