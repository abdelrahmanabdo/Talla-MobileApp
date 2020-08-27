import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { RectButton ,BaseButton , BorderlessButton } from 'react-native-gesture-handler';


const {width , height} = Dimensions.get('window');

export default ({...props}) => {

   const style = StyleSheet.create({
      container : {
         flexDirection:'column',
         width : width - 80,
         alignSelf:'center',
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

   return <RectButton
              onPress ={props.onPress}
              style={[style.container,props.style]}
           >
         <View accessible>
            <Text style={style.label}>
               {props.label ?? ''}
            </Text>
         </View>
      </RectButton>
};

