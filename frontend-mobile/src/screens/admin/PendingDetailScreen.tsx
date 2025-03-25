import type React from "react"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native"
import { useRoute, type RouteProp } from "@react-navigation/native"
import { useNavigationRoot } from "@components/navigate/RootNavigation"
import { useDispatch } from "react-redux"
import { useAppSelector } from "@redux/store"
import type { RootState } from "@redux/root-reducer"
import AdminActions from "@redux/admin/actions"
import { Ionicons } from "@expo/vector-icons"

type AccountDetailParams = {
  accountId: number
}

const PendingDetailScreen: React.FC = () => {
  const navigation = useNavigationRoot()
  const route = useRoute<RouteProp<Record<string, AccountDetailParams>, string>>()
  const { accountId } = route.params || { accountId: 0 }

  const dispatch = useDispatch()
  const businessOwners = useAppSelector((state: RootState) => state.Admin.ListBussinessOnwer)

  const [account, setAccount] = useState<any>(null)

  useEffect(() => {
    // Find the account with the matching ID
    const foundAccount = businessOwners.find((owner: any) => owner._id === accountId)
    if (foundAccount) {
      setAccount(foundAccount)
    } 
  }, [accountId, businessOwners])

  const handleApprove = () => {
    if (!account) return

    dispatch({
      type: AdminActions.APPROVE_ACCOUNT,
      payload: {
        id: account._id,
      },
    })
    Alert.alert("Success", `Account ${account.username} has been approved`, [
      { text: "OK", onPress: () => navigation.goBack() },
    ])
  }

  const handleReject = () => {
    if (!account) return

    dispatch({
      type: AdminActions.REJECT_ACCOUNT,
      payload: {
        id: account._id,
      },
    })
    Alert.alert("Success", `Account ${account.username} has been rejected`, [
      { text: "OK", onPress: () => navigation.goBack() },
    ])
  }

  if (!account) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading account details...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Account Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: account.image || "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>{account.username}</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{account.status.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Account Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{account.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{account.phone || "Not provided"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Role:</Text>
            <Text style={styles.infoValue}>{account.role}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Verified:</Text>
            <Text style={styles.infoValue}>{account.verified ? "Yes" : "No"}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Created:</Text>
            <Text style={styles.infoValue}>{new Date(account.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>

        {account.storeId && (
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Store Information</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Store Name:</Text>
              <Text style={styles.infoValue}>{account.storeId.name}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Address:</Text>
              <Text style={styles.infoValue}>{account.storeId.address}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={styles.infoValue}>{account.storeId.phone}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Customers:</Text>
              <Text style={styles.infoValue}>{account.storeId.customers?.length || 0}</Text>
            </View>
          </View>
        )}

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
            <Text style={styles.buttonText}>Approve Account</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <Text style={styles.buttonText}>Reject Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
  content: {
    flex: 1,
    padding: 16,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: "#FFC107",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: "#000",
    fontWeight: "bold",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#3B82F6",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  infoLabel: {
    width: 100,
    fontWeight: "bold",
    color: "#666",
  },
  infoValue: {
    flex: 1,
    color: "#333",
  },
  actionButtons: {
    marginVertical: 24,
  },
  approveButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  rejectButton: {
    backgroundColor: "#f44336",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})

export default PendingDetailScreen

