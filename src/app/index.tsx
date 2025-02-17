import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./grupos/grupo/home";
import Signin from "./auth/signin";
import React from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isLoggedIn = true; // Simule a verificação de login

      if (isLoggedIn) {
        router.push("/grupos/grupo/home"); // Navega para a tela de seleção de grupo	
      } else {
        router.push("/auth/signin"); // Navega para a tela de seleção de grupo
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      {/*  */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});