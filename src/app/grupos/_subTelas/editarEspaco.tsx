import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useLocalSearchParams } from "expo-router"; // Importe useLocalSearchParams
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarEspacoScreen() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [nameCharacterCount, setNameCharacterCount] = useState(0);
    const [descriptionCharacterCount, setDescriptionCharacterCount] = useState(0);
    const [initialImage, setInitialImage] = useState<string | null>(null); // Armazena a URL da imagem original
    const [loading, setLoading] = useState(true); // Estado para indicar carregamento
    const router = useRouter();

    // --- Opção 1: Obter ID do Espaço do AsyncStorage ---
    const [spaceId, setSpaceId] = useState<string | null>(null);

    useEffect(() => {
        const getSpaceIdFromStorage = async () => {
            try {
                const id = await AsyncStorage.getItem("spaceId"); // Ou o nome da chave que você usa
                setSpaceId(id);
            } catch (error) {
                console.error("Erro ao recuperar spaceId do AsyncStorage", error);
            }
        };
        getSpaceIdFromStorage();
    }, []);

    // --- Opção 2: Obter ID do Espaço dos Parâmetros de Rota (Recomendado) ---
    // const params = useLocalSearchParams();
    // const spaceId = params.spaceId as string; // Use 'as string' para TypeScript
    // console.log("spaceId (params):", spaceId);


    useEffect(() => {
        setIsFormValid(name.trim() !== "" && description.trim() !== "");
    }, [name, description]);

    const getAuthToken = async () => {
        try {
            const token = await AsyncStorage.getItem("access_token");
            return token;
        } catch (error) {
            console.error('Erro ao recuperar o token', error);
            return null;
        }
    };

      const getGroupId = async () => {
    try {
        const groupId = await AsyncStorage.getItem("groupId");
        if (groupId !== null) {
            console.log("groupId recuperado:", groupId);
            return groupId;
        } else {
            console.warn("Nenhum groupId encontrado no AsyncStorage.");
            return null;
        }
    } catch (error) {
        console.error("Erro ao recuperar groupId:", error);
        return null;
    }
};

    // Função para buscar os dados do espaço
    const fetchSpaceData = async (id: string) => {
        const token = await getAuthToken();
        if (!token) {
            Alert.alert("Erro", "Token de autenticação não encontrado.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`https://organizae-f7aca8e7f687.herokuapp.com/spaces/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.status === "sucesso") {
                const spaceData = response.data.dados;
                setName(spaceData.nome);
                setDescription(spaceData.descricao);
                setImage(spaceData.fotoUrl); // URL da imagem do backend
                setInitialImage(spaceData.fotoUrl); // Salva a URL original
                setNameCharacterCount(spaceData.nome.length);
                setDescriptionCharacterCount(spaceData.descricao.length);
            } else {
                Alert.alert("Erro", "Não foi possível carregar os dados do espaço.");
            }
        } catch (error) {
            console.error("Erro ao buscar dados do espaço:", error);
            Alert.alert("Erro", "Ocorreu um erro ao carregar os dados do espaço.");
        } finally {
            setLoading(false);
        }
    };

    // Carrega os dados quando o componente monta e o spaceId está disponível
    useEffect(() => {
        if (spaceId) {
            fetchSpaceData(spaceId);
        }
    }, [spaceId]);


    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (result.canceled || !result.assets?.length) return;

            setImage(result.assets[0].uri);
        } catch (error) {
            console.error("Erro ao selecionar imagem:", error);
            Alert.alert("Erro", "Não foi possível carregar a imagem.");
        }
    };

    const handleSave = async () => {
        setShowAlert(true);

        if (!isFormValid) {
            return;
        }

        if (!spaceId) {
            Alert.alert("Erro", "ID do espaço não encontrado.");
            return;
        }

        const token = await getAuthToken();
        if (!token) {
            Alert.alert("Erro", "Token de autenticação não encontrado.");
            return;
        }
      const grupoId = await getGroupId();

      if (!grupoId) {
        Alert.alert("Erro", "Não foi possível recuperar o grupo.");
        return;
      }
      const grupoIdNumber = Number(grupoId);
        const formData = new FormData();
        formData.append('nome', name);
        formData.append('descricao', description);
        formData.append('grupoId', grupoIdNumber.toString());

        // Só adiciona a imagem se uma nova foi selecionada
        if (image && image !== initialImage) {
            const uri = image;
            const uriParts = uri.split('.');
            const fileType = uriParts[uriParts.length - 1];
            const response = await fetch(uri);
            const blob = await response.blob();
            formData.append('foto', blob, `fotoPerfil.${fileType}`);
        }

        try {
            const response = await axios.put(`https://organizae-f7aca8e7f687.herokuapp.com/spaces/${spaceId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status === "sucesso") {
                Alert.alert("Sucesso", "Espaço atualizado com sucesso!");
                 router.push(`/grupos/grupo/space/${spaceId}`); // Redireciona para a TELA DE DETALHES do espaço.

            } else {
                Alert.alert("Erro", response.data.mensagem || "Erro ao atualizar o espaço.");
            }
        } catch (error) {
            console.error("Erro na requisição de atualização:", error);
            Alert.alert("Erro", "Ocorreu um erro ao tentar atualizar o espaço.");
        }
    };


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <View>
                    <Text style={styles.title}>Editar Espaço</Text>
                    <Text style={styles.subtitle}>
                        Modifique o nome, a descrição e a imagem do espaço.
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nome do espaço *"
                        value={name}
                        onChangeText={(text) => {
                            setName(text);
                            setNameCharacterCount(text.length);
                        }}
                        maxLength={50}
                    />
                    <Text style={[styles.characterCount, nameCharacterCount > 50 ? styles.alertText : null]}>
                        {nameCharacterCount} / 50
                    </Text>

                    <TextInput
                        style={[styles.input, styles.textarea]}
                        placeholder="Descrição *"
                        value={description}
                        onChangeText={(text) => {
                            setDescription(text);
                            setDescriptionCharacterCount(text.length);
                        }}
                        multiline
                        textAlignVertical="top"
                        maxLength={500}
                    />
                    <Text style={[styles.characterCount, descriptionCharacterCount > 500 ? styles.alertText : null]}>
                        {descriptionCharacterCount} / 500
                    </Text>

                    {showAlert && !isFormValid && (
                        <Text style={styles.alertText}>
                            *Todos os campos devem ser preenchidos!
                        </Text>
                    )}

                    <View style={styles.cardContainer}>
                        <TouchableOpacity style={styles.cardHeader} onPress={pickImage}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.cardHeaderImage} />
                            ) : (
                                <View style={styles.placeholderHeader}>
                                    <Ionicons name="image-outline" size={30} color="#777" />
                                    <Text style={styles.placeholderTextHeader}>Adicionar Imagem de Capa</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <Text style={styles.cardTitle}>{name || "Nome do espaço"}</Text>
                        <Text style={styles.cardDescription}>{description || "Descrição"}</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} activeOpacity={0.7} onPress={() => router.back()}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, isFormValid ? styles.saveButton : styles.disabledButton]}
                        onPress={handleSave}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        padding: 20,
        flexGrow: 1,
        paddingBottom: 80,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
        marginBottom: 25,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        padding: 12,
        marginBottom: 10,
        backgroundColor: "#f8f8f8",
    },
    textarea: {
        height: 100,
    },
    alertText: {
        color: "red",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },
    cardContainer: {
        backgroundColor: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        alignItems: "center",
        marginVertical: 20,
        position: "relative",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    cardHeader: {
        width: "100%",
        height: 120,
        borderBottomWidth: 2,
        borderColor: "#ddd",
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardHeaderImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    placeholderHeader: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderTextHeader: {
        color: '#777',
        fontSize: 14,
    },
    cardTitle: {
        color: "#000",
        fontWeight: "bold",
        marginTop: 45,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
    },
    cardDescription: {
        color: "#666",
        fontSize: 12,
        marginTop: 5,
        paddingBottom: "7%",
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'justify',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 5,
        alignItems: "center",
        borderRadius: 30,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: "#E53935",
    },
    saveButton: {
        backgroundColor: "#00AEEF",
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    characterCount: {
        textAlign: 'right',
        color: '#666',
        marginBottom: 10,
        marginRight: 5,
    }
});