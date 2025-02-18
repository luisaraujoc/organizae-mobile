import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Font from "expo-font";
import { CaretLeft, TextB, TextItalic, TextStrikethrough, TextAUnderline, ListBullets, CodeSimple, CodeBlock } from "phosphor-react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';  // Certifique-se de importar o AsyncStorage

const MarkdownEditor = ({ onPublish }: { onPublish: (title: string, spaceId: string, photo: string, content: string) => void }) => {
    const [text, setText] = useState('');
    const [selection, setSelection] = useState({ start: 0, end: 0 });
    const textInputRef = useRef<TextInput>(null);

    const insertText = (insert: string, isList: boolean = false, autoContinue: boolean = false) => {
        const input = textInputRef.current;
        if (input) {
            const { start, end } = selection;
            const isTextSelected = start !== end;
            const selectedText = text.substring(start, end);
            const lines = text.split('\n');
            const currentLineIndex = text.substring(0, start).split('\n').length - 1;
            const currentLine = lines[currentLineIndex] || "";

            let newText;
            let newCursorPosition;

            if (isTextSelected) {
                newText = text.substring(0, start) + insert + selectedText + (isList ? '' : insert) + text.substring(end);
                newCursorPosition = end + insert.length;
            } else {
                if (autoContinue) {
                    if (currentLine.trim() === insert.trim()) {
                        lines.splice(currentLineIndex, 1);
                        newText = lines.join('\n');
                        newCursorPosition = start - insert.length - 1;
                    } else {
                        newText = text.substring(0, start) + '\n' + insert + text.substring(start);
                        newCursorPosition = start + insert.length + 1;
                    }
                } else if (isList) {
                    newText = text.substring(0, start) + '\n' + insert + text.substring(start);
                    newCursorPosition = start + insert.length + 1;
                } else {
                    newText = text.substring(0, start) + insert + insert + text.substring(start);
                    newCursorPosition = start + insert.length;
                }
            }

            setText(newText);
            setTimeout(() => {
                input.setSelection(newCursorPosition, newCursorPosition);
            }, 10);
        }
    };

    const applyBold = () => insertText('**');
    const applyItalic = () => insertText('*');
    const applyStrikethrough = () => insertText('~~');
    const applyUnderline = () => insertText('__');
    const applyBulletList = (autoContinue = false) => insertText('- ', true, autoContinue);
    const applyNumberedList = (autoContinue = false) => {
        const lines = text.split('\n');
        let lastNumber = 0;
        for (let i = lines.length - 1; i >= 0; i--) {
            const match = lines[i].match(/^(\d+)\.\s/);
            if (match) {
                lastNumber = parseInt(match[1], 10);
                break;
            }
        }
        const insert = `${lastNumber + 1}. `;
        insertText(insert, true, autoContinue);
    };
    const applyInlineCode = () => insertText('`');
    const applyCodeBlock = () => {
        const { start, end } = selection;
        const isTextSelected = start !== end;
        const selectedText = text.substring(start, end);

        let newText;
        let newCursorPosition;

        if (isTextSelected) {
            newText = text.substring(0, start) + '```\n' + selectedText + '\n```' + text.substring(end);
            newCursorPosition = end + 8;
        } else {
            newText = text.substring(0, start) + '```\n\n```' + text.substring(start);
            newCursorPosition = start + 4;
        }

        setText(newText);
        setTimeout(() => {
            textInputRef.current?.setSelection(newCursorPosition, newCursorPosition);
        }, 10);
    };

    return (
        <View style={styles.postEditor}>
            <TextInput
                ref={textInputRef}
                style={styles.editor}
                multiline
                value={text}
                placeholder="Qual o comunicado de hoje?"
                onChangeText={setText}
                textAlignVertical="top"
                onSelectionChange={({ nativeEvent: { selection } }) => setSelection(selection)}
                onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Enter') {
                        const { start } = selection;
                        const lines = text.split('\n');
                        const currentLineIndex = text.substring(0, start).split('\n').length - 1;
                        const currentLine = lines[currentLineIndex] || '';

                        if (/^(\d+)\.\s/.test(currentLine)) {
                            if (currentLine.trim() === '') {
                                lines.splice(currentLineIndex, 1);
                                setText(lines.join('\n'));
                                setTimeout(() => {
                                    const newCursorPosition = start - 1;
                                    textInputRef.current?.setSelection(newCursorPosition, newCursorPosition);
                                }, 10);
                            } else {
                                setTimeout(() => applyNumberedList(true), 10);
                            }
                        } else if (currentLine.startsWith('- ')) {
                            setTimeout(() => applyBulletList(true), 10);
                        }
                    }
                }}
            />
            <View>
                <ScrollView horizontal style={styles.toolbar}>
                    <TouchableOpacity onPress={applyBold} style={styles.formatButton}>
                        <TextB size={24} color="#01A1C5" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={applyItalic} style={styles.formatButton}>
                        <TextItalic size={24} color="#01A1C5" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={applyStrikethrough} style={styles.formatButton}>
                        <TextStrikethrough size={24} color="#01A1C5" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={applyUnderline} style={styles.formatButton}>
                        <TextAUnderline size={24} color="#01A1C5" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => applyBulletList(false)} style={styles.formatButton}>
                        <ListBullets size={24} color="#01A1C5" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={applyInlineCode} style={styles.formatButton}>
                        <CodeSimple size={24} color="#01A1C5" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={applyCodeBlock} style={styles.formatButton}>
                        <CodeBlock size={24} color="#01A1C5" />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

export default function Editor() {
    const [text, setText] = useState('');
    const [token, setToken] = useState<string | null>(null); // Adicionando estado para o token

    const loadFont = async () => {
        await Font.loadAsync({
            MontserratRegular: require("@/assets/fonts/Montserrat-Regular.ttf"),
            MontserratSemiBold: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
            MontserratBold: require("@/assets/fonts/Montserrat-Bold.ttf"),
        });
    };

    useEffect(() => {
        loadFont();
        const getToken = async () => {
            const storedToken = await AsyncStorage.getItem("access_token"); // Resgatando o token armazenado
            setToken(storedToken); // Atualizando o estado com o token
        };
        getToken();
    }, []);

    const handleSubmitPost = async (title: string, spaceId: string, photo: string, content: string) => {
        if (!token) {
            console.error("Token não encontrado");
            return;
        }

        try {
            const response = await axios.post(
                "https://organizae-f7aca8e7f687.herokuapp.com/posts/post",
                {
                    titulo: title,
                    conteudo: content,
                    
                    espacoId: spaceId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Post enviado com sucesso!", response.data);
        } catch (error) {
            console.error("Erro ao enviar o post:", error);
        }
    };

    const handlePostPublish = () => {
        const title = "Título da postagem";  // Aqui você pega o título do post
        const spaceId = "id_do_espaco";     // Aqui você coloca o id do espaço
        const photo = "url_da_foto";        // E a URL da foto
        handleSubmitPost(title, spaceId, photo, text);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.IconButton} onPress={() => router.back()}>
                        <CaretLeft size={24} color="#01A1C5" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postToSpace} onPress={() => { }}>
                        <Text>/nomeDoEspaco</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.postSend} onPress={handlePostPublish}>
                        <Text style={styles.postSendText}>Publicar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.postTitle}>
                <TextInput style={styles.title} placeholder={'Título da postagem'} />
            </View>
            <MarkdownEditor onPublish={handlePostPublish} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        padding: 0,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#01A1C5",
        fontFamily: "MontserratBold",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: '2%',
        paddingVertical: 8
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1
    },
    IconButton: {
        padding: '2%',
    },
    postTitle: {
        backgroundColor: "#fafafa ",
        marginHorizontal: '2%',
        marginVertical: 8,
        padding: 4,
        borderRadius: 8
    },
    postToSpace: {
        backgroundColor: "rgba(168, 168, 168, 0.44)",
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginHorizontal: '2%',
    },
    postSend: {
        backgroundColor: "#01A1C5",
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginHorizontal: '2%',
    },
    postSendText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "MontserratSemiBold",
    },
    postEditor: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%'
    },
    editor: {
        color: 'black',
        flex: 1,
        textAlignVertical: 'top',
        fontFamily: 'MontserratRegular',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    toolbar: {
        flexDirection: 'row',
    },
    formatButton: {
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 5,
    }
});
