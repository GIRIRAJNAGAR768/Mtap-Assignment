import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'

import SignUpScreen from '../Screens/SignUpScreen'
import ProfileRegister from '../Screens/ProfileRegister'
import HomeScreen from '../Screens/HomeScreen'
import EditProfileScreen from '../Screens/EditProfileScreen'
import App from '../../App'


const Stack = createStackNavigator();


function RootNavigation() {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName='app'>
            <Stack.Screen name="app" component={App} options={{ headerShown: false }}/>
            <Stack.Screen name="signUp" component={SignUpScreen} options={navigationOptions("SIGN UP SCREEN")} />
            <Stack.Screen name='profileRegister' component={ProfileRegister} options={navigationOptions("Driver Profile")} />
            <Stack.Screen name='homeScreen' component={HomeScreen} options={navigationOptions("Home Screen")} />
            <Stack.Screen name='editProfileScreen' component={EditProfileScreen} options={navigationOptions("Edit Profile")} />
        </Stack.Navigator>
        </NavigationContainer>
    );
}

const navigationOptions = (title) => {
    return {
        title: title,
        headerStyle: {
            backgroundColor: "#0878b4",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            textAlign: 'left',
            fontSize: 16,
            fontWeight: 'bold',
            color: "white",
        },
    }
}





export default RootNavigation;


