import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { StatusBar, Platform } from "react-native";
import { List, UserCircle, X, PlusCircle } from "phosphor-react-native";
import * as Font from "expo-font";
import React, { useEffect, useState, useRef } from "react";
import { FloatingButton as FAB } from "@/components/FloatingButton";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import PreviaPost from "@/components/PreviaPost";

export default function Home() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width * 0.65)).current;
  const router = useRouter();

  const loadFont = async () => {
    await Font.loadAsync({
      MontserratSemiBold: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
    });
  };

  useEffect(() => {
    loadFont();
  }, []);

  if (!Font.isLoaded) {
    return null;
  }

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get('window').width * 0.65,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const sidebarItems = [
    "Diretoria Geral",
    "DGTI",
    "COGEP",
    "CAENS",
    "DEPAE",
    "CORES",
    "ADS",
  ];

  const posts: Post[] = [
    {
        title: "Reenvio de documentos para auxílio • reabertura de prazos",
        content: "Prezados(as) Senhores(as), Gostaríamos de informar que os documentos poderão ser reenviados até o final deste mês. Além disso, reabrimos os prazos para o envio de novos documentos para análise. O processo de reenvio será realizado por meio da nossa plataforma online, onde os interessados poderão preencher os dados necessários e anexar os arquivos pertinentes. Pedimos que todos os envolvidos atentem-se ao prazo estipulado para garantir que o processo ocorra sem contratempos. Agradecemos a colaboração de todos e estamos à disposição para qualquer dúvida ou esclarecimento.",
        author: "Gertrudes Cabral",
        timestamp: "5h",
        authorPhoto: "https://via.placeholder.com/60",
    },
    {
        title: "Atualização sobre o Auxílio Emergencial",
        content: "A nova atualização sobre o auxílio emergencial foi divulgada. Fique atento às novas datas e valores. Acompanhe as notícias para mais informações.",
        author: "João Silva",
        timestamp: "2h",
        authorPhoto: "https://via.placeholder.com/60",
    },
    {
        title: "Dicas para Gerenciar Suas Finanças",
        content: "Aprenda a gerenciar suas finanças pessoais com dicas práticas e eficazes. Organize seu orçamento e evite dívidas desnecessárias.",
        author: "Maria Oliveira",
        timestamp: "1d",
        authorPhoto: "https://via.placeholder.com/60",
    },
    {
        title: "Como Funciona o Programa de Bolsa Família",
        content: "Entenda como funciona o programa de Bolsa Família e como ele pode ajudar sua família. Informações sobre requisitos e benefícios.",
        author: "Carlos Pereira",
        timestamp: "3d",
        authorPhoto: "https://via.placeholder.com/60",
    },
    {
        title: "Mudanças nas Regras do Auxílio Brasil",
        content: "Fique por dentro das mudanças nas regras do Auxílio Brasil e como isso pode impactar você e sua família. Acompanhe as atualizações.",
        author: "Ana Costa",
        timestamp: "1w",
        authorPhoto: "https://via.placeholder.com/60",
    }
];

  const handleCreateSpace = () => {
    router.push("/grupos/_subTelas/criarEspaco");
  };

  const handlePostPress = (Post) => {
    router.push("/grupos/_subTelas/post/%5Bid%5D");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menu} onPress={toggleSidebar}>
            {sidebarVisible ? (
              <X size={28} color="#01A1C5" />
            ) : (
              <List size={28} color="#01A1C5" />
            )}
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Organizaê</Text>
        </View>
      </View>
      <ScrollView style={styles.body}>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <PreviaPost
              key={index}
              postAuthor={post.author}
              postTimer={post.timestamp}
              postTitle={post.title}
              postDescription={post.content}
              onPress={() => handlePostPress(post)}
            />
          ))
        ) : (
          <View style={styles.noPostsContainer}>
            <Text style={styles.noPostsText}>Nenhum post foi feito até o momento.</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.FloatButton}>
        <FAB userType={"admin"} />
      </View>

      {/* Sidebar (using Animated.View) */}
      <Modal
        transparent={true}
        visible={sidebarVisible}
        onRequestClose={toggleSidebar}
        animationType="none"
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.touchableOverlay}
            onPress={toggleSidebar}
            activeOpacity={1}
          >
            <Animated.View
              style={[
                styles.sidebar,
                {
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              <ScrollView style={styles.scrollView}>
                {sidebarItems.map((item, index) => (
                  <View key={index} style={styles.sidebarItem}>
                    <View style={styles.profileCircle} />
                    <TouchableOpacity onPress={() => {
                      toggleSidebar();
                      router.navigate('/grupos/_subTelas/espaco/[id]')
                    }}>
                      <Text style={styles.itemText} >{item}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                <View style={styles.separator} />
                <TouchableOpacity
                  style={styles.createSpaceButton}
                  onPress={handleCreateSpace}
                >
                  <PlusCircle size={24} color="#01A1C5" />
                  <Text style={styles.createSpaceText}>Criar novo Espaço</Text>
                </TouchableOpacity>
              </ScrollView>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  headerTitle: {
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
    color: "#01A1C5",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    display: "flex",
    alignContent: "flex-start",
    flex: 1,
    paddingHorizontal: '2%'
  },
  menu: {
    marginRight: 12,
  },
  FloatButton: {
    position: "absolute",
    bottom: 1,
    right: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  touchableOverlay: {
    flex: 1,
  },
  sidebar: {
    position: "absolute",
    width: "65%",
    height: "100%",
    backgroundColor: "white",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  scrollView: {
    paddingHorizontal: "5%",
    paddingTop: "4%",
    paddingBottom: "4%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  createSpaceButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  createSpaceText: {
    marginLeft: 8,
    color: "#01A1C5",
    fontSize: 16,
  },
  noPostsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  noPostsText: {
    fontSize: 18,
    color: '#888',
  },
});