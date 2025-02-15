import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateSpaceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Conte-nos sobre o novo espaço</Text>      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    color: "#01A1C5",
    fontFamily: "MontserratSemiBold",
    textAlign: "center",
    marginTop: 24,
  },
});
