import React from 'react'
import { View, Text,Image,StyleSheet } from 'react-native'

const LicenceImageView = ({imageData}) => {
    return (
        <View style={styles.licenceImageView}>        
            <Image style={{height:"100%",width:"100%"}} resizeMode="contain" source={imageData}/>
        </View>
    )
}

const styles = StyleSheet.create({
    licenceImageView:{
        height:200,
        width: '90%',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    },
})

export default LicenceImageView
