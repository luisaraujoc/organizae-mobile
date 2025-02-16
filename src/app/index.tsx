import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./grupos/grupo/home";
import Signin from "./auth/signin";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isLoggedIn = true; // Simule a verificação de login

      if (isLoggedIn) {
        router.push("/tabs/espaco"); // Navega para a tela home se o usuário estiver logado
                                     // Navega para a tela home se o usuário estiver logado
      } else {
        router.push("/auth/signin"); // Navega para a tela de seleção de grupo
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      
    </View>
  );
}

const Stack = createNativeStackNavigator();

/*export default function Index(){
  return(
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}*/


export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { authState?.authenticated ? (
          <Stack.Screen name="Home" component={Home} />
        ) :
        (
          <Stack.Screen name="SignIn" component={Signin} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});