import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import GeneralStyle from '../../assets/styles/GeneralStyle';

import I18n from '../../lang/I18n';
import style from '../../assets/styles/ProfileStyle';
import FastImage from 'react-native-fast-image';
import { RectButton, ScrollView, BorderlessButton } from 'react-native-gesture-handler';

//
import Button from '../../components/Button';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

const Profile = ({...props}) => {
   const user = useSelector(state => state.user.user);
   const [data, setData ] = useState({});

   /**
      * Get Current User Profile
      */
   const getUserProfile = () => {
      api  
         .get(endpoints.profile + '/' + user.profile.id)
         .then(res => setData(res.data.data))
   }

   useEffect(() => {
      getUserProfile();

      return () => {}
   },[])

    return <View style={[GeneralStyle.container,{flex:1,backgroundColor: "#FFF"}]}>
       <StatusBar hidden />
       <ImageBackground source={require('../../assets/images/header-bg.png')}
                        style={[GeneralStyle.header,
                               {flexDirection : 'row',justifyContent:'space-between',padding  :10 }]}>
            <BorderlessButton onPress={()=>{props.navigation.goBack()}}
                              style={{flex:1}}>
               <FastImage source={require('../../assets/icons/back-white.png')}
                          style={{width : 25 , height:25}}
                          resizeMode={'contain'}
               />
            </BorderlessButton>
            <Text style={[GeneralStyle.headerText,{flex:1,textAlign:'center'}]}>
               {I18n.t('profile')}
            </Text>
            <View style={{flex:1}}></View>
       </ImageBackground>
       <View style={{flex:1,}}>
         <ImageBackground source={data.avatar ? {uri: data.avatar} : require('../../assets/images/profile-default.png')}
                          resizeMode={'stretch'}
                          style={style.bgImage}>
            <Text style={style.name}>
               {data.user?.name}
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
                  {I18n.t('name')} : {data.user?.name}
            </Text>
            <Text style={[style.rowInfo]}>
                  {I18n.t('mobile')} : {data?.phone}
            </Text>
            <Text style={[style.rowInfo]}>
                  {I18n.t('country')} : {data.country?.name_en}
            </Text>
            <Text style={[style.rowInfo]}>
                  {I18n.t('city')} : {data.city?.name_en}
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
                  {I18n.t('bodyShape')} :  {data.body_shape?.title}
            </Text>
            <Text style={[style.rowInfo]}>
                  {I18n.t('undertoneColors')} : {data.skin_glow?.title}
            </Text>
            <Text style={[style.rowInfo]}>
                  {I18n.t('youAre')} : {data.jobs?.title}
            </Text>
            <Text style={[style.rowInfo]}>
                  {I18n.t('yourGoal')} : {data.goals?.title}
            </Text>
            <Text style={[style.rowInfo]}>
                  {I18n.t('yourStyle')} : {data.favourite_styles?.title}
            </Text>
         </View>
         <Button style={{width : '95%'}}
                 onPress={()=>{props.navigation.navigate('Home')}} 
                 label={'Go To Home'}
                 labelColor={'#FFF'}/>
         </ScrollView>
       </View>

    </View>
};

export default Profile;
