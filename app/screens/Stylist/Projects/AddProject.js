import React, { useRef, useState } from 'react';
import {ScrollView, Text , View} from 'react-native';
import FastImage from 'react-native-fast-image';
import PhotoUpload from 'react-native-photo-upload'
import { BaseButton, BorderlessButton, RectButton } from 'react-native-gesture-handler';

import Modal from 'react-native-modal';
import { Button } from 'react-native-share';

import TallahButton from '../../../components/Button';
import Input from '../../../components/Input';

import ModalStyle from '../../../assets/styles/ModalStyle';
import GeneralStyle from '../../../assets/styles/GeneralStyle';

import I18n from '../../../lang/I18n';

const AddProject = props => {
   const [name , setName ] = useState('');
   const [description , setDescription ] = useState('');
   const [photos , setPhotos] = useState([]);

   const onSubmitModal = () => {
      const newProject = {
         name , description , photos
      }
      props.onSubmitModal(newProject);
      setPhotos([]) 
   }

   /**
    * Photos 
    */
   const Photos = () => {

      return <View 
         style={{flexDirection:'row' , marginVertical : 10}}
        >
         {
            photos.length > 0 &&
            <View style={{flexDirection : 'row'}}>
               {photos.map((item,key) => {
                     return <FastImage 
                                 key={key}
                                 source={{uri: `data:image/gif;base64,${item}`}} 
                                 style={{width : 65 , height:65 , borderRadius : 10 , marginRight : 5}}
                             />
                     })}
            </View>
         }
         {
            photos.length != 5 &&
            <PhotoUpload
               imagePickerProps={{  
                              title: I18n.t('selectAvatar'),
                              takePhotoButtonTitle : I18n.t('takeCameraPhoto'),
                              chooseFromLibraryButtonTitle :  I18n.t("chooseFromLibrary"),
                              cancelButtonTitle :  I18n.t('cancel')
                }}
                format = 'JPEG'
                photoPickerTitle = {I18n.t('selectPhoto')}
                containerStyle={{alignItems:'flex-start'}}
                onPhotoSelect={pic => {
                  if (pic) {
                     setPhotos([...photos , pic]);
                  }
                }}>
               <BorderlessButton>
                  <View style={{width : 'auto',justifyContent:'center',padding : 15,borderWidth: .5 ,
                                  borderColor:'#ccc' , borderRadius: 10 }}>
                     <FastImage 
                        source={require('../../../assets/icons/add-dashed.png')}
                        style={{width:33 , height: 33}}
                     />
                  </View>
               </BorderlessButton>
            </PhotoUpload>
         }

      </View>
   }

   return <Modal
            isVisible={props.showModal}
            style={{margin: 0,justifyContent:'flex-end'  }}
         >
         <View style={[ModalStyle.actionModalContainer]}
               showsVerticalScrollIndicator={false}>
         <View style={ModalStyle.actionModalHeader}>
            <View style={{flex:1}}></View>
            <Text style={[ModalStyle.headerText , {flex:1}]}>
                  Add Project
            </Text>
            <Button 
               transparent  
               onPress={()=> {setPhotos([]) ;
                              props.onCloseModal() }}>
               <FastImage source={require('../../../assets/icons/close-colored.png')}
                          style={{width:20,height:20 , flex:1}} 
                          resizeMode={'contain'}
               />
            </Button>
         </View>
         <ScrollView>
            <Input name={'Project name'} 
                  placeholderText={'Project name'}  
                  onChangeText={(value) => setName(value)}
                  placeholderColor={'#ccc'} 
                  color={'#000'}
            />
            <Input name={'Project Description'} 
                  placeholderText={'Project Description'}  
                  onChangeText={(value) => setDescription(value)}
                  placeholderColor={'#ccc'} 
                  rowsCount={4}
                  isTextarea = {true}
                  color={'#000'}
            />
            <View>
               <Text style={[GeneralStyle.blackBoldText , {marginBottom: 5}]}>Photos</Text>
               <Photos />
            </View>
            <TallahButton  onPress={onSubmitModal}
                           label={'Add'}
                           labelColor={'#FFF'}
                           isModal
                           style={[ModalStyle.SecondaryButton,{flex:1}]}/>
         </ScrollView>
      </View>
   </Modal>
}

export default AddProject ;