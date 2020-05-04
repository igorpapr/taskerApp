import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function Header(){
    return (
        <View style={styles.header}>
            <Text style={styles.title}>My Tasks</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 38,
        backgroundColor: '#8420CE'
    },
    title: {
        textAlign: "left",
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
        textAlignVertical: 'center'
    }
});