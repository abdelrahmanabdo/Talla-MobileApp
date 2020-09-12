import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

//Styles
import style from '../assets/styles/NotificationsStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';

const Messages = props => {
    return <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../assets/images/colored-bg.png')}
                            resizeMode={'stretch'}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton onPress={()=>{props.navigation.goBack()}}>
                        <FastImage source={require('../assets/icons/back-white.png')} style={{width : 25 , height : 25}} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                        Messages
                    </Text>
                    <View >
                    </View>
                </View>
            </ImageBackground>
          <Text>Messages</Text>
    </View>
};

export default Messages;
