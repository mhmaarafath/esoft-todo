import React, {useState, useEffect} from 'react'

import { View, Text, StyleSheet, TextInput, Alert, ScrollView} from 'react-native'
import GlobalStyles from '../utils/GlobalStyles'


import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../redux/actions';

import Checkbox from 'expo-checkbox';
import CustomButton from '../utils/CustomButton'
import openDatabase from '../utils/db';


const db = openDatabase();

export default function Task({ navigation }) {

    const [task, setTask] = useState('');
    const [completed, setCompleted] = useState(false);
    const [taskType, setTaskType] = useState('Add');

    const { tasks, taskID } = useSelector(state => state.taskReducer);
    
    const dispatch = useDispatch();
    useEffect(() => {
        navigation.addListener('focus', () => {
        getTask();
        });
    }, [])


    const setTodo = () => {
        if(task.length == 0){
            Alert.alert('Warning!', 'Please write your task title.')
        } else {
            var Task = {
                rowid: taskID,
                task: task,
                completed: completed
            }
            const index = tasks.findIndex(task => task.rowid === taskID);
            let newTasks = [];
            if (index > -1) {
                db.transaction((tx) => {
                    tx.executeSql("UPDATE todos SET task='?', completed=? WHERE rowid=?", [task, completed, taskID]);
                });   
                newTasks = [...tasks];
                newTasks[index] = Task;
            } else {
                db.transaction((tx) => {
                    tx.executeSql("INSERT INTO todos (task, completed) values ('?', ?)", [task, completed],);
                });
                newTasks = [...tasks, Task];
            }
            dispatch(setTasks(newTasks));
            navigation.goBack();
    
        }
    }

    const getTask = () => {
        const Task = tasks.find(task => task.rowid === taskID)
        if(Task){
            setTask(Task.task);
            setCompleted(Task.completed);
        }
    }



    return (

        <ScrollView>
            <View style={[GlobalStyles.body, {alignItems: 'center'}]}>
                <TextInput
                    value={task}
                    style={GlobalStyles.input}
                    placeholder='Task'
                    onChangeText={(value) => setTask(value)}
                />
                <View>
                    <Checkbox
                        style={GlobalStyles.checkbox}
                        value={completed}
                        onValueChange={(newValue) => setCompleted(newValue)}
                    />
                    <Text style={GlobalStyles.text}>
                        Is Done
                    </Text>
                </View>
                <CustomButton
                    title='Save Task'
                    color='#694fad'
                    style={{ width: '100%' }}
                    onPressFunction={setTodo}
                />
            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
})