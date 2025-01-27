import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar, Platform } from "react-native";
import { UserCircle } from "phosphor-react-native";
import * as Font from "expo-font";
import { useEffect } from "react";

export default function Grupo() {
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
        <Text style={styles.headerTitle}>Grupos</Text>
        <TouchableOpacity onPress={() => console.log("User")}>
          <UserCircle size={32} color="#01A1C5" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text>Por enquanto, nada!</Text>
        <Text>Grupos tela</Text>
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
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    height: "100%",
  },
});
