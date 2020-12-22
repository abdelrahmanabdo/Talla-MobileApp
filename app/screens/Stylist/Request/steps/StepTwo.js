import React, { useState } from 'react';
import {  ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

//Styles
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Snackbar from '../../../../components/Snackbar';

import I18n from '../../../../lang/I18n';

//Apis
import api from '../../../../config/api';
import endpoints from '../../../../config/endpoints';

import { updateStylistProfile } from '../../../../redux/actions/stylist';

const StepTwo = props => {
   const stylist = useSelector(state => state.stylist );
   const dispatch = useDispatch();
   const [ stepTwoData, setStepTwoData ] = useState({}); //experience_years, bio

   /**
    * Submit current step
    */
   const submitStep = () => {
      //Submit data to api
      api  
         .put(endpoints.stylist +'/'+ stylist.id, stepTwoData)
         .then(res => {
            //Update redux stored stylist profile
            dispatch(updateStylistProfile({...stepTwoData}));
            props.goToNext();
         })
         .catch(err => {
            console.log(err.response)
            new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
         });
   }

   return <ScrollView 
         showsVerticalScrollIndicator={false}>
         <Input name={'Years of experience'} 
                placeholderText={'Years of experience'}  
                isNumeric={true}                
                onChangeText={value =>  setStepTwoData({...stepTwoData, experience_years: value}) }
                placeholderColor={'#ccc'} 
                color={'#000'}
         />
         <Input name={'Short Bio'} 
                placeholderText={'Will appear on your profile'}  
                isTextarea={true}                
                onChangeText={value =>  setStepTwoData({...stepTwoData, bio: value}) }
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