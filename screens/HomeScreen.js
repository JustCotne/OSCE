import React, { useState, useEffect } from 'react';;
import {StyleSheet, View, Text,FlatList,TouchableOpacity, ScrollView } from 'react-native';
import Header from './Header';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { ref, get } from 'firebase/database';
import { db } from '../firebaseConfig';

const HomeScreen = () => {
    const [numValues, setNumValues] = useState([]);
    const isFocused = useIsFocused(); 
    const navigation = useNavigation();


    useEffect(() => {
      if (isFocused) {
        retrieveNumsFromDatabase(); 
      }
    }, [isFocused]);
  
    const retrieveNumsFromDatabase = async () => {
      try {
        const roomRef = ref(db, 'rooms');
        const snapshot = await get(roomRef);
  
        if (snapshot.exists()) {
          const roomData = snapshot.val();
          const nums = Object.keys(roomData).map((roomKey) => roomData[roomKey].num);
          setNumValues(nums);
        } else {
          setNumValues([]);
        }
      } catch (error) {
        setNumValues([]);
      }
    };

    const handlePressGroup = () => {
        alert('Group 1 Clicked!');
      };
  return (
    
    <View style={styles.main}>
      <Header title="Home" />
      
      <View style={styles.top}>
        <View style={styles.see}>
            <Text style={styles.grouptext}><AntDesign name="book" size={24} color="white" />   ოთახები</Text>       
        </View>
        <View style={styles.see}>
            <Text style={styles.seetext}>see all</Text>
        </View>
      </View>

      <FlatList
  data={numValues}
  numColumns={2}
  renderItem={({ item, index }) => (
    <>

<View style={styles.group}>


      <TouchableOpacity key={item} onPress={() => {
        navigation.navigate("TestGroup", { roomNum: item});
      }}>
        <View style={{margin:20}}>
              <View style={styles.groupboxTop}>
                  <View style={styles.groupboxbot}>
                      <Text style={{color:'white',fontSize:20,fontWeight:'700'}}>ოთახი {item}</Text>
                  </View>
              </View>
          </View>
      </TouchableOpacity> 

                
      </View>


      </>
        )}
      />
    </View>
    
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
main:{
    backgroundColor: '#414950',
    flex:1,
},
scrollContainer: {
    flexGrow: 1,
  },
top:{

    marginTop:40,
    margin:25,
    flexDirection:'row',
    justifyContent:'space-between'
},
grouptext:{
    fontWeight:'700',
    fontSize:18,
    color:"white"
},
see:{
   justifyContent:'center',
   
},
seetext:{
    color:'#757778'     
 },
 group:{
    // flexDirection:"row",
    justifyContent:'space-between',
 },
 groupboxTop:{
    backgroundColor:"#cccccc",
    width:160,
    height:80,
    borderRadius:5,
 },
 groupboxbot:{
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'flex-end',
    backgroundColor:"#313131",
    marginRight:-5,
    marginTop:-5,
    width:160,
    height:80,
    borderRadius:5,
 },
 memberbox:{
    alignSelf:'flex-end',
    backgroundColor:"#777777",
    color:'white',
    fontSize:11,
    fontWeight:'600',
    margin:5,
    padding:2,
    borderRadius:5,
 }
 
})
