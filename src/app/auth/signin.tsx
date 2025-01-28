import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import { useEffect } from "react";
import { navigate } from "expo-router/build/global-state/routing";
import SignUp from "./signup";
import { router } from "expo-router";

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
    <View style={styles.container}>
      <View style={styles.backWall}>
        <View style={styles.bottomLogInArea}>
          <Text style={styles.Title}>
            Entre na sua conta{" "}
            <Text style={styles.highlightedText}>Organizaê</Text>
          </Text>

          {/* InputAreas */}
          <View style={styles.InputArea}>
            <View style={styles.MailArea}>
              <Text>Email ou Nome de Usuário</Text>
              <TextInput
                style={styles.UserMailInput}
                onChangeText={() => {}}
                keyboardType="default"
              />
            </View>
            <View style={styles.PassArea}>
              <Text>Senha</Text>
              <TextInput
                style={styles.UserMailInput}
                onChangeText={() => {}}
                keyboardType="default"
              />
            </View>
          </View>

          {/* SignUp Button e LogIn Button */}
          <View style={styles.BottomArea}>
            <View style={styles.BottomAreaLeft}>
              <Text>Novo no Organizaê?</Text>
              <TouchableOpacity onPress={
                () => router.push('/auth/signup')
              }>
                <Text style={styles.SignUpText}>Cadastre-se aqui</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.BottomAreaRight}>
              <TouchableOpacity style={styles.SignInButton}>
                <Text style={styles.SignInText}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  backWall: {
    width: "100%",
    height: "100%",
    backgroundColor: "#01A1C5",
    display: "flex",
    justifyContent: "flex-end",
    // alignContent: 'flex-end'
  },
  bottomLogInArea: {
    backgroundColor: "#fff",
    height: "60%",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingTop: 24,
    paddingHorizontal: 16,
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
    marginVertical: 20,
    marginHorizontal: 8,
  },
  MailArea: {
    marginVertical: 18,
  },
  PassArea: {
    marginTop: 16,
  },
  UserMailInput: {
    borderBottomWidth: 1,
  },
  BottomArea: {
    marginVertical: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  BottomAreaLeft: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  BottomAreaRight: {},
  SignUpText: {
    marginVertical: 2,
    fontSize: 16,
    fontFamily: "MontserratBold",
  },
  SignInButton: {
    backgroundColor: '#01A1C5',
    padding: 16,
    borderRadius: 100,
    width: 120,
    height: 120,
    display: 'flex',
    justifyContent: 'center',
  },
  SignInText: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
});
