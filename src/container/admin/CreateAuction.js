import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { ImagePickers, TextInputs, Button, RichTextEditor, Header } from '../../components'
import { vh, vw } from '../../constants'
import firebase from 'firebase'
import whatsapp from "../../assets/facebook.jpg"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment"


const CreateAuction = ({ navigation: { navigate ,goBack} }) => {
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        price:"",
    })
    const [date, setDate] = useState("")
    const [open, setOpen] = useState(false)
    const [markedDate, setMarkedDate] = useState(moment(date).format("YYYY-MM-DD"))

    const onChangeHandler = (name, value) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    
    const [image, setImage] = useState()

    
    const postAuction = () => {
        let id=firebase.auth().currentUser.uid
    firebase.database().ref(`AdminAuction`)
        .push({
            title:inputs.title,
            description:inputs.description,
            price:inputs.price,
            image,
            today
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

const hideDatePicker = () => {
    setOpen(false);
};

const handleConfirm = (date) => {

    console.warn("A date has been picked: ", date);
    setDate(date)
    hideDatePicker();
};

console.log(typeof date, date, "DATEEEEEEEEE");

const logoutUser = () => {
    firebase.auth().signOut();

    // console.log(remove, "LOGOUT");
}

 const today = moment(date).format("DD-MM-YYYY");



    
    return (
        <>
        <Header heading="Create Auction" />
            <ScrollView contentContainerStyle={Styles.container}>
                <View >
                <ImagePickers  width={vw*0.8} height={vh*0.2} borderRadius={10} marginTop={vh*0.02} imagesrc={whatsapp} 
                 hight={vh*0.2} wide={vw*0.8} radius={10} marginLeft={vw*0.07} leftmargin={vw*0.07}
                getImage={getImage}
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
                        value={today}
                        onChangeText={(text) => onChangeHandler(text)}
                        placeholder="Date"
                        />
                </View>
                <View style={{marginTop:vh*0.05}}>     
                <Button heading="Choose Date" color="black" onPress={() => setOpen(!open)} />
                </View>
            <DateTimePickerModal
                isVisible={open}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />



                <View style={{marginTop:vh*0.05}}>
                <Button color="black" heading="Create" onPress={postAuction}/>
                </View>
            </ScrollView>
        </>
    )
}


const Styles = StyleSheet.create({
    container: {
        flexGrow: 1
    }
})

export default CreateAuction