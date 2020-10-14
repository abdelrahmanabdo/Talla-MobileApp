import React, { useRef, useState } from 'react';
import { SafeAreaView, ScrollView, Text , View} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-share';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import { BorderlessButton } from 'react-native-gesture-handler';

//Styles
import GeneralStyle from '../../../../assets/styles/GeneralStyle';
import style from '../../../../assets/styles/StylistRequestStyle';
import Input from '../../../../components/Input';
import TallahButton from '../../../../components/Button';

import Add from './Add';
import ModalStyle from '../../../../assets/styles/ModalStyle';

import I18n from '../../../../lang/I18n';

const StepThree = props => {
   const [showAddModal , setShowAddModal ] = useState(false);
   const [certificates , setCertificates] = useState([]);
   const [editedItemIndex , setEditedItemIndex ] = useState(null);
   const [isEdit , setIsEdit ] = useState(false);
   const certificateRef = useRef(null);

   /**
    * Remove Certificate from the list 
    */
   const removeCertificate = (index) => {
      certificates.splice(index ,1) ;
      setCertificates([...certificates]);
      certificateRef.current?.slideOutDown();
   }

   /**
    * Remove Certificate from the list 
    */
   const editCertificate = (index) => {
      setIsEdit(true);
      setEditedItemIndex(index);
      setShowAddModal(true);
   }


   /**
    * Submit current step
    */
   const submitStep = () => {
      props.goToNext();
   }

   const AddModal = () => {
      const [name , setName ] = useState();
      const [issuingOrganization , setIssuingOrganization ] = useState();
      const [yearsOfIssuance , setYearsOfIssuance] = useState();

      const onSubmitModal = () => {
         const newCertificate = {
            name , issuingOrganization , yearsOfIssuance
         }

         if(isEdit){
            certificates[editedItemIndex] = newCertificate ;
            setCertificates([...certificates]);
            setIsEdit(false);
            setEditedItemIndex(null);
         }else{
            setCertificates([...certificates , newCertificate]);
            certificateRef.current?.slideInRight();
         }
         setShowAddModal(false);
      }

      return <Modal
               isVisible={showAddModal}
               style={{margin: 0,justifyContent:'flex-end' ,}}
            >
            <View style={[ModalStyle.actionModalContainer]}
                  showsVerticalScrollIndicator={false}>
            <View style={ModalStyle.actionModalHeader}>
               <View style={{flex:1}}></View>
               <Text style={[ModalStyle.headerText , {flex:1}]}>
                     Add Certificate
               </Text>
               <Button 
                  transparent  
                  onPress={() => {
                     setIsEdit(false);
                     setEditedItemIndex(null);
                     setShowAddModal(false);
                  }}
               >
                  <FastImage source={require('../../../../assets/icons/close-colored.png')}
                             style={{width:20,height:20 , flex:1}} 
                             resizeMode={'contain'}
                  />
               </Button>
            </View>
            <ScrollView>
               <Input name={'Name'} 
                     placeholderText={'Name'}  
                     onChangeText={(value) => setName(value)}
                     placeholderColor={'#ccc'} 
                     color={'#000'}
                     defaultValue={isEdit ? certificates[editedItemIndex].name : null}
               />
               <Input name={'Issuing organization'} 
                     placeholderText={'Issuing organization'}  
                     onChangeText={(value) => setIssuingOrganization(value)}
                     placeholderColor={'#ccc'} 
                     color={'#000'}
                     defaultValue={isEdit ? certificates[editedItemIndex].issuingOrganization : null}
               />
               <Input name={'Year of issuance'} 
                     placeholderText={'Year of issuance'}  
                     onChangeText={(value) => setYearsOfIssuance(value)}
                     placeholderColor={'#ccc'} 
                     color={'#000'}
                     defaultValue={isEdit ? certificates[editedItemIndex].yearsOfIssuance : null}
               />
               <TallahButton  onPress={onSubmitModal}
                              label={isEdit ? 'Edit' : 'Add'}
                              labelColor={'#FFF'}
                              isModal
                              style={[ModalStyle.SecondaryButton,{flex:1}]}/>
            </ScrollView>
         </View>
      </Modal>
   }


   return <SafeAreaView style={{height : '88%'}}>
      <Text
         style={[GeneralStyle.blackBoldText , 
               {marginStart : 15 , marginVertical : 8 , fontSize : 16}]}
      >
       Certificates
      </Text>
      <Add  
         type={'certificate'}
         onPress={() => setShowAddModal(true)}
      />
      <ScrollView
         contentContainerStyle={{ flexGrow: 1 }}
      >
         {
            certificates.map((item ,key ) => {
               return <Animatable.View
                           style={style.grayBoxContainer}
                           ref={certificateRef}
                      >
                  <View style={[GeneralStyle.rowSpaceBetween , {marginVertical: 5 , alignItems:'center'}]}>
                     <Text
                        style={[GeneralStyle.blackText, { flex:6 ,fontSize : 17 , fontWeight : '600'}]}
                     >
                        {item.name}
                     </Text>
                     <View
                        style={[GeneralStyle.rowSpaceBetween , {flex:1 }]}
                     >
                        <BorderlessButton
                           rippleColor={'#CCC'}
                           onPress={() => editCertificate(key)}
                        >
                           <FastImage 
                              source={require('../../../../assets/icons/edit.png')}
                              style={{width : 17 , height : 17}}
                           />
                        </BorderlessButton>
                        <BorderlessButton
                           rippleColor={'#CCC'}
                           onPress={() => removeCertificate(key)}
                        >
                           <FastImage 
                              source={require('../../../../assets/icons/close-colored.png')}
                              style={{width : 16 , height : 16}}
                           />
                        </BorderlessButton>
                     </View>
                  </View>
                  <Text
                     style={[GeneralStyle.grayText, {fontSize : 15 , marginTop : 8}]}
                  >
                    Organization :  {item.issuingOrganization}
                  </Text>
                  <Text
                     style={[GeneralStyle.grayText, {fontSize : 15 , marginTop : 8}]}
                  >
                    Year of Issuing :  {item.yearsOfIssuance}
                  </Text>
               </Animatable.View>
            })
         }
      </ScrollView>
      <TallahButton 
            onPress={submitStep}
            labelColor = "#FFF"
            label = {I18n.t('next')}
            bgColor = "#D1AD67"
            style={{ padding: 15 , width: '91%'  }}
      />
      <AddModal />   

   </SafeAreaView>
}

export default StepThree ;