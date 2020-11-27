import React, { useState } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import LoginStyle from '../../assets/styles/LoginStyle';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SocialLogin from './SocialLogin';
import { RectButton } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import I18n from '../../lang/I18n';

import Snackbar from '../../components/Snackbar';
import {loginUser} from '../../redux/actions/user';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

const Login = ({...props}) => {
   const dispatch = useDispatch();
   const [ data, setData ] = useState({});
   const [ isDoingSomething , setIsDoingSomething ] = useState(false);

   //Navigate to Regstration screen
   const navigateToRegisteration = () => {
      props.navigation.navigate('registration')
   }

   /**
    * Validator
    */
  const validator = () => {
     if (!data.email) return new Snackbar({text : I18n.t('emailIsRequired') , type : 'danger'}), false ;

     if (!data.password) return new Snackbar({text : I18n.t('passwordIsRequired') , type : 'danger'}), false ;

     return true;
  }

  /**
   * Login handler
   */
  const _login = () => {
     if (validator()) {
        api
           .post(endpoints.login, data).then(async (res) => {
           setIsDoingSomething(false);
           if(res.data.success){
             await new Snackbar({text : I18n.t('loginSuccessfully'), type : 'success'});
             await assignNotificationToken(res.data.user.id);
             dispatch(loginUser(res.data.user , res.data.token));
             await AsyncStorage.setItem('isLoggedIn' , JSON.stringify(true));
             await AsyncStorage.setItem('token' , res.data.token);
             await AsyncStorage.setItem('user' , JSON.stringify(res.data.user));
             props.navigation.navigate('createProfile');
           }
           }).catch((error) => {
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

   return <View style={LoginStyle.container}>
      <ImageBackground style={LoginStyle.bgContainer} 
                     source={require('../../assets/images/bg.png')}>
         <View style={{flex:1 , paddingTop: 45}}>
            <Text style={LoginStyle.headerText}>
               Sign In
            </Text>
            <Input name={I18n.t('email')} 
                  placeholderText={I18n.t('email')}                  
                  onChangeText={(value) => setData({...data, email: value})}
                  color={'#DCB77C'}
                  placeholderColor={'#DCB77C'} />
            <Input name={I18n.t('password')}
                  onChangeText={(value) => setData({...data, password: value})}
                  placeholderText={I18n.t('password')}
                  password={true}
                  color={'#DCB77C'}
                  placeholderColor={'#DCB77C'} />
         </View>
         <View style={{flex:1.5}}>
            <View style={{marginBottom : 50}}>
               <Button
                     style={{width:'95%', marginTop: 40}}
                     onPress={_login}
                     label = {'Login'}
                     disabled={isDoingSomething}
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
