import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import SignUp from "./signup";
import { router } from "expo-router";
import Textinput from "@/components/Textinput";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signin() {
  const loadFont = async () => {
    await Font.loadAsync({
      MontserratLight: require("@/assets/fonts/Montserrat-Light.ttf"),
      MontserratRegular: require("@/assets/fonts/Montserrat-Regular.ttf"),
      MontserratMedium: require("@/assets/fonts/Montserrat-Medium.ttf"),
      MontserratSemiBold: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
      MontserratBold: require("@/assets/fonts/Montserrat-Bold.ttf"),
    });
  };

  useEffect(() => {
    loadFont();
  }, []);

  if (!Font.isLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.BottomArea}>
        <Text style={styles.Title}>
          Entre na sua conta{"\n"}
          <Text style={styles.highlightedText}>Organizaê</Text>
        </Text>

        {/* InputAreas */}
        <View style={styles.InputArea}>
          <View style={styles.InputBox}>
            <Text style={[styles.defaultText]}>Email ou Nome de Usuário</Text>
            <Textinput onChangeText={() => {}} keyboardType="default" />
          </View>
          <View style={styles.InputBox}>
            <Text style={[styles.defaultText]}>Senha</Text>
            <Textinput onChangeText={() => {}} keyboardType="default" />
          </View>w
        </View>

        {/* SignUp Button e LogIn Button */}
        <View style={styles.ButtonArea}>
          <View style={styles.ButtonAreaLeft}>
            <Text style={[styles.defaultText]}>Novo no Organizaê?</Text>
            <TouchableOpacity onPress={() => router.push("/auth/signup")}>
              <Text style={styles.SignUpText}>Cadastre-se aqui</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ButtonAreaRight}>
            <TouchableOpacity style={styles.SignInButton}>
              <Text style={styles.SignInText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01A1C5",
    display: "flex",
    justifyContent: "flex-end",
  },
  defaultText: {
    fontFamily: "MontserratRegular",
    fontSize: 14,
    color: '#808080',
  },
  BottomArea: {
    backgroundColor: "#fff",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  Title:{
    fontFamily: "MontserratBold",
    fontSize: 28,
  },
  highlightedText: {
    color: "#01A1C5",
    fontFamily: "MontserratBold",
  },
  InputArea: {
    padding: 4,
  },
  InputBox: {
    paddingVertical: 12,
  },
  ButtonArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
  },
  ButtonAreaLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  ButtonAreaRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  SignUpText: {
    color: "#000",
    fontFamily: "MontserratBold",
    fontSize: 16,
    paddingVertical: 8,
  },
  SignInButton: {
    backgroundColor: "#01A1C5",
    width: 120,
    height: 120,
    padding: 16,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
  },
  SignInText: {
    color: "#fff",
    fontFamily: "MontserratBold",
    fontSize: 24,
    textAlign: "center",
  },
});
