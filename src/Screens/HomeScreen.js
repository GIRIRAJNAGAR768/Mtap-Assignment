import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,StatusBar,ScrollView,Image } from 'react-native'
import ButtonView from '../Components/ButtonView'
import AvatarView from '../Components/AvatarView'
import LicenceImageView from '../Components/LicenceImageView'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {CommonActions} from '@react-navigation/native'

const HomeScreen = (props) => {

    const [driverData,setDriverData] = useState(null)

    useEffect(()=> {
        const unsubscribe = props.navigation.addListener('focus', async () => {
            fetchProfileData()
        })
        fetchProfileData()

        return () => {unsubscribe}
    },[])

    const fetchProfileData = async() =>{
        let data = await AsyncStorage.getItem("@driverProfileData")
        if(data)
        {
            let profileData = JSON.parse(data)
            setDriverData(profileData)
        }
    }

    return (
        <ScrollView style={{backgroundColor:'white'}}>
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={"#0878b4"} />
            <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>Driver Profile Data</Text>
            <View style={{alignItems:'center',paddingVertical:20}}>
                <AvatarView imageData={driverData&& driverData.avatar}/>
            </View>

            <View style={{alignSelf:'center',width:'90%',marginBottom:30}}>
                <Text style={{fontSize:14,fontWeight:'bold'}}>{`Driver Name: ${driverData&& driverData.name}`}</Text>
                <Text style={{fontSize:14,fontWeight:'bold'}}>{`Vehicle Number: ${driverData&& driverData.vehicleNumber}`}</Text>
            </View>

            <LicenceImageView imageData={driverData&& driverData.licenseImage}/>
            <View style={{marginVertical:10}}>
            <ButtonView title={"Edit Profile"} onButtonPress={async()=> 
                    // await AsyncStorage.clear()
                    props.navigation.navigate('editProfileScreen',{isFromHome:true})
                }/>
            </View>
        </View>
        <View style={{height:50,padding:10,alignSelf:'center',width:'100%'}}>
                <Text onPress={async()=> {
                    await AsyncStorage.clear().then(()=>{
                        props.navigation.dispatch(
                            CommonActions.reset({
                              index: 1,
                              routes: [
                                { name: 'signUp'},
                              ],
                            })
                        )
                    })
                }}
                 style={{textDecorationLine: 'underline',fontSize:14,fontWeight:'bold'}}>Sign out</Text>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
        padding:10,
        alignItems:'center',
        margin:10,
        elevation:5
    },
    
})

export default HomeScreen
