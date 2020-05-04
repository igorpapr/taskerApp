import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import TaskItem from './components/taskitem';
import AddTask from './components/addtask';

export default function App() {
  const [tasks, setTasks] = useState([
    { title: "Shopping", description: "Buy coffee", key: '1'},
    { title: "Hometasks", description: "Do homework", key: '2'},
    { title: "Achievement", description: "Play The Witcher 3 for 5 hours", key: '3'},
    { title: "Test1", description: "Test1", key: '4'},
    { title: "Test2", description: "Test2", key: '5'},
    { title: "Test3", description: "Test3", key: '6'},
    { title: "Test4", description: "Test4", key: '7'}
    ]
  );

  const pressHandler = (key) => {
    setTasks((prevTasks) => {
      return prevTasks.filter(task => task.key != key);
    }) 
  }

  const submitHandler = (text) => {
    if(text.length > 3){
      setTasks((prevTasks) => {
        return [{title: text, description: "", key: Math.random().toString() },
        ...prevTasks];
      })
    } else{
      Alert.alert('Bad input!', 'The title must be more that 3 chars long', [
        {text: "Ok", onPress: () => {}}
      ]);
    }
  }

  return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <View style = {styles.container}>
        <Header/>
        <View style = {styles.content}>
        <AddTask submitHandler={submitHandler}/>
          <View style={styles.list}>
            <FlatList
              data = {tasks}
              renderItem ={({item}) => (
                <TaskItem item={item} pressHandler={pressHandler}/>
              )}
            />
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    content: {
      flex: 1
    },
    list: {
      flex: 1
    }
  });