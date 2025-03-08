import IconBack from "@assets/svg/header/ic_back.svg";
import { moderateScale, scale, verticalScale } from "@libs/reactResizeMatter/scalingUtils";
import { CommonColors, Fonts } from "@utils/CommonStyles";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {FormProvider, useForm} from 'react-hook-form';
import FormInput from "@components/input/FormInput";
import {required} from '@utils/Validator';
import { useNavigationRoot } from '@components/navigate/RootNavigation';
import * as Routes from '@utils/Routes';
import { Customer } from "@type/user.types";
import { useEffect, useState } from "react";
import { useAppSelector } from "@redux/store";
import { RootState } from "@redux/root-reducer";
import { format } from "date-fns";
import CustomerActions from "@redux/customer/actions";
import { useDispatch } from "react-redux";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const CreateCustomerScreen= (props: {route: {params: {idUpdate: number}}})=> {
    const {idUpdate}= props.route.params

    const customers: Array<Customer> = useAppSelector((state: RootState) => state.Customer.ListCustomer);
    const [customer, setCustomer]= useState<Customer>({});
    const [loading, setLoading]= useState(true);
    const methods = useForm({
        defaultValues: {
            fullname: customer ? customer.fullname : '',
            email: customer ? customer.email : '',
            phone: customer ? customer.phone : '',
            gender: customer ? customer.gender : false,
            date_of_birth: customer ? customer.date_of_birth : '1/1/1999',
        },
    });
    const navigation= useNavigationRoot();

    useEffect(()=> {
        const findCustomer = customers.find((e: Customer) => e._id === idUpdate);
        if (findCustomer) {
            setCustomer(findCustomer);
            methods.reset({
                fullname: findCustomer.fullname,
                email: findCustomer.email,
                phone: findCustomer.phone,
                gender: findCustomer.gender,
                date_of_birth: findCustomer.date_of_birth || '1/1/1999',
            });
        }
        setLoading(false)
    },[customers, idUpdate]);
    
    const dispatch= useDispatch();
    const onSubmit = (data: any) => {
        dispatch({type: CustomerActions.CREATE_CUSTOMER, payload: {
          data, 
          onSuccess: () => {
            methods.reset();
            Toast.show({
                type: "success",
                text1: "Success!",
                text2: "Create customer successfully",
                position: "top",
                visibilityTime: 2000
            });
          },
          onError: (error: any) => {
            Toast.show({
                type: "error",
                text1: "Error!",
                text2: error,
                position: "top",
                visibilityTime: 2000
            });
          },
          onFailed: (MsgNo: string) => {
            Toast.show({
                type: "error",
                text1: "Fail!",
                text2: "Create customer unsuccessfully",
                position: "top",
                visibilityTime: 2000
            });    
          }
        }})
      };
    return(
        
        <View style={{flex: 1, backgroundColor: 'white'}}>
            { loading 
                ? <ActivityIndicator/>
                : <View style={{flex: 1}}>
                    <View style={{height: verticalScale(60), width: scale(393), backgroundColor: '#4a90e2', flexDirection: 'row', alignItems: "flex-end"}}>
                        <View style={{width: scale(50), height: verticalScale(50), justifyContent: "center", alignItems: "center"}}>
                            <TouchableOpacity
                                onPress={()=>{
                                    if(idUpdate== -1){
                                        navigation.navigate(Routes.CUSTOMER_LIST)
                                    }else{
                                        navigation.navigate(Routes.CUSTOMER_DETAIL,{id: idUpdate})
                                    }
                                }}
                            >
                                <IconBack/>
                            </TouchableOpacity>
                        </View>
                        <Toast config={toastConfig}/>

                        <View style={{width: scale(293), height: verticalScale(50), justifyContent: "center", alignItems: "center"}}>
                            {idUpdate== -1 
                                ? <Text style={{fontSize: moderateScale(22), color: CommonColors.white, ...Fonts.defaultRegular, fontWeight: "bold"}}>Create Customer</Text>
                                : <Text style={{fontSize: moderateScale(22), color: CommonColors.white, ...Fonts.defaultRegular, fontWeight: "bold",}}>Update Customer</Text>
                            }
                        </View>
                    </View>
                    <FormProvider {...methods}>
                        <View style={{flex: 1, marginHorizontal: scale(20)}}>
                            <View style={styles.formInput}>
                                <Text style={styles.textLabel}>FullName</Text>
                                <FormInput
                                    fieldName="fullname"
                                    placeHolder={"Enter full name"}
                                    secureTextEntry={false}
                                    validate={[required]}
                                    inputStyle={{
                                        minHeight: verticalScale(44),
                                    }}
                                />
                            </View>
                            <View style={styles.formInput}>
                                <Text style={styles.textLabel}>Phone Number</Text>
                                <FormInput
                                    fieldName="phone"
                                    placeHolder={"Enter phone number"}
                                    secureTextEntry={false}
                                    validate={[required]}
                                    inputStyle={{
                                        minHeight: verticalScale(44),
                                    }}
                                />
                            </View>
                            <View style={styles.formInput}>
                                <Text style={styles.textLabel}>Email</Text>
                                <FormInput
                                    fieldName="email"
                                    placeHolder={"Enter email"}
                                    secureTextEntry={false}
                                    validate={[required]}
                                    inputStyle={{
                                        minHeight: verticalScale(44),
                                    }}
                                />
                            </View>
                            <View style={styles.formInput}>
                                <Text style={styles.textLabel}>Gender</Text>
                                <FormInput
                                    fieldName="gender"
                                    placeHolder={"Enter gender"}
                                    secureTextEntry={false}
                                    validate={[required]}
                                    inputStyle={{
                                        minHeight: verticalScale(44),
                                    }}
                                />
                            </View>
                            <View style={styles.formInput}>
                                <Text style={styles.textLabel}>Date of birth</Text>
                                <FormInput
                                    fieldName="date_of_birth"
                                    placeHolder={"Enter date of birth"}
                                    secureTextEntry={false}
                                    validate={[required]}
                                    inputStyle={{
                                        minHeight: verticalScale(44),
                                    }}
                                />
                            </View>
                            <View style={{width: scale(353), height: verticalScale(50), flexDirection: 'row', justifyContent: "space-between", marginTop: verticalScale(20)}}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        Toast.show({
                                            type: "success",
                                            text1: "Success!",
                                            text2: "Create customer successfully",
                                            position: "top",
                                            visibilityTime: 2000
                                        });
                                    }}
                                >
                                    <View style={{width: scale(162.5), height: verticalScale(44), backgroundColor: "white", borderColor: 'red', borderWidth: 1, borderRadius: 8, justifyContent: "center", alignItems: "center"}}>
                                        <Text style={{fontSize: moderateScale(16), color: CommonColors.redColor, ...Fonts.defaultMedium}}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={methods.handleSubmit(onSubmit)}
                                >
                                    <View style={{width: scale(162.5), height: verticalScale(44), backgroundColor: "#3478f6", borderRadius: 8, justifyContent: "center", alignItems: "center"}}>
                                        <Text style={{fontSize: moderateScale(16), color: CommonColors.white, ...Fonts.defaultMedium}}>Save</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </FormProvider>

                </View>
            }
            <Toast config={toastConfig}/>
        </View>
    );
}

const styles= StyleSheet.create({
    formInput: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: verticalScale(16),
        width: scale(353),
    },
    textLabel: {
        ...Fonts.defaultBold,
        color: '#5B5B5B',
        textAlign: 'left',
        fontSize: moderateScale(16),
        fontStyle: 'normal',
        lineHeight: verticalScale(24),
        marginBottom: verticalScale(8),
    },
});


// 🎨 Tuỳ chỉnh giao diện Toast
const toastConfig = {
  success: (props: any) => (
      <BaseToast
          {...props}
          style={{ borderLeftColor: "green", backgroundColor: "white", marginTop: scale(15)}}
          contentContainerStyle={{ paddingHorizontal: verticalScale(15) }}
          text1Style={{
              fontSize: moderateScale(16),
              fontWeight: "bold",
              color: "green",
          }}
          text2Style={{
              fontSize: moderateScale(14),
              color: "#333",
          }}
      />
  ),
  error: (props: any) => (
      <ErrorToast
          {...props}
          style={{ borderLeftColor: "red", backgroundColor: "white", marginTop: scale(15)}}
          contentContainerStyle={{ paddingHorizontal: verticalScale(15)}}
          text1Style={{
              fontSize: moderateScale(16),
              fontWeight: "bold",
              color: "red",
          }}
          text2Style={{
              fontSize: moderateScale(14),
              color: "#333",
          }}
      />
  ),
};

export default CreateCustomerScreen;