import React, { useRef, useState } from 'react';
import {ScrollView, Text , View} from 'react-native';
import FastImage from 'react-native-fast-image';
import PhotoUpload from 'react-native-photo-upload'
import { BorderlessButton } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import Modal from 'react-native-modal';
import { Button } from 'react-native-share';

import TallahButton from '../../../components/Button';
import Input from '../../../components/Input';

import ModalStyle from '../../../assets/styles/ModalStyle';
import GeneralStyle from '../../../assets/styles/GeneralStyle';

import I18n from '../../../lang/I18n';

const AddProject = props => {
   const stylist = useSelector(state => state.stylist);
   const [name , setName ] = useState('');
   const [description , setDescription ] = useState('');
   const [images , setImages] = useState([]);

   const onSubmitModal = () => {
      alert(stylist.id)
      const newProject = {
        'stylist_id': stylist.id, 
        name , description , images
      }
      props.onSubmitModal(newProject);
      setImages([]) 
   }

   /**
    * Images 
    */
   const Images = () => {

      return <View 
         style={{flexDirection:'row' , marginVertical : 10}}
        >
         {
            setImages.length > 0 &&
            <View style={{flexDirection : 'row'}}>
               {images.map((item,key) => {
                        return <FastImage 
                                    key={key}
                                    source={{uri: item}} 
                                    style={{width : 65 , height:65 , borderRadius : 10 , marginRight : 5}}
                              />
                     })
               }
            </View>
         }
         {
            images.length != 5 &&
            <PhotoUpload
               imagePickerProps={{  
                              title: I18n.t('selectAvatar'),
                              takePhotoButtonTitle : I18n.t('takeCameraPhoto'),
                              chooseFromLibraryButtonTitle :  I18n.t("chooseFromLibrary"),
                              cancelButtonTitle :  I18n.t('cancel')
                }}
                format = 'PNG'
                photoPickerTitle = {I18n.t('selectPhoto')}
                containerStyle={{alignItems:'flex-start'}}
                onPhotoSelect={pic => {
                  if (pic) setImages([...images, `data:image/png;base64,${pic}` ]);
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
               onPress={()=> {setImages([]) ;
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
               <Images />
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