import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput  } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Task = ({ text, onDelete })  => {

    return(
        <View style ={styles.item}>
        <View style = {styles.itemLeft}>
            <View style = {styles.square}></View>
            <Text style ={styles.itemText}>{text}</Text>
        </View>
            
            {/* Delete */}
            <TouchableOpacity onPress={onDelete}>
                <Svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#FF0000" strokeWidth="1.5">
                <Path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </Svg>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        backgroundColor:'#ebf1f8',
        padding:15,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
    },
    itemLeft:{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
    },
    square:{
        width:24,
        height:24,
        backgroundColor:'#55BCF6',
        opacity:0.4,
        borderRadius:5,
        marginRight:15,
    },
    itemText:{
        maxWidth:'80%',

    }
});

export default Task;
