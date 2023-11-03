import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header';



const CalendarScreen = () => {
    return (
        <View style={styles.main}>
          <Header title="Calendar" />
          <View>
            <Text>calendar Screen Content</Text>
          </View>
        </View>
      );
    };

export default CalendarScreen

const styles = StyleSheet.create({
    main:{
        backgroundColor: '#414950',
        flex:1,
    },
    
    
    })
    