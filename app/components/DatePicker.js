import React, { useState, useEffect } from 'react';
import { Text, View  ,  StyleSheet , Dimensions, I18nManager ,TouchableOpacity ,ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import I18n from '../lang/I18n';
import DatePicker from 'react-native-datepicker'

const {width , height} = Dimensions.get('screen');

const Datepicker = ({...props}) => {
      const [selectedValue , setSelectedValue] = useState('');

      useEffect(()=>{
         setSelectedValue(selectedValue)
      },[])

      
      return   <View  style={{marginVertical : 7}}> 
            <Animatable.View style={Style.container}>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                     {
                        props.name &&
                        <Text style={[Style.placeholerText,{fontWeight : '700'}]}>
                           {props.name}
                        </Text>                     
                     }
                  </View>
                  <DatePicker
                        style={{width : '100%' , marginTop : 15  }}
                        mode="date"
                        date={selectedValue}
                        placeholder={I18n.t('selectYourBirthDate')}
                        format="DD-MM-YYYY"
                        minDate="01-01-1970"
                        maxDate="01-01-2013"
                        confirmBtnText={I18n.t('confirm')}
                        cancelBtnText={I18n.t('cancel')}
                        customStyles={{
                        dateIcon: {
                           position: 'absolute',
                           right: 5,
                           top: 4,
                           marginLeft: 0
                        },
                        dateInput: {
                           borderRadius : 8,
                           width : width - 30,
                           justifyContent:'center',
                           alignItems:'center',
                           height: 50,
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        iconSource={require('../assets/icons/calendar.png')}
                        onDateChange={(date) =>{setSelectedValue(date);props.onChangeValue(date);}}

                     />
                     
               </Animatable.View>
         </View>
};

const Style = StyleSheet.create({
   container : {
      width : width - 40,
      borderRadius:7,
      alignSelf:'center',
      padding : 5,
      backgroundColor:'#FFF',
   },
   itemText : {
      alignSelf: 'flex-start' ,
      color: '#5D0D57',
      fontFamily : "Roboto",
      fontSize: 16,
      marginVertical : 14,
   },
   placeholerText : {
      color: '#5D0D57',
      fontFamily : "Roboto",
      fontSize: 14,
   },
   dropdown: {
      backgroundColor:'#FFF',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      width: '100%',
      padding:15,
      borderWidth : 1.25 ,
      borderColor:'#CCC',
      maxHeight: height /2,
      marginTop : 8,
      borderRadius : 8
   }
});

export default Datepicker;