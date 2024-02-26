import React, { useState , useTransition} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from '../components/Task';

const Home = () => {

Keyboard.dismiss();
const [task,setTask] = useState();
const [taskItems, setTaskItems] = useState([]);

const handleAddTask = () =>{
  setTaskItems([...taskItems,task]) //Append the new task into tasItems array
  setTask(null); // clear the text input area
}

const completeTask = (index) => { 
  let itemsCopy = [...taskItems];
  itemsCopy.splice(index, 1);
  setTaskItems(itemsCopy);
}

return (
    <View style={styles.container}>
      {/* Today's tasks */}

      <View style = {styles.taskWrapper}>
        <Text style = {styles.sectionTitle}> Today's Tasks</Text>


        <View style = {styles.items}>
          
          {
            taskItems.map((item, index) => {
              return(
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              )
            })
          }
          
         
        </View>
      </View>

      {/* Write a task */}
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style = {styles.writeTaskWrapper}      
      >
      <TextInput style ={styles.input} placeholder={'Write a task'} value ={task} onChangeText={text => setTask(text)}/>
      <TouchableOpacity onPress={() => handleAddTask()}>
        <View style = {styles.addWrapper}>
          <Text style = {styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
      </KeyboardAvoidingView>


    </View>
  );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    taskWrapper: {
      paddingTop:80,
      paddingHorizontal:20,
    },
    sectionTitle:{
      fontSize:24,
      fontWeight:'bold',
  },
    items:{
      marginTop:30,
    },
    writeTaskWrapper:{
      position:'absolute',
      bottom:60,
      width:'100%',
      flexDirection:'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    input:{
      paddingVertical:15,
      paddingHorizontal:15,
      backgroundColor: '#FFF',
      borderRadius:60,
      borderColor: '#C0C0C0',
      borderWidth:1,
      width:250,
    },
     addWrapper:{
      width:60,
      height:60,
      backgroundColor:'#FFF',
      borderRadius:60,
      borderColor: '#C0C0C0',
      justifyContent:'center',
      alignItems:'center',
      borderWidth:1,
    }
  });

export default Home;