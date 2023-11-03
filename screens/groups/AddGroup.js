import {  Button, StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ref, set } from 'firebase/database';
import { db } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';



const AddGroup = () => {
  const [num,setNum]=useState('')
  const [student,setStudent]=useState(['']);
  const navigation = useNavigation();


  const addStudent = () => {
    setStudent([...student, '']);
  };

  const removeStudent = () => {
    if (student.length > 1) {
      const newstudent = [...student];
      newstudent.pop();
      setStudent(newstudent);
    }
  };

  const submitGroup = () => {
    const groupnum="ჯგუფი " + num;
    set(ref(db, 'groups/' + groupnum ), {
          num:num,
          student: student,
      });

      setStudent(['']);
      setNum('');
      navigation.navigate('Groups');
    

  };


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.main}>
          <View style={styles.title}>
            <Text style={{fontSize:20,color:'white',fontWeight:'600',margin:50,}}>ჯგუფის დამატება</Text>
          </View>
    
          {/* otaxis nomeri */}
    
          <View style={styles.inputRow}>
      <View style={[styles.inputcontainer, styles.num]}>
        <TextInput
          placeholderTextWeight="600"
          style={{
            color: 'white',
            paddingLeft: 10,
            fontWeight: '600',
            fontSize: 16,
          }}
          placeholder="ჯგუფის ნომერი"
          placeholderTextColor="#cccccc"
          value={num}
          onChangeText={(text) => setNum(text)}
        />
      </View>
    </View>
          
          <Text style={{marginTop:20,marginLeft:20,color:'white',fontSize:14,fontWeight:'600'}}>სტუდენტების სია: </Text>
          
          
        {/* pasuxebi */}
        {student.map((students, index) => (
          <View key={index}> 
            <View style={styles.inputcontainer}>
              <TextInput
                placeholderTextWeight="600"
                style={{
                  color: 'white',
                  paddingLeft: 10,
                  fontWeight: '600',
                  fontSize: 16,
                }}
                placeholderTextColor="#cccccc"
                placeholder={`სტუდენტი ${index + 1}`}
                value={student[index]}
                onChangeText={(text) => {
                  const newstudent = [...student];
                  newstudent[index] = text;
                  setStudent(newstudent);
                }}
              />
            </View>
          </View>
        ))}
    
    
            <TouchableOpacity onPress={addStudent}>
              <View style={styles.addbutt}>
                <Text style={styles.addtext}>სტუდენტის დამატება</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={removeStudent}>
              <View style={styles.addbutt}>
                <Text style={styles.addtext}>სტუდენტის წაშლა</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={submitGroup}>
              <View style={styles.addbutt}>
                <Text style={styles.addtext}>წარდგენა</Text>
              </View>
            </TouchableOpacity>
              
    
        </View>
        </ScrollView> 
  )
}

export default AddGroup

const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
    },
    main: {
      backgroundColor: '#414950',
      flex: 1,
    },
    title: {
      justifyContent: 'center',
      alignItems: "center"
    },
    inputcontainer:{
      color:'white',
      margin:10,
      marginHorizontal:20,
      backgroundColor:'#2F2F2F',
      justifyContent:'center',
      height:50,
      borderRadius:10,
   },
   num:{
    width:170
   },
   mark:{width:150,marginLeft:10},
   inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
   addbutt:{
    marginTop:10,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"#cccccc",
    padding:10,
    paddingHorizontal:15,
    borderRadius:10,
    width:220,
    height:50,
  },
  addtext:{
    fontSize:16,
    fontWeight:'700',
    color:'#333333',
  },
  });