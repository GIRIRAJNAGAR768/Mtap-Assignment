
import React,{useEffect,useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  LogBox
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = (props) => {
    const [loader,setLoader] = useState(true)
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    
  useEffect(()=> {
    checkUser()
  },[])

  const checkUser = async() => {
    let user = await AsyncStorage.getItem("@driverProfileData")
    if(user)
      setIsLoggedIn(true)
    setLoader(false)
  }

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={"#0878b4"} />

      { loader
        ?
        <View style={{flex:1,justifyContent:'center',alignItems: 'center',backgroundColor:'white'}}>
          <ActivityIndicator size={40} color={'black'}></ActivityIndicator>
        </View>
        :
        <>
          {
            props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: isLoggedIn?'homeScreen':'signUp'},
                ],
              })
            )
            }
          </>
      }
      </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
