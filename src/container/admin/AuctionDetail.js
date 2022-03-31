import React from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { Button, Header, AuctionDetailView, AuctionButton } from "../../components";
import { butoncolor, vh, vw } from "../../constants";
import arrow from "../../assets/arraw.png"


const AuctionDetail = ({ navigation, route }) => {
    const {post,firebaseKey} = route.params
    const {
        title,
        description,
        price,
        today,
        image
    } = post
    return (
        <>
            <Header heading="AuctionDetail"  imageUri={arrow} onPress={()=>navigation.navigate("AdminHome")} />
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <View style={styles.mainview}>
                        <View style={styles.cardview}>
                            <Image source={{uri:image}} style={styles.image} />
                            <AuctionButton titles="Title : " heading={title} color={butoncolor} />
                            <AuctionDetailView titles="Description : " heading={description} color={butoncolor} />
                            <AuctionButton titles="Price : " heading={price} color={butoncolor} marginVertical={10} />
                            <AuctionButton titles="Date : " heading={today} color={butoncolor} marginVertical={5} />
                            <Button heading="View Participants" color="black" marginVertical={10} onPress={() => navigation.navigate("AllParticipants", { participants: post.participants ? post.participants : [] ,firebaseKey ,post})} />


                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
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
