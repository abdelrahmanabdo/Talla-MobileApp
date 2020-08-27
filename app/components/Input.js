import React from 'react';
import { Text, View ,TextInput ,  StyleSheet , Dimensions, I18nManager} from 'react-native';
import { Textarea } from 'native-base';
import * as Animatable from 'react-native-animatable';

const {width , height} = Dimensions.get('window');

const Input = ({ ...props }) => {
   
   const Style = StyleSheet.create({
      container : {
         flexDirection:'column',
         width : width - 40,
         alignSelf:'center',
         marginVertical : 7,
         padding : 5,
         alignItems:'flex-start',
         justifyContent:'flex-start',
      },

      required:{
         color : "#F90909",
         fontSize:16
      },
      placeholerText : {
         color: props.placeholderColor || '#000',
         fontFamily : "Roboto",
         fontSize: 13,
      },
      input:{
         borderRadius:7,
         backgroundColor:'#FFF',
         width:'100%',
         marginTop:8,
         padding:13,
         borderWidth : 1,
         borderColor : '#C9C9C9',
         color : props.placeholderColor || '#000',
         textAlign : I18nManager.isRTL ? 'right' : 'left',
      }
   });


   return <Animatable.View animation={'pulse'}  
                           style={Style.container}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
                     {
                        props.required &&
                        <Text style={Style.required}>*</Text>
                     }
                     {
                        props.name &&
                        <Text style={[Style.placeholerText,{fontWeight : '700'}]}>
                           {props.name}
                        </Text>                     
                     }
        </View>
        {
                     props.isTextarea ?
                     <Textarea
                        autoFocus={props.autoFocus}
                        rowSpan={props.rowsCount ?? 7}
                        style={Style.input}
                        defaultValue={props.defaultValue}
                        onChangeText={props.onChangeText}
                        placeholder={props.placeholerText}
                        placeholderTextColor={props.placeholderColor || '#000'}
                        secureTextEntry={props.password}
                        keyboardType={props.isNumeric ? 'number-pad' : 'default'}
                      />
                  :                  
                     <TextInput
                        style={[Style.input]}
                        autoFocus={props.autoFocus}
                        onChangeText={props.onChangeText}
                        placeholder={props.placeholerText}
                        defaultValue={props.defaultValue}
                        placeholderTextColor={props.placeholderColor}
                        secureTextEntry={props.password}
                        keyboardType={props.isNumeric ? 'number-pad' : 'default'}
                     />
         }
    </Animatable.View>
    
};

export default Input;

