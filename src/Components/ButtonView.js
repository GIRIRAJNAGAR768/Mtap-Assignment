import React from 'react'
import { View, Text,TouchableNativeFeedback } from 'react-native'

const ButtonView = ({title,onButtonPress}) => {
    return (
        <TouchableNativeFeedback onPress={()=> 
            onButtonPress()
        }>
            <View style={{paddingHorizontal:20,paddingVertical:10,backgroundColor:'#0878b4',justifyContent: 'center',alignItems:'center',borderRadius:5}}>
                <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>{title}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

export default ButtonView
