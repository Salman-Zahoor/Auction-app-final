import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { vh } from '../constants'

const TextInputs = ({ placeholder, value, onChangeText, secureTextEntry, height, multiline, numRows, style }) => {
    return (
        <View>
            <TextInput placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                style={[styles.textInput, style]}
                multiline={multiline}
                numberOfLines={numRows}
                

            />
        </View>
    )
}
const styles = StyleSheet.create({
    textInput: {
      borderWidth:1, padding: 10, marginHorizontal: 20, marginTop: vh * 0.03, borderRadius: 5,
    }
})
export default TextInputs

TextInput.defaultProps = {
    multiline: false
}