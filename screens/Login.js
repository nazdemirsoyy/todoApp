import React , { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet,Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth';
import { auth } from "../firebase";

const Login =() =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registered with:', user.email);
            navigation.navigate('Home'); 
          })
          .catch(error => alert(error.message));
    };

    const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Logged in with:', user.email);
          navigation.navigate('Home'); 
        })
        .catch(error => alert(error.message));
    };

    const handleForgotPassword = () => {
      navigation.navigate('ForgotPassword');  
    };

    return(
        <KeyboardAvoidingView style ={styles.container} behavior="padding">

        <View style ={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        </View>

        <View style={styles.buttonContainer}>

        <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
        >
        <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={handleSignUp}
        style={[styles.button,styles.buttonOutline]}
        >
        <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        </View>

        </KeyboardAvoidingView>
    )
}

export default Login;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#06151F',
    },
    inputContainer: {
      width: '80%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#536878',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#536878',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#536878',
      fontWeight: '700',
      fontSize: 16,
    },forgotPasswordText:{
      marginTop:10,
      color: '#FFF',
      // fontWeight: '700',
      // fontSize: 16,
      textDecorationLine: 'underline',
    }
  })
