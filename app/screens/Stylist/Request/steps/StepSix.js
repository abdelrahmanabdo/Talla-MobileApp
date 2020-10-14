import React, { useEffect, useState } from 'react';
import {ScrollView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import { Button } from 'native-base';

//Styles
import GeneralStyle from '../../../../assets/styles/GeneralStyle';
import style from '../../../../assets/styles/StylistRequestStyle';
import ModalStyle from '../../../../assets/styles/ModalStyle';

import Input from '../../../../components/Input';
import TallahButton from '../../../../components/Button';

import TAndC from '../../../../modals/TAndC';

const StepSix = props => {
   const [card , setCard ] = useState({});
   const [showTAndCModal , setShowTAndCModal] = useState(false);
   const [showSubmitModal , setShowSubmitModal ] = useState(false);

   /**
    * Submit current step
    */
   const submitStep = () => {
      setShowTAndCModal(true);
   }

   useEffect(() => {
   },[showSubmitModal]);
   
   /**
    * Submit Modal
    **/
   const SubmitModal = () => {
      return <Modal isVisible={showSubmitModal}
                    animationIn={'bounceIn'}
                    backdropOpacity={.7}
             >
         <View style={ModalStyle.container}>
            <FastImage source={require('../../../../assets/icons/done-modal-icon.png')}
                        resizeMode="contain"
                        style={{width : 60  , height:  60 }}
            />
            <Text style={ModalStyle.text}>
               Your Application is submitted!
            </Text>
            <Button onPress={() => setShowSubmitModal(false)}
                        style={ModalStyle.SecondaryButton}>
               <Text style={ModalStyle.SecondaryButtonText}>
                  ok
               </Text>
            </Button>
         </View>
      </Modal>
   }

   return <View style={{height : '88%'}}>
      <ScrollView style={[{padding:15}]}>
         <Text
            style={[GeneralStyle.blackBoldText , 
                  {fontSize : 18 , color : '#353535'}]}
         >
         Add bank account details
         </Text>
         <View
            style={style.creditCardBg}
         >
            <FastImage 
               source={require('../../../../assets/images/visa-logo.png')}
               style={{width : 80 , height : 60}}
               resizeMode="contain"
            />
            <View
               style={{marginVertical : 25}}
            >
               <Text
                  style={{color : '#D1988F' , fontSize : 12 , marginBottom : 10} }
               >
                  CARD NUMBER
               </Text>
               <Text
                  style={{color :'#BDC6CC' , fontSize : 23 , letterSpacing : 6}}
               >
                  {card.cardNumber || '**** **** **** 0000'}
               </Text>
            </View>
            <View
               style={[GeneralStyle.rowSpaceBetween , {width :'95%'}]}
            >
               <View
                  style={{flex:6 , marginEnd : 10}}
               >
                  <Text
                     style={{color : '#D1988F' , fontSize : 12  , marginBottom : 10} }
                  >
                     HOLDER 
                  </Text>
                  <Text
                     style={{color :'#000' , fontSize : 14}}
                  >
                     {card.holderName || 'XXXXXXX'}
                  </Text>
               </View>
               <View
                  style={{flex:2, marginEnd : 20}}
               >
                  <Text
                     style={{flex:1 , color : '#D1988F' , fontSize : 12 , marginBottom : 10} }
                  >
                     EXP
                  </Text>
                  <Text
                     style={{color :'#000' , fontSize : 14}}
                  >
                     {card.expiryDate || 'XX/XX'}
                  </Text>
               </View>
               <View
                  style={{flex:1}}
               >
                  <Text
                     style={{flex:1 , color : '#D1988F' , fontSize : 12 , marginBottom : 10} }
                  >
                     CVV
                  </Text>
                  <Text
                     style={{color :'#000' , fontSize : 14 }}
                  >
                     { card.cvv || 'XXX'}
                  </Text>
               </View>
            </View>
         </View>

         <View
            style={{borderBottomColor : '#CCC' ,borderBottomWidth:.5}}
         >
            <Text 
               style={{fontSize : 16 , color : '#000' , fontWeight: '500' , marginBottom:10}}
            >
               Add Card Info
            </Text>
         </View>

         <Input
            name={'Name on Card'}
            color={'#000'}
            placeholderText={'Card Holder Name'}
            placeholderColor={'#CCC'}
            style={{marginTop:20 , width : '100%'}}
            onChangeText = {(value) => setCard({...card , holderName : value})}
         />
         <Input
            name={'Card Number'}
            color={'#000'}
            placeholderColor={'#CCC'}
            placeholderText={'Card Number'}
            style={{width : '100%'}}
            onChangeText = {(value) => setCard({...card , cardNumber : value})}
         />
         <View
            style={[GeneralStyle.rowSpaceBetween]}
         >
            <Input
               name={'Expiry date'}
               color={'#000'}
               placeholderColor={'#CCC'}
               placeholderText={'Expiration date'}
               style={{marginVertical:20 , width : '70%'}}
               onChangeText = {(value) => setCard({...card , expiryDate : value})}
            />
            <Input
               name={'CVV'}
               color={'#000'}
               placeholderText={'CVV'}
               placeholderColor={'#CCC'}
               isNumeric
               style={{marginVertical:20 , width : '55%'}}
               onChangeText = {(value) => setCard({...card , cvv : value})}
            />  
         </View>
      </ScrollView>
      <TAndC 
         showModal={showTAndCModal}
         onCloseModal={() => setShowTAndCModal(false)}
         onAgree={() => {
            setShowTAndCModal(false);
            setShowSubmitModal(true);
         }}
      />

      <SubmitModal />

      <TallahButton 
               onPress={submitStep}
               labelColor = "#FFF"
               label = {'Send Request'}
               bgColor = "#D1AD67"
               style={{ padding: 15 , width : '91%'  }}
      />
   </View>
}

export default StepSix ;