import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';

//Styles
import style from '../../assets/styles/ChicChatIntro';
import GeneralStyle from '../../assets/styles/GeneralStyle';
import Button from '../../components/Button';

const Intro = props  => {
    const text = `1 - Contact us on smile@tallah.co for any inquiries or questions before publishing your content.

 2 -  Give your content a snappy and catchy title.

3-  Should be in Bullet points & to the point.

4- Not to exceed 500 words and not less than 300. 

5 - Include "Royalty - free"  Images of high quality. 

6 - Cite images/videos which are not "Royalty - free" or from other sources.

7 - Use original content, not pre-posted or copied from other sources, websites, … etc. 

8 -  Read and agree on our terms and conditions

 9 - Select at least 3 hashtags that are relevant to your topic for More exposure .` ;



   return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../../assets/images/colored-bg.png')}
                            resizeMode={'stretch'}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton onPress={()=>{props.navigation.goBack()}}>
                        <FastImage source={require('../../assets/icons/back-white.png')} style={{width : 25 , height : 25}} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                       Chic Chat
                    </Text>
                    <View >
                    </View>
                </View>
            </ImageBackground>
            <View style={[style.container]}>
                <Text style={[GeneralStyle.blackText , { color : '#012647' , fontSize : 19 ,margin : 20}]}>
                    Before writing with us, please..
                </Text>
                <ScrollView style={[style.grayContainer]}> 
                    <Text style={{color  : '#000000' , fontSize : 13 , lineHeight : 22 , margin: 20,}}>
                        {text}
                    </Text>
                </ScrollView>
                <Button label={'Start Sharing'}
                        labelColor = {'#FFF'}
                        style={{width : '93%'}}
                        onPress={()=>{}}
                />
            </View>
    </View>
}
 
export default Intro;
