import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

const InputField = ({placeholderText, onChangeValue, value,keyboardType}) => {

    return (
        <TextInput
            style={styles.inputStyle}
            placeholder={placeholderText}
            value={value}
            onChangeText={value => { onChangeValue(value) }}
            autoCorrect={false}
            keyboardType={keyboardType}
        />
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: '#fafafa',
        padding: 12,
        borderWidth: 0.5,
        borderColor: '#000',
        fontSize: 15,
        color: '#000',
        width: '90%',
        borderRadius: 5,
    },
})

export default InputField