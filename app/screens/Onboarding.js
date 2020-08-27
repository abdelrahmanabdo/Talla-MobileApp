import React, { useState } from 'react';
import { Text, View, ImageBackground, StatusBar } from 'react-native';
import OnboardingStyle from '../assets/styles/OnboardingStyle';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import { RectButton } from 'react-native-gesture-handler';

import I18n from '../lang/I18n';

const Onboarding = ({...props}) => {
    const [isSkipClicked , setIsSkipCliked ] = useState(false);

    //On clikc skip handler
    const skipClickHandler = () => {
        !isSkipClicked ? setIsSkipCliked(true) : 
                         props.navigation.navigate('registration')
    }

    const FirstScreen = () => {
        return   <>
            <ImageBackground style={{flex:.65,position: 'relative',justifyContent:'flex-end'}} 
                         resizeMode="stretch"
                         source={require('../assets/images/onboarding-top-bg.png')}>
                    <Animatable.View animation="lightSpeedIn" duration={1600}>
                        <FastImage source={require('../assets/icons/logo.png')}
                                resizeMode="contain"
                                style={OnboardingStyle.logo}/>
                    </Animatable.View>

           </ImageBackground>
            <Animatable.View animation="bounceIn" 
                             duration={1500} 
                             style={OnboardingStyle.textContainer}>
                    <Text style={OnboardingStyle.largText}>
                        {I18n.t('welcomeLadies')}
                    </Text>
                    <Text style={[OnboardingStyle.mediumText ,{width : '90%',lineHeight:30} ]}>
                         {I18n.t('expectMoreFromClother')}
                    </Text>
                    <View style={OnboardingStyle.dotsContainer}>
                            <View style={[OnboardingStyle.dot, OnboardingStyle.active]}></View>
                            <View style={[OnboardingStyle.dot]}></View>
                    </View>
            </Animatable.View>
        </>
    }
    

    const SecondScreen = () => {
        return   <>
            <Animatable.View animation="lightSpeedIn" 
                             style={OnboardingStyle.secondImage}>
                <FastImage  style={{height:'100%',width:'100%'}} 
                            resizeMode="stretch"
                            source={require('../assets/images/onboarding-second-top-bg.png')} />
            </Animatable.View>
            <Animatable.View animation="bounceIn" 
                             duration={1500} 
                             style={OnboardingStyle.textContainer}>
                    <Text style={OnboardingStyle.largText}>
                        {I18n.t('tallahMatters')}
                    </Text>
                    <Text style={OnboardingStyle.mediumText}>
                        {I18n.t('organizedCloset')}
                    </Text>
                    <Text style={[OnboardingStyle.smallText ,{width : '80%',lineHeight:29} ]}>
                        " {I18n.t('taylorSwiftSay')} "
                    </Text>
                    <Text style={[OnboardingStyle.mediumText , {marginTop:10}]}>
                     {I18n.t('taylorSwift')}
                    </Text>
                    <View style={OnboardingStyle.dotsContainer}>
                            <View style={[OnboardingStyle.dot]}></View>
                            <View style={[OnboardingStyle.dot, OnboardingStyle.active]}></View>
                    </View>
            </Animatable.View>
        </>
    }



    return <View style={OnboardingStyle.container}>
       <StatusBar hidden />
        <ImageBackground style={OnboardingStyle.bgContainer} 
                         source={require('../assets/images/bg.png')}>
            
            {
                isSkipClicked ? 
                <SecondScreen />
                :
                <FirstScreen />
            }
            <RectButton style={OnboardingStyle.skipButton} 
                        onPress={()=>skipClickHandler()}>
                    <Text style={OnboardingStyle.skipButtonText}>
                         {I18n.t('skip')}
                    </Text>
            </RectButton>
        </ImageBackground>
    </View>
};

export default Onboarding;
