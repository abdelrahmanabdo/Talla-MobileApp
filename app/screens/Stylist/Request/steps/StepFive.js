import React, { useRef, useState } from 'react';
import { Dimensions, Pressable, SafeAreaView, ScrollView, Text , View} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-share';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

//Styles
import GeneralStyle from '../../../../assets/styles/GeneralStyle';
import style from '../../../../assets/styles/StylistRequestStyle';
import Input from '../../../../components/Input';
import TallahButton from '../../../../components/Button';

import Add from './Add';
import ModalStyle from '../../../../assets/styles/ModalStyle';

import I18n from '../../../../lang/I18n';

const {width , height} = Dimensions.get('window');


const StepFive = props => {
   const [showAddModal , setShowAddModal ] = useState(false);
   const [specializations , setSpecializations] = useState([]);
   const specializationRef = useRef(null);
   const [isEdit , setIsEdit ] = useState(false);
   const [editedItemIndex , setEditedItemIndex ] = useState(null);
   /**
    * Remove Certificate from the list 
    */
   const removeSpecialization = (index) => {
      specializations.splice(index,1);
      setSpecializations([...specializations])
   }

   /**
    * Submit current step
    */
   const submitStep = () => {
      props.goToNext();
   }

   /**
    * Add new Specialization item
    */
   const AddModal = () => {
      const [selectedItem , setSelectedItem] = useState(null);
      const [specializationTypes , setSpecializationTypes ] = useState([{
            name : 'Wardrobe Consultation',
            hint : 'Organizing, declutter, mix and match existing clothes.'
         },
         {
            name : 'Shopping guide/ assistance',
            hint : 'What trends fits client’s body shape, where to shop. .etc'
         },
         {
            name : 'Color analysis /make up and grooming consultation',
            hint : 'What make up, hair and outfit colors that light up the client’s look.'
         },
         {
            name : 'Event capsule',
            hint : 'Plan & prepare client’s stylish look for more than one event.'
         }
      
      ]);

      const onSubmitModal = () => {

         if(selectedItem == null) return
         setSpecializations([...specializations , specializationTypes[selectedItem] ]);
         setIsEdit(true);
         setEditedItemIndex(specializations.length);
         setShowAddModal(false);
         specializationRef.current?.slideInRight();

      }

      return <Modal
               isVisible={showAddModal}
               style={{margin: 0,justifyContent:'flex-end' }}
            >
            <View style={[ModalStyle.actionModalContainer , 
                         {borderTopRightRadius : 0 , borderTopLeftRadius : 0 , 
                          height : height, maxHeight : '100%' }]}
                  showsVerticalScrollIndicator={false}>
            <View style={[ModalStyle.actionModalHeader , {marginTop : 15}]}>
               <View style={{flex:1}}></View>
               <Text style={[ModalStyle.headerText , {flex:2 , textAlign:'center'}]}>
                Select specialization
               </Text>
               <Button 
                  transparent  
                  onPress={() => setShowAddModal(false)}>
                  <FastImage source={require('../../../../assets/icons/close-colored.png')}
                             style={{width:20,height:20 , flex:1}} 
                             resizeMode={'contain'}
                  />
               </Button>
            </View>
            <Text
               style={[GeneralStyle.blackText , 
                      {alignSelf:'center' , marginBottom : 10}]}
            >
                  Which specialty suits your experience
            </Text>
            <ScrollView>
               {
                  specializationTypes.map((item , key) => {
                     return <Pressable
                        style={{
                           backgroundColor:  selectedItem == key ?  '#012647' : '#F8F8F8',
                           padding : 15,
                           borderRadius : 8 ,
                           marginVertical : 10
                        }}
                        onPress={() => setSelectedItem(key)}
                     >
                        <Animatable.View
                           animation={'fadeIn'}
                        >
                           <Text
                              style={[GeneralStyle.blackText , 
                                     {fontSize : 16 , fontWeight : '600' ,
                                      marginBottom:5 , color : selectedItem == key ? '#fff' : '#000'
                                     }]}
                           >
                              {item.name}
                           </Text>
                           <Text
                              style={[GeneralStyle.blackText , 
                                     {fontSize : 12 , marginBottom:5,
                                       color : selectedItem == key ? '#fff' : '#000'
                                     }]}
                           >
                             {item.hint}
                           </Text>
                        </Animatable.View>
                     </Pressable>
                  })
               }
            </ScrollView>
            <TallahButton  onPress={onSubmitModal}
                           label={'Add'}
                           labelColor={'#FFF'}
                           isModal
                           style={[ModalStyle.SecondaryButton]}
            />
         </View>
      </Modal>
   }


   return <SafeAreaView style={{height:'88%'}}>
      <Text
         style={[GeneralStyle.blackBoldText , 
               {marginStart : 15 , marginVertical : 8 , fontSize : 16}]}
      >
       Specializations
      </Text>
      <Add  
         type={'specialization'}
         onPress={() => setShowAddModal(true)}
      />
      <ScrollView
         contentContainerStyle={{ flexGrow: 1 }}
      >
         {
            specializations.map((item ,key ) => {
               return <>
               {
                  isEdit && (editedItemIndex == key) ?
                  <Animatable.View
                           style={style.grayBoxContainer}
                           ref={specializationRef}
                  >

                     <Text
                        style={[GeneralStyle.blackText, 
                              {textAlign :'center' , alignSelf:'center',fontSize : 16 ,
                               width:'75%', marginBottom : 8}]}
                     >
                        {item.name}
                     </Text>
                  <Input 
                      name={'Service description'} 
                      color={'#000'}
                      placeholderText={'What the client should expect from you (will appear on your profile)'}  
                      placeholderColor={'#CCC'}
                      isTextarea={true}
                      rowsCount={3}
                      defaultValue={item.description}
                      onChangeText={(value) => specializations[key].description = value}
                  />
                  <Input 
                     name={'Price starts from'}
                     color={'#000'}
                     placeholderColor={'#CCC'}
                     placeholderText={'Price starts from:'}
                     defaultValue={item.startingPrice}
                     onChangeText={(value) => specializations[key].startingPrice = value}
                  />
                  <View
                     style={[GeneralStyle.rowSpaceBetween]}
                  >
                     <TallahButton
                           onPress={() => setIsEdit(false)}
                           labelColor = "#707070"
                           label = {'Cancel'}
                           bgColor={'#F8F8F8'}
                           style={{ padding: 15 , width : '48%' ,borderWidth : .6, borderColor : '#707070'  }}
                     />
                     <TallahButton
                           onPress={() => { setIsEdit(false)}}
                           labelColor = "#FFF"
                           label = {'Save'}
                           bgColor = "#D1AD67"
                           style={{ padding: 15  , width : '48%'  }}
                     />
                  </View>
               </Animatable.View>
               :
               <Animatable.View
                           style={style.grayBoxContainer}
                           ref={specializationRef}
                      >
                  <View
                     style={[GeneralStyle.row , 
                            {marginVertical :10  , justifyContent:'flex-end'}]}
                  >
                        <BorderlessButton
                           rippleColor={'#CCC'}

                           onPress={() => {setEditedItemIndex(key);setIsEdit(true)}}
                        >
                           <FastImage 
                              source={require('../../../../assets/icons/edit.png')}
                              style={{width : 17 , height : 17 , marginEnd : 20}}
                           />
                        </BorderlessButton>
                        <BorderlessButton
                           rippleColor={'#CCC'}
                           onPress={() => removeSpecialization(key)}
                        >
                           <FastImage 
                              source={require('../../../../assets/icons/close-colored.png')}
                              style={{width : 16 , height : 16}}
                           />
                        </BorderlessButton>
                  </View>
                  <View
                     style={[GeneralStyle.row ,{marginVertical :5}]}
                  >
                     <Text
                        style={[GeneralStyle.grayText, 
                              {flex:1,fontSize : 15 }]}
                     >
                        Specialization : 
                     </Text>
                     <Text
                        style={[GeneralStyle.blackText, 
                                 {flex:2,fontSize : 15}]}
                     >
                        {item.name}
                     </Text>
                  </View>                 
                  <View
                     style={[GeneralStyle.row ,{marginVertical :5}]}
                  >
                     <Text
                        style={[GeneralStyle.grayText, 
                              {flex:1,fontSize : 15 }]}
                     >
                        Description : 
                     </Text>
                     <Text
                        style={[GeneralStyle.blackText, 
                                 {flex:2,fontSize : 15}]}
                     >
                        {item.description}
                     </Text>
                  </View>
                  <View
                     style={[GeneralStyle.row ,{marginVertical :5}]}
                  >
                     <Text
                        style={[GeneralStyle.grayText, 
                              {flex:1,fontSize : 15 }]}
                     >
                        Starting Price : 
                     </Text>
                     <Text
                        style={[GeneralStyle.blackText, 
                                 {flex:2,fontSize : 15}]}
                     >
                        {item.startingPrice}
                     </Text>
                  </View>
               </Animatable.View>
               }
               </>
            })
         }
      </ScrollView>
      <TallahButton 
            onPress={submitStep}
            labelColor = "#FFF"
            label = {I18n.t('next')}
            bgColor = "#D1AD67"
            style={{ padding: 15 , width : '91%'  }}
      />

      <AddModal />   
   </SafeAreaView>
}

export default StepFive ;