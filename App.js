import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation';
import React,{useEffect} from "react"
import firebase from "firebase"

export default function App() {
  useEffect(()=>{
    const firebaseConfig ={
      apiKey: "AIzaSyAra8CSr7SyF5Ni4B3yD5TuaYuS7WdgjHc",
  authDomain: "auction-app-c389e.firebaseapp.com",
  projectId: "auction-app-c389e",
  storageBucket: "auction-app-c389e.appspot.com",
  messagingSenderId: "63847997178",
  appId: "1:63847997178:web:882ea6e80936621264b343",
  measurementId: "G-953MF09FY7"
    };
    firebase.initializeApp(firebaseConfig);
  },[])
  return (
    <>
    <Navigation/>
    <StatusBar backgroundColor='#1DA1F2' />
    </>
  );
}

