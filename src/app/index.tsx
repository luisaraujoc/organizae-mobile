import { View, Text, StyleSheet } from "react-native";
import Signin from "./auth/signin";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import SignUp from "./auth/signup";
import GroupSelection from "./groupSelect/group";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isLoggedIn = false;

      if (isLoggedIn) {
        router.navigate("/tabs/home");
      } else {
        return <GroupSelection />;
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return <GroupSelection />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
