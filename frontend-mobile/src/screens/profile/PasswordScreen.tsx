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

const PasswordScreen= ()=> {

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
                console.log("Data: ", data)
            },
            onError: (error: any) => {
                console.log("Error: ", error)
            },
            onFailed: (MsgNo: string) => {
                console.log("Failed: ", MsgNo)
            }
        }})
    };

    const Auth = useAppSelector((state: RootState) => state.User.Auth);
    console.log(Auth)
    return(
        <View style={{flex: 1}}>
            <View style={{height: verticalScale(60), width: scale(393), backgroundColor: '#3750B2', flexDirection: 'row', alignItems: "flex-end"}}>
                <View style={{width: scale(50), height: verticalScale(50), justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity
                        onPress={()=>{}}
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
                            onPress={() => {}}
                        >
                            <View style={{width: scale(162.5), height: verticalScale(44), backgroundColor: "white", borderColor: 'red', borderWidth: 1, borderRadius: 8, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{fontSize: moderateScale(16), color: CommonColors.redColor, ...Fonts.defaultMedium}}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={methods.handleSubmit(onSubmit)}
                        >
                            <View style={{width: scale(162.5), height: verticalScale(44), backgroundColor: "#3750B2", borderRadius: 8, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{fontSize: moderateScale(16), color: CommonColors.white, ...Fonts.defaultMedium}}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </FormProvider>
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

export default PasswordScreen;