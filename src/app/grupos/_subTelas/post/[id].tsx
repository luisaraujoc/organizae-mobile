import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import Markdown from "react-native-markdown-display";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  espaco: string;
  timestamp: string;
  imageUrl: string | null;
};

export default function PosLeituraScreen() {
  const router = useRouter();
  const { postId } = useLocalSearchParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      const authToken = await AsyncStorage.getItem("access_token");
      if (!authToken) {
        console.error("Token de autenticação não encontrado.");
        return;
      }

      try {
        const response = await fetch(`https://organizae-f7aca8e7f687.herokuapp.com/posts/posts/${postId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${authToken}`,
          },
        });

        const data = await response.json();
        if (data.status === "sucesso") {
          console.log(data.data.conteudo);

          const postData: Post = {
            id: data.data.id,
            title: data.data.titulo,
            content: data.data.conteudo,
            author: data.data.usuario,
            espaco: data.data.espaco,
            timestamp: data.data.dataPostagem,
            imageUrl: data.data.imagem || null,
          };
          setPost(postData);
        } else {
          console.error("Erro ao buscar post:", data.mensagem);
        }
      } catch (error) {
        console.error("Erro ao buscar post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Carregando post...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.IconButton} onPress={() => router.back()}>
          <CaretLeft size={24} color="#01A1C5" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.authorContainer}>
          <Image
            source={{ uri: post.imageUrl || "https://via.placeholder.com/150" }}
            style={styles.authorPhoto}
          />
          <View style={styles.authorInfoContainer}>
            <Text style={styles.department}>{post.espaco}</Text>
            <Text style={styles.authorName}>
              {post.author} <Text style={styles.dot}>•</Text> <Text style={styles.timestamp}>{post.timestamp}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Markdown style={markdownStyles}>{post.content}</Markdown>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingText: { textAlign: "center", marginTop: 20, fontSize: 16 },
  header: { flexDirection: "row", alignItems: "center", padding: 8 },
  IconButton: { padding: 10 },
  authorContainer: { flexDirection: "row", alignItems: "center", marginHorizontal: 16, marginTop: 16 },
  authorPhoto: { width: 60, height: 60, borderRadius: 30 },
  authorInfoContainer: { marginLeft: 12 },
  department: { fontSize: 18, fontWeight: "bold", color: "#333" },
  authorName: { fontSize: 12 },
  dot: { color: "#D9D9D9", fontSize: 14, marginHorizontal: 5 },
  timestamp: { fontSize: 12, color: "gray" },
  postContainer: { margin: 20, padding: 20 },
  postTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});

const markdownStyles = {
  paragraph: { fontSize: 14, lineHeight: 24, color: "#333" },
  list_item: { marginVertical: 5 },
  code_inline: { backgroundColor: "#f4f4f4", padding: 4, borderRadius: 4, color: "#D63384" },
  code_block: { backgroundColor: "#222", padding: 10, borderRadius: 5, color: "#fff" },
};

