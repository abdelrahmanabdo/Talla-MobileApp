import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BorderlessButton , RectButton} from 'react-native-gesture-handler';
import PhotoUpload from 'react-native-photo-upload';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

//Styles
import GeneralStyle from '../../../../assets/styles/GeneralStyle';
import stepsStyle from '../../../../assets/styles/CreateProfileStyle';

//Components
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Dropdown from '../../../../components/Dropdown';
import Snackbar from '../../../../components/Snackbar';

import I18n from '../../../../lang/I18n';

//Apis
import api from '../../../../config/api';
import endpoints from '../../../../config/endpoints';

import { setStylistProfile } from '../../../../redux/actions/stylist';

const StepOne = props => {
   const user = useSelector(state => state.user.user);
   const stylist = useSelector(state => state.stylist);
   const dispatch = useDispatch()
   const [stepOneData, setStepOneData ] = useState({'user_id': user.id, 'mobile_numbers': []});
   const [currentPhoneNumber , setCurrentPhoneNumber ] = useState('');
   const [countries , setCountries] = useState([]);

   /**
      * Get Countries
      */
   const getCountries = () => {
      api  
         .get(endpoints.countries)
         .then(res => setCountries(res.data.data))
   }

   /**
      * Validator
   */
   const validator = () => {
      if (!stepOneData.email) return new Snackbar({text : I18n.t('emailIsRequired') , type : 'danger'}), false;

      if (!stepOneData.country_id) return new Snackbar({text : I18n.t('countryIsRequired') , type : 'danger'}), false;

      return true;
   }

   /**
    * Submit current step
    */
   const submitStep = async () => {
      //if not valid data
      if (!validator()) return
         
      //Submit data to api
      api  
         .post(endpoints.stylist, stepOneData)
         .then( async (res) => {
            if (res.data.success) {
               //Remove user object from result 
               delete res.data.data.user;
               //Save stylist profile to redux
               dispatch(setStylistProfile(res.data.data ));
               //Save stylist profile to asyncStorage
               await AsyncStorage.setItem('stylist' , JSON.stringify(res.data.data ));
               //Go to next step
               props.goToNext();
            }
         })
         .catch(err => {
            console.log(err.response)
            new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
         });

   }

   useEffect(() => {
      getCountries();

      //restore previous registered data
      if (stylist) {
         setStepOneData({
               ...stepOneData,
               avatar: stylist.avatar,
               mobile_numbers:  stylist.mobile_numbers ?? [],
               country_id: stylist.country_id,
               email: stylist.email,
         })
      }
   }, [])

   return (
   <View style={{height : '86%'}}>
      <ScrollView 
         showsVerticalScrollIndicator={false}>
         <Text style={[stepsStyle.stepHeaderText , {color : '#000' , marginStart : 25}]}>
            {I18n.t('uploadYourPicture')}
         </Text>
         <PhotoUpload
            imagePickerProps={{title: I18n.t('selectAvatar'),
                           takePhotoButtonTitle : I18n.t('takeCameraPhoto'),
                           chooseFromLibraryButtonTitle :  I18n.t("chooseFromLibrary"),
                           cancelButtonTitle :  I18n.t('cancel')
             }}
             format = 'PNG'
             photoPickerTitle = {I18n.t('selectPhoto')}
             containerStyle={{borderRadius : 10 ,marginTop : 20}}
             onPhotoSelect={pic => {
               if (pic) setStepOneData({...stepOneData, avatar: 'data:image/png;base64,' + pic});
             }}>
            {
               stepOneData.avatar ?
               <Image 
                  source={{uri: `${stepOneData.avatar}`}} 
                  style={stepsStyle.uploadPictureButton}
               />
               :
               <RectButton 
                  rippleColor={'#CCC'}
                  style={[stepsStyle.uploadPictureButton , { backgroundColor:'#CCC'}]}>
                  <FastImage  source={require('../../../../assets/icons/camera.png')}
                              resizeMode="contain"
                              style={{width : 30 , height:30}}/>
                  <Text style={{color : '#FFF' ,textAlign : 'center',width:'60%'}}>Upload Your Picture</Text>
               </RectButton>
            }

         </PhotoUpload>
         <Input name={I18n.t('email')} 
                placeholderText={I18n.t('email')}  
                isNumeric={true}             
                defaultValue={stepOneData.email}   
                onChangeText={value => setStepOneData({...stepOneData, email: value})}
                placeholderColor={'#ccc'} 
                color={'#000'}
         />
         <Dropdown 
            items={countries}
            name={'country'}
            placeholderText={'#000'} 
            onChangeValue={value => setStepOneData({...stepOneData, country_id: value})}
         />

         <View style={{backgroundColor : '#F8F8F8',borderTopLeftRadius : 10 , 
                       borderTopLeftRadius : 10, paddingHorizontal : 25 , marginVertical : 10}}>
            <Text style={[GeneralStyle.blackText , {fontSize: 15 , marginVertical : 10 , fontWeight : '600'}]}>
               Please Add another active mobile number :
            </Text>
            <View style={[GeneralStyle.columnSpaceBetween ]}>
               <View style={[GeneralStyle.row , { justifyContent:'center' , alignItems:'center' }]}>
                  <Input 
                     placeholderText={'Add new number'}
                     placeholderColor={'#CCC'}
                     style={{flex:2 , width : '94%' }}
                     defaultValue={currentPhoneNumber}
                     onChangeText={(value) => setCurrentPhoneNumber(value) }
                  />
                  <BorderlessButton
                     rippleColor={'#CCC'} 
                     enabled={currentPhoneNumber !== ''}
                     onPress={() => {
                        if(!currentPhoneNumber)
                           return
                        else if(currentPhoneNumber.length != 11)
                           return new Snackbar({text  : 'Mobile Number should be 11 digts' , type  : 'danger'})
                        else 
                           stepOneData.mobile_numbers.push(currentPhoneNumber)
                           setStepOneData({...stepOneData, mobile_numbers: stepOneData.mobile_numbers})
                           setCurrentPhoneNumber('');
                     }}
                  >
                     <FastImage 
                        source={require('../../../../assets/icons/plus.png')}
                        style={{flex:1,width : 35 , height : 35 }}
                        resizeMode="contain"
                     />
                  </BorderlessButton>
               </View>
               {
                  stepOneData.mobile_numbers.map((item , key) => {
                     return <View 
                              key={key}
                              style={[GeneralStyle.rowSpaceBetween , 
                                     {width:'100%',padding : 15}]}
                           >
                           <Text
                              style={[GeneralStyle.blackBoldText  , {fontSize: 16}]}
                           >
                              {item}
                           </Text>
                           <BorderlessButton
                              onPress= {() => {
                                 stepOneData.phoneNumbers.splice(key,1);
                                 setStepOneData({...stepOneData, phoneNumbers: stepOneData.phoneNumbers});
                              }}
                           >
                              <FastImage 
                                 source={require('../../../../assets/icons/close-colored.png')}
                                 style={{width : 20 , height : 20}}
                              />
                           </BorderlessButton>
                        </View>
                  })
               }
            </View>
         </View>

      </ScrollView>
      <Button 
            onPress={submitStep}
            labelColor = "#FFF"
            label = {I18n.t('next')}
            bgColor = "#D1AD67"
            style={{ padding: 15 , width: '91%' }}
         />
     </View>
   )
}

export default StepOne ;