import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

const GroupInfo = ({route}) => {
  const { data } = route.params;



  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.main}>

      <View style={styles.titlecont}>
        <Text style={styles.title}>ჯგუფი </Text>
      </View>
      
      {data.map((student, index) => (
        <View style={styles.member} key={index}>
            <View style={styles.membercontainer}><Text style={{ fontSize: 12, color: 'white', fontWeight: '600' }}>{index + 1}</Text></View>
            <View style={styles.namecontainer}><Text style={{ color: 'white', fontWeight: '700', paddingLeft: 20 }}>{student}</Text></View>
            {/* <View style={styles.points}><Text style={{ color: 'white', fontWeight: '600' }}>92.2</Text></View> */}
        </View>
      ))}
      


    </View>
    </ScrollView>
  )
}

export default GroupInfo

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#414950',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  titlecont:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:30,
    marginBottom:50,
  },
  title:{
    color:'white',
    fontSize:22,
    fontWeight:'600',
  },
  membercontainer:{
        
    backgroundColor:'#FE004B',
    justifyContent:'center',
    alignItems:'center',
    padding:8,
    marginLeft:20,
    width:40,
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
 },
 namecontainer:{
    flex:1,
    backgroundColor:'#2F2F2F',
    justifyContent:'center',
    marginRight:20,
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
 },
 member:{
    marginBottom:10,
    flexDirection:'row',
 },
 points:{
    backgroundColor:'#303335',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:8,
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
 },
})