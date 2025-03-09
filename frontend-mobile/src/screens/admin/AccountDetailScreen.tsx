import { useState, useRef, useEffect } from "react";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import * as Routes from "@utils/Routes";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "@redux/store";
import { RootState } from "@redux/root-reducer";
import { format, parseISO } from "date-fns";
import { useDispatch } from "react-redux";
import AdminActions from "@redux/admin/actions";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { moderateScale, scale, verticalScale } from "@libs/reactResizeMatter/scalingUtils";

const AccountDetailScreen = (props: any) => {
  const {id}= props.route.params
  const navigation = useNavigationRoot();
  const [translateX, setTranslateX] = useState(new Animated.Value(0));
  const bussinessOnwers: any = useAppSelector((state: RootState) => state.Admin.ListBussinessOnwer);
  const [account, setAccount]= useState<any>({});
  const [loading, setLoading]= useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const dispatch= useDispatch();

  useEffect(()=> {
    const findAccount= bussinessOnwers.filter((e: any) => e._id == id);
    setAccount(findAccount[0])
    setIsLocked(findAccount[0].status == "active" ? false : true)
    setLoading(false)
  },[])

  const transactions = [
    { date: "21/2/2025", price: "$20" },
    { date: "21/2/2025", price: "$20" },
  ];

  const handleLockUnlock = () => {
    Alert.alert(
      "Confirm",
      isLocked
        ? "Do you want to unlock this account?"
        : "Do you want to lock this account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            setTimeout(() => {
              dispatch({
                type: AdminActions.TOGGLE_ACCOUNT_STATUS,
                payload: {
                  id,
                  onSuccess:(data: any) => {
                    Toast.show({
                      type: "success",
                      text1: "Success!",
                      text2: data.message,
                      position: "top",
                      visibilityTime: 2000,
                    });
                  },
                  onError: (error: any) => {
                    console.log(error);
                  },
                  onFailed: (MsgNo: string) => {
                    console.log("Delete unsuccess")
                  },
                },
              });
              setIsLocked(!isLocked);
            }, 100);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.AccountListScreen)}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bussiness Owner Information</Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ margin: 16 }}>
        <View style={styles.card}>
          <Text style={styles.customerName}>{account.username}</Text>
          <Text style={styles.label}>
            Date created: <Text style={styles.value}>
                {account.createdAt 
                ? format(parseISO(account.createdAt.toString()), "HH:mm:ss dd/MM/yyyy") 
                : "N/A"}
              </Text>
          </Text>
          <TouchableOpacity
            onPress={handleLockUnlock}
            style={[
              styles.lockButton,
              isLocked ? styles.locked : styles.unlocked,
            ]}
            activeOpacity={0.7}
          >
            <Animated.View style={{ transform: [{ translateX }] }}>
              <FontAwesome
                name={isLocked ? "lock" : "unlock"}
                size={20}
                color="white"
              />
            </Animated.View>
            <Text style={styles.lockText}>
              {isLocked ? "Locked" : "Unlocked"}
            </Text>
            {/* </Pressable> */}
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Information</Text>
          <Text style={styles.label}>
            Email: <Text style={styles.value}>{account.email}</Text>
          </Text>
          <Text style={styles.label}>
            Phone number: <Text style={styles.value}>{account.phone}</Text>
          </Text>
          <Text style={styles.label}>
            Verified: <Text style={styles.value}>{account.verified ? "true" : "false"}</Text>
          </Text>
          <Text style={styles.label}>
            Role: <Text style={styles.value}>{account.role}</Text>
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Transaction history</Text>

        {transactions.map((transaction, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.label}>
              Date created: <Text style={styles.value}>{transaction.date}</Text>
            </Text>
            <Text style={styles.label}>
              Price: <Text style={styles.value}>{transaction.price}</Text>
            </Text>
          </View>
        ))}
      </ScrollView>
      <Toast config={toastConfig}/>
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
  lockButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  locked: {
    backgroundColor: "red",
  },
  unlocked: {
    backgroundColor: "#4a90e2",
  },
  lockText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});


// 🎨 Tuỳ chỉnh giao diện Toast
const toastConfig = {
  success: (props: any) => (
      <BaseToast
          {...props}
          style={{ borderLeftColor: "green", backgroundColor: "white", marginTop: scale(0)}}
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
          style={{ borderLeftColor: "red", backgroundColor: "white", marginTop: scale(0)}}
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
export default AccountDetailScreen;
