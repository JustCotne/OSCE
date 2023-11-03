import React from 'react';
import { View, Text, StyleSheet,StatusBar,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Icon component

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <StatusBar backgroundColor="#2F2F2F" barStyle="light-content" />
      <Image
          source={require('../assets/Iliaunilogo.png')} // Replace with your logo image URL
          style={styles.logo}
        />
      
      <Icon name="notifications-outline" size={24} color="white" style={styles.notificationIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#313131', // Background color set to #2F2F2F
    flexDirection: 'row', // To align the text and icon horizontally
    alignItems: 'center',
    justifyContent: 'space-between', // To separate text and icon
    padding: 10,
    paddingBottom:15,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  notificationIcon: {
    paddingRight: 20, // Add some spacing between the text and icon
  },
  logo: {
    marginLeft:20,
    width: 50, // Set your desired width
    height: 50, // Set your desired height
    resizeMode: 'contain', // Adjust the image's aspect ratio
  },
});

export default Header;
