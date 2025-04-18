import IconBack from "@assets/svg/header/ic_back.svg";
import { moderateScale, scale, verticalScale } from "@libs/reactResizeMatter/scalingUtils";
import { CommonColors, Fonts } from "@utils/CommonStyles";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {FormProvider, useForm} from 'react-hook-form';
import FormInput from "@components/input/FormInput";
import {required} from '@utils/Validator';
import {useDispatch} from 'react-redux';
import UserActions from "@redux/user/actions";
import { useAppSelector } from "@redux/store";
import { RootState } from "@redux/root-reducer";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import * as Routes from "@utils/Routes";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const PasswordScreen= ()=> {
    const navigation = useNavigationRoot();
    const dispatch = useDispatch();

    const methods = useForm({
        defaultValues: {
          oldPassword: '',
          newPassword: '',
          againNewPassword: '',
        },
    });
    const onSubmit = (data: any) => {
        dispatch({type: UserActions.CHANGE_PASSWORD, payload: {
            data, 
            onSuccess: (data: any) => {
                methods.reset();
                Toast.show({
                    type: "success",
                    text1: "Success!",
                    text2: "Changed your password successfully",
                    position: "top",
                    visibilityTime: 2000
                });
            },
            onError: (error: any) => {
                Toast.show({
                    type: "error",
                    text1: "Fail!",
                    text2: error,
                    position: "top",
                    visibilityTime: 2000
                });
            },
            onFailed: (MsgNo: string) => {
                Toast.show({
                    type: "error",
                    text1: "Fail!",
                    text2: MsgNo,
                    position: "top",
                    visibilityTime: 2000
                });            
            }
        }})
    };

    const Auth = useAppSelector((state: RootState) => state.User.Auth);
    return(
        <View style={{flex: 1}}>
            <View style={{height: verticalScale(60), width: scale(393), backgroundColor: '#1e88e5', flexDirection: 'row', alignItems: "flex-end"}}>
                <View style={{width: scale(50), height: verticalScale(50), justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity
                        onPress={()=>{
                            navigation.goBack()
                        }}
                    >
                        <IconBack/>
                    </TouchableOpacity>
                </View>
                <View style={{width: scale(293), height: verticalScale(50), justifyContent: "center", alignItems: "center"}}>
                    <Text style={{fontSize: moderateScale(22), color: CommonColors.white, ...Fonts.defaultRegular}}>Change Password</Text>
                </View>
            </View>
            <FormProvider {...methods}>
                <View style={{flex: 1, marginHorizontal: scale(20)}}>
                    <View style={styles.formInput}>
                        <Text style={styles.textLabel}>Old Password</Text>
                        <FormInput
                            fieldName="oldPassword"
                            placeHolder={"Enter your old password"}
                            secureTextEntry={true}
                            validate={[required]}
                            inputStyle={{
                                minHeight: verticalScale(44),
                            }}
                        />
                    </View>
                    <View style={styles.formInput}>
                        <Text style={styles.textLabel}>New Password</Text>
                        <FormInput
                            fieldName="newPassword"
                            placeHolder={"Enter your new password"}
                            secureTextEntry={true}
                            validate={[required]}
                            inputStyle={{
                                minHeight: verticalScale(44),
                            }}
                        />
                    </View>
                    <View style={styles.formInput}>
                        <Text style={styles.textLabel}>Again New Password</Text>
                        <FormInput
                            fieldName="againNewPassword"
                            placeHolder={"Enter agaim your new password"}
                            secureTextEntry={true}
                            validate={[required]}
                            inputStyle={{
                                minHeight: verticalScale(44),
                            }}
                        />
                    </View>
                    <View style={{width: scale(353), height: verticalScale(50), flexDirection: 'row', justifyContent: "space-between", marginTop: verticalScale(20)}}>
                        <TouchableOpacity
                            onPress={() => {
                                methods.reset({
                                    oldPassword: '',
                                    newPassword: '',
                                    againNewPassword: '',
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
                            <View style={{width: scale(162.5), height: verticalScale(44), backgroundColor: "#1e88e5", borderRadius: 8, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{fontSize: moderateScale(16), color: CommonColors.white, ...Fonts.defaultMedium}}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </FormProvider>
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
export default PasswordScreen;