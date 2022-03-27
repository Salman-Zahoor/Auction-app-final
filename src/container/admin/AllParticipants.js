import React, { useState, useEffect } from "react"
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native"
import { Header, Button } from "../../components"
import { marginTop, vh, vw, headerbackground } from "../../constants"
import { FontAwesome5 } from '@expo/vector-icons';
import firebase from "firebase";
import arrow from '../../assets/arraw.png'
const AllParticipnats = ({ route, navigation }) => {
    const { participants, firebaseKey, post } = route.params

    const [isclick, setIsClick] = useState(false)
    const [participatedUserData, setParticipatedUserData] = useState({})

    useEffect(() => {
        let id = firebase.auth().currentUser.uid
        firebase.database().ref('Participated')
            .on("value", snapshot => {
                setParticipatedUserData(snapshot.val())
            })

    }, [])


    const select = (value) => {
        if (isclick) {
            setIsClick(false)
            return
        }
        setIsClick(value)
    }

    const ChooseWinner = () => {
        let eventParticipants = participants
        participants.map((user, index) => {
            if (user.uuid == isclick.uuid) {
                eventParticipants[index] = {
                    ...user,
                    winnner: true
                }
            } else {
                eventParticipants[index] = {
                    ...user,
                    winnner: false
                }
            }
        })
        firebase.database().ref(`AdminAuction/${firebaseKey}`).update({
            
            participants: eventParticipants,
            isWon: true
        }).then(res => { alert('Winner Selectd') })
        let participatedUserKeys = Object.keys(participatedUserData)
        participatedUserKeys.map(userKey => {
            if (participatedUserData[userKey].eventID === firebaseKey && participatedUserData[userKey].id === isclick.uuid) {
                firebase.database().ref(`Participated/${userKey}`)
                    .update({
                        isWon: true
                    })
                    .then(response => {
                    })
                    .catch(eror => {
                        console.log(eror, "EERRREERRR");
                    })
            }
        })
    }

    const logout = () => {
        firebase.auth().signOut()
    }
    const renderBeforeWinng = (value) => {
        return (
            <TouchableOpacity style={isclick.uuid == value.uuid ? styles.selectcardview : styles.cardview} onPress={_ => select(value)}>
                <FontAwesome5 name="user-alt" size={20} color="white" style={styles.icon} />
                <Text style={styles.text} >
                {value.name}

                </Text>
            </TouchableOpacity>
        )
    }
    const renderAfterWinning = (value) => {
        return (
            <TouchableOpacity style={value.winnner == true ? styles.selectcardview : styles.cardview}>
                <FontAwesome5 name="user-alt" size={20} color="white" style={styles.icon} />
                <Text style={styles.text} >
                    {value.name}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.mainView}>
            <Header heading="All Participants" salman='LOGOUT' Press={logout} imageUri={arrow} onPress={_ => navigation.goBack()} />
            <ScrollView>

                {participants.length>0 ?participants.map(value => {
                    return (
                        <>
                            {post.isWon ? renderAfterWinning(value) : renderBeforeWinng(value)}
                        </>
                    )
                })
                :
                <View style={{justifyContent:"center",alignItems:"center",}}>
                <Text style={{textAlign:"center"}}>No Participants found</Text>
                </View>
                }

            </ScrollView>
            {!post.isWon ? <Button heading="Choose Winner" color={headerbackground} marginVertical={20} onPress={_ => {
                if (!isclick) {
                    alert('Please Select User')
                    return
                }
                Alert.alert(
                    "Confirm Winner",
                    `Are you sure you want to make  ${isclick.name} winner for this auction?`,
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "Yes", onPress: () => ChooseWinner() }
                    ]
                )
            }} /> :

                <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                    <Text>You have already selected winner for this event</Text>
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    icon: {
        padding: 10,
    },
    image: {
        height: 100,
        width: 100,
        marginTop: 20,
        marginHorizontal: 1000,
    },
    cardview: {
        marginTop: vh * 0.02,
        borderWidth: 1,
        marginHorizontal: vw * 0.05,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'black',
        borderColor: 'black',
        flexDirection: "row",
    },
    selectcardview: {
        marginTop: vh * 0.02,
        borderWidth: 1,
        marginHorizontal: vw * 0.05,
        borderRadius: 10,
        padding: 10,
        backgroundColor: headerbackground,
        borderColor: headerbackground,
        flexDirection: "row",
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        padding: 10
    },
    buttonsView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    }
})

export default AllParticipnats