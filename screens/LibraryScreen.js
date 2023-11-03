import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header';



const LibraryScreen = () => {
    return (
        <View style={styles.main}>
          <Header title="Library" />
          <View>
            <Text>Library Screen Content</Text>
          </View>
        </View>
      );
    };

export default LibraryScreen

const styles = StyleSheet.create({
    main:{
        backgroundColor: '#414950',
        flex:1,
    },
    
    
    })
    