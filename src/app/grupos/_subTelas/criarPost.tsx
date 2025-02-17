import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Font from "expo-font";
import { CaretLeft, ListBullets, ListNumbers, TextAUnderline, TextB, TextItalic, TextStrikethrough } from "phosphor-react-native";

const MarkdownEditor = () => {
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

                        console.log(`Comando enter dado:\n"${text}"`);

                        // Verifica se a linha atual é uma lista numerada
                        if (/^(\d+)\.\s/.test(currentLine)) {
                            // Se a linha atual estiver vazia, remove-a
                            if (currentLine.trim() === '') {
                                lines.splice(currentLineIndex, 1); // Remove a linha vazia
                                setText(lines.join('\n'));
                                setTimeout(() => {
                                    // Ajusta a posição do cursor para a linha anterior
                                    const newCursorPosition = start - 1; // Ajusta para a linha anterior
                                    textInputRef.current?.setSelection(newCursorPosition, newCursorPosition);
                                }, 10);
                            } else {
                                // Se a linha atual não estiver vazia, cria o próximo item
                                setTimeout(() => applyNumberedList(true), 10);
                            }
                        } else if (currentLine.startsWith('- ')) {
                            setTimeout(() => applyBulletList(true), 10);
                        }
                    }
                }}
            />
            <View style={styles.toolbar}>
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
            </View>
        </View>
    );
};


export default function Editor() {
    const loadFont = async () => {
        await Font.loadAsync({
            MontserratRegular: require("@/assets/fonts/Montserrat-Regular.ttf"),
            MontserratSemiBold: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
            MontserratBold: require("@/assets/fonts/Montserrat-Bold.ttf"),
        });
    };

    useEffect(() => {
        loadFont();
    }, []);

    if (!Font.isLoaded) {
        return null;
    }

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
                    <TouchableOpacity style={styles.postSend} onPress={() => { }}>
                        <Text>Publicar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.postTitle}>
                <TextInput style={styles.title} placeholder={'Título da postagem'} />
            </View>
            <MarkdownEditor />
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
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '2%',
        marginBottom: 10,
    },
    postEditor: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        // flexWrap: 'wrap',
        // ocupar todo o espaço disponível
        height: '100%'
    },
    editor: {
        color: 'black',
        backgroundColor: 'rgba(104, 104, 104, 0.07)',
        marginHorizontal: '2%',
        flex: 1,
        textAlignVertical: 'top', // Faz o texto começar do topo
        borderRadius: 8,
        fontFamily: 'MontserratRegular',
    },
    formatButton: {
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 5,
    }
});