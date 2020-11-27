import React from 'react';
import {View, I18nManager } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';

import SocialLoginStyle from '../../assets/styles/SocialLoginStyle';

const SocialLogin = ({...props}) => {
   
   //Facebook handler 
   const facebookHandler = () => {
    alert('Facebook Login');
   }

    //Instagram handler 
   const instagramHandler = () => {
    alert('Instagram Login');
   }

    //Gmail handler 
   const gmailHandler = () => {
    alert('Gmail Login');
   }


   
   return <View style={SocialLoginStyle.container}>
        <FastImage source={I18nManager.isRTL ? require('../../assets/icons/or-ar.png') : require('../../assets/icons/or.png')} 
                  style={SocialLoginStyle.orImage}/>
        <View style={SocialLoginStyle.iconsContainer}>
            <RectButton onPress={facebookHandler}>
               <FastImage source={require('../../assets/icons/fb-icon.png')} 
                          resizeMode="contain" 
                          style={SocialLoginStyle.socialImage}/>
            </RectButton>
            <RectButton onPress={instagramHandler}>
               <FastImage source={require('../../assets/icons/instagram-icon.png')} 
                          resizeMode="contain" 
                          style={SocialLoginStyle.socialImage}/>
            </RectButton>
            <RectButton onPress={gmailHandler}>
               <FastImage source={require('../../assets/icons/gmail-icon.png')} 
                          resizeMode="contain" 
                          style={SocialLoginStyle.socialImage}/>
            </RectButton>
        </View>
    </View>
}; 

export default SocialLogin;
