import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList,
  } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ref, get } from "firebase/database";
import { db } from "../../firebaseConfig";
import { FontAwesome } from '@expo/vector-icons';
  
  const TestGroup = ({ route }) => {
    const { roomNum } = route.params;
    const [numValues, setNumValues] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
  
    useEffect(() => {
      if (isFocused) {
        retrieveNumsFromDatabase();
      }
    }, [isFocused]);
  
    const retrieveNumsFromDatabase = async () => {
      try {
        const groupRef = ref(db, "groups");
        const snapshot = await get(groupRef);
  
        if (snapshot.exists()) {
          const groupData = snapshot.val();
          const nums = Object.keys(groupData).map(
            (groupKey) => groupData[groupKey].num
          );
          setNumValues(nums);
        } else {
          setNumValues([]);
        }
      } catch (error) {
        setNumValues([]);
      }
    };
  
    return (
      <View style={styles.main}>
        <View style={{ flex: 1 }}>
        <View style={styles.see}>
        <Text style={styles.grouptext}><FontAwesome name="user-o" size={24}  color="white" />   ჯგუფები</Text>
        </View>
          <FlatList
            data={numValues}
            numColumns={2}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    navigation.navigate("TestGroupInfo", { data: item, roomNum:roomNum });
                  }}
                >

                    <View style={styles.groupboxbot}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={{
                            backgroundColor: "#fa3752",
                            margin: 7,
                            borderRadius: 1,
                            width: 30,
                            justifyContent: "center",
                            padding:5,
                          }}
                        >
                          <Text style={{ color: "white",fontSize:16,fontWeight:'600' }}> {item}</Text>
                        </View>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 18,
                            fontWeight: "600",
                          }}
                        >
                          ჯგუფი
                        </Text>
                      </View>
  
                      <View style={{ marginHorizontal: 20 }}></View>
                    </View>
                </TouchableOpacity>
              </>
            )}
          />
        </View>
      </View>
    );
  };
  
  export default TestGroup;
  
  const styles = StyleSheet.create({
    main: {
      backgroundColor: "#414950",
      flex: 1,
    },

    groupboxbot: {
      flexDirection: "column",
      justifyContent: "center",
      alignSelf: "flex-end",
      backgroundColor: "#313131",
      paddingLeft: 10,
      width: 160,
      height: 80,
      borderRadius: 5,
      margin: 20,
    },
    grouptext:{
        fontWeight:'700',
        fontSize:20,
        color:"white"
    },
    see:{
       justifyContent:'center',
       alignItems:'center',
       margin:20,
    },
    addbutt: {
      marginTop: 40,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#cccccc",
      padding: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
    },
    addtext: {
      fontSize: 16,
      fontWeight: "700",
      color: "#333333",
    },
  });
  