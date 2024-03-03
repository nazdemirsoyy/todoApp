import React ,{useState, useTransition} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Home from './screens/Home';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgetPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false,}}  />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false,}}  />
        <Stack.Screen name="Home" component={Home} options={{headerShown: false,}}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

