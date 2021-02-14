import React,{useState} from 'react'
import { View, Text,StyleSheet,StatusBar,ScrollView,Image,Alert,ToastAndroid } from 'react-native'
import ButtonView from '../Components/ButtonView'
import InputField from '../Components/InputField'
import AvatarView from '../Components/AvatarView'
import LicenceImageView from '../Components/LicenceImageView'
import {CommonActions} from '@react-navigation/native'
// import ImagePicker from 'react-native-image-picker'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileRegister = (props) => {

    const [avatar,setAvatar] = useState({uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png"})
    const [licenseImage,setLicenseImage] = useState({uri:"https://static.thenounproject.com/png/85643-200.png"})
    const [name,setName] = useState("")
    const [vehicleNumber,setVehicleNumber] = useState("")
    const [isAvatarSet,setIsAvatarSet] = useState(false)
    const [isLicenceSet,setIsLicenceSet] = useState(false)

    const mobileNumber = props.route.params.mobileNumber

    console.log(mobileNumber)

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
            {
                setAvatar(source)
                setIsAvatarSet(true)
            }  
            else
            {
                setLicenseImage(source)
                setIsLicenceSet(true)
            }
                
          }
        });
      }
    
    const submitData = async()=>{

        console.log(isAvatarSet)

        if(!isAvatarSet || !isLicenceSet || name=="" || vehicleNumber=="")
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
                props.navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        { name: 'homeScreen'},
                      ],
                    })
                )
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

                <ButtonView title={"Upload Avatar"} onButtonPress={()=> 
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

                <ButtonView title={"Upload License Image"} onButtonPress={()=> 
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
    },
})

export default ProfileRegister
