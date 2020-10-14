import React, { useState } from 'react';
import { ImageBackground, SafeAreaView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BorderlessButton, RectButton} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
//Styles
import GeneralStyle from '../../../assets/styles/GeneralStyle';
import style from '../../../assets/styles/StylistRequestStyle';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const PhoneConfirmation = props => {
   const [phoneNumber , setPhoneNumber] = useState('');
   const [activeStep , setActiveStep ] = useState(1);



   return <View style={[GeneralStyle.container]}>
      <ImageBackground source={require('../../../assets/images/colored-bg.png')}
                     resizeMode={'stretch'}
                     style={GeneralStyle.header}>
         <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
            <RectButton style={{flexDirection : 'row'}} 
                              rippleColor={'#CCC'}
                              onPress={()=>{props.navigation.goBack()}}
            >
                  <FastImage source={require('../../../assets/icons/back-white.png')} 
                             style={{width : 25 , height : 25}} />
                  <Text style={[GeneralStyle.headerText, { marginStart : 15}]}>
                     Stylist Registration
                  </Text>
            </RectButton>
            <View></View>
         </View>
      </ImageBackground>
      <View style={[ { padding : 20}] }>
         <Animatable.View animation={'bounceIn'}>
            <FastImage 
               source={require('../../../assets/icons/logo.png')} 
               style={{width : 130 , height : 130 , alignSelf:'center', marginBottom : 25}}
               resizeMode={'contain'}
            />
         </Animatable.View>
         {
            activeStep == 1 ?
            <Animatable.View animation={'slideInRight'}>
               <Text style={GeneralStyle.blackText}>
               Lorem Ipsum has been the industry's Lorem Ipsum has been
               the industry's Lorem Ipsum has been the industry's
               </Text>

               <Text style={[GeneralStyle.blackBoldText , { fontSize : 17 , marginTop : 30 , lineHeight:25 }]}>
               Insert your active Phone number  on : 
               ( Whatsapp/ Viber/ Botim)
               </Text>

               <Input 
                  placeholderText={'phone No'}
                  isNumeric={true}                
                  onChangeText={(value) => setPhoneNumber(value)}
                  placeholderColor={'#CCC'} 
                  color={'#5D0D57'}
               />

               <Button 
                     onPress={() => setActiveStep(2)}
                     label = {'Send Verification Code'}
                     bgColor = "#D1AD67"
                     style={{padding: 15 , width: '98%'}}
                     labelColor = "#FFF"
               />
            </Animatable.View>
            :
            <Animatable.View animation={'slideInLeft'}>
               <Text style={GeneralStyle.blackText}>
               Lorem Ipsum has been the industry's Lorem Ipsum has been
               the industry's Lorem Ipsum has been the industry's
               </Text>

               <Text style={[GeneralStyle.blackBoldText , { fontSize : 17 , marginTop : 30 , lineHeight:25 }]}>
                Enter your verification code
               </Text>

               <Input 
                  placeholderText={'verification code'}
                  isNumeric={true}                
                  onChangeText={(value) => setPhoneNumber(value)}
                  placeholderColor={'#CCC'} 
                  color={'#5D0D57'}
               />

               <Button 
                     onPress={() => props.navigation.navigate('stylistRequestSteps')}
                     label = {'Verify'}
                     bgColor = "#D1AD67"
                     style={{padding: 15 , width: '98%'}}
                     labelColor = "#FFF"
               />
            </Animatable.View>
         }
      </View>
   </View>

}

export default PhoneConfirmation ; 