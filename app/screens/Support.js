import React, { useState } from 'react';
import { Text, View, ImageBackground ,ScrollView, SafeAreaView} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton  } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { Button } from 'native-base';

//Styles
import GeneralStyle from '../assets/styles/GeneralStyle';
import ModalStyle from '../assets/styles/ModalStyle';
import TallahButton from '../components/Button';
import Input from '../components/Input';

const Support = props  => {
    const [data , setData ] = useState({});
    const [showModal , setShowModal ] = useState(false);


   /**
    * Submit Modal
    **/
    const SubmitModal = () => {
      return <Modal isVisible={showModal}
                    animationIn={'bounceIn'}
                    backdropOpacity={.7}
             >
         <View style={ModalStyle.container}>
            <FastImage source={require('../assets/icons/done-modal-icon.png')}
                        resizeMode="contain"
                        style={{width : 50  , height:  50 }}
            />
            <Text style={[ModalStyle.text, {fontSize : 17,marginVertical : 20}]}>
               Your message is sent successfully
            </Text>
            <Button onPress={() => setShowModal(false) }
                        style={ModalStyle.SecondaryButton}>
               <Text style={ModalStyle.SecondaryButtonText}>
                  ok
               </Text>
            </Button>
         </View>
      </Modal>
   }

    /**
     * Send the message
     */
    const sendSuppotMessage = () =>{
        setShowModal(true);
        setData({name : '' , mobile : '' , message : ''});
    }


    return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../assets/images/colored-bg.png')}
                            resizeMode={'stretch'}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton onPress={()=>{props.navigation.goBack()}}>
                        <FastImage source={require('../assets/icons/back-white.png')} style={{width : 25 , height : 25}} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                       Help & Support
                    </Text>
                    <View></View>
                </View>
            </ImageBackground>
            <ScrollView>
                <Text
                    style={[GeneralStyle.grayText , {padding : 25}]}
                >
                   Lorem Ipsum has been the industry's Lorem Ipsum has 
                    been the industry's Lorem Ipsum has been the industry's
                </Text>
                <Input name={'Name'} 
                        placeholderText={'Your Name'}  
                        onChangeText={(value) => setData({...data , name : value})}
                        placeholderColor={'#ccc'} 
                        defaultValue={data.name}
                        color={'#000'}
                />
               <Input name={'Mobile'} 
                      placeholderText={'Your Mobile number'}  
                      onChangeText={(value) => setData({...data , mobile : value})}
                      placeholderColor={'#ccc'} 
                      defaultValue={data.mobile}
                      color={'#000'}
                />
                <Input name={'Write your message'} 
                        placeholderText={'Write Your message here....'}  
                        isTextarea={true}                
                        onChangeText={(value) => setData({...data , message : value})}
                        placeholderColor={'#ccc'} 
                        defaultValue={data.message}
                        color={'#000'}
                />
            </ScrollView>
            <SafeAreaView>
                <TallahButton 
                    onPress={sendSuppotMessage}
                    labelColor = "#FFF"
                    label = {'Send'}
                    bgColor = "#D1AD67"
                    style={{ padding: 15 , width: '91%' }}
                />
            </SafeAreaView>
            <SubmitModal />
    </View>
}
 
export default Support;
