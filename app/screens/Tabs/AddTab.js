import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import {Button} from 'native-base';
import FastImage from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';

//Styles
import ModalStyle from '../../assets/styles/ModalStyle';

const AddTab = props => {
    const [shoeModal , setShowModal ] = useState(true);

    return <Modal  isVisible={shoeModal}
                    style={{margin: 0,justifyContent:'flex-end'}}
                    backdropOpacity={.7}>
         <View style={ModalStyle.actionModalContainer}>
            <View style={ModalStyle.actionModalHeader}>
               <View></View>
               <Text style={ModalStyle.headerText}>
                  Find More
               </Text>
               <Button transparent  onPress={()=>{setShowModal(false)}}>
                  <FastImage source={require('../../assets/icons/close-colored.png')}
                              style={{width:25,height:25}} />
               </Button>
            </View>
            <View style={{flexDirection:"column"}}>
                <RectButton style={ModalStyle.selectRow}
                            onPress={()=>{}}>
                    <FastImage source={require('../../assets/icons/mix-and-match.png')}
                               resizeMode={'contain'}
                               style={{width:35,height:35,marginEnd : 20}}/>
                    <Text style={ModalStyle.textBold}>
                        Mix & match
                    </Text>
                </RectButton>
                <RectButton style={ModalStyle.selectRow}
                            onPress={()=>{}}>
                    <FastImage source={require('../../assets/icons/modal-calendar.png')}
                               resizeMode={'contain'}
                               style={{width:35,height:35,marginEnd : 20}}/>
                    <Text style={ModalStyle.textBold}>
                        Calendar
                    </Text>
                </RectButton>
            </View>
         </View>
      </Modal>
};

export default AddTab;
