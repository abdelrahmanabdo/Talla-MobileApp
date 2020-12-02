import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BaseButton, BorderlessButton } from 'react-native-gesture-handler';
import {Octagon , Circle,Hexagon, Triangle } from 'react-native-shape';

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
                            return <Pressable  key={index} 
                                                      onPress ={()=>{
                                                                     setSelectedColorIndex(index);
                                                                     props.onChange(item.id)
                                                                  }}>
                                       <View  style={[style.container,
                                                      {borderColor : index == selectedColorIndex ? item.hexa : 'transparent' ,
                                                       borderWidth : 1,
                                                       borderRadius : 20}]}>
                                                         {/* <Octagon color={item.color}   scale={.8}/> */}
                                                <Circle color={item.hexa}   scale={.8}/>
                                       </View>
                              </Pressable>
                        })
                    }
               </View>
            </View>
   
};

export default Color;
