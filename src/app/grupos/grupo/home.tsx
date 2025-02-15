import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { StatusBar, Platform } from "react-native";
import { List, UserCircle, X, PlusCircle } from "phosphor-react-native";
import * as Font from "expo-font";
import React, { useEffect, useState, useRef } from "react";
import { FloatingButton as FAB } from "@/components/FloatingButton";
import { useRouter } from "expo-router";

export default function Home() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width * 0.65)).current;
  const router = useRouter();

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

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get('window').width * 0.65,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const sidebarItems = [
    "Diretoria Geral",
    "DGTI",
    "COGEP",
    "CAENS",
    "DEPAE",
    "CORES",
    "ADS",
  ];

  const handleCreateSpace = () => {
    router.push("/grupos/_subTelas/criarEspaco");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menu} onPress={toggleSidebar}>
            {sidebarVisible ? (
              <X size={28} color="#01A1C5" />
            ) : (
              <List size={28} color="#01A1C5" />
            )}
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

      {/* Sidebar (using Animated.View) */}
      <Modal
        transparent={true}
        visible={sidebarVisible}
        onRequestClose={toggleSidebar}
        animationType="none"
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.touchableOverlay}
            onPress={toggleSidebar}
            activeOpacity={1}
          >
            <Animated.View
              style={[
                styles.sidebar,
                {
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              <ScrollView style={styles.scrollView}>
                {sidebarItems.map((item, index) => (
                  <View key={index} style={styles.sidebarItem}>
                    <View style={styles.profileCircle} />
                    <Text style={styles.itemText}>{item}</Text>
                  </View>
                ))}
                <View style={styles.separator} />
                <TouchableOpacity
                  style={styles.createSpaceButton}
                  onPress={handleCreateSpace}
                >
                  <PlusCircle size={24} color="#01A1C5" />
                  <Text style={styles.createSpaceText}>Criar novo Espaço</Text>
                </TouchableOpacity>
              </ScrollView>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    marginRight: 12,
  },
 FloatButton: {
    position: "absolute",
    bottom: "5%",
    right: "2%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  touchableOverlay: {
    flex: 1,
  },
  sidebar: {
    position: "absolute",
    width: "65%",
    height: "100%",
    backgroundColor: "white",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  scrollView: {
    paddingHorizontal: "5%",
    paddingTop: "4%",
    paddingBottom: "4%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  createSpaceButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  createSpaceText: {
    marginLeft: 8,
    color: "#01A1C5",
    fontSize: 16,
  },
});