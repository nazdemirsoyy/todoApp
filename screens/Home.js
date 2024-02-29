import React, { useState , useTransition, useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import Task from '../components/Task';
import { auth, addTaskToFirestore, getTasksFromFirestore } from '../firebase'; 


const Home = () => {

Keyboard.dismiss();
const [task,setTask] = useState();
const [taskItems, setTaskItems] = useState([]);

// const handleAddTask = () => {
//   if (task && auth.currentUser) {
//       addTaskToFirestore(auth.currentUser.uid, task).then(() => {
//       setTaskItems([...taskItems, task]); 
//       setTask('');
//     });
//   }
// };

const handleAddTask = () => {
  if (task && auth.currentUser) {
    addTaskToFirestore(auth.currentUser.uid, task)
      .then((docRef) => {
        if (docRef && docRef.id) {
          const newTask = {
            id: docRef.id,
            task: task,
          };
          setTaskItems(prevTaskItems => [...prevTaskItems, newTask]);
          setTask('');
        } else {
          console.error("Document reference is undefined.");
        }
      })
      .catch(error => {
        console.error("Error adding task: ", error);
      });
  }
};


const completeTask = (index) => {
  let itemsCopy = [...taskItems];
  itemsCopy.splice(index, 1);
  setTaskItems(itemsCopy);
};


useEffect(() => {
  if (auth.currentUser) {
    getTasksFromFirestore(auth.currentUser.uid)
      .then(fetchedTasks => {
        setTaskItems(fetchedTasks); // Set the fetched tasks to state
      })
      .catch(error => {
        console.error("Error fetching tasks: ", error);
      });
  }
}, [auth.currentUser]);



const renderItem = ({ item }) => (
  <TouchableOpacity onPress={() => completeTask(item.id)}>
    <Task text={item.task} />
  </TouchableOpacity>
);

return (
    <View style={styles.container}>
      {/* Today's tasks */}

      {/* <FlatList
        data={taskItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.taskList}
      /> */}

      <View style = {styles.taskWrapper}>
        <Text style = {styles.sectionTitle}> Today's Tasks</Text>
        
        <View style = {styles.items}>
        {/* <FlatList
          data={taskItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        /> */}
        {
          taskItems.map((item) => {
          return (
            <TouchableOpacity key={item.id} onPress={() => completeTask(item.id)}>
              <Task text={item.task} />
            </TouchableOpacity>
          )
        })}
         
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