import React,{useState} from "react"
import { View ,Text,TextInput,StyleSheet,TouchableOpacity,Image} from "react-native"
import Button from "../../components/Button"
import Header from "../../components/Header"
import { globalfontcolor, headerbackground, vh, vw } from "../../constants"
import facebook from "../../assets/facebook.png"
import firebase from "firebase"
import * as Facebook from "expo-facebook"
import axios from "axios"

const Login=(props)=>{
    const [inputs,setInputs]=useState({
        email:"",
        password:""
    })

    const onChangeHandler = (type, value) => {
        setInputs({
            ...inputs,
            [type]: value
        })
    }

    const LoginUser = () => {
        firebase.auth().signInWithEmailAndPassword(inputs.email, inputs.password)

        .then(respone =>{
            console.log(respone,"LogedIn");
            setInputs({})

        })
        .catch(errr =>{
            alert(errr.message)
            console.log(errr,"ERRRRRRRRRR");
            setInputs({})
        })
    }
    let permissions = ['public_profile', 'email']


    const loginUserWithFb = async () => {
        // Facebook.logOutAsync()
        try {
            await Facebook.initializeAsync({
                appId: "665321297855587"
            });

            let result = await Facebook.logInWithReadPermissionsAsync({ permissions })
            const res = await axios.get('https://graph.facebook.com/v2.5/me?fields=picture.width(720).height(720),email,name,friends&access_token=' + result.token)
                .then(res => {
                    // setLoginResult(res.data)
                    console.log("FAcebook success", res.data);
                    // setEmail(res.data.email)

                    // console.log(id, "IDDDDDD");
                    // let tempId = []
                    // let id = firebase.auth().currentUser?.uid
                    // id = res.data.id
                    // tempId.push(id, res.data.id)
                    // console.log(id, "Temp id");

                    // console.log(res.data, "RESSSS")

                })
                .catch(err => {
                    console.log(err, "ERR");
                })
            // console.log(result, "Result");

            // await res.json().name

            // console.log(res, "Res");
            let response = firebase.auth.FacebookAuthProvider.credential(result.token)

            // console.log(response, "Ressssssssss");
            try {

                const result = firebase.auth().signInWithCredential(response)
                console.log(result, "resultFirebase");
                result.then((res) => {
                    console.log(res, "resResult");
                    let id = res.user.uid
                    firebase.database().ref(`users/${id}`)
                        .set({
                            name: res.additionalUserInfo.profile.name,
                            email: res.additionalUserInfo.profile.email,
                            image: res.additionalUserInfo.profile.picture.data.url,
                            uuid:id
                        }).then((res) => {
                            console.log("user record success");

                            // console.log(res, "RSSPONSEEEEEEE");
                        }).catch((err) => {
                            // console.log(err, "ERRRRRRRRRRR");
                        })
                })
                return result


            } catch (error) {
                console.log(error, "ERRRRRRRRRRRRRRR");
            }

            // console.log(result, response, "RRRRRRRRRRRRRRRRRR");
            //    .then(res => {
            //         if (res.type == "success") {
            //             console.log(res.token, "TTT");
            //             const credential = FacebookAuthProvider.credential(res.token)
            //             console.log(credential, "credentialcredentialcredential");
            //             return signInWithCredential(credential).then(res => {
            //                 console.log(res, "RRRS_CCC");
            //             })
            //                 .catch(err => {
            //                     console.log(err, "ER_CRRRRRRR");
            //                 })
            //         }
            //     })

        }
        catch (err) {
            console.log(err, "errrr");
        }
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


    return(
        <View>
            <Header heading="SignIn"/>
            <View style={styles.mainheading}>
            <Image style={styles.image} source={require("../../assets/profile.png")}/>
                <Text style={styles.mainheadingText1}>
                Welcome Back
                </Text>
                <Text style={styles.mainheadingText}>
                    SignIn to  Continue
                </Text>
            </View>
            {renderTextInputs("Email","email",false)}
            {renderTextInputs("Password","password",true)}

            <TouchableOpacity onPress={()=>props.navigation.navigate("Register")}>
                <Text style={styles.touchableText}>Don't Have account?Register</Text>
            </TouchableOpacity>
            <View style={styles.button}>
            <Button heading="SIgnIn" onPress={LoginUser} color={headerbackground}/>
            </View>
            <View style={styles.button}>            
            <Button heading="SignIn with facebook" imageUri={facebook} onPress={loginUserWithFb} color="#3b5998"/>
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
        color:globalfontcolor,
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
export default Login