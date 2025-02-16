import IconBack from "@assets/svg/header/ic_back.svg";
import { moderateScale, scale, verticalScale } from "@libs/reactResizeMatter/scalingUtils";
import { CommonColors, Fonts } from "@utils/CommonStyles";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {FormProvider, useForm} from 'react-hook-form';
import FormInput from "@components/input/FormInput";
import {required} from '@utils/Validator';

const ProfileScreen= ()=> {

    const methods = useForm({
        defaultValues: {
            fullname: '',
            phonenumber: '',
            email: '',
        },
    });
    const onSubmit = (data: any) => {
        const {fullname, phonenumber, email} = data;
        console.log(fullname,' + ', phonenumber, ' + ', email)
    };
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
                    <Text style={{fontSize: moderateScale(22), color: CommonColors.white, ...Fonts.defaultRegular}}>View Information</Text>
                </View>
            </View>
            <FormProvider {...methods}>
                <View style={{flex: 1, marginHorizontal: scale(20)}}>
                    <View style={styles.formInput}>
                        <Text style={styles.textLabel}>FullName</Text>
                        <FormInput
                            fieldName="fullname"
                            placeHolder={"Enter your full name"}
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
                            fieldName="phonenumber"
                            placeHolder={"Enter your phone number"}
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
                            placeHolder={"Enter your email"}
                            secureTextEntry={false}
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

export default ProfileScreen;