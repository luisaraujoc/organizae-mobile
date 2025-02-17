import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { GroupHeader } from "@/components/Header";
import GrupoButton from "@/components/GrupoButton";
import { router } from "expo-router";
import FloatingGButton from "@/components/FloatingGButton";
import React from "react";


export default function Group() {
  return (
    <SafeAreaView style={style.container}>
      <GroupHeader />
      <View style={style.body}>
        <GrupoButton
          nomeGrupo="Grupo 1"
          idGrupo={11}
          onPress={() => {
            console.log("Navigating to /grupo/grupo/home");
            router.push("/grupos/grupo/home");
          }}
        />
        <GrupoButton
          nomeGrupo="Grupo 2"
          idGrupo={12}
          onPress={() => {
            console.log("Navigating to /grupo/grupo/home");
            router.push("/grupos/grupo/home");
          }}
        />
        <GrupoButton
          nomeGrupo="Grupo 3"
          idGrupo={13}
          onPress={() => {
            console.log("Navigating to /grupo/grupo/home");
            router.push("/grupos/grupo/home");
          }}
        />
      </View>
      <View style={style.FloatButton}>
        <FloatingGButton />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  FloatButton: {
    position: "absolute",
    width: "100%",
    bottom: 1,
    right: 1,
  },
});
