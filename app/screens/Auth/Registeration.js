import React, { useState } from 'react';
import { Text, View, ImageBackground, StatusBar } from 'react-native';
import LoginStyle from '../../assets/styles/LoginStyle';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SocialLogin from './SocialLogin';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Checkbox from '../../components/Checkbox';

import I18n from '../../lang/I18n';

const Registeration = ({...props}) => {
   const [isAcceptTerms , setIsAcceptTerms] = useState(false);
   const [userName , setUserName] = useState('');
   const [email , setEmail] = useState('');
   const [password , setPassword] = useState('');
   const [confirmPassword , setConfirmPassword] = useState('');

   //Navigate to login screen
   const navigateToLogin = () => {
      props.navigation.navigate('login')
   }

   const _regiter = () => {
      // alert(isAcceptTerms)
      props.navigation.navigate('createProfile')
   }

   return <>
       <StatusBar  hidden />
      <ImageBackground style={LoginStyle.bgContainer} 
                     resizeMode="stretch"
                     source={require('../../assets/images/bg.png')}>
         <ScrollView showsVerticalScrollIndicator={false} >
         <View style={{flex:1 , paddingTop: 25}}>
            <Text style={LoginStyle.headerText}>
               {I18n.t('joinNow')}
            </Text>
            <Input name={I18n.t('userName')} 
                  placeholerText={I18n.t('userName')}
                  onChangeText={(value) => setUserName(value)}
                  placeholderColor={'#DCB77C'} />
            <Input name={I18n.t('email')} 
                  placeholerText={I18n.t('email')}
                  onChangeText={(value) => setEmail(value)}
                  placeholderColor={'#DCB77C'} />
            <Input name={I18n.t('password')} 
                  placeholerText={I18n.t('password')}
                  onChangeText={(value) => setPassword(value)}
                  password= {true}
                  placeholderColor={'#DCB77C'} />
            <Input name={I18n.t('confirmPassword')} 
                  placeholerText={I18n.t('confirmPassword')}
                  onChangeText={(value) => setConfirmPassword(value)}
                  password= {true}
                  placeholderColor={'#DCB77C'} />
         </View>
         <View style={{flex:.8 ,paddingVertical : 20}}>
            <View style={{flexDirection:'row' , marginVertical: 20 , alignItems:'center'}}>
               <Checkbox onChange={(value)=> setIsAcceptTerms(value)}/>
               <RectButton
                  onPress={()=>{}} >
                  <Text style={LoginStyle.termsText}>
                     {I18n.t('termsAndconditions')} 
                  </Text>
               </RectButton>
            </View>
            <View>
               <Button
                     onPress={_regiter}
                     label = {I18n.t('registration')}
                     bgColor = "#FFF"
                     labelColor = "#012647"
                  />
               <View style={LoginStyle.rowContainer}>
                  <Text style={LoginStyle.whiteSmallText}>
                     {I18n.t('haveAnAccount')} 
                  </Text>
                  <RectButton onPress={navigateToLogin}>
                     <Text style={LoginStyle.whiteMediumText}>
                        {I18n.t('signIn')}
                     </Text>
                  </RectButton>
               </View>
            </View>
            
            <SocialLogin type="registration" />
         </View>
         </ScrollView>
      </ImageBackground>
   </>
};

export default Registeration;
