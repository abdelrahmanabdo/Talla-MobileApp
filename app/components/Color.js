import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Octagon } from 'react-native-shape';

const Color = ({...props}) => {
   const [isClicked , setIsClicked] = useState(props.isClicked  ?? false);
   const [selectedColorIndex , setSelectedColorIndex] = useState('');

   const style = StyleSheet.create({
      rowContainer : {
         width : '90%',
         alignSelf:'center'
      },
      container: {
         marginStart : 15,
         marginEnd : 15,
      },
      label :{
         fontSize : 18,
         fontFamily : 'Roboto',
         color :'#000'
      }
   });

   useEffect(()=>{
   },[])

   return   <View>
               <Text style={style.label}>
                     Color
               </Text>
               <View style={{flexDirection:'row',justifyContent:'flex-start',    
                             marginVertical : 15,alignItems:'center',flexWrap : 'wrap'}}>
                    {  
                        props.colors.map((item , index) => {
                            return <BorderlessButton onPress ={()=>{
                                                                     setSelectedColorIndex(index);
                                                                     props.onChange(item.id)
                                                                  }}
                                                            style={[style.container,
                                                                   {borderColor : index == selectedColorIndex ? item.color : 'transparent' , borderWidth : 1}]}>
                                             <Octagon color={item.color}   scale={.8}/>
                                    </BorderlessButton>
                        })
                    }
               </View>
            </View>
   
};

export default Color;
