import React, {useState, useEffect} from "react";
import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import {Bell, CaretLeft, DotsThreeOutlineVertical} from "phosphor-react-native";

export default function CreateSpaceScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.IconButton} onPress={() => router.back()}>
                    <CaretLeft size={24} color="#01A1C5"/>
                </TouchableOpacity>
            </View>
            <View style={styles.postTitle}>
                <TextInput style={styles.title}placeholder={'Titulo da postagem'}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 14,
        color: "#01A1C5",
        fontFamily: "MontserratSemiBold",
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
        backgroundColor: "#fafafa",
        marginHorizontal: '2%',
        marginVertical: 8,
        padding: 4,
        borderRadius: 8
    }
});
