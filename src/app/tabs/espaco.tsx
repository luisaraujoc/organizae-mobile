import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Usando useRouter para navegação

// Definindo o tipo para o 'post'
type Post = {
  title: string;
  content: string;
};

const { height, width } = Dimensions.get("window");

export default function AdminSpaceScreen() {
  const router = useRouter(); // Usando useRouter para navegação
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePostPress = (post: Post) => {
    router.push("/grupos/_subTelas/postleitura");
  };

  const handleBackPress = () => {
    router.back(); // Voltar para a página anterior
  };

  const handleEditPress = () => {
    router.push("/grupos/_subTelas/criarEspaco"); // Navegar para a página de criação de espaço
  };

  const handleNavPress = (route: string) => {
    router.push(route); // Navegar para a rota especificada
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.profileContainer}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person-circle" size={60} color="#ccc" />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileName}>DEPAE</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <Text style={styles.editButtonText}>editar espaço</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={toggleDescription} style={styles.profileDescriptionContainer}>
          <Text style={styles.profileDescription}>
            {isExpanded
              ? "descriçãodescriçãodescriçãodescriçãodescrição... Mais conteúdo aqui! A descrição será expandida quando o usuário clicar neste texto."
              : "descriçãodescriçãodescriçãodescriçãodescrição..."}
          </Text>
        </TouchableOpacity>

        <View style={styles.postsContainer}>
          {/* Post 1 */}
          <TouchableOpacity
            style={styles.postContainer}
            onPress={() =>
              handlePostPress({
                title: "Reenvio de documentos para auxílio • reabertura de prazos",
                content:
                  "Prezados(as) Senhores(as), Gostaríamos de informar que os documentos poderão ser reenviados até o final deste mês...",
              })
            }
          >
            <Text style={styles.postAuthor}>Gertrudes Cabral 5h</Text>
            <Text style={styles.postTitle}>Reenvio de documentos para auxílio • reabertura de prazos</Text>
            <Text style={styles.postDescription}>
              {truncateText(
                "Prezados(as) Senhores(as), Gostaríamos de informar que os documentos poderão ser reenviados até o final deste mês...",
                80
              )}
            </Text>
          </TouchableOpacity>

          {/* Post 2 */}
          <TouchableOpacity
            style={styles.postContainer}
            onPress={() =>
              handlePostPress({
                title: "Calendário de Pagamento da Próxima Parcela do Auxílio",
                content:
                  "Prezados(as) Senhores(as), Gostaríamos de comunicar que o pagamento da próxima parcela do auxílio estudantil ocorrerá na segunda semana do próximo mês...",
              })
            }
          >
            <Text style={styles.postAuthor}>Gertrudes Cabral 5h</Text>
            <Text style={styles.postTitle}>Calendário de Pagamento da Próxima Parcela do Auxílio</Text>
            <Text style={styles.postDescription}>
              {truncateText(
                "Prezados(as) Senhores(as), Gostaríamos de comunicar que o pagamento da próxima parcela do auxílio estudantil ocorrerá na segunda semana do próximo mês...",
                80
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de Navegação Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavPress("/grupos/grupo/home")}>
          <Ionicons name="home-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavPress("/grupos/grupo/buscar")}>
          <Ionicons name="search-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavPress("/criarespaco")}>
          <Ionicons name="add-circle" size={48} color="#00AEEF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavPress("/notificações")}>
          <Ionicons name="chatbubble-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavPress("/perfil")}>
          <Ionicons name="person-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#01A1C5",
  },
  header: {
    height: 80,
    backgroundColor: "#01A1C5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  backButton: {
    padding: 5,
  },
  iconContainer: {
    flexDirection: "row",
  },
  notificationButton: {
    padding: 5,
    marginRight: 15,
  },
  menuButton: {
    padding: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderRadius: 20,
    marginHorizontal: 0,
    paddingTop: 15,
    paddingBottom: 0,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 60,
    height: height - 80,
    width: width,
    marginTop: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    flex: 1,
    marginLeft: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileDescriptionContainer: {
    marginTop: 10,
  },
  profileDescription: {
    fontSize: 14,
    color: "gray",
    width: "100%",
  },
  editButton: {
    padding: 7,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  editButtonText: {
    fontSize: 12,
  },
  postsContainer: {
    marginTop: 10,
    flex: 1,
  },
  postContainer: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  postAuthor: {
    fontSize: 12,
    color: "gray",
    marginBottom: 5,
  },
  postTitle: {
    fontSize: 14,
    fontWeight: "bold",
    width: "100%",
  },
  postDescription: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
    width: "100%",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
