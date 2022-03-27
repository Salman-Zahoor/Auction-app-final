import React from "react"
import {View,Text,StyleSheet,Image,TouchableOpacity} from "react-native"
import { butoncolor, globalfontcolor, headerbackground, headerfont, headerfontcolor, headertextcolor, vh,vw } from "../constants"

const AuctionDetailView=({heading,onPress,color,titles})=>{
    return(
        <View style={{...styles.container,backgroundColor:color}}>
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
        width:350,
        borderRadius:10,
        height:vh*0.3,
        marginTop:10,
        justifyContent:"center",
        flexWrap:"wrap"
    },
    textstyle:{
        color:headertextcolor,
        fontSize:headerfont,
        alignItems:"flex-end",
        padding:10,
        flexWrap:"wrap"
    }
})
export default AuctionDetailView