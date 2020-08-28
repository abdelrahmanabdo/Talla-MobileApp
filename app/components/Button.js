import React from 'react';
import { Text, View, StyleSheet ,Pressable, Dimensions } from 'react-native';
import { RectButton ,BaseButton , BorderlessButton } from 'react-native-gesture-handler';
import { Button } from 'native-base';
import Ripples from 'react-ripples'


const {width , height} = Dimensions.get('window');

export default ({children ,...props}) => {

   const style = StyleSheet.create({
      container : {
         flexDirection:'column',
         alignSelf:'center',
         borderWidth : 0,
         marginVertical : 20,
         justifyContent:'center',
         backgroundColor: (props.bgColor || '#D1AD67') ,
         borderRadius:10,
         padding:20,
         overflow:'hidden'

      },
      label:{
         color : props.labelColor || '#000',
         textAlign : 'center',
         fontWeight:'700'
      }
   });

   return <>
   {
      props.isModal ?
         <Pressable  onPress ={props.onPress}
                     android_ripple={{color:  props?.labelColor || '#D1AD67'}}
                     style={[style.container,props.style]} >
            {
                  children ?
               { ...children }:
                  <Text style={style.label}>
                     {props.label ?? ''}
                  </Text>
               }
         </Pressable>
      :
      <BaseButton
              onPress ={props.onPress}
              style={[style.container,props.style]} >
         <View accessible>
            <Text style={style.label}>
               {props.label ?? ''}
            </Text>
         </View>
      </BaseButton>
   }
      

   </>

};

