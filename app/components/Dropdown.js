import React, { useState, useEffect } from 'react';
import { Text, View  ,  StyleSheet , Dimensions, I18nManager ,TouchableOpacity ,ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import ModalStyle from '../assets/styles/SelectModalStyle';
import * as Animatable from 'react-native-animatable';
import { RectButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

const {width , height} = Dimensions.get('screen');

const Dropdown = ({...props}) => {
      const [showModal , setShowModal] = useState(false);
      const [selectedValue , setSelectedValue] = useState(0);
      const [activeItem , setActiveItem] = useState(0);

      const submitModal = (item,index) => {
         props.onChangeValue(item.id);
         setSelectedValue(item.id);
         setActiveItem(index);
         setShowModal(false);
      }

      useEffect(()=>{
         setSelectedValue(selectedValue)
      },[])

      const DropDownModal = () => {
          return <Modal 
                       isVisible={showModal} 
                       backdropOpacity={.2} >
                  <View style={[ModalStyle.container]}>
                     <View style={ModalStyle.header}>
                        <Text style={ModalStyle.title}>
                           {props.name}
                        </Text>
                        <TouchableOpacity activeOpacity={.5}
                                          onPress={()=>{setShowModal(false)}}>
                         <FastImage source={require('../assets/icons/close.png')}  
                                    style={{width: 30 , height : 30}}/>
                        </TouchableOpacity>
                     </View>
                     <ScrollView showsVerticalScrollIndicator={false}>
                        {
                           props?.items.map((item,index)=>{
                              return  <TouchableOpacity key={index} 
                                                        onPress={()=>{submitModal(item,index)}} >
                                 <Text style={[Style.itemText, { color: (activeItem == index)
                                               ? '#0A627C' : '#AAA' }]}>
                                    {I18nManager.isRTL ? item.name : item.name_en}
                                 </Text>
                              </TouchableOpacity>
                           })
                        }
                     </ScrollView>
                  </View>  
               </Modal>
      }

      
      return   <View  style={{marginVertical : 7}}> 
            <Animatable.View style={Style.container}>
                  <View style={{flexDirection:'row',alignItems:'center',marginBottom  :10}}>
                     {
                        props.name &&
                        <Text style={[Style.placeholerText,{fontWeight : '700'}]}>
                           {props.name}
                        </Text>                     
                     }
                  </View>
                  <RectButton onPress={()=> setShowModal(true)}
                              style={{borderRadius : 8,justifyContent:'center'}}>
                     <View style={Style.dropdown}> 
                        <Text style={Style.placeholerText}>
                           { I18nManager.isRTL ? props?.items[activeItem]?.name : props?.items[activeItem]?.name_en }
                        </Text>
                              <FastImage source={require('../assets/icons/down-arrow.png')}  
                                        style={{width: 20 , height : 20}}/>
                     </View>
                  </RectButton>
                   
                  <DropDownModal />
               </Animatable.View>
         </View>
};

const Style = StyleSheet.create({
   container : {
      width : width - 40,
      borderRadius:7,
      alignSelf:'center',
      padding : 5,
      backgroundColor:'#FFF',
   },
   itemText : {
      alignSelf: 'flex-start' ,
      color: '#5D0D57',
      fontFamily : "Roboto",
      fontSize: 16,
   },
   placeholerText : {
      color: '#5D0D57',
      fontFamily : "Roboto",
      fontSize: 14,
   },
   dropdown: {
      backgroundColor:'#FFF',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      width: '100%',
      padding:15,
      borderWidth : 1.25 ,
      borderColor:'#CCC',
      maxHeight: height /2,
      borderRadius : 8
   }
});

export default Dropdown;