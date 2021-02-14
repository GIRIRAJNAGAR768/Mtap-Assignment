import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,ScrollView,StatusBar,Alert,ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {launchImageLibrary} from 'react-native-image-picker';

import ButtonView from '../Components/ButtonView'
import InputField from '../Components/InputField'
import AvatarView from '../Components/AvatarView'
import LicenceImageView from '../Components/LicenceImageView'

const EditProfileScreen = (props) => {


    const [profileData,setProfileData] = useState({})

    const [avatar,setAvatar] = useState("")
    const [licenseImage,setLicenseImage] = useState("")
    const [name,setName] = useState("")
    const [vehicleNumber,setVehicleNumber] = useState("")
    const [mobileNumber,setMobileNumber] = useState("")

    useEffect(()=> {
        checkUserProfile()
    },[])

    const checkUserProfile = async() => {
        let data = await AsyncStorage.getItem("@driverProfileData")
        if(data)
        {
            let profileData = JSON.parse(data)
            setProfileData(profileData)
            setAvatar(profileData.avatar)
            setLicenseImage(profileData.licenseImage)
            setName(profileData.name)
            setVehicleNumber(profileData.vehicleNumber)
            setMobileNumber(profileData.mobileNumber)
        }
    }

    const selectImage = (type)=> {
        let options = { noData: true, mediaType: 'photo' }
        launchImageLibrary(options, response => {
          console.log({ response });
          if (response.didCancel) {
            console.log('User cancelled photo picker');
            Alert.alert('You did not select any image');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let source = { uri: response.uri };
            console.log({ source });
            if(type=="avatar")
                setAvatar(source)
            else
                setLicenseImage(source)  
          }
        });
    }

    const submitData = async()=>{

        if(name=="" || vehicleNumber=="")
        {
            ToastAndroid.showWithGravity("please provide all required data.",ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,)
        }
        else
        {
            let driverProfileData={
                name:name,
                mobileNumber:mobileNumber,
                vehicleNumber:vehicleNumber,
                avatar:avatar,
                licenseImage:licenseImage,
            }

            await AsyncStorage.setItem('@driverProfileData',JSON.stringify(driverProfileData)).then(()=> {
                props.navigation.goBack()
            })
        }
    } 

    return (
        <ScrollView style={{backgroundColor:'white'}}>
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={"#0878b4"} />
            <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>Driver Profile</Text>

            <View style={{alignItems:'center',paddingVertical:20}}>
                <AvatarView imageData={avatar}/>    

                <ButtonView title={"Edit Avatar"} onButtonPress={()=> 
                    selectImage("avatar")
                }/>

                <InputField 
                    placeholderText={"Enter your Name here"}
                    value={name}
                    onChangeValue={(name)=> setName(name)}
                    keyboardType='default'
                />

                <InputField 
                    placeholderText={"Enter Vehicle Number here"}
                    value={vehicleNumber}
                    onChangeValue={(vehicleNumber)=> setVehicleNumber(vehicleNumber)}
                    keyboardType='default'
                />

               <LicenceImageView imageData={licenseImage} />

                <ButtonView title={"Edit License Image"} onButtonPress={()=> 
                    selectImage("license")
                }/>

                <View style={{marginVertical:30}}>
                    <ButtonView title={"Submit Profile"} onButtonPress={()=> 
                        submitData()
                    }/>
                </View>
            </View>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
        padding:10
    }
})

export default EditProfileScreen
