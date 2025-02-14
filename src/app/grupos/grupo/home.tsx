import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { StatusBar, Platform } from "react-native";
import { List, UserCircle, Warning } from "phosphor-react-native";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { FloatingButton as FAB } from "@/components/FloatingButton";

export default function Home() {

  const loadFont = async () => {
    await Font.loadAsync({
      MontserratSemiBold: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
    });
  };

  useEffect(() => {
    loadFont();
  }, []);

  if (!Font.isLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.menu}
          >
            <List size={28} color="#01A1C5" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Organizaê</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => console.log("User")}>
            <UserCircle size={32} color="#01A1C5" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <Text>Por enquanto, nada!</Text>
        <Text>Home do grupo</Text>
      </View>
      <View style={styles.FloatButton}>
        <FAB userType={"admin"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  headerTitle: {
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
    color: "#01A1C5",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    height: "100%",
  },
  menu: {
    marginRight: 12,
  },
  FloatButton: {
    position: "absolute",
    width: "100%",
    bottom: "5%",
    right: "0.1%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sidebar: {
    width: "65%",
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: '2%',
    paddingVertical: '4%',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ddd",
  },
});
