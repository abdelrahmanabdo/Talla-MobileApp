import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

//Styles
import style from '../assets/styles/FavouritesStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';

const Calendar = props  => {

   return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../assets/images/colored-bg.png')}
                            style={style.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton onPress={()=>{props.navigation.goBack()}}>
                        <FastImage source={require('../assets/icons/back-white.png')} style={{width : 25 , height : 25}} />
                    </RectButton>
                    <Text style={style.headerText}>
                       Calendar
                    </Text>
                    <View style={{flexDirection : 'row'}}>
                        <BorderlessButton onPress={() => {props.navigation.navigate('notifications')}}>
                            <FastImage source={require('../assets/icons/filter.png')}
                                    style={{width : 25,height : 25}} />
                        </BorderlessButton>
                    </View>
                </View>
            </ImageBackground>
    </View>
}
 
export default Calendar;
