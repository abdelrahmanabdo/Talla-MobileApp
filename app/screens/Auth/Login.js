import React, { useState } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import LoginStyle from '../../assets/styles/LoginStyle';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SocialLogin from './SocialLogin';
import { RectButton } from 'react-native-gesture-handler';

import I18n from '../../lang/I18n';


const Login = ({...props}) => {

   const [email , setEmail] = useState('');
   const [password , setPassword] = useState('');

   //Navigate to Regstration screen
   const navigateToRegisteration = () => {
      props.navigation.navigate('registration')
   }

   const _login = () => {
   }




   return <View style={LoginStyle.container}>
      <ImageBackground style={LoginStyle.bgContainer} 
                     source={require('../../assets/images/bg.png')}>
         <View style={{flex:1 , paddingTop: 45}}>
            <Text style={LoginStyle.headerText}>
               Sign In
            </Text>
            <Input name={I18n.t('email')} 
                  placeholderText={I18n.t('email')}                  
                  onChangeText={(value) => setEmail(value)}
                  color={'#DCB77C'}
                  placeholderColor={'#DCB77C'} />
            <Input name={I18n.t('password')}
                  onChangeText={(value) => setPassword(value)}
                  placeholderText={I18n.t('password')}
                  password={true}
                  color={'#DCB77C'}
                  placeholderColor={'#DCB77C'} />
         </View>
         <View style={{flex:1.5}}>
            <View style={{marginBottom : 50}}>
               <Button
                     style={{width:'95%'}}
                     onPress={_login}
                     label = {'Login'}
                     bgColor = "#FFF"
                     labelColor = "#012647"
                  />
               <View style={LoginStyle.rowContainer}>
                  <Text style={LoginStyle.whiteSmallText}>
                     {I18n.t('donotHaveAnAccount')}
                  </Text>
                  <RectButton 
                     rippleColor={'#CCC'}
                     onPress={navigateToRegisteration}>
                     <Text style={LoginStyle.whiteMediumText}>
                        {I18n.t('signUp')}
                     </Text>
                  </RectButton>
               </View>
            </View>

            
            <SocialLogin type="registration" />
         </View>

      </ImageBackground>
   </View>
};

export default Login;
