import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Post = {
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
    content:
      "Prezados(as) Senhores(as), Gostaríamos de informar que os documentos poderão ser reenviados até o final deste mês. Além disso, reabrimos os prazos para o envio de novos documentos para análise. O processo de reenvio será realizado por meio da nossa plataforma online, onde os interessados poderão preencher os dados necessários e anexar os arquivos pertinentes. Pedimos que todos os envolvidos atentem-se ao prazo estipulado para garantir que o processo ocorra sem contratempos. Agradecemos a colaboração de todos e estamos à disposição para qualquer dúvida ou esclarecimento.",
    author: "Gertrudes Cabral",
    timestamp: "5h", 
    authorPhoto: "https://via.placeholder.com/60", 
  };

  const handleBackPress = () => {
    router.back(); // Volta para a tela anterior
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="grey" />
        </TouchableOpacity>
      </View>

      {/* Informações do autor e departamento lado a lado */}
      <View style={styles.authorContainer}>
        {/* Foto do autor */}
        <View style={styles.authorPhotoContainer}>
          <Image source={{ uri: post.authorPhoto }} style={styles.authorPhoto} />
        </View>

        {/* Nome do departamento e informações do autor */}
        <View style={styles.authorInfoContainer}>
          <Text style={styles.department}>DEPAE</Text>
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>
              {post.author} <Text style={styles.dot}>•</Text> <Text style={styles.timestamp}>{post.timestamp}</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Conteúdo do Post */}
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postContent}>{post.content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  header: {
    height: 65, 
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, 
  },
  backButton: {
    color: "red", 
    position: "absolute",
    left: 20, 
    top: "50%", 
    transform: [{ translateY: -15 }], 
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  authorPhotoContainer: {
    width: 60,
    height: 60,
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
    fontSize: 16, 
    fontWeight: "bold",
    marginBottom: 25,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 24,
    color: "#333",
  },
});
