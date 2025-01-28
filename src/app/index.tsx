import { View, Text, StyleSheet } from "react-native";
import Signin from "./auth/signin";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isLoggedIn = false;

      if (isLoggedIn) {
        router.navigate("/tabs/home");
      } else {
        return <Signin />;
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return <Signin />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
