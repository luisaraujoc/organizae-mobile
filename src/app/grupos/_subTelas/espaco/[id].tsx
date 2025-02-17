import React, {useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, SafeAreaView} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Bell, CaretLeft, DotsThreeOutlineVertical} from "phosphor-react-native";
import PreviaPost from "@/components/PreviaPost";
import {router} from "expo-router";

const {height, width} = Dimensions.get("window");

const posts = [
    {
        postAuthor: "Gertrudes Cabral",
        postTimer: "5h",
        postTitle: "Calendário de Pagamento da Próxima Parcela do Auxílio",
        postDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse suscipit dapibus risus et faucibus. Integer consequat ipsum nunc, eget sagittis metus accumsan sed. Sed ornare laoreet hendrerit. Etiam mollis, eros non aliquet sagittis, arcu erat eleifend ipsum, nec ullamcorper massa augue eget elit. In tristique nec diam porttitor eleifend. Duis lacinia malesuada est id ultricies. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce faucibus turpis non metus commodo consequat. Maecenas mattis enim quis massa porttitor gravida. Vivamus sagittis nunc ac condimentum lobortis. Fusce nec quam non orci dapibus pulvinar at nec enim. Duis at semper libero, ac mattis velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam vulputate lorem ut justo rutrum, quis fringilla lorem pulvinar. Fusce consequat varius massa, quis elementum lacus blandit vel. Donec ut molestie erat."
    },
    {
        postAuthor: "João Silva",
        postTimer: "2h",
        postTitle: "Atualização sobre o Auxílio Emergencial",
        postDescription: "A nova atualização sobre o auxílio emergencial foi divulgada. Fique atento às novas datas e valores. Acompanhe as notícias para mais informações."
    },
    {
        postAuthor: "Maria Oliveira",
        postTimer: "1d",
        postTitle: "Dicas para Gerenciar Suas Finanças",
        postDescription: "Aprenda a gerenciar suas finanças pessoais com dicas práticas e eficazes. Organize seu orçamento e evite dívidas desnecessárias."
    },
    {
        postAuthor: "Carlos Pereira",
        postTimer: "3d",
        postTitle: "Como Funciona o Programa de Bolsa Família",
        postDescription: "Entenda como funciona o programa de Bolsa Família e como ele pode ajudar sua família. Informações sobre requisitos e benefícios."
    },
    {
        postAuthor: "Ana Costa",
        postTimer: "1w",
        postTitle: "Mudanças nas Regras do Auxílio Brasil",
        postDescription: "Fique por dentro das mudanças nas regras do Auxílio Brasil e como isso pode impactar você e sua família. Acompanhe as atualizações."
    }
];

export default function Espaco() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const handlePostPress = () => {
        router.push("/grupos/_subTelas/post/%5Bid%5D");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.IconButton} onPress={() => router.back()}>
                        <CaretLeft size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.IconButton}>
                        <Bell size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.IconButton}>
                        <DotsThreeOutlineVertical size={24} color="white" />
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
                    <TouchableOpacity style={styles.editButton}>
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

                {/* Posts Container */}
                <ScrollView style={styles.postsContainer}>
                {posts.map((post, index) => (
                    <PreviaPost
                        key={index}
                        postAuthor={post.postAuthor}
                        postTimer={post.postTimer}
                        postTitle={post.postTitle}
                        postDescription={post.postDescription}
                        onPress={() => handlePostPress(post)}
                    />
                ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#01A1C5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: '2%',
        paddingVertical: 8
    },
    headerLeft: {
        justifyContent: "flex-start",
    },
    headerRight: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    IconButton: {
        padding: '2%',
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
        shadowOffset: {width: 0, height: 2},
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
