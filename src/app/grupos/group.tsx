import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, Text, ActivityIndicator, Image } from "react-native";
import { GroupHeader } from "@/components/Header";
import GrupoButton from "@/components/GrupoButton";
import { router } from "expo-router";
import FloatingGButton from "@/components/FloatingGButton";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getGroups = async (authToken: string) => {
  try {
    const { data } = await axios.get("https://organizae-f7aca8e7f687.herokuapp.com/groups/", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (data.status === "vazio") {
      console.log(data.mensagem);
      return [];
    }

    if (data.status === "sucesso") {
      console.log(data.mensagem);
      return data.data;
    }
  } catch (error: any) {
    console.error("Erro ao buscar grupos:", error.response ? error.response.data : error.message);
    return [];
  }
};

export default function Group() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {

        const authToken = await AsyncStorage.getItem("access_token");

        if (!authToken) {
          console.error("Token de autenticação não encontrado.");
          setLoading(false);
          return;
        }

        const fetchedGroups = await getGroups(authToken);
        setGroups(fetchedGroups);
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <GroupHeader />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={style.body}>
          {groups.length > 0 ? (
            groups.map((group) => (
              <GrupoButton
                key={group.id}
                nomeGrupo={group.nome}
                idGrupo={group.id}
                onPress={() => {
                  router.push('/grupos/grupo/home');
                }}
              >

                {group.imagem ? (
                  <Image source={{ uri: group.imagem }} style={style.groupImage} />
                ) : (
                  <Text style={style.noImageText}>Sem imagem</Text>
                )}
              </GrupoButton>
            ))
          ) : (
            <View style={style.noGroupsBody}>
              <Text style={style.noGroupsText}>Você não participa de nenhum grupo.</Text>
            </View>
          )}
        </View>
      )}
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
    flex: 1,
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
  noGroupsBody: {
    // flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  noGroupsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  noImageText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});