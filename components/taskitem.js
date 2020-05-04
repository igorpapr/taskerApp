import React from 'react';
import { StyleSheet, Text,View, TouchableOpacity } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function TaskItem({item, pressHandler}){
   
   return (
     <TouchableOpacity onPress={() => pressHandler(item.key)}>
      <View style={styles.item}>
        <Text style={styles.itemtitle}>{item.title}</Text>
        <MaterialIcons name="delete" size={20} color={'#8420CE'} style={styles.trashcan}/>
      </View>
     </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
  item:{
    padding:16,
    marginTop: 10,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemtitle:{
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 5,
    flex: 8
  },
  trashcan: {
    flex: 1
  }
});