import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleForgotPassword = () => {
    const authInstance = getAuth();

    if (!email) {
      Alert.alert("Error", "Please provide an email address.");
      return;
    }

    sendPasswordResetEmail(authInstance, email)
      .then(() => {
        Alert.alert("Success", "Password reset email sent!");
      })
      .catch((error) => {
        Alert.alert("Error", "Error sending password reset email: " + error.message);
      });
  };

  return (
    <ImageBackground
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Send Reset Email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.forgotPasswordText}>Go Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor:'#06151F',
  },
  container: {
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#536878',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  forgotPasswordText: {
    color: '#FFF',
    marginTop: 10,
    textDecorationLine: 'underline',
    textAlign: 'center',
  }  
});