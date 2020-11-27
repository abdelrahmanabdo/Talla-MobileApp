import React, { useState } from 'react';
import { ImageBackground, ScrollView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BorderlessButton} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
//Styles
import GeneralStyle from '../../../../assets/styles/GeneralStyle';
import style from '../../../../assets/styles/StylistRequestStyle';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';

import I18n from '../../../../lang/I18n';

const StepTwo = props => {
   const [yearsOfExperience , setYearsOfExperience] = useState('');
   const [shortBio , setShortBio] = useState('');

   /**
    * Submit current step
    */
   const submitStep = () => {
      props.goToNext();
   }

   return <ScrollView 
         showsVerticalScrollIndicator={false}>
         <Input name={'Years of experience'} 
                placeholderText={'Years of experience'}  
                isNumeric={true}                
                onChangeText={(value) => setYearsOfExperience(value)}
                placeholderColor={'#ccc'} 
                color={'#000'}
         />
         <Input name={'Short Bio'} 
                placeholderText={'Will appear on your profile'}  
                isTextarea={true}                
                onChangeText={(value) => setShortBio(value)}
                placeholderColor={'#ccc'} 
                color={'#000'}
         />
         <Button 
            onPress={submitStep}
            labelColor = "#FFF"
            label = {I18n.t('next')}
            bgColor = "#D1AD67"
            style={{ padding: 15 , width: '91%' }}
         />
   </ScrollView>
}

export default StepTwo ;