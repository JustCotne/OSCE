import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';


const AddRoom = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['']);
  const [num,setNum]=useState('');
  const [mark,setMark]=useState('');
  const navigation = useNavigation();
  
  const addAnswer = () => {
    setAnswers([...answers, '']);
  };

  const removeAnswer = () => {
    if (answers.length > 1) {
      const newAnswers = [...answers];
      newAnswers.pop();
      setAnswers(newAnswers);
    }
  };

  const submitQuestion = () => {

    if (!num || !mark || !question) {
      alert("შეავსეთ ცარიელი ველები");
    } else {
        const roomnum="ოთახი " + num;
      set(ref(db, 'rooms/' + roomnum ), {
          num:num,
          question: question,
          answers: answers,
          mark:mark,
      });

      setQuestion('');
      setAnswers(['']);
      setMark('');
      setNum('');
      navigation.navigate('Rooms');
    }

  };



  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.main}>
      <View style={styles.title}>
        <Text style={{fontSize:20,color:'white',fontWeight:'600',margin:50,}}>ოთახის დამატება</Text>
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
      placeholder="ოთახის ნომერი"
      placeholderTextColor="#cccccc"
      value={num}
      onChangeText={(text) => setNum(text)}
    />
  </View>

  <View style={[styles.inputcontainer, styles.mark]}>
    <TextInput
      placeholderTextWeight="600"
      style={{
        color: 'white',
        paddingLeft: 10,
        fontWeight: '600',
        fontSize: 16,
      }}
      placeholder="ქულა"
      placeholderTextColor="#cccccc"
      value={mark}
      onChangeText={(text) => setMark(text)}
    />
  </View>
</View>

      {/* kitxva */}
      <View style={styles.inputcontainer}>
        <TextInput
        placeholderTextWeight="600"
        style={{ color: 'white',
        paddingLeft:10,
        fontWeight:'600',
      fontSize:16 }}
        placeholder="კითხვა"
        placeholderTextColor="#cccccc"
        value={question}
        onChangeText={(text) => setQuestion(text)}
      />
      </View>
      
      
    {/* pasuxebi */}
      {answers.map((answer, index) => (
  <View key={index}>
    <View style={styles.inputcontainer}>
    <TextInput
   placeholderTextWeight="600"
   style={{ color: 'white',
   paddingLeft:10,
   fontWeight:'600',
 fontSize:16 }}
   placeholderTextColor="#cccccc"
  placeholder={`პასუხი ${index + 1}`}
  value={answers[index]}
  onChangeText={(text) => {
    const newAnswers = [...answers];
    newAnswers[index] = text;
    setAnswers(newAnswers);
  }}
/>

    </View>
   

     


  </View>
))}


        <TouchableOpacity onPress={addAnswer}>
          <View style={styles.addbutt}>
            <Text style={styles.addtext}>პასუხის დამატება</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={removeAnswer}>
          <View style={styles.addbutt}>
            <Text style={styles.addtext}>პასუხის წაშლა</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={submitQuestion}>
          <View style={styles.addbutt}>
            <Text style={styles.addtext}>წარდგენა</Text>
          </View>
        </TouchableOpacity>
          

    </View>
    </ScrollView> 
  );
}

export default AddRoom;

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
