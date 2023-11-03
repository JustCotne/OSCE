import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ref, get } from "firebase/database";
import { db } from "../firebaseConfig";

const DateScreen = () => {
  const [numValues, setNumValues] = useState([]);
  const [studentValues, setStudentValues] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      retrieveNumsFromDatabase();
      retrieveGroupFromDatabase();
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

  const retrieveGroupFromDatabase = async () => {
    try {
      const groupRef = ref(db, "groups");
      const snapshot = await get(groupRef);

      if (snapshot.exists()) {
        const groupData = snapshot.val();
        const students = Object.keys(groupData).map(
          (groupKey) => groupData[groupKey].student
        );
        setStudentValues(students);
      } else {
        setStudentValues([]);
      }
    } catch (error) {
      setStudentValues([]);
    }
  };

  const handleClick = () => {
    navigation.navigate("AddGroup");
  };

  return (
    <View style={styles.main}>
      <Header title="Date" />
      <View style={{ flex: 1 }}>
      <FlatList
  data={studentValues}
  numColumns={2}
  renderItem={({ item, index }) => (
    <>
      <TouchableOpacity
        key={item}
        onPress={() => {
          navigation.navigate("GroupInfo", { data: item });
        }}
      >
        <View style={styles.groupboxTop}>
          <View>
            <Text style={styles.memberbox}>{item.length} წევრი</Text>
          </View>
          <View style={styles.groupboxbot}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "#fa3752",
                  margin: 7,
                  borderRadius: 1,
                  width: 38,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white" }}>   {numValues[index]}</Text>
              </View>
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  fontWeight: "700",
                }}
              >
                ჯგუფი
              </Text>
            </View>
            <View style={{ marginHorizontal: 20 }}></View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  )}
/>
      </View>

      <TouchableOpacity onPress={handleClick}>
        <View style={styles.addbutt}>
          <Text style={styles.addtext}>ჯგუფის დამატება</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DateScreen;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#414950",
    flex: 1,
  },
  groupboxTop: {
    margin: 20,
    justifyContent: "flex-end",
    backgroundColor: "#cccccc",
    width: 160,
    height: 110,
    borderRadius: 5,
  },
  groupboxbot: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "flex-end",
    backgroundColor: "#313131",
    paddingLeft: 10,
    width: 160,
    height: 50,
    borderRadius: 5,
  },
  memberbox: {
    alignSelf: "flex-end",
    backgroundColor: "#777777",
    color: "white",
    fontSize: 11,
    fontWeight: "600",
    margin: 5,
    padding: 2,
    borderRadius: 5,
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
    marginBottom:20,
  },
  addtext: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333333",
  },
});
