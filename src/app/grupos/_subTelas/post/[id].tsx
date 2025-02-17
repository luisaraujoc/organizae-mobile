import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import Markdown from 'react-native-markdown-display';
import AsyncStorage from "@react-native-async-storage/async-storage";


type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  espaco: string
  timestamp: string;
  authorPhoto: string;
};

export default function PosLeituraScreen(postId: number) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {

    const fetchPosts = async () => {

      const authToken = await AsyncStorage.getItem("access_token");
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

          const postData = {
            id: postId,
            title: data.data.titulo,
            content: data.data.conteudo,
            author: data.data.usuario,
            espaco: data.data.espaco,
            timestamp: "Agora",
            authorPhoto: "https://avatars.githubusercontent.com/u/62845400?v=4",
          };
          setPost(postData);
          
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const copy = `${post?.content}`;
  console.log(post);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.IconButton} onPress={() => router.back()}>
          <CaretLeft size={24} color="#01A1C5" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.authorContainer}>
          <View style={styles.authorPhotoContainer}>
            <Image source={{ uri: post?.authorPhoto }} style={styles.authorPhoto} />
          </View>
          <View style={styles.authorInfoContainer}>
            <Text style={styles.department}>{
                post?.espaco
              }</Text>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>
                {post?.author} <Text style={styles.dot}>•</Text> <Text style={styles.timestamp}>{post?.timestamp}</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{post?.title}</Text>
          <Markdown
            rules={{
              // Limita os headings para h3 até h6
              heading1: () => null,
              heading2: () => null,
            }}
            style={{
              heading1: { fontSize: 20, fontWeight: 'bold', color: '#333' },
              heading2: { fontSize: 20, fontWeight: 'bold', color: '#333' },
              heading3: { fontSize: 20, fontWeight: 'bold', color: '#333' },
              heading4: { fontSize: 18, fontWeight: 'bold', color: '#444' },
              heading5: { fontSize: 16, fontWeight: 'bold', color: '#555' },
              heading6: { fontSize: 14, fontWeight: 'bold', color: '#666' },
              paragraph: { fontSize: 14, lineHeight: 24, color: "#333" },
              list_item: { marginVertical: 5 },
              code_inline: { backgroundColor: '#f4f4f4', padding: 4, borderRadius: 4, color: '#D63384' },
              code_block: { backgroundColor: '#222', padding: 10, borderRadius: 5, color: '#fff' },
              br: { marginVertical: 10 },
            }}
          >
            {copy}
          </Markdown>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  IconButton: {
    padding: '2%',
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: '4%',
    marginTop: '2%',
  },
  authorPhotoContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  authorPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  authorInfoContainer: {
    marginLeft: 12,
  },
  department: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  authorInfo: {
    marginTop: 2,
  },
  authorName: {
    fontSize: 12,

  },
  dot: {
    color: "#D9D9D9",
    fontSize: 14,
    marginHorizontal: 5,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
  postContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: "transparent",
    width: "100%",
    alignSelf: "center",
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 24,
    color: "#333",
  },
});
