import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const posts = [
  {
    id: "1",
    author: "Gertrudes Cabral",
    time: "5h",
    title: "Reenvio de documentos para auxílio • reabertura de prazos",
    content:
      "Gostaríamos de informar que, após uma revisão detalhada de nossos registros, identificamos que alguns documentos necessários para a concessão do auxílio solicitado não foram recebidos ou estão incompletos...",
  },
  {
    id: "2",
    author: "Gertrudes Cabral",
    time: "5h",
    title: "Calendário de Pagamento da Próxima Parcela do Auxílio",
    content:
      "Gostaríamos de comunicar que o pagamento da próxima parcela do auxílio está previsto para ocorrer no dia 20 de setembro de 2024...",
  },
  {
    id: "3",
    author: "Gertrudes Cabral",
    time: "5h",
    title: "Atualização Cadastral Obrigatória para Manutenção do Auxílio",
    content: "Prezados(as) Senhores(as)...",
  },
];

const AdminSpace = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" />
        <Ionicons name="ellipsis-vertical" size={24} color="white" />
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.avatar} />
        <Text style={styles.profileName}>DEPAE</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text>editar espaço</Text>
        </TouchableOpacity>
        <Text style={styles.profileDescription}>descrição...</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Text>{item.author} {item.time}</Text>
              <MaterialIcons name="more-vert" size={20} color="black" />
            </View>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { backgroundColor: "#29b6f6", padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  profileSection: { backgroundColor: "white", padding: 20, alignItems: "center", borderBottomWidth: 1, borderColor: "#ddd" },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  profileName: { fontSize: 18, fontWeight: "bold" },
  editButton: { backgroundColor: "#eee", padding: 8, borderRadius: 5, marginTop: 5 },
  profileDescription: { textAlign: "center", marginTop: 10 },
  postContainer: { backgroundColor: "white", padding: 15, marginBottom: 10 },
  postHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  postTitle: { fontWeight: "bold", marginTop: 5 },
  postContent: { marginTop: 5 },
  fab: { position: "absolute", bottom: 20, right: 20, backgroundColor: "#29b6f6", padding: 15, borderRadius: 30, elevation: 5 },
});

export default AdminSpace;
