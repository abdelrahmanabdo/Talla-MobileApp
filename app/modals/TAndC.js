import React, { useState } from 'react';
import { ScrollView, Text, View , StyleSheet, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton, BorderlessButton, BaseButton } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { Button } from 'react-native-share';
import TallaButton from '../components/Button';

//Styles
import ModalStyle from '../assets/styles/ModalStyle';

const {height , width } = Dimensions.get('window');

const TAndC = props => {

   return <Modal  
                  isVisible={props.showModal}
                  style={[style.container]}
                  >
      <View style={[ModalStyle.actionModalContainer ,
                    {justifyContent:'space-between' }]}
                  showsVerticalScrollIndicator={false}>
            <View style={ModalStyle.actionModalHeader}>
               <Text style={[ModalStyle.headerText,{flex:5 , textAlign:'right'}]}>
                Terms and conditionstions
               </Text>
               <Button 
                  transparent  
                  onPress={props.onCloseModal}>
                  <FastImage source={require('../assets/icons/close-colored.png')}
                              style={{width:25,height:25,flex:1}}
                              resizeMode={'contain'} />
               </Button>
            </View>
            <ScrollView>
               <Text style={{lineHeight : 24 ,marginTop : 10 , marginBottom:50}}>
                  Lorem Ipsum has been the industry's Lorem Ipsum has 
                     been the industry's Lorem Ipsum has been the industry's
                     Lorem Ipsum has been the industry'sLorem 
                     Ipsum has been the industry's
                     Lorem Ipsum has been the industry's
                     Lorem Ipsum has been the industry's Lorem Ipsum has 
                     been the industry's Lorem Ipsum has been the industry's
                     Lorem Ipsum has been the industry'sLorem 
                     Ipsum has been the industry's
                     Lorem Ipsum has been the industry's
                     Lorem Ipsum has been the industry's Lorem Ipsum has 
                     been the industry's Lorem Ipsum has been the industry's
                     Lorem Ipsum has been the industry'sLorem 
                     Ipsum has been the industry's
                     Lorem Ipsum has been the industry's
               </Text>
            </ScrollView>
            <View style={{flexDirection:'row',marginBottom : 10}}>
                  <TallaButton   onPress={props.onCloseModal}
                                 label ={'cancel'}
                                 labelColor={'#D1AD67'}
                                 isModal
                                 style={[ModalStyle.SecondaryButton,{backgroundColor:'#FFF',
                                                                     marginEnd : 10,
                                                                     flex:1,
                                                                     borderColor  : '#D1AD67' , 
                                                                     borderWidth : 1}]}>
                  </TallaButton>
                  <TallaButton   onPress={props.onAgree}
                                 label={'Agree & continue'}
                                 labelColor={'#FFF'}
                                 isModal
                                 style={[ModalStyle.SecondaryButton,{flex:1}]}>
                  </TallaButton>
            </View>

      </View>
   </Modal>
}

const style = StyleSheet.create({
   container : {
      margin: 0,
      justifyContent:'flex-end' ,
   }
});
export default TAndC;