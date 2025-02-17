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
  const [posts, setPosts] = useState<Post[]>([]); 
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

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const response = await fetch("https://organizae-f7aca8e7f687.herokuapp.com/posts/posts", {
          method: "GET",
          headers: {
            "Authorization": 'Bearer YOUR_TOKEN_HERE', 
          },
        });
        const data = await response.json();
        if (data.status === "sucesso") {
          const postsData = data.data.map((post: any) => ({
            id: post.id,
            title: post.titulo,
            content: post.conteudo,
            author: "Autor Exemplo",
            timestamp: "Agora", 
            authorPhoto: "https://via.placeholder.com/60",
          }));
          setPosts(postsData); 
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); 
  }, []);

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

  // json com os itens do sidebar
  // idEspaco: number, nomeEspaco: string
  const sidebarItems = [
    {
      idEspaco: 1,
      nomeEspaco: "Espaço 1",
    },
    {
      idEspaco: 2,
      nomeEspaco: "Espaço 2",
    },
    {
      idEspaco: 3,
      nomeEspaco: "Espaço 3",
    },
    {
      idEspaco: 4,
      nomeEspaco: "Espaço 4",
    },
  ]

  const handleCreateSpace = () => {
    router.push("/grupos/_subTelas/criarEspaco");
  };

  const handlePostPress = (postId: number) => {
    router.push('/grupos/_subTelas/post/${postId}');
  };

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
        {posts.length === 0 ? (
          <View style={styles.noPostsContainer}>
            <Text style={styles.noPostsText}>Nenhum post disponível.</Text>
          </View>
        ) : (
          posts.map((post) => (
            <TouchableOpacity
              key={post.id}
              onPress={() => handlePostPress(post.id)}
            >
              <PreviaPost post={post} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <View style={styles.FloatButton}>
        <FAB userType={"admin"} />
      </View>

      {}
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
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              <ScrollView style={styles.scrollView}>
                {sidebarItems.map((item, index) => (
                  <View key={index} style={styles.sidebarItem}>
                    <View style={styles.profileCircle} />
                    <TouchableOpacity
                      onPress={() => {
                        toggleSidebar();
                        router.push('/grupos/_subTelas/espaco/[id]');
                      }}
                    >
                      <Text style={styles.itemText}>
                        {item.nomeEspaco}
                      </Text>
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
    paddingHorizontal: '2%',
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