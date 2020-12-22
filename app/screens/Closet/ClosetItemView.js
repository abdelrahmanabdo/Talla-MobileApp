import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground , SafeAreaView,FlatList , Statusbar, Pressable } from 'react-native';
import {Button} from 'native-base';
import { RectButton, ScrollView, BorderlessButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Share from "react-native-share";
import Modal from 'react-native-modal';

//
import I18n from '../../lang/I18n';

//styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/ClosetItemViewStyle';

//Components
import TallaButton from '../../components/Button';
import ClosetItem from '../../components/ClosetItem';
import ModalStyle from '../../assets/styles/ModalStyle';
import AddToFavourites from '../../components/AddToFavourites';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

const ClosetItemView = ({...props}) => {
   const [data, setData] = useState(null);
   const [showDeleteModal , setShowDeleteModal ] = useState(false);
   const [showEditModal , setShowEditModal ] = useState(false);

   /**
    * Get current closet item data
    * @param {*} param0 
    */
   const getClosetItemData = () => {
      if (!props.route?.params?.itemId) return;

      api  
         .get(endpoints.closet + '/' + props.route.params.itemId)
         .then(res => setData(res.data.data));
   }

   /**
    * Remder related closetes 
    */
   const renderReleatedItem = ({item , index}) => {
      return <ClosetItem key={index} item={item}/>
   }

   /**
    * Edit Modal
    */
   const EditModal = () => {
      const [season , setSeason ] = useState(0);
      const [categories , setCategories ] = useState([]);
      const [brands , setBrands ] = useState([]);
      const [colors, setColors ] = useState([]);

      /**
       * Get categories
      */
      const getCategories = () => {
         api  
               .get(endpoints.categories)
               .then(res => setCategories(res.data.data));
      }

      /**
       * Get colors
      */
      const getColors = () => {
         api  
               .get(endpoints.colors)
               .then(res => setColors(res.data.data));
      }


      /**
       * Get brands
      */
      const getBrands = () => {
         api  
               .get(endpoints.brands)
               .then(res => setBrands(res.data.data));
      }

      useEffect(() => {
         getCategories();
         getBrands();
         getColors();
      }, [season]);


      return <Modal  isVisible={showEditModal}
                        style={{margin: 0,justifyContent:'flex-end'}}
                        backdropOpacity={.7}>
            <ScrollView style={ModalStyle.actionModalContainer}
                        showsVerticalScrollIndicator={false}>
               <View style={ModalStyle.actionModalHeader}>
                  <View></View>
                  <Text style={ModalStyle.headerText}>
                     Edit item data
                  </Text>
                  <Pressable 
                     transparent  
                     onPress={()=>{setShowEditModal(false)}}>
                     <FastImage source={require('../../assets/icons/close-colored.png')}
                                 style={{width:20,height:20}} />
                  </Pressable>
               </View>
               <View style={{flexDirection:"column"}}>
                  <Dropdown items={categories}
                           isModal
                           name={I18n.t('category')} />
                  <View>
                     <Text style={ModalStyle.sectionHeaderText}>
                        Season
                     </Text>
                     <View style={{flexDirection:'row',justifyContent:'flex-start',marginVertical : 8}}>
                        <View style={{flex:1}}>
                           <Checkbox onChange={()=>{setSeason(0)}}
                                    isRounded
                                    isChecked={season == 0 }
                                    label={'Summer'}/>
                        </View>
                        <View style={{flex:1}}>
                           <Checkbox onChange={()=>{setSeason(1)}}
                                    isRounded
                                    isChecked={season == 1}
                                    label={'Winter'}/>
                        </View>
                     </View>
                  </View>
                  <Dropdown items={colors}
                           isModal
                           name={I18n.t('color')} />
                  <Dropdown items={brands}
                           isModal
                           name={I18n.t('brand')} />
                  <Input  
                     name={I18n.t('price')}
                     placeholderText={'Price'}
                     placeholderColor={'#CCC'}
                     defaultValue={data?.price}
                  />
                  <Input  
                     name={I18n.t('comment')} 
                     placeholderText={'Comment'}
                     placeholderColor={'#CCC'}
                     isTextarea 
                     defaultValue={data?.comment}
                     rowsCount={3} />
                  <View style={{flexDirection:'row',marginBottom : 10}}>
                  <TallaButton   onPress={()=>{setShowEditModal(false) }}
                                 label ={'cancel'}
                                 labelColor={'#D1AD67'}
                                 style={[ModalStyle.SecondaryButton,{backgroundColor:'#FFF',
                                                                     marginEnd : 10,
                                                                     flex:1,
                                                                     borderColor  : '#D1AD67' , 
                                                                     borderWidth : 1}]}
                  />
                  <TallaButton   onPress={()=>{ setShowDeleteModal(false)}}
                                 label={'Save'}
                                 labelColor={'#FFF'}
                                 style={[ModalStyle.SecondaryButton,{flex:1}]}
                  />
                  </View>
               </View>
            </ScrollView>
         </Modal>
   }

   /**
    * Delete modal
    */
   const DeleteModal = () => {
         //Info Modal
      return <Modal isVisible={showDeleteModal}
                     animationIn={'bounceIn'}
                     backdropOpacity={.7}>
         <View style={ModalStyle.container}>
            <FastImage source={require('../../assets/icons/delete-red.png')}
                        resizeMode="contain"
                        style={{width :  60  , height:  60 }}
            />
            <Text style={[ModalStyle.text,{fontFamily : 'Roboto-Bold'}]}>
               Are you sure that you want to delete this item?
            </Text>
            <View style={{flexDirection:"row"}}>
               <TallaButton   
                        onPress={()=>{setShowDeleteModal(false) }}
                        label ={'Cancel'}
                        isModal
                        labelColor={'#686868'}
                        style={[ModalStyle.SecondaryButton,{backgroundColor:'#FFF',
                                                            marginEnd : 10,
                                                            flex:1,
                                                            borderColor  : '#CCC' , 
                                                            borderWidth : 1}]}>
               </TallaButton>
               <TallaButton  onPress={()=>{ setShowDeleteModal(false)}}
                       label={'Delete'}
                       isModal
                       labelColor={'#FFF'}
                       style={[ModalStyle.SecondaryButton,{backgroundColor:'#FF0000',flex:1}]}>
               </TallaButton>
            </View>
         </View>
      </Modal>
   }

   /**
    * Share Item
    */
   const share = ( ) => {
      const url = "";
      const title = "";
      const message = "";
      const icon = "";

      const options = Platform.select({
         ios: {
           activityItemSources: [
             { // For using custom icon instead of default text icon at share preview when sharing with message.
               placeholderItem: {
                 type: 'url',
                 content: icon
               },
               item: {
                 default: {
                   type: 'text',
                   content: `${message} ${url}`
                 },
               },
               linkMetadata: {
                  title: message,
                  icon: icon
               }
             },
           ],
         },
         default: {
           title,
           subject: title,
           message: `${message} ${url}`,
         },
       });

      Share
         .open(options)
         .then((res) => { console.log(res) })
         .catch((err) => { err && console.log(err); });
   }


   useEffect(() => {
      getClosetItemData();
   }, [])
 
   return <View eaView style={GeneralStyle.container}>
        {/* <Statusbar hidden={false}  barStyle={'light-content'} /> */}
        <ImageBackground source={require('../../assets/images/colored-bg.png')}
                         style={GeneralStyle.header}>
            <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
               <RectButton onPress={()=>{props.navigation.goBack()}}>
                  <FastImage source={require('../../assets/icons/back-white.png')}
                           style={{width : 25 , height:25}}
                           resizeMode={'contain'}
                  />
               </RectButton>
               <View style={{flexDirection:'row' , justifyContent:'space-between' }}>
                  <RectButton onPress={()=>{share()}} >
                     <FastImage source={require('../../assets/icons/share-white.png')}
                              style={{width : 25 , height:25}}
                              resizeMode={'contain'}
                     />
                  </RectButton>
                  <RectButton onPress={()=>{setShowDeleteModal(true)}} 
                              style={{marginStart : 20}}>
                     <FastImage source={require('../../assets/icons/delete-white.png')}
                              style={{width : 25 , height:25}}
                              resizeMode={'contain'}
                     />
                  </RectButton>
               </View>
            </View>
        </ImageBackground>
         <ImageBackground source={data?.image ? {uri: data.image} : require('../../assets/images/closet-item-default.png')}
                          resizeMode={'stretch'}
                          style={style.bgImage}>
            <View style={style.uploadImageButton}>
               <AddToFavourites 
                  isGold 
                  iconSize="big" 
                  itemId={data?.id}
               />
            </View>
         </ImageBackground>
         <ScrollView showsVerticalScrollIndicator={false}>
            <View style={style.grayContainer}>
               <View style={GeneralStyle.rowSpaceBetween}>
                  <View></View>
                  <BorderlessButton 
                     rippleColor={'#CCC'}
                     onPress={()=>{setShowEditModal(true)}}>
                     <FastImage source={require('../../assets/icons/edit.png')}
                              style={{width:23,height:23}}
                     />
                  </BorderlessButton>
               </View>
               <View style={GeneralStyle.rowSpaceBetween}>
                  <View style={{flexDirection:'row',flex:1}}>
                  <Text style={[style.rowInfo , {color : '#979797',fontSize : 16 , flex:1}]}>
                           {I18n.t('category')} :
                     </Text>
                     <Text style={[style.rowInfo, GeneralStyle.blackBoldText,{flex:1}]}>
                           {data?.category?.name}
                     </Text>
                  </View>
                  <View style={{flexDirection:'row',flex:1}}>
                     <Text style={[style.rowInfo , {color : '#979797',fontSize : 16 , flex:1}]}>
                           {I18n.t('color')} :
                     </Text>
                     <Text style={[style.rowInfo, GeneralStyle.blackBoldText,{flex:1}]}>
                           {data?.color.name_en}
                     </Text>
                  </View>
               </View>
               <View style={GeneralStyle.rowSpaceBetween}>
                  <View style={{flexDirection:'row',flex:1}}>
                  <Text style={[style.rowInfo , {color : '#979797',fontSize : 16 , flex:1}]}>
                           {I18n.t('brand')} :
                     </Text>
                     <Text style={[style.rowInfo, GeneralStyle.blackBoldText,{flex:1}]}>
                           {data?.brand.name_en}
                     </Text>
                  </View>
                  <View style={{flexDirection:'row',flex:1}}>
                  <Text style={[style.rowInfo , GeneralStyle.blackBoldText, {color : '#979797',fontSize : 16 , flex:1}]}>
                           {I18n.t('price')} :
                     </Text>
                     <Text style={[style.rowInfo, GeneralStyle.blackBoldText,{flex:1}]}>
                           {data?.price ?? 0 + ' ' + I18n.t('EGP') }
                     </Text>
                  </View>
               </View>
               <View style={GeneralStyle.rowSpaceBetween}>
                  <View style={{flexDirection:'row',flex:1}}>
                  <Text style={[style.rowInfo , {color : '#979797',fontSize : 16 , flex:1}]}>
                              {I18n.t('comment')} :
                     </Text>
                     <Text style={[style.rowInfo , GeneralStyle.blackBoldText,{flex:3,lineHeight : 23}]}>
                          {data?.comment}
                     </Text>
                  </View>

               </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding :15}}>
               <TallaButton   label={'Add To Calendar'}
                              isModal
                              labelColor ={'#D1AD67'}
                              style={{flex:1,backgroundColor: '#FFF',borderColor : '#D1AD67',borderWidth : 1}}/>
               <TallaButton   label={'Add To Outfit'}
                              labelColor ={'#D1AD67'}
                              isModal
                              style={{flex:1,backgroundColor: '#FFF',borderColor : '#D1AD67',borderWidth : 1,marginStart : 15}}/>
            </View>
            <View style={style.line}></View>
            {
               data?.related_items.length > 0 &&
               <View>
                  <Text style={style.relatedItemsText}>
                     Releated items
                  </Text>
                  <FlatList 
                     horizontal
                     data={data?.related_items}
                     renderItem={renderReleatedItem}
                  />
               </View>
            }
         </ScrollView>
         <EditModal />
         <DeleteModal />
    </View>
};

export default ClosetItemView;
