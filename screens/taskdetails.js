import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Card from '../components/card';

export default function TaskDetails({navigation}){

    return (
        <View style={styles.container}>
            <Card>
                <Text>ID: {navigation.getParam('taskId')}</Text>
                <Text style={styles.title}>{navigation.getParam('title')}</Text>
                <Text>{navigation.getParam('description')}</Text>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 10
    },
    title: {
        fontWeight: "bold",
        marginVertical: 10,
        fontSize: 20
    }
});