import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';

//Styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/ChicChatTabStyle';
import FastImage from 'react-native-fast-image';

const MoreTab = props => {
    return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../../assets/images/colored-bg.png')}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton>
                        <FastImage source={require('../../assets/icons/back-white.png')}
                                   resizeMode={'contain'}
                                   style={{width : 25 , height : 25}} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                        More
                    </Text>
                    <View style={{flexDirection : 'row'}}>
                        <BorderlessButton onPress={() => {props.navigation.navigate('notifications')}}>
                            <FastImage source={require('../../assets/icons/notification.png')}
                                       resizeMode={'contain'}
                                       style={{width : 25,height : 25}} />
                        </BorderlessButton>
                    </View>
                </View>
            </ImageBackground>
    </View>
};

export default MoreTab;
