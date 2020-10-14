import React from 'react';
import { Text, View, ImageBackground ,ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RectButton,  } from 'react-native-gesture-handler';

//Styles
import GeneralStyle from '../assets/styles/GeneralStyle';

const TAndC = props  => {

   return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../assets/images/colored-bg.png')}
                            resizeMode={'stretch'}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton onPress={()=>{props.navigation.goBack()}}>
                        <FastImage source={require('../assets/icons/back-white.png')} style={{width : 25 , height : 25}} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                        Terms and conditions
                    </Text>
                    <View></View>
                </View>
            </ImageBackground>
            <ScrollView
                style={{padding : 20}}
            >
                <Text
                    style={[GeneralStyle.grayText , {fontSize : 15 , lineHeight : 24}]}
                >
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
                <Text
                    style={[GeneralStyle.grayText , {fontSize : 15 , lineHeight : 24 ,marginTop : 10}]}
                >
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
    </View>
}
 
export default TAndC;
