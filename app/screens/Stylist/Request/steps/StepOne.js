import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BorderlessButton , RectButton} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import PhotoUpload from 'react-native-photo-upload';

//Styles
import GeneralStyle from '../../../../assets/styles/GeneralStyle';
import style from '../../../../assets/styles/StylistRequestStyle';
import stepsStyle from '../../../../assets/styles/CreateProfileStyle';

//Components
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Dropdown from '../../../../components/Dropdown';

import I18n from '../../../../lang/I18n';

const StepOne = props => {
   const [avatar , setAvatar] = useState('');
   const [email , setEmail] = useState('');
   const [country , setCountry] = useState('');
   const [language , setLanguage] = useState('');
   const [phoneNumbers , setPhoneNumbers] = useState([]);
   const [currentPhoneNumber , setCurrentPhoneNumber ] = useState('');

   const [countries , setCountries] = useState([
      {
         'id' : 1,
         'name' : 'مصر',
         'name_en' : 'egypt'
      }
   ])
   const [languages , setLanguages] = useState([
      {
         'id' : 1,
         'name' : 'الإنجليزية',
         'name_en' : 'English'
      },
      {
         'id' : 1,
         'name' : 'العربية',
         'name_en' : 'Arabic'
      },
   ]);


   /**
    * Submit current step
    */
   const submitStep = () => {
      props.goToNext();
   }

   return (
   <View style={{height : '88%'}}>
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
             format = 'JPEG'
             photoPickerTitle = {I18n.t('selectPhoto')}
             containerStyle={{borderRadius : 10 ,marginTop : 20}}
             onPhotoSelect={pic => {
               if (pic) {
                  setAvatar(pic)
               }
             }}>
            {
               avatar ?
               <Image 
                  source={{uri: `data:image/gif;base64,${avatar}`}} 
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
                onChangeText={(value) => setEmail(value)}
                placeholderColor={'#ccc'} 
                color={'#000'}
         />
         <Dropdown 
            items={countries}
            name={'country'}
            placeholderText={'#000'} 
            onChangeValue={(value)=> setCountry(value)}
         />
         <Dropdown 
            items={languages}
            placeholderText={'#000'} 
            color={'#000'}
            name={'Preferred Language'}
            onChangeValue={(value)=> setLanguage(value)}
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
                     onPress={() => {
                        if(!currentPhoneNumber)
                           return
                        else if(currentPhoneNumber.length != 11)
                           return alert('Mobile Number should be 11 digts')
                           // return new Toast({'message'  : 'Mobile Number should be 11 digts' , type  : 'danger'})
                        else 
                           setPhoneNumbers([...phoneNumbers , currentPhoneNumber]);
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
                  phoneNumbers.map((item , key) => {
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
                                 phoneNumbers.splice(key,1);
                                 setPhoneNumbers([...phoneNumbers])
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