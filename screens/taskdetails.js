import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import Card from '../components/card';

export default function TaskDetails({route, navigation}){
    const {taskId} = route.params;
    const {title} = route.params;
    const {description} = route.params;
    

    return (
        <View style={styles.container}>
            <Card>
                <Text>ID: {taskId}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text>{description}</Text>
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