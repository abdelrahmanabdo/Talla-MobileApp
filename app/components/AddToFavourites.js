import React, { useState, useRef } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';

const AddToFavourites = ({item,isGold , iconSize}) => {
   const [isFavourited , setIsFavourited] = useState(false);
   const favoruitesItem = useRef();

   const size = {width : iconSize == 'big' ? 29 : 23, height : iconSize == 'big' ?  29 : 23};

   /**
    * Favoruite item
    */
   const makeFavorited = () => {
      setIsFavourited(prev => !prev)
   }

   return <BorderlessButton onPress={()=>{makeFavorited()}}>
      {
         isFavourited ?
               <Animatable.View animation={'pulse'} iterationCount={2}>
                  <FastImage  source={require('../assets/icons/heart-red.png')}
                              resizeMode={'contain'}
                              style={size}  />
               </Animatable.View>
               :
               isGold ?
               <Animatable.View animation={'fadeIn'}>
                  <FastImage   source={require('../assets/icons/secondary-heart.png')}
                               resizeMode={'contain'}
                               style={size}  />   
               </Animatable.View>
               :              
               <Animatable.View animation={'fadeIn'} duration={500}>
                  <FastImage   source={require('../assets/icons/heart.png')}
                               resizeMode={'contain'}
                               style={size}  />   
               </Animatable.View>

      }
   </BorderlessButton>
};
  

export default AddToFavourites;
