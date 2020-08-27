import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';


const {width , height} = Dimensions.get('window');

const Checkbox = ({...props}) => {
   const [isChecked , setIsChecked] = useState(props.isChecked  ?? false);


   const style = StyleSheet.create({
      container : {
         flexDirection:'column',
         width :28,
         height:28,
         alignSelf:'center',
         padding : 12,
         justifyContent:'center',
         backgroundColor: isChecked ? '#D1AD67' : '#FFF',
         borderRadius:8,
         marginHorizontal: 10
      },
      roundedContainer :{
         flexDirection:'column',
         width :28,
         height:28,
         alignSelf:'center',
         padding : 12,
         borderWidth : .5,
         borderColor: isChecked  ? '#D1AD67' : '#000',
         padding : 10,
         justifyContent:'center',
         backgroundColor: isChecked ? '#D1AD67' : '#FFF',
         borderRadius:14,
         marginHorizontal: 10
      },
      value:{
         color : isChecked ? '#D1AD67' : '#000',
         height:28,
         width:28,
         textAlign : 'center',
      },
      label : {
         color : isChecked  ? '#D1AD67' : '#000'
      }
   });

   useEffect(()=>{
   },[props.isChecked])

   return <View style={{flexDirection:'row',alignItems:'center'}}>
      {
         props.isRounded ?
            <RectButton onPress ={async()=>{
                                    await setIsChecked(!isChecked);
                                    props.onChange(!isChecked)
                                 }}
                   style={style.roundedContainer}>
            </RectButton>
            :
             <RectButton onPress ={async()=>{
                                    await setIsChecked(!isChecked);
                                    props.onChange(!isChecked)
                                 }}
                         style={style.container}>
             </RectButton>
      }

      {
         props.label && <Text style={style.label}>
            {props?.label}
         </Text>
      }
   </View>

};

export default Checkbox;
