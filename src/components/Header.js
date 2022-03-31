import React from "react"
import {View,Text,StyleSheet,TouchableOpacity,Image} from "react-native"
import { headerbackground, headerfont, headertextcolor, vh } from "../constants"

const Header=({heading,imageUri,onPress,Press,salman})=>{
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.imageView} onPress={onPress}>
            <Image source={imageUri} style={{height:30,width:30,marginTop:10}} />
            </TouchableOpacity>
            <Text style={styles.textstyle}>
                {heading}
            </Text>
            <TouchableOpacity onPress={Press} style={styles.touchabletext}>
                    <Text style={styles.textstyle}>
                        {salman}
                    </Text>
                </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        height:vh*0.09,
        backgroundColor:headerbackground,
        alignItems:"center",
        flexDirection:"row"
    },
    textstyle:{
        color:headertextcolor,
        fontSize:headerfont,
        fontWeight:"bold",
        marginTop:10

    },
    touchabletext:{
        // justifyContent:"flex-end"
        marginLeft:100,
    }
    
})
export default Header