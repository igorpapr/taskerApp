import React, {useState, useEffect} from 'react';
import {AsyncStorage, StyleSheet, View, Text, FlatList, TouchableOpacity, 
    ImageBackground, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Card from '../components/card';
import {MaterialIcons} from '@expo/vector-icons';
import {globalStyles} from '../global/globalstyle';
import AddForm from './addForm';
import { AuthContext } from '../App';


export default function Home({navigation, route}){
    
    const {signOut} = React.useContext(AuthContext); 

    const [toLoad, setToLoad] = useState(true);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function getData(){
            let userToken;
                try {
                    userToken = await AsyncStorage.getItem('userToken');
                } catch (e) {
                    console.log(`Failed to restore token: ${e}`)
                }
            fetch("http://192.168.1.4:8080/api/tasks", 
            {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + userToken
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
                let userToken;
                try {
                    userToken = await AsyncStorage.getItem('userToken');
                } catch (e) {
                    console.log(`Failed to restore token: ${e}`)
                }
                fetch("http://192.168.1.4:8080/api/tasks", 
                {
                    method: 'post',
                    headers: new Headers({ // eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwiaWQiOiI0ZDM1OTljZS01ZWNkLTQ2OGEtYmZhYS0xNjNlMzBiYzhmNGUiLCJlbWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiTkVXVEVTVCIsImlhdCI6MTU4ODYxNTUzMywiZXhwIjoxNTg4OTE1NTMzfQ.psNY86SijXF0SzV_U-mEwObO_yEE0PgAVuVh-uILjnJUyMIpPAKi2-dhyiHefMUZg3CpCrFo-675fDbAHIw7Mg
                        'Content-Type':'application/json',
                        'Authorization': 'Bearer ' + userToken
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
                })
                .catch((error) => {console.log(error)});
            }
            addTask();
            setToggledModal(false);
        }

        const logOut = async () => {
            try{
                await AsyncStorage.removeItem('userToken');
                signOut();
            }catch (e){
                console.error(e);
            }
        }

        return (
            <ImageBackground source ={require('../assets/background.jpg')} style={globalStyles.background}>
                <View style = {globalStyles.container}>
                <MaterialIcons style={styles.modalOpen} name='close' size={20} onPress={() => logOut()}></MaterialIcons>
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
                            <TouchableOpacity onPress={() => navigation.push('TaskDetails', 
                            {taskId: item.taskId,
                            title: item.title,
                            description: item.description})}>
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