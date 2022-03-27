import React,{useState} from "react"
import { View ,Text,TextInput,StyleSheet,TouchableOpacity,Image,} from "react-native"
import {Button,Header,ImagePickers} from "../../components"
import { globalfontcolor, headerbackground, vh, vw } from "../../constants"
import firebase from "firebase"
import profile from "../../assets/profile.png"
const Register=(props)=>{
    const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:""
    })
    const [image,setImage]=useState("")


    const onChangeHandler = (type, value) => {
        setInputs({
            ...inputs,
            [type]: value
        })
    }

    const RegisterUser=()=>{
        firebase.auth().createUserWithEmailAndPassword(inputs.email, inputs.password)
        
        .then(response =>{
            let id=firebase.auth().currentUser.uid
            firebase.database().ref(`users/${id}`)
            .set({
                uuid:id,
                name:inputs.name,
                email:inputs.email,
                password:inputs.password,
                image
            })
            .then(responses =>{
            setInputs({})
            })
        })
        .catch(errr =>{
            alert(errr.message)
            setInputs({})
        })
    }

const renderTextInputs=(placeholder,type,secureTextEntry)=>{
    return(
        <TextInput
        style={styles.textinputs}
        placeholder={placeholder}
        value={inputs[type]}
        onChangeText={(text)=>onChangeHandler(type,text)}
        secureTextEntry={secureTextEntry}
        />
    )
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


    return(
        <View>
            
            <Header heading="Register"/>

            <View style={styles.mainheading}>
            <Text style={styles.mainheadingText1}>
                Welcome
                </Text>
                <Text style={styles.mainheadingText}>
                    Register to  Continue
                </Text>
            <View>
            <ImagePickers title="Upload Prfile" width={100} height={100} borderRadius={50} Topmargin={vh*0.03} getImage={getImage}
            wide={100} radius={50} hight={100} imagesrc={profile}
            />

            </View>
            </View>
            {renderTextInputs("Name","name",false)}
            {renderTextInputs("Email","email",false)}
            {renderTextInputs("Password","password",true)}

            <TouchableOpacity onPress={()=>props.navigation.navigate("LogIn")}>
                <Text style={styles.touchableText}>Already Have an account?SignIn</Text>
            </TouchableOpacity>
            <View style={styles.button}>
            <Button heading="Register" onPress={RegisterUser} color={headerbackground}/>
            </View>

        </View>
    )
}

const styles=StyleSheet.create({
    textinputs:{
        height:vh*0.05,
        paddingHorizontal:10,
        borderBottomWidth:1,
        margin:10,
        borderRadius:10,
        borderColor:globalfontcolor
    },
    touchableText:{
        textAlign:"center",
        color:globalfontcolor
    },
    button:{
        marginTop:10
    },
    mainheading:{
        alignItems:"center",
        justifyContent:"center"
    },
    mainheadingText1:{
        fontSize:26,
        fontWeight:"bold",
        color:globalfontcolor
    },
    mainheadingText:{
        fontSize:16,
        color:globalfontcolor
    },
    image:{
        height:100,
        width:100,
        marginTop:vh*0.06,
    }


})
export default Register