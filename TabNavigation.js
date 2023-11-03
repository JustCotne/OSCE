import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import CreateScreen from './screens/CreateScreen';
import DateScreen from './screens/DateScreen';
import LibraryScreen from './screens/LibraryScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the icons you want to use
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import AddRoom from './screens/rooms/AddRoom';
import RoomInfo from './screens/rooms/RoomInfo';
import AddGroup from './screens/groups/AddGroup';
import GroupInfo from './screens/groups/GroupInfo';
import TestGroup from './screens/test_screens/TestGroups';
import TestGroupInfo from './screens/test_screens/TestGroupInfo';
import MainTest from './screens/test_screens/MainTest';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Create a Stack Navigator

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="TestGroup" component={TestGroup} options={{ headerShown: false }} />
    <Stack.Screen name="TestGroupInfo" component={TestGroupInfo} options={{ headerShown: false }} />
    <Stack.Screen name="MainTest" component={MainTest} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const RoomStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Rooms" component={CreateScreen} options={{ headerShown: false }} />
    <Stack.Screen name="RoomInfo" component={RoomInfo} options={{ headerShown: false }} />
    <Stack.Screen name="AddRooms" component={AddRoom} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const GroupStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Groups" component={DateScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AddGroup" component={AddGroup} options={{ headerShown: false }} />
    <Stack.Screen name="GroupInfo" component={GroupInfo} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "green",
          tabBarStyle: {
            backgroundColor: '#2F2F2F',
          },
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack} // Use the Stack Navigator as a component
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" size={30} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarLabel: 'Calendar',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={28} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Create"
          component={RoomStack}
          options={{
            tabBarLabel: 'Rooms',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="plussquareo" size={30} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Date"
          component={GroupStack}
          options={{
            tabBarLabel: 'Groups',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="group" size={size} color={color}/>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            tabBarLabel: 'Library',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="appstore-o" size={30} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
