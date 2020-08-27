import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      flex:1,
      padding : 20,
   },
   shareButton : {
      alignSelf : 'flex-end',
      marginBottom : 20
   }, 
   image : {
      width : '100%',
      height : height / 3.9,
      marginBottom : 15
   },

});