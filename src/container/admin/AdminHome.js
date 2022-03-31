import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedbackBase, TouchableWithoutFeedback } from "react-native";
import { AuctionButton, Button, Header } from "../../components";
import { vh, vw, butoncolor, headerbackground } from "../../constants";
import firebase from "firebase";

const AdminHome = ({ navigation }) => {
    const [array, setArray] = useState({})

    useEffect(() => {
        let id = firebase.auth().currentUser.uid
        firebase.database().ref('AdminAuction')
            .on("value", snapshot => {
                setArray(snapshot.val())
            })

    }, [])

    const aakeys = array ? Object.keys(array) : []

    const logout = () => {
        firebase.auth().signOut()
    }
    return (
        <>
        <View style={{ flex: 1 }}>
            <Header heading="AdminHome" />
            <ScrollView>
                <View >
                    <View style={styles.mainview}>
                        {aakeys.length > 0 ? aakeys.map(values => {
                            return (
                                <TouchableWithoutFeedback onPress={() => navigation.navigate("AuctionDetail", {
                                    post: array[values],
                                    firebaseKey: values
                                })}>
                                    <View style={styles.cardview}>
                                        <Image source={{uri:array[values].image}} style={styles.image} />
                                        <AuctionButton heading={array[values].title} color={butoncolor} />
                                    </View>
                                </TouchableWithoutFeedback>

                            )
                        }) :
                            <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                            <Text>No data found</Text>
                            </View>
                        }


                    </View>
                </View>
            </ScrollView>
            </View>
        </>

    )
}
export default AdminHome
const styles = StyleSheet.create({
    mainview: {
        alignItems: "center"
    },
    cardview: {
        backgroundColor:headerbackground,
        height: vh * 0.3,
        width: vw * 0.9,
        marginVertical: vh * 0.02,
        borderRadius: 10,
        elevation: 5

    },
    image: {
        height: vh * 0.2,
        width: vw * 0.9,
        marginBottom: 15,
        borderRadius: 10

    }
})