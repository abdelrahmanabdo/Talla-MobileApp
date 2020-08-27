import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

//Styles
import style from '../assets/styles/NotificationsStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';

const Notifications = props  => {

   return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../assets/images/colored-bg.png')}
                            style={style.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                <RectButton onPress={()=>{props.navigation.goBack()}}>
                        <FastImage source={require('../assets/icons/back-white.png')} style={{width : 35 , height : 35}} />
                    </RectButton>
                    <Text style={style.headerText}>
                        Notifications
                    </Text>
                    <View >
                    </View>
                </View>
            </ImageBackground>
    </View>
}
 
export default Notifications;
