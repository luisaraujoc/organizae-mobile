import { View, Text, StyleSheet } from "react-native";
import * as Font from "expo-font";
import React, { useEffect } from 'react';
import Textinput from "@/components/Textinput";

export default function SignUp() {
  const loadFont = async () => {
    await Font.loadAsync({
      MontserratLight: require("@/assets/fonts/Montserrat-Light.ttf"),
      MontserratRegular: require("@/assets/fonts/Montserrat-Regular.ttf"),
      MontserratMedium: require("@/assets/fonts/Montserrat-Medium.ttf"),
      MontserratSemiBold: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
      MontserratBold: require("@/assets/fonts/Montserrat-Bold.ttf"),
      InterRegular: require('@/assets/fonts/Inter_18pt-Regular.ttf')
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
      <View style={styles.backWall}>
        <View style={styles.BottomForm}>
          <Text style={styles.Title}>
            Crie sua conta{"\n"}
            <Text style={styles.highlightedText}>Organizaê</Text>
          </Text>

          {/* InputAreas */}
          <View>
            {/* <Text style={ styles.defaultText}>Nome</Text> */}
            <Textinput />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Inter',
    fontSize: 14,
  },
  container: {
    height: "100%",
  },
  backWall: {
    backgroundColor: "#01A1C5",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  BottomForm: {
    height: "auto",
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "#fff",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  Title: {
    fontFamily: 'MontserratBold',
    fontSize: 24,
  },
  highlightedText: {
    color: "#01A1C5",
    fontFamily: 'MontserratBold',
  },
});
