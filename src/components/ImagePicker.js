import React, { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { vh,butoncolor, marginTop } from '../constants';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

export default function ImagePickers({ width, borderRadius, height, title,Topmargin ,getImage,imagesrc,hight,wide,radius}) {
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
        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            let base64Img=`data:image/jpg;base64,${result.base64}`
            getImage(base64Img)
        }
    };
  

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center',}}>
            {image ?<Image source={{ uri: image }} style={{ ...Styles.ImageProps, width: width, borderRadius: borderRadius, height: height,marginTop:Topmargin }} />:
            <Image style={{...Styles.image,height:hight,width:wide,borderRadius:radius}} source={imagesrc}/>}
                <View style={Styles.button}>
                        <Button title={title} onPress={pickImage} />
                        </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    ImageProps: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop:vh*0.03,

    },
    image:{
        height:100,
        width:100,
        marginTop:vh*0.03,
    },
    button:{
        backgroundColor:butoncolor,
        marginTop:10
    }
})