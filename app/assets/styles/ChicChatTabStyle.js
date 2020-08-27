import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   header : {
      width : width,
      height : height / 7,
      flexDirection : 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EAEAEA',
      borderBottomLeftRadius : 20,
      borderBottomRightRadius : 20,
      overflow: 'hidden',
   },
   headerText : {
      color : '#FFF',
      fontSize : 19,
      fontFamily : 'Roboto-Medium'
   },

});