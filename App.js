import 'react-native-gesture-handler';
import React from 'react'
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View } from 'react-native';

import ToDo from './scr/screens/ToDo';
import Done from './scr/screens/Done';
import Task from './scr/screens/Task';

import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { useFonts } from 'expo-font';

import * as sqlite from 'expo-sqlite';

import { Provider } from 'react-redux';
import { Store } from './scr/redux/store';

import { createStackNavigator } from '@react-navigation/stack';



function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = sqlite.openDatabase("esoftTodo.db");
  return db;
}

const db = openDatabase();



const Tab = createMaterialBottomTabNavigator();


function BottomTab({route}){
  return (
  <Tab.Navigator
    activeColor="#f0edf6"
    inactiveColor="#3e2465"
    barStyle={{ backgroundColor: '#694fad' }}
  >
    <Tab.Screen 
      name="Todo" 
      component={ToDo} 
      options={{
        tabBarLabel: 'ToDo',
        tabBarIcon: ({ color, focused }) => (
          <FontAwesome5 name="tasks" size={focused ? 24 : 20} color={color} />
        ),
      }}
    />
  <Tab.Screen 
    name="Done" 
    component={Done} 
    options={{
      tabBarLabel: 'Done',
      tabBarIcon: ({ color, focused }) => (
        <Feather name="check-square" size={focused ? 24 : 20} color={color} />
      ),
    }}

  />
  </Tab.Navigator>

  );
}

export default function App() {

  const RootStack = createStackNavigator();

  const [loaded] = useFonts({
    Lora: require('./assets/fonts/Lora-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={
              {
              headerTitle: 'Task List Assignement',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#694fad'
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontSize: 25,
                fontWeight: 'bold'
              }
            }
          }
        >
          <RootStack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{ title: 'Tasks' }}
          />
          <RootStack.Screen
            name="Task"
            component={Task}
            options={{ title: 'Tasks' }}
          />

        </RootStack.Navigator>

      </NavigationContainer>


    </Provider>


  );
}