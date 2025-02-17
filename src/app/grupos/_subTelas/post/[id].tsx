import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import Markdown from 'react-native-markdown-display';


type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  authorPhoto: string;
};

export default function PosLeituraScreen() {
  const router = useRouter();

  //  post  passado através de parâmetros de navegação
  const post: Post = {
    title: "Reenvio de documentos para auxílio • reabertura de prazos",
    content: `
# Heading 1 se comporta como 3
## Heading 2 se comporta como 3
### Título Grande
Este é um **Markdown** renderizado no React Native.
- Item 1
- Item 2
- [Link](https://example.com)

    `,
    author: "Gertrudes Cabral",
    timestamp: "5h",
    authorPhoto: "https://via.placeholder.com/60",
    id: 0
  };

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
            <Image source={{ uri: post.authorPhoto }} style={styles.authorPhoto} />
          </View>
          <View style={styles.authorInfoContainer}>
            <Text style={styles.department}>DEPAE</Text>
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>
                {post.author} <Text style={styles.dot}>•</Text> <Text style={styles.timestamp}>{post.timestamp}</Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{post.title}</Text>
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
            {post.content}
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
