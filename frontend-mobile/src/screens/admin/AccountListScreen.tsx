import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Switch,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigationRoot } from "@components/navigate/RootNavigation";

interface Account {
  id: string;
  name: string;
  status: "Active" | "Blocked";
}

const accountsData: Account[] = [
  { id: "1", name: "John Doe", status: "Active" },
  { id: "2", name: "Jane Smith", status: "Blocked" },
  { id: "3", name: "Michael Brown", status: "Active" },
  { id: "4", name: "Emily Davis", status: "Blocked" },
];

const AccountListScreen: React.FC = () => {
  const navigation = useNavigationRoot();
  const [accounts, setAccounts] = useState<Account[]>(accountsData);

  const toggleAccountStatus = (id: string) => {
    const updatedAccounts: Account[] = accounts.map((account) => {
      if (account.id === id) {
        return {
          ...account,
          status: account.status === "Active" ? "Blocked" : "Active",
        };
      }
      return account;
    });
    setAccounts(updatedAccounts);
  };

  const renderItem = ({ item }: { item: Account }) => (
    <TouchableOpacity
      style={styles.accountItem}
      onPress={() =>
        navigation.navigate("AccountDetailScreen", {
          id: item.id,
          name: item.name,
          status: item.status,
        })
      }
    >
      <Text style={styles.accountName}>{item.name}</Text>
      <Text style={styles.accountStatus}>{item.status}</Text>
      <Switch
        value={item.status === "Active"}
        onValueChange={() => toggleAccountStatus(item.id)}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Account List</Text>
      </View>
      <FlatList
        data={accounts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  accountItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 1,
  },
  accountName: {
    fontSize: 16,
  },
  accountStatus: {
    fontSize: 16,
    color: "#757575",
  },
});

export default AccountListScreen;
