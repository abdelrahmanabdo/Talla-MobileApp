import React, { useState } from 'react';
import { Text, View, ImageBackground, StatusBar } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import LoginStyle from '../../assets/styles/LoginStyle';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SocialLogin from './SocialLogin';
import Checkbox from '../../components/Checkbox';

import I18n from '../../lang/I18n';
import Snackbar from '../../components/Snackbar';
import {loginUser} from '../../redux/actions/user';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import { useDispatch } from 'react-redux';

const Registeration = ({...props}) => {
   const dispatch = useDispatch();
   const [ data, setData ] = useState({});
   const [ isDoingSomething , setIsDoingSomething ] = useState(false);
   const [ isAcceptTerms , setIsAcceptTerms ] = useState(false);

   //Navigate to login screen
   const navigateToLogin = () => {
      props
         .navigation
         .navigate('login');
   }
   
   /**
    * Validator
    */
   const validator = () => {
      if (!data.name) return  new Snackbar({text : I18n.t('nameIsRequired') , type : 'danger'}) , false ;

      if (!data.email) return new Snackbar({text : I18n.t('emailIsRequired') , type : 'danger'}) , false ;

      if (!data.password) return new Snackbar({text : I18n.t('passwordIsRequired') , type : 'danger'}) , false ;

      if (data.password != data.confirmPassword) return new Snackbar({text : I18n.t('confirmPasswordMismatch') , type : 'danger'});

      return true;
   }

   const _regiter = () => {
      if (validator()) {
         api
            .post(endpoints.register, data).then(async (res) => {
            setIsDoingSomething(false);
            if(res.data.success){
              await new Snackbar({text : I18n.t('loginSuccessfully'), type : 'success'});
              await assignNotificationToken(res.data.user.id);
              dispatch(loginUser(res.data.user , res.data.token));
              await AsyncStorage.setItem('isLoggedIn' , JSON.stringify(true));
              await AsyncStorage.setItem('token' , res.data.token);
              await AsyncStorage.setItem('user' , JSON.stringify(res.data.user));
              props.navigation.navigate('createProfile');
            }}).catch((error) => {
               setIsDoingSomething(false);
               if(error.response.status == 400){
                  //Validation Error
                  if(error.response.data.message == 'unAuthorized'){
                     new Snackbar({text : I18n.t('unAuthorized') });
                  }else {
                  //invalid redentials
                     new Snackbar({text : I18n.t('invalidCredentials') })
                  }
               } else {
                  new Snackbar({text : I18n.t('unknownError') })
               }
            });

      }

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
                  placeholderText={I18n.t('userName')}
                  onChangeText={(value) => setData({...data, name: value})}
                  color={'#DCB77C'}
                  placeholderColor={'#DCB77C'} />
            <Input name={I18n.t('email')} 
                  color={'#DCB77C'}
                  placeholderText={I18n.t('email')}
                  onChangeText={(value) => setData({...data, email: value})}
                  placeholderColor={'#DCB77C'} />
            <Input name={I18n.t('password')} 
                  placeholderText={I18n.t('password')}
                  color={'#DCB77C'}
                  onChangeText={(value) => setData({...data, password: value})}
                  password= {true}
                  placeholderColor={'#DCB77C'} />
            <Input name={I18n.t('confirmPassword')} 
                  placeholderText={I18n.t('confirmPassword')}
                  color={'#DCB77C'}
                  onChangeText={(value) => setData({...data, confirmPassword: value})}
                  password= {true}
                  placeholderColor={'#DCB77C'} />
         </View>
         <View style={{flex:.8 ,paddingVertical : 20}}>
            <View style={{flexDirection:'row' , marginVertical: 20 , alignItems:'center'}}>
               <Checkbox onChange={ value => setIsAcceptTerms(value)}/>
               <RectButton
                  onPress={()=>{}} >
                  <Text style={LoginStyle.termsText}>
                     {I18n.t('termsAndconditions')} 
                  </Text>
               </RectButton>
            </View>
            <View>
               <Button
                     style={{width:'95%'}}
                     onPress={_regiter}
                     label = {I18n.t('registration')}
                     bgColor = "#FFF"
                     labelColor = "#012647"
                  />
               <View style={LoginStyle.rowContainer}>
                  <Text style={LoginStyle.whiteSmallText}>
                     {I18n.t('haveAnAccount')} 
                  </Text>
                  <RectButton 
                     rippleColor={'#CCC'}
                     onPress={navigateToLogin}
                  >
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
