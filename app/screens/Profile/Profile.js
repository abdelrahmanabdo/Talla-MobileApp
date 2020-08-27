import React from 'react';
import { Text, View, ImageBackground } from 'react-native';

import GeneralStyle from '../../assets/styles/GeneralStyle';

import I18n from '../../lang/I18n';
import style from '../../assets/styles/ProfileStyle';
import FastImage from 'react-native-fast-image';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

//
import Button from '../../components/Button';

const Profile = ({...props}) => {
    return <View style={[GeneralStyle.container,{flex:1,backgroundColor: "#FFF"}]}>
       <ImageBackground source={require('../../assets/images/header-bg.png')}
                        style={style.header}>
            <RectButton onPress={()=>{props.navigation.goBack()}}>
               <FastImage source={require('../../assets/icons/back-white.png')}
                          style={{width : 25 , height:25}}
                          resizeMode={'contain'}
               />
            </RectButton>
            <Text style={style.headerText}>
               {I18n.t('profile')}
            </Text>
       </ImageBackground>
       <View style={{flex:1,}}>
         <ImageBackground source={require('../../assets/images/profile-default.png')}
                          resizeMode={'stretch'}
                          style={style.bgImage}>
            <Text style={style.name}>
               #name
            </Text>
            <RectButton style={style.uploadImageButton}>
               <FastImage source={require('../../assets/images/change-profile-image.png')}
                          style={style.uploadImage}
               />
            </RectButton>
         </ImageBackground>
         <ScrollView showsVerticalScrollIndicator={false} >
         <View style={style.grayContainer}>
            <View style={GeneralStyle.rowSpaceBetween}>
               <Text style={[style.sectionTitle]}>
                  {I18n.t('personalInfo')}
               </Text>
               <RectButton>
                  <FastImage source={require('../../assets/icons/edit.png')}
                             style={{width:20,height:20}}
                  />
               </RectButton>
            </View>
            <Text style={[style.rowInfo]}>
                  {I18n.t('name')} : dalia
            </Text>
            <Text style={[style.rowInfo]}>
                  {I18n.t('mobile')} : 010105252
            </Text>
            <Text style={[style.rowInfo]}>
                  {I18n.t('country')} : Egypt
            </Text>
            <Text style={[style.rowInfo]}>
                  {I18n.t('city')} : Cairo
            </Text>
         </View>
         <View style={style.grayContainer}>
            <View style={GeneralStyle.rowSpaceBetween}>
               <Text style={[style.sectionTitle]}>
                 {I18n.t('personalInfo')}
               </Text>
               <RectButton>
                  <FastImage source={require('../../assets/icons/edit.png')}
                             style={{width:20,height:20}}
                  />
               </RectButton>
            </View>
            <Text style={[style.rowInfo]}>
                  {I18n.t('bodyShape')} :  fafafafa
            </Text>
            <Text style={[style.rowInfo]}>
                  {I18n.t('undertoneColors')} : fafafafa
            </Text>
            <Text style={[style.rowInfo]}>
                  {I18n.t('youAre')} : fafafafa
            </Text>
            <Text style={[style.rowInfo]}>
                  {I18n.t('yourGoal')} : fafafafa
            </Text>
            <Text style={[style.rowInfo]}>
                  {I18n.t('yourStyle')} : fafafafa
            </Text>
         </View>
         <Button onPress={()=>{props.navigation.navigate('Home')}} 
               label={'Go To Home'}/>
         </ScrollView>
       </View>

    </View>
};

export default Profile;
