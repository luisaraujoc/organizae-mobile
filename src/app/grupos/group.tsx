import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { GroupHeader } from "@/components/Header";
import GrupoButton from "@/components/GrupoButton";
import { router } from "expo-router";

export default function Group() {
  return (
    <SafeAreaView style={style.container}>
      <GroupHeader />
      <View style={style.bodySec}>
        // In your Group component
        <GrupoButton
          nomeGrupo="Grupo 1"
          onPress={() => {
            console.log("Navigating to /grupo/grupo/home");
            router.push("/grupos/grupo/home");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bodySec: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
