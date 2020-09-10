import React from 'react';
import { Text, View, ImageBackground  , StatusBar} from 'react-native';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';

//Styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/StylistTabStyle';

//Components
import FastImage from 'react-native-fast-image';
import Button from '../../components/Button';

const StylistTab = props => {


    
    return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../../assets/images/colored-bg.png')}
                             style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton>
                        <FastImage source={require('../../assets/icons/small-logo-white.png')}
                                   style={{width : 35 , height : 35}}
                                   resizeMode={'contain'} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                        Stylist
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
            <View style={[style.container]}>
                <RectButton style={style.shareButton} >
                    <FastImage source={require('../../assets/icons/share-colored.png')}
                               resizeMode={'contain'}
                               style={{width : 26 , height : 27}} />
                </RectButton>
                <FastImage source={require('../../assets/images/stylist-image.png')} 
                           resizeMode={'stretch'}
                           style={style.image} />
                <Text style={[GeneralStyle.blackBoldText, {marginBottom : 8,fontSize : 17}]}>
                  Book your Stylist now.
                </Text>
                <Text style={[GeneralStyle.blackText, {marginBottom : 5,fontSize : 13}]}>
                   Get your tailored online advice from one of our 
                    experienced consultants and enjoy confident 
                    possibilities & celebs look.
                </Text>
            </View>
                    <Button label ={'Next'}
                            labelColor = {'#FFF'}
                            onPress={()=>{}}
                            style={{width : '90%',padding :15,marginBottom : 30}}
                        />
    </View>
};

export default StylistTab;
