import React,{useEffect,useState} from "react"
import {View,Text,TextInput,Image,StyleSheet,TouchableOpacity} from "react-native"
import { Header } from "../../components"
import{marginTop, vh, vw,headerfont,globalfontcolor, headerbackground, headertextcolor}from"../../constants"
import firebase from "firebase"

const Profile =()=>{
     
     useEffect(()=>{
        getUserDetails()

    },[]);

    const[userDetails,setuserDetails]=useState({})

    const getUserDetails=()=>{
        let id=firebase.auth().currentUser.uid
        firebase.database().ref(`users/${id}`)
        .on("value",snapshotttt =>{
        //  console.log(id,"IDDDDD");
            // console.log(snapshotttt.val(),"Valuee");
            setuserDetails(snapshotttt.val())
        })
    }

    const logout=()=>{
        firebase.auth().signOut()
    }
    return(
        <View style={styles.mainView}>
            <Header heading="Profile"/>
            <Image source={{uri:userDetails.image}} style={styles.image}/>
            <View style={styles.cardview}>
                <Text style={styles.text}>
                Name : {userDetails.name}
            </Text>
            </View>
            <View style={styles.cardview}>
                <Text style={styles.text}>
                Email : {userDetails.email}
            </Text>
            </View>
            <TouchableOpacity style={styles.cardview} onPress={logout}>
                <Text style={styles.text}>
                LOGOUT
            </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles=StyleSheet.create({
    mainView:{
        flex:1,
    },
    image:{
        height:100,
        width:100,
        borderRadius:50,
        marginTop:marginTop,
        marginHorizontal:vw*0.4,
    },
    cardview:{
        marginVertical:vh*0.02,
        marginHorizontal:vw*0.07,
        borderRadius:10,
        padding:10,
        backgroundColor:headerbackground,
        elevation:10
    },
    text:{
        color:headertextcolor,
        fontSize:headerfont,
        fontWeight:"bold",
        textAlign:"center"
    }
})

export default Profile