import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {ActivityIndicator} from "react-native"
import AuthStack from './stack/AuthStack';
import AppStack from './stack/AppStack';
import AdminStack from './stack/AdminStack';
import firebase from 'firebase';


export default function Navigation() {
  const [component, setComponent] =
        useState(
            <ActivityIndicator color="blue" size={'large'}
                style={{ flex: 1 }}
                animating={true}
            />
        )
        useEffect(()=>{
            setTimeout(() =>{
            firebase.auth().onAuthStateChanged(user =>{
                console.log(user,'usseee');
                if(user){
                firebase.database().ref(`users/${user.uid}`).on('value',snapshot=>{
                    console.log(snapshot,'sss');
                    if(snapshot.val().email=='admin@admin.com'){
                        setComponent(<AdminStack/>)
                    }
                    else{
                        setComponent(<AppStack/>)
                    }
                })
            }
            else{
                setComponent(<AuthStack/>)
            }
            })
            },3000);
        },[])
  return (
    <NavigationContainer>
        {/* <AuthStack/> */}
        {component}
        {/* <AppStack/> */}
        {/* <AdminStack/> */}
    </NavigationContainer>
  );
}