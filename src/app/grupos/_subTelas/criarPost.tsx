import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Font from "expo-font";
import { CaretLeft, ListBullets, ListNumbers, TextB, TextItalic, TextStrikethrough } from "phosphor-react-native";

const MarkdownEditor = () => {
    const [text, setText] = useState('');
    const textInputRef = useRef<TextInput>(null);

    // useEffect para registrar o texto em tempo real
    useEffect(() => {
        console.log(text);
    }, [text]);

    const insertText = (insert: string) => {
        const input = textInputRef.current;
        if (input) {
            const start = input.selectionStart ?? text.length;
            const end = input.selectionEnd ?? text.length;
    
            const isTextSelected = start !== end;
            const selectedText = text.substring(start, end);
    
            let newText;
            let newCursorPosition;
    
            if (isTextSelected) {
                // Se houver texto selecionado, envolve corretamente com os símbolos
                newText =
                    text.substring(0, start) +
                    insert + selectedText + insert +
                    text.substring(end);
    
                newCursorPosition = end + insert.length * 2; // Mantém a posição correta do cursor
            } else {
                // Se não houver texto selecionado, insere os símbolos e move o cursor para o meio deles
                newText =
                    text.substring(0, start) +
                    insert + insert +
                    text.substring(start);
    
                newCursorPosition = start + insert.length; // Posiciona o cursor corretamente entre os símbolos
            }
    
            setText(newText);
    
            // Aguarda o estado atualizar antes de definir a posição do cursor
            setTimeout(() => {
                input.setSelection(newCursorPosition, newCursorPosition);
            }, 10);
        }
    };
    

    const applyBold = () => insertText('**');
    const applyItalic = () => insertText('*');
    const applyStrikethrough = () => insertText('~~');
    const applyBulletList = () => insertText('- ');
    const applyNumberedList = () => insertText('1. ');

    return (
        <View style={styles.postEditor}>
            <TextInput
                ref={textInputRef}
                style={styles.editor}
                multiline
                value={text}
                placeholder="Qual o comunicado de hoje?"
                onChangeText={setText}
                textAlignVertical="top" // Faz o texto começar do topo
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
                <TouchableOpacity onPress={applyBulletList} style={styles.formatButton}>
                    <ListBullets size={24} color="#01A1C5" />
                </TouchableOpacity>
                <TouchableOpacity onPress={applyNumberedList} style={styles.formatButton}>
                    <ListNumbers size={24} color="#01A1C5" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function CreateSpaceScreen() {
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
                <TouchableOpacity style={styles.IconButton} onPress={() => router.push("/grupos/grupo/home")}>
                    <CaretLeft size={24} color="#01A1C5" />
                </TouchableOpacity>
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
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#01A1C5",
        fontFamily: "Montserrat SemiBold",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: '2%',
        paddingVertical: 8
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
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    postEditor: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    editor: {
        color: 'black',
        backgroundColor: 'rgba(104, 104, 104, 0.07)',
        marginHorizontal: '2%',
        flex: 1,
        textAlignVertical: 'top', // Faz o texto começar do topo
    },
    formatButton: {
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 5,
    }
});