import React,{useState} from 'react'
import { View, Text,StyleSheet,StatusBar,TouchableNativeFeedback,ToastAndroid } from 'react-native'
import {CommonActions} from '@react-navigation/native'
import InputField from '../Components/InputField'
import ButtonView from '../Components/ButtonView'

const SignUpScreen = (props) => {

    const [mobileNumber,setMobileNumber] = useState("")
    const [serverOtp,setServerOtp] = useState("")
    const [userOtp,setUserOtp] = useState("")
    const [isOtpSent,setIsOtpSent] = useState(false)

   const otpSendAction =() =>{
       
    if(mobileNumber.length==10)
       {
        let otp = Math.floor(Math.random() * (10000 - 1000) + 1000);
        setServerOtp(otp);
        setIsOtpSent(true)
        ToastAndroid.showWithGravity("otp is: "+otp,ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,)
       }
       else
       {
        ToastAndroid.showWithGravity("please Enter valid mobile number.",ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,)
       }
        
    }

    const otpSubmitAction = () => {
        if(serverOtp==userOtp)
        {
            props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'profileRegister',
                    params: {
                      mobileNumber: mobileNumber,
                    }},
                  ],
                })
            )
        }
        else
        {
            ToastAndroid.showWithGravity("Wrong OTP",ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} backgroundColor={"#0878b4"} />
            <View style={styles.dataContainer}>
                <Text style={{fontSize:16,fontWeight:'bold',marginVertical:10}}>Sign Up Using Mobile</Text>
                <InputField 
                    placeholderText={"Enter your Mobile Number here"}
                    value={mobileNumber}
                    onChangeValue={(newValue)=> setMobileNumber(newValue)}
                    keyboardType="number-pad"
                />
            
            <ButtonView title={!isOtpSent?"Send OTP":"Resend OTP"} onButtonPress={()=> {
                    otpSendAction()
                }}/>

            {  isOtpSent &&  <>
                <InputField 
                    placeholderText={"Enter OTP here"}
                    value={userOtp}
                    onChangeValue={(otp)=> setUserOtp(otp)}
                    keyboardType="number-pad"
                />
                
                <ButtonView title="Submit OTP" onButtonPress={()=> {
                    otpSubmitAction()
                }}/>
                </>}

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
        justifyContent:'center',
        alignItems:'center',
    },
    dataContainer:{
        width:"90%",
        backgroundColor:"gray",
        alignItems:'center', 
        backgroundColor:'white',
        elevation:2,
        paddingVertical:10    
    }
})

export default SignUpScreen
