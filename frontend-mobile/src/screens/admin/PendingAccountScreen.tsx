import React, { useEffect, useState } from "react";
import { useNavigationRoot } from "@components/navigate/RootNavigation";
import {
  Button,
  Text,
  View,
  FlatList,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AdminActions from "@redux/admin/actions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@redux/store";
import { RootState } from "@redux/root-reducer";
import { useRoute } from "@react-navigation/native";
import * as Routes from "@utils/Routes";
import { Ionicons } from "@expo/vector-icons";

const PendingAccountScreen: React.FC = () => {
  const navigation = useNavigationRoot();
  const bussinessOnwers: any = useAppSelector(
    (state: RootState) => state.Admin.ListBussinessOnwer
  );
  const [filteredBussinessOnwers, setFilteredBussinessOnwers] = useState<any[]>(
    []
  );
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const handleApprove = (account: any) => {
    dispatch({
      type: AdminActions.APPROVE_ACCOUNT,
      payload: {
        id: account._id,
        onError: (error: any) => {
          console.log(error);
        },
        onFailed: (MsgNo: string) => {
          console.log(MsgNo);
        },
      },
    });
    setCount(count + 1);
    Alert.alert("Account Approved", `You have approved ${account.username}`);
  };

  const handleReject = (account: any) => {
    dispatch({
      type: AdminActions.REJECT_ACCOUNT,
      payload: {
        id: account._id,
        onError: (error: any) => {
          console.log(error);
        },
        onFailed: (MsgNo: string) => {
          console.log(MsgNo);
        },
      },
    });
    setCount(count + 1);
    Alert.alert("Account Rejected", `You have rejected ${account.username}`);
  };

  useEffect(() => {
    dispatch({
      type: AdminActions.FETCH_LIST_BUSSINESS_OWNER,
      payload: {
        onError: (error: any) => {
          console.log(error);
        },
        onFailed: (MsgNo: string) => {
          console.log(MsgNo);
        },
      },
    });
  }, [count]);

  useEffect(() => {
    const filtered = bussinessOnwers.filter(
      (user: any) => user.status == "pending"
    );
    setFilteredBussinessOnwers(filtered);
  }, [bussinessOnwers]);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(Routes.PendingDetailScreen, {accountId: item._id});
      }}
    >
      <View style={styles.accountContainer}>
        <Image
          source={{
            uri:
              item.image != ""
                ? item.image
                : "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg",
          }}
          style={styles.accountImage}
        />
        <View style={styles.accountInfo}>
          <Text style={styles.accountName}>{item.username}</Text>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.detailButton}
              onPress={() => {
                navigation.navigate(Routes.PendingDetailScreen, {accountId: item._id});
              }}
            >
              <Text style={styles.buttonText}>View Detail</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.approveButton}
              onPress={() => handleApprove(item)}
            >
              <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => handleReject(item)}
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.HOME_ADMIN);
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Approve Bussiness Management</Text>
        <Ionicons name="settings-outline" size={24} color="white" />
      </View>
      <View style={styles.container}>
        <FlatList
          data={filteredBussinessOnwers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3B82F6",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 35, // Adjust for status bar
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  accountContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  accountImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  accountInfo: {
    marginLeft: 10,
    flex: 1,
  },
  accountName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  approveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  rejectButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  detailButton: {
    backgroundColor: "#9F7434",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default PendingAccountScreen;
