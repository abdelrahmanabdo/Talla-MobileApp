import React, { useState } from 'react';
import { Text, View, ImageBackground, StatusBar, FlatList , ScrollView, Dimensions } from 'react-native';
import { RectButton, BorderlessButton, BaseButton } from 'react-native-gesture-handler';

//Styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/stylistListStyle';
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width ;

const StylistsList = props => {
   const [featuredStylists , setFeaturedStylists ] = useState([
      {
          id : 1 ,
          name : 'stylist 1' ,
          avatar : '' ,
          sessions : 3 ,
          rating : 3.4 ,
          location : 'Cairo , Egypt'
      },
      {
          id : 2 ,
          name : 'stylist 2'  ,
          avatar : '' ,
          sessions : 3 ,
          rating : 2.6 ,
          location : 'Cairo , Egypt' 
      },
      {
          id : 3 ,
          name : 'stylist 3'  ,
          avatar : '' ,
          sessions : 3 ,
          rating : 2.1 ,
          location : 'Cairo , Egypt'
      },
      {
          id : 4 ,
          name : 'stylist 4'  ,
          avatar : '' ,
          sessions : 5 ,
          rating : 3.9 ,
          location : 'Cairo , Egypt'
      },
      {
         id : 5 ,
         name : 'stylist 5'  ,
         avatar : '' ,
         sessions : 2 ,
         rating : 3.4 ,
         location : 'Cairo , Egypt'
     },
     {
         id : 6 ,
         name : 'stylist 6'  ,
         avatar : '' ,
         sessions : 1 ,
         rating : 4.2 ,
         location : 'Cairo , Egypt'
     },

  ]);

  const [stylists , setStylists ] = useState([
      {
         id : 1 ,
         name : 'stylist 1' ,
         avatar : '' ,
         sessions : 3 ,
         rating : 3.4 ,
         location : 'Cairo , Egypt'
     },
     {
         id : 2 ,
         name : 'stylist 2'  ,
         avatar : '' ,
         sessions : 3 ,
         rating : 2.6 ,
         location : 'Cairo , Egypt' 
     },
     {
         id : 3 ,
         name : 'stylist 3'  ,
         avatar : '' ,
         sessions : 3 ,
         rating : 2.1 ,
         location : 'Cairo , Egypt'
     },
     {
         id : 4 ,
         name : 'stylist 4'  ,
         avatar : '' ,
         sessions : 5 ,
         rating : 3.9 ,
         location : 'Cairo , Egypt'
     },
     {
        id : 5 ,
        name : 'stylist 5'  ,
        avatar : '' ,
        sessions : 2 ,
        rating : 3.4 ,
        location : 'Cairo , Egypt'
    },
    {
        id : 6 ,
        name : 'stylist 6'  ,
        avatar : '' ,
        sessions : 1 ,
        rating : 4.2 ,
        location : 'Cairo , Egypt'
    },   
  ]);

  /**
   * Render featured stylists list
   */
  const renderFeaturedStylist = ({item}) => {
     return <RectButton onPress={()=> {}}
                        style={{width : width * .19,marginHorizontal:5}}>
         <FastImage source={require('../../assets/icons/default-avatar.png')} 
                  style={{width : 55 , height : 55 , borderRadius : 18}} />
         <Text style={[GeneralStyle.blackText,{marginTop : 5}]} 
               numberOfLines={2}>
            {item.name}
         </Text>
     </RectButton>
  }

  /**
   * Render featured stylists list
   */
  const renderStylist = ({item}) => {
     return <BaseButton onPress={()=> {props.navigation.navigate('stylistDetails')}}
                        style={[style.stylistBox]}>
         <View style={{flex:1}}>

         </View>
         <View style={{flex:2}}>
            <View style={[GeneralStyle.rowSpaceBetween,{marginBottom : 8}]}>
               <View style={[GeneralStyle.row , {alignItems:'center'}]}>
                  <FastImage source={require('../../assets/icons/default-avatar.png')} 
                             style={{width : 35 , height : 35 , borderRadius : 18 , marginEnd : 10}} />
                  <View>
                     <Text style={[GeneralStyle.blackText,{marginTop : 5}]} 
                           numberOfLines={1}>
                        {item.name}
                     </Text>
                     {/* <Text style={[GeneralStyle.blackText,{marginTop : 5 , color : '#BBB'}]} >
                     {item.sessions} Session
                     </Text> */}
                  </View>
               </View>
               <View>
                  <Text style={[GeneralStyle.blackText,{marginTop : 5 ,alignItems:'center' , color : '#D1AD67'}]}>
                    <FastImage source={require('../../assets/icons/rating-star.png')} 
                               resizeMode={'contain'}
                               style={{width : 15 , height : 15 , marginEnd : 5}}/> 
                     {item.rating}
                  </Text>
                  <Text style={[GeneralStyle.blackText,{marginTop : 5 , fontSize : 13}]} 
                     numberOfLines={1}>
                   {item.location} 
                  </Text>
               </View>
            </View>
            <Text style={[GeneralStyle.blackText]}>
               Lorem ipsum dolor sit amet,
               consect etur adipisicing elit, 
               sed do
            </Text>
         </View>
     </BaseButton>
  }

   return  <View style={[GeneralStyle.container]}>
         <StatusBar hidden={false}  barStyle={'light-content'}  backgroundColor={'#012647'}/>
      <ImageBackground source={require('../../assets/images/colored-bg.png')}
                        style={GeneralStyle.header}>
            <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
               <RectButton>
                  <FastImage source={require('../../assets/icons/small-logo-white.png')}
                              resizeMode={'contain'}
                              style={{width : 35 , height : 35}} />
               </RectButton>
               <Text style={GeneralStyle.headerText}>
                  Stylists
               </Text>
               <View style={{flexDirection : 'row'}}>
                  <BorderlessButton onPress={() => {props.navigation.navigate('notifications')}}>
                        <FastImage source={require('../../assets/icons/notification.png')}  
                                 resizeMode={'contain'}
                                 style={{width : 25,height : 25}} />
                  </BorderlessButton>
                  <BorderlessButton onPress={() => {props.navigation.navigate('profile')}}>
                        <FastImage source={require('../../assets/images/girl.png')}
                              resizeMode={'contain'}
                              style={{width : 30,height :  30 , marginStart : 14}} />
                  </BorderlessButton>
               </View>
            </View>
      </ImageBackground>
      <View style={[GeneralStyle.rowSpaceBetween,{padding:15}]}>
         <BorderlessButton 
            style={[GeneralStyle.SecondaryButton]}
            onPress={() => props.navigation.navigate('stylistRequestIntro')}
         >
            <Text style={[GeneralStyle.SecondaryButtonText]}>
               Be a Stylist
            </Text>
         </BorderlessButton>
         <View style={[GeneralStyle.row]}>
            <BaseButton style={{marginEnd : 20}}>
               <FastImage source={require('../../assets/icons/search.png')} style={{width : 20 , height : 20}}/>
            </BaseButton>
            <BaseButton>
            <Text style={[GeneralStyle.goldText, {fontSize : 17}]}>
                  Filter
               </Text>
             </BaseButton>
         </View>
      </View>
      <View style={[style.grayContainer]}>
         <Text style={[GeneralStyle.primaryText , {textAlign :'center',fontSize:18,fontWeight : '500'}]}>
            Highest rating
         </Text>
         <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={featuredStylists}
            style={{backgroundColor: '#F8F8F8', paddingVertical : 10}}
            keyExtractor={(item,index) => index.toString()}
            renderItem={renderFeaturedStylist}
         />
      </View>
      <FlatList 
            showsVerticalScrollIndicator={false}
            data={stylists}
            style={{padding : 10}}
            keyExtractor={(item,index) => index.toString()}
            renderItem={renderStylist}
         />
  </View>


}
export default StylistsList;
