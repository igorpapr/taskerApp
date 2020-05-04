import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, 
    ImageBackground, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Card from '../components/card';
import {MaterialIcons} from '@expo/vector-icons';
import {globalStyles} from '../global/globalstyle';
import AddForm from './addForm';

export default function Home({navigation}){
    
    const [isLoading, setIsLoading] = useState(true);
    const [toLoad, setToLoad] = useState(true);
    const [tasks, setTasks] = useState([]);
        /*
        [
        { id: '1', title: "Shopping", description: "Buy coffee"},
        { id: '2', title: "Hometasks", description: "Do homework"},
        { id: '3', title: "Achievement", description: "Play The Witcher 3 for 5 hours"},
        { id: '4', title: "Test1", description: "Test1"},
        { id: '5', title: "Test2", description: "Test2"},
        { id: '6', title: "Test3", description: "Test3"},
        { id: '7', title: "Test4", description: "Test4"},
        { id: '8', title: "Test5", description: "Test5"},
        { id: '9', title: "Test6", description: "Test6"}
        
        ]*/

    useEffect(() => {
        async function getData(){
            fetch("http://192.168.1.4:8080/api/tasks", 
            {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwiaWQiOiI0ZDM1OTljZS01ZWNkLTQ2OGEtYmZhYS0xNjNlMzBiYzhmNGUiLCJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTkVXVEVTVCIsImlhdCI6MTU4ODYxNTUzMywiZXhwIjoxNTg4OTE1NTMzfQ.psNY86SijXF0SzV_U-mEwObO_yEE0PgAVuVh-uILjnJUyMIpPAKi2-dhyiHefMUZg3CpCrFo-675fDbAHIw7Mg'
                })
            })
            .then((res) => res.json())
            .then(res => setTasks(res))
            .catch((error) => {console.log(error)});
        }
        getData();
    },[toLoad]);

    const [toggledModal, setToggledModal] = useState(false);
    
    
    const addTask = (obj) => {
            async function addTask(){
                fetch("http://192.168.1.4:8080/api/tasks", 
                {
                    method: 'post',
                    headers: new Headers({
                        'Content-Type':'application/json',
                        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwiaWQiOiI0ZDM1OTljZS01ZWNkLTQ2OGEtYmZhYS0xNjNlMzBiYzhmNGUiLCJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTkVXVEVTVCIsImlhdCI6MTU4ODYxNTUzMywiZXhwIjoxNTg4OTE1NTMzfQ.psNY86SijXF0SzV_U-mEwObO_yEE0PgAVuVh-uILjnJUyMIpPAKi2-dhyiHefMUZg3CpCrFo-675fDbAHIw7Mg'
                    }),
                    body: JSON.stringify({
                        title:obj.title,
                        description:obj.description,
                        deadline:"2020-05-03T12:00:00",
                        isCompleted:false,
	                    isPublic:true
                    })
                })
                .then(() => {
                    setToLoad(toLoad ? false:true);
                    //getData();
                })
                .catch((error) => {console.log(error)});
            }
            addTask();
            setToggledModal(false);
        }
        
        //obj.id = Math.random().toString();
        //setTasks((prevTasks) => {
        //    return [obj, ...prevTasks];
        //});
   
    //   if (isLoading){
    //     return (<Text>IS LOADING = TRUE</Text>);
    //   }else{
        return (
            <ImageBackground source ={require('../assets/background.jpg')} style={globalStyles.background}>
                <View style = {globalStyles.container}>
                <MaterialIcons style={styles.modalOpen} name='add' size={22} onPress={() => setToggledModal(true)}></MaterialIcons>
                    <Modal animationType='slide' visible={toggledModal}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modal}>
                            <MaterialIcons name='close' style={styles.modalHide} size={22} onPress={() => setToggledModal(false)}></MaterialIcons>
                            <AddForm addTask = {addTask}></AddForm>
                        </View>
                    </TouchableWithoutFeedback>
                    </Modal>
                    <FlatList 
                        data={ tasks }
                        keyExtractor = { (item) => item.taskId}
                        renderItem = {({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('TaskDetails', item)}>
                                <Card>
                                    <Text style={globalStyles.text}>
                                        {item.title}
                                    </Text>
                                </Card>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </ImageBackground>
        );
    }
//}

const styles = StyleSheet.create({
    modal: {
        fontSize: 30,
        flex: 1
    },
    modalOpen:{
        borderColor: '#8420CE',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center'
    },
    modalHide: {
        borderColor: '#8420CE',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 0
    }
});