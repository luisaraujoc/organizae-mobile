import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import * as Font from "expo-font";
import { router } from "expo-router";
import React, { useEffect } from "react";
import Textinput from "@/components/Textinput";

export default function SignUp() {
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
          Crie sua conta{"\n"}
          <Text style={styles.highlightedText}>Organizaê</Text>
        </Text>

        {/* InputAreas */}
        <View style={styles.InputArea}>
          <View style={styles.InputBox}>
            <Text style={styles.defaultText}>Nome completo</Text>
            <Textinput onChangeText={() => {}} keyboardType="default" />
          </View>
          <View style={styles.InputBox}>
            <Text style={styles.defaultText}>Nome de Usuário</Text>
            <Textinput onChangeText={() => {}} keyboardType="default" />
          </View>
          <View style={styles.InputBox}>
            <Text style={styles.defaultText}>Email</Text>
            <Textinput onChangeText={() => {}} keyboardType="email-address" />
          </View>
          <View style={styles.InputBox}>
            <Text style={styles.defaultText}>Senha</Text>
            <Textinput onChangeText={() => {}} keyboardType="default" />
          </View>
          <View style={styles.InputBox}>
            <Text style={styles.defaultText}>Confirme sua senha</Text>
            <Textinput onChangeText={() => {}} keyboardType="default" />
          </View>
        </View>

        {/* SignUp Button e LogIn Button */}
        <View style={styles.ButtonArea}>
                  <View style={styles.ButtonAreaLeft}>
                    <Text style={[styles.defaultText]}>Já tem uma conta?</Text>
                    <TouchableOpacity onPress={() => router.back()}>
                      <Text style={styles.SignUpText}>Faça Login aqui</Text>
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
  Title: {
    fontFamily: "MontserratBold",
    fontSize: 24,
  },
  highlightedText: {
    color: "#01A1C5",
    fontFamily: "MontserratBold",
  },
  InputArea: {
    padding: 4,
  },
  InputBox: {
    marginBottom: 16,
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
