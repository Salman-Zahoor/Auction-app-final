import React,{useEffect,useState} from "react";
import { Text,View,Image,StyleSheet,ScrollView, TouchableOpacity, TouchableWithoutFeedbackBase, TouchableWithoutFeedback } from "react-native";
import { AuctionButton, Button, Header } from "../../components";
import { vh, vw ,butoncolor} from "../../constants";
import firebase from "firebase";

const Home=({navigation})=>{
    const[array,setArray]=useState({})

    useEffect(() =>{
        let id=firebase.auth().currentUser.uid
        firebase.database().ref('AdminAuction')
        .on("value", snapshot =>{
            console.log(snapshot.val(),'snapppppppppppppp')
            setArray(snapshot.val())
                })

    },[])
    console.log(array,"Array");

    const aakeys= Object.keys(array)

    console.log(array[aakeys[0]],'key data')
    console.log(aakeys[0],'key data')


    return(
        <>
         <Header heading="Home"/>
         <ScrollView>
        <View style={{flex:1}}>
        <View style={styles.mainview}>
        {aakeys.length>0 ? aakeys.map(values =>{
                return(
        <TouchableWithoutFeedback onPress={()=>navigation.navigate("AuctionDetail",{
            post: array[values] ,
            firebaseKey:values})}>
            <View style={styles.cardview}>
                <Image source={{uri:array[values].image}} style={styles.image}/>
                <AuctionButton heading={array[values].title} color={butoncolor} />
            </View>
            </TouchableWithoutFeedback>
            )
        })
    :
    <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
     <Text>No data found</Text>
    </View>
    }
        </View>
        </View>
        </ScrollView>
        </>

    )
}
export default Home
 const styles=StyleSheet.create({
     mainview:{
        alignItems:"center"
     },
     cardview:{
         backgroundColor:"white",
         height:vh*0.3,
         width:vw*0.9,
         marginVertical:vh*0.02,
         borderRadius:10,
         elevation:5
         
     },
     image:{
         height:vh*0.2,
         width:vw*0.9,
         marginBottom:15,
         borderRadius:10

     }
 })