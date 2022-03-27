import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Button, Header, AuctionDetailView, AuctionButton } from "../../components";
import { butoncolor, vh, vw } from "../../constants";
import firebase from "firebase";


const AuctionDetail = ({ route,navigation}) => {

    const { firebaseKey, post } = route.params
    const [eventParticipants, setEventParticpiants] = useState([])
    const {
        title,
        description,
        price,
        date,
        image,
    } = post


    useEffect(() => {
        if (post.participants) {
            const tempArray = []
            post.participants.map(val => {
                tempArray.push(val.uuid)
            })
            setEventParticpiants(tempArray)
        }
    }, [])
    const getUserDetails = () => {
        let user = null
        let id = firebase.auth().currentUser.uid
        firebase.database().ref(`users/${id}`)
            .on("value", snapshotttt => {
                user = snapshotttt.val()
            })
        return user
    }

    const handleParticipate = () => {
        let eventParticipants = post.participants || []
        eventParticipants.push(getUserDetails())
        console.log(eventParticipants, 'eventParticipants')
        firebase.database().ref(`AdminAuction/${firebaseKey}`).update({
            ...post,
            participants: eventParticipants
        }).then(res => { console.log('updated') })
        let id = firebase.auth().currentUser.uid
        firebase.database().ref(`Participated`)
       
            .push({
                title,
                description,
                price,
                date,
                id,
                eventID: firebaseKey,
                image

            })
            .then(response => {
                alert("Participated");
                navigation.goBack()
                console.log(image,"image");
            })
            .catch(eror => {
                console.log(eror, "EERRREERRR");
            })
    }

    console.log(eventParticipants, 'eventParticipants')


    
        

    return (
        <View style={{ flex: 1 }}>
            <Header heading="AuctionDetail" />
            <View style={styles.mainview}>
                <View style={styles.cardview}>
                    <Image source={{uri:image}} style={styles.image}/>
                    <AuctionButton titles="Title : " heading={title} color={butoncolor} />
                    <AuctionDetailView titles="Description : " heading={description} color={butoncolor} />
                    <AuctionButton titles="Price : " heading={price} color={butoncolor} marginVertical={10} />
                    <AuctionButton titles="Date : " heading={date} color={butoncolor} marginVertical={5} />
                    {post.isWon ? <Text>Winner has been announced </Text> : eventParticipants.includes(firebase.auth().currentUser.uid) ? <Text>You have already participated</Text> :
                        <Button heading="Participate" color="black" marginVertical={30} onPress={handleParticipate} />
                    }

                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainview: {
        marginTop: 10,
        alignItems: "center",
    },

    cardview: {
        justifyContent: "center",
    },
    image: {
        height: vh * 0.2,
        width: vw * 0.9,
        marginBottom: 15,
        borderRadius: 10,


    }

})

export default AuctionDetail
