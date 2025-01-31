import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isLoggedIn = true; // Simule a verificação de login

      if (isLoggedIn) {
        router.push("/groupSelect/group"); // Navega para a tela home se o usuário estiver logado
      } else {
        router.push("/auth/signin"); // Navega para a tela de seleção de grupo
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      {/* Você pode adicionar um carregando ou algo aqui se quiser */}
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