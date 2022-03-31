import React, { useState } from 'react';
import { Button, Image, View, StyleSheet ,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { vh,butoncolor, marginTop } from '../constants';

export default function ImagePickers({ width, borderRadius, height, title,marginTop ,getImage,imagesrc,hight,wide,radius,type,val,marginLeft,leftmargin,iconleft}) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64:true,
        });
        // console.log(image,"Image");
        // console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            let base64Img=`data:image/jpg;base64,${result.base64}`
            getImage(base64Img)
        }
    };

    const renderregisterimage=()=>{
        return(
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {image ?<Image source={{ uri: image }} style={{...Styles.ImageProps,height:hight,width:wide,borderRadius:radius,marginLeft:leftmargin}} />:
            <Image style={{...Styles.image,width,height,marginTop,borderRadius:borderRadius,marginLeft,}} source={imagesrc}/>}
                        

        </View>
        )
    }



    return (
       <View style={{flexDirection:"row"}}>
            { type === "profile" ?
            <TouchableOpacity  onPress={pickImage}>
                 <Image source={{ uri: val }} style={Styles.ImageProps} />
            </TouchableOpacity>
            :
            renderregisterimage()}
             <View style={{...Styles.uploadicon,marginLeft:iconleft}}>
           { type !== "profile" && <Ionicons name="md-cloud-upload-outline" size={28} color="black"  onPress={pickImage}/> }
           </View>
       </View>
    );
}

const Styles = StyleSheet.create({
    ImageProps: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop:vh*0.02,
        marginLeft:5,

    },
    image:{
        height:100,
        width:100,
        marginTop:vh*0.02,
    },
    uploadicon:{
        marginTop:vh*0.07,
    }
})