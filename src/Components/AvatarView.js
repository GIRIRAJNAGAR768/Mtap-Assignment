import React from 'react'
import { View, Text,Image,StyleSheet } from 'react-native'

const AvatarView = ({imageData}) => {
    return (
        <View style={styles.avatarView}>
            <Image style={{height:100,width:100,borderRadius:100}} source={imageData}/>
        </View>
    )
}

const styles = StyleSheet.create({
    avatarView:{
        height:102,
        width:102,
        borderRadius:51,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10
    },
})

export default AvatarView
