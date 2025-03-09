import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BottomBar = () => {
  return (
    <View style={styles.bottomBar}>
      <View style={styles.iconContainer}>
        <Ionicons name="bar-chart-outline" size={30} color="black" />
        <Text style={styles.iconText}>Dashboard</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="trending-up-outline" size={30} color="black" />
        <Text style={styles.iconText}>Transaction</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="person-outline" size={30} color="black" />
        <Text style={styles.iconText}>Staff</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="cube-outline" size={30} color="black" />
        <Text style={[styles.iconText]}>Warehouse</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="people-outline" size={30} color="black" />
        <Text style={styles.iconText}>Customer</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="storefront-outline" size={30} color="black" />
        <Text style={[styles.iconText]}>Store</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  iconContainer: {
    alignItems: "center",
  },
  iconText: {
    fontSize: 12,
    color: "#333",
    marginTop: 4,
  },
});

export default BottomBar;