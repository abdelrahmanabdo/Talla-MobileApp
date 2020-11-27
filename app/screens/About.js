import React from 'react';
import { Text, View, ImageBackground, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';

//Styles
import style from '../assets/styles/AboutStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';

const About = props  => {

   return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../assets/images/colored-bg.png')}
                            resizeMode={'stretch'}
                            style={style.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton onPress={()=>{props.navigation.goBack()}}>
                        <FastImage source={require('../assets/icons/back-white.png')} style={{width : 25 , height : 25}} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                        About us
                    </Text>
                    <View >
                    </View>
                </View>
            </ImageBackground>
            <SafeAreaView style={{flex:1,}}>
                <FastImage source={require('../assets/images/about-us-image.png')}
                                resizeMode={'stretch'}
                                style={style.bgImage} />
                <ScrollView showsVerticalScrollIndicator={false} 
                            style={style.blocksContainer}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={[style.grayContainer,{marginEnd : 10}]}>
                            <Text style={[style.sectionTitle]}>
                                Our Mission
                            </Text>
                            <Text style={[style.sectionText]}>
                            Proposing new fashion solutions through virtual closet organizing, shopping and professional advisory. We are keen on leading the virtual fashion experience to minimize the time, effort and cost barriers.  
                            </Text>
                        </View>
                        <View style={style.grayContainer}>
                            <Text style={[style.sectionTitle]}>
                                Our Mission
                            </Text>
                            <Text style={[style.sectionText]}>
                            Expanding our customized fashion solutions and tools through virtual formats to provide sustainable and leading existence in the fashion and styling theme while maintaining the trendiest and most appealing looks for our clients.   
                            </Text>
                        </View>
                    </View>

                    <View style={[style.grayContainer]}>
                            <Text style={[style.sectionTitle]}>
                               Read more about us
                            </Text>
                            <Text style={[style.sectionText]}>
                            TALLAH is your one-stop online platform for styling. We introduce the easiest walkthrough for your perfect looks everywhere and every day. In a few simple clicks, you will have the chance to re-organize your own closet and see the magic within. Unlimited options with ultimate looks. Moreover, you will have the chance to book consultations from reputable and professional experts who will give you the best fashion advice that suits your body type and event. 
                            </Text>
                    </View>

                    <View style={[style.grayContainer]}>
                            <Text style={[style.sectionTitle]}>
                                Closet
                            </Text>
                            <Text style={[style.sectionText]}>
                                <Text style={[style.sectionText]}>Organize your closet in a few steps </Text>
                                  <Text style={[style.sectionText]}>   1 - Start by taking pics of your favorite items in your closet. </Text>
                                  <Text style={[style.sectionText]}>   2 - Add your items to the closet section. </Text>
                                  <Text style={[style.sectionText]}> 3 - Mix & match items to create new looks. </Text>

                            </Text>
                    </View>

                    <View style={[style.grayContainer,{marginBottom : 25} ]}>
                            <Text style={[style.sectionTitle]}>
                                Stylist Consultation
                            </Text>
                            <Text style={[style.sectionText]}>
                                If you have a certain occasion, event or want professional fashion tips.
                                1 - Go to the stylists’ section. 
                                2 - Check out wide variety of stylists. 
                                3 - Choose the most suitable stylist and book a date on your calendar. 
                            </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
    </View>
}
 
export default About;
