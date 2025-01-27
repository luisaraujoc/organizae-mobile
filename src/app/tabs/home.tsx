import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import { StatusBar, Platform } from "react-native";
  import { List, UserCircle, Warning } from "phosphor-react-native";
  import * as Font from "expo-font";
  import { useEffect } from "react";
  
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
        <StatusBar barStyle={"dark-content"} backgroundColor={'white'} />
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => console.log("Menu")}
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
      alignItems: "center",  },
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
  });
  