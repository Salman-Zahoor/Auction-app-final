import React from "react"
import {View,Text,StyleSheet,Image,TouchableOpacity} from "react-native"
import { butoncolor, globalfontcolor, headerbackground, headerfont, headerfontcolor, headertextcolor, vh,vw } from "../constants"

const Button=({heading,onPress,color,marginVertical})=>{
    return(
        <TouchableOpacity onPress={onPress}>
        <View style={{...styles.container,backgroundColor:color,marginVertical:marginVertical}}>
            <Text style={styles.textstyle} >
                {heading}
            </Text>
        </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        height:vh*0.06,
        marginHorizontal:vw*0.08,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
    },
    textstyle:{
        color:headertextcolor,
        fontSize:headerfont,
        alignItems:"flex-end"
    }
})
export default Button