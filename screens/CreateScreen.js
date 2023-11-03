import { StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { onValue, ref, get } from 'firebase/database';
import { db } from '../firebaseConfig';

const CreateScreen = () => {
  const [numValues, setNumValues] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused(); 

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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleClick = () => {
    navigation.navigate('AddRooms');
  };

  const navigation = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.main}>
        <Header title="Create" />



        {numValues.map((num, index) => (
        <TouchableOpacity key={num} onPress={() => {
          navigation.navigate("RoomInfo", { data: num });
        }}>
          <View style={styles.roomcontainer}>
            <Text style={styles.roomtext}>ოთახი {num}</Text>
          </View>
        </TouchableOpacity>
      ))}


        <TouchableOpacity onPress={handleClick}>
          <View style={styles.addbutt}>
            <Text style={styles.addtext}>ოთახის დამატება</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#414950',
    flex: 1,
    flexDirection: 'column',
  },
  addbutt: {
    marginTop: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#cccccc",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  addtext: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  roomcontainer:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#292e33',
    marginTop:20,
    marginHorizontal:40,
    borderRadius:20,
    height:50,
  },
  roomtext:{
    color:'white',
    fontSize:18,
    fontWeight:'500',
  },
});

export default CreateScreen;
