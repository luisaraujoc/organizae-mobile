

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface PreviaPostProps {
    postAuthor: string;
    postTimer: string; // Pode ser uma string que representa o tempo ou a data
    postTitle: string;
    postDescription: string;
    onPress: () => void; // Função para lidar com o clique
}

const PreviaPost: React.FC<PreviaPostProps> =
    ({
         postAuthor,
         postTimer,
         postTitle,
         postDescription,
         onPress,
     }) => {
        return (
            <TouchableOpacity style={styles.postContainer} onPress={onPress}>
                <View style={styles.postData}>
                    <Text style={styles.postAuthor}>{postAuthor}</Text>
                    <Text style={styles.postTimer}>{postTimer}</Text>
                </View>
                <Text style={styles.postTitle}>{postTitle}</Text>
                <Text style={styles.postDescription} numberOfLines={5}>{postDescription}</Text>
            </TouchableOpacity>
        );
    };

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: "white",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    postData: {
        justifyContent: "space-between",
        marginBottom: 5,
        display: "flex",
        flexDirection: "row",
    },
    postAuthor: {
        fontSize: 12,
        color: "black",
        fontWeight: "600"
    },
    postTimer: {
        fontSize: 12,
        color: "gray",
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
});

export default PreviaPost;