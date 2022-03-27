import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { ImagePickers, TextInputs, Button, RichTextEditor, Header } from '../../components'
import { vh, vw } from '../../constants'
import firebase from 'firebase'
import whatsapp from "../../assets/facebook.png"
const CreateAuction = ({ navigation: { navigate ,goBack} },props) => {
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        price:"",
        date:"",
    })

    const onChangeHandler = (name, value) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    // const [title, setTitle] = useState("")
    // const [description, setDescription] = useState("")
    const [image, setImage] = useState()

    // console.log(title, description, image, "States");

    const postAuction = () => {
        let id=firebase.auth().currentUser.uid
    firebase.database().ref(`AdminAuction`)
        .push({
            title:inputs.title,
            description:inputs.description,
            price:inputs.price,
            date:inputs.date,
            image
        })
        .then(response =>{
            alert("Attend");
            goBack()

            setInputs({})
        })
        .catch(eror =>{
            console.log(eror,"EERRREERRR");
        })
}

const getImage=(images)=>{
    console.log(images,"sourece variable");
    uploadImageToCloudinary(images)
 }

 const uploadImageToCloudinary=async (e) =>{
    console.log(e, "EEEEEE");
    let apiUrl = 'https://api.cloudinary.com/v1_1/ddg5474bs/image/upload';

    let data = {
        "file": e,
        "upload_preset": "attendance-app",
    }

    fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
    }).then(async r => {
        let data = await r.json()
        console.log(data.secure_url)
        setImage(data.secure_url)
    }).catch(err => console.log(err))
}



    
    return (
        <>
        <Header heading="Create Auction" />
            <ScrollView contentContainerStyle={Styles.container}>
                <View >
                <ImagePickers title="Upload Prfile" width={vw*0.9} height={vh*0.2} borderRadius={10} Topmargin={vh*0.03} imagesrc={whatsapp} 
                 getImage={getImage}
                hight={vh*0.2} wide={vw*0.9} radius={10}
                />

                </View>
                <View style={{ marginHorizontal:10 }}>
                    <TextInputs
                    underlineColorAndroid="transparent"
                        value={inputs.title}
                        onChangeText={(text) => onChangeHandler("title", text)} placeholder="Title" 
                        
                        />
                </View>
                <View style={{ marginHorizontal:10}}>
                    <TextInputs
                    style={{
                        textAlignVertical: 'top',

                    }}
                    underlineColorAndroid="transparent"
                        value={inputs.description}
                        onChangeText={(text) => onChangeHandler("description", text)}
                        placeholder="Discription"
                        numberOfLines={10}
                        multiline={true}
                        numRows={5}
                        
                        />
                </View>
                <View style={{ marginHorizontal:10}}>
                    <TextInputs
                        value={inputs.price}
                        onChangeText={(text) => onChangeHandler("price", text)}
                        placeholder="Price"
                        />
                </View>
                <View style={{ marginHorizontal:10}}>
                    <TextInputs
                        value={inputs.date}
                        onChangeText={(text) => onChangeHandler("date", text)}
                        placeholder="Date"
                        />
                </View>
                <View style={{marginTop:vh*0.05}}>
                <Button color="black" heading="Create" onPress={postAuction}/>
                </View>
            </ScrollView>
        </>
    )
}


const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default CreateAuction