import React, {useEffect} from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native'

import { useDispatch, useSelector } from 'react-redux';
import { setTaskID, setTasks } from '../redux/actions';

import { Entypo } from '@expo/vector-icons'; 
import GlobalStyles from '../utils/GlobalStyles';
import Checkbox from 'expo-checkbox';
import { AntDesign } from '@expo/vector-icons'; 


import openDatabase from '../utils/db';


const db = openDatabase();



export default function ToDo({navigation}) {
    const { tasks } = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();
  
    useEffect(() => {
      createTable();
      getData();
  }, [])


    const createTable = () => {
        db.transaction((tx) => {
          tx.executeSql("CREATE TABLE IF NOT EXISTS todos (task TEXT, completed BOOLEAN)");
        });
      }
    
    const getData = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT rowid, * FROM todos",
                [],
                (tx, results) => {
                  var temp = [];
                  for (let i = 0; i < results.rows.length; ++i)
                    temp.push(results.rows.item(i));
                    dispatch(setTasks(temp));
                }
            );
        });
    }

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
          data={tasks.filter(task => task.completed === false)}
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
        <TouchableOpacity
            style={GlobalStyles.button}
            onPress={() => {
                dispatch(setTaskID(tasks.length + 1));
                navigation.navigate('Task');
            }}
        >
            <Entypo name="add-to-list" size={24} color="black" />
            
        </TouchableOpacity>
      </View>
    )
}


const styles = StyleSheet.create({
})