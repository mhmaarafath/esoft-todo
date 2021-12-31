

import Checkbox from 'expo-checkbox';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Alert } from 'react-native'

import { useDispatch, useSelector } from 'react-redux';
import { setTaskID, setTasks } from '../redux/actions';
import GlobalStyles from '../utils/GlobalStyles';

import { AntDesign } from '@expo/vector-icons'; 


import openDatabase from '../utils/db';


const db = openDatabase();

export default function Done({navigation}) {
    const { tasks } = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();

    const deleteTask = (id) => {
        const filteredTasks = tasks.filter(task => task.rowid !== id);
        dispatch(setTasks(filteredTasks));

        db.transaction((tx) => {
          tx.executeSql(
              "DELETE FROM tasks WHERE rowid=?",
              [id],
          );
      });
    }
  

    const checkTask = (id, newValue) => {
        const index = tasks.findIndex(task => task.rowid === id);
        if (index > -1) {
            let newTasks = [...tasks];
            newTasks[index].completed = newValue;
            dispatch(setTasks(newTasks));
            db.transaction((tx) => {
                tx.executeSql("UPDATE todos SET completed=? WHERE rowid=?", [newValue, id]);
            });   
            Alert.alert('Success!', 'Task state is changed.');
        }
    }
    return (
        <View style={GlobalStyles.body}>
            <FlatList
                data={tasks.filter(task => task.completed === true)}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={GlobalStyles.item}
                        onPress={() => {
                            dispatch(setTaskID(item.rowid));
                            navigation.navigate('Task');
                        }}
                    >
                        <View style={GlobalStyles.item_row}>
                            <Checkbox
                                style={GlobalStyles.checkbox}
                                value={item.completed}
                                onValueChange={(newValue) => { checkTask(item.rowid, newValue) }}
                            />
                            <View style={GlobalStyles.item_body}>
                                <Text
                                    style={[
                                        GlobalStyles.fontFamily,
                                        GlobalStyles.title
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item.task}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={GlobalStyles.delete}
                                onPress={() => { deleteTask(item.rowid) }}
                            >
                                <AntDesign name="delete" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}


