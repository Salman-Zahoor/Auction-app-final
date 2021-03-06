import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, ScrollView  } from "react-native";
import { Button, Header } from "../../components";
import { vh, vw, butoncolor, headerbackground, headertextcolor, headerfont } from "../../constants";
import firebase from "firebase";

const WonEvents = ({ navigation }) => {
    const [array, setArray] = useState([])

    useEffect(() => {
        let id = firebase.auth().currentUser.uid
        firebase.database().ref('Participated')
            .on("value", snapshot => {
                setArray(Object.values(snapshot.val()))
                console.log(snapshot.val(), 'snapppppppppppppp')

            })

    }, [])
    console.log(array.length, "Array");


    const renderWonNotWon = () => {
        console.log(array, 'Arrr');
        let temp = []
        array.map(res => {
            if (res.id == firebase.auth().currentUser.uid && res.isWon == true) {
                console.log(res,'ressssssss');
                temp.push({
                    name:'hi'
                })
            }
        })
        console.log(temp,'tttttttttttttttttttt');
        if(temp.length == 0){
            return (
                <View style={{marginVertical:vh*0.4}}>
                <Text style={{textAlign:"center"}}>Have not won any event</Text>
                </View>
            )
        }
    }

    return (
        <>
            <Header heading="Won Events" />

            <ScrollView>
                <View style={{ flex: 1 }}>
                    <View style={styles.mainview}>
                        {array.map(val => {
                            console.log(val, "VAOEEEEE");
                            if (val.id == firebase.auth().currentUser.uid && val.isWon == true) {
                                console.log(val.image, "image");

                                return (
                                    <View style={styles.cardview}>
                                        <Image source={{ uri: val.image }} style={styles.image} />
                                        <View style={styles.viewtab}>
                                            <View style={{ alignItems: "flex-start" }}>
                                                <Text style={styles.text}>
                                                    {val.title}
                                                </Text>
                                            </View>
                                            <View style={{ alignItems: "flex-start" }}>

                                                <Text style={styles.text1}>
                                                    {val.name}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }
                            else {
                                //     return(
                                //     <View style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
                                //     <Text>No Winner found</Text>
                                // </View>
                                // )
                            }
                        })}

                        {renderWonNotWon()}


                    </View>

                </View>
            </ScrollView>

        </>


    )
}
export default WonEvents
const styles = StyleSheet.create({
    mainview: {
        alignItems: "center"
    },
    cardview: {
        backgroundColor: "white",
        height: vh * 0.3,
        width: vw * 0.9,
        marginVertical: vh * 0.02,
        borderRadius: 10,
        elevation: 5

    },
    image: {
        height: vh * 0.2,
        width: vw * 0.9,
        marginBottom: 10,
        borderRadius: 10

    },
    viewtab: {
        borderRadius: 10,
        width: vw * 0.9,
        height: vh * 0.08,
        padding: 15,
        backgroundColor: headerbackground,
        elevation: 10,
        flexWrap: "wrap",
        flexDirection: "row",

    },
    text: {
        color: headertextcolor,
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "right",
        marginRight: 20,

    },
    text1: {
        color: headertextcolor,
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "left",
    }

})