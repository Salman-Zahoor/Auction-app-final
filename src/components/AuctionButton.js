import React from "react"
import {View,Text,StyleSheet,Image,TouchableOpacity} from "react-native"
import { headerbackground, headerfont, headerfontcolor, headertextcolor, vh,vw } from "../constants"

const AuctionButton=({heading,color,marginVertical,titles})=>{
    return(
        <View style={{...styles.container,backgroundColor:color,marginVertical:marginVertical}}>
            <Text style={styles.textstyle} >
                {titles}
            </Text>
            <Text style={styles.textstyle} >
                {heading}
            </Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flexDirection:"row",
        marginHorizontal:vw*0.08,
        borderRadius:10,
        height:vh*0.06,
        justifyContent:"center",
        alignItems:"center",
    },
    textstyle:{
        color:headertextcolor,
        fontSize:headerfont,
    }
})
export default AuctionButton