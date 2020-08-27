import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      flex:1,
      backgroundColor: "#FFF"
   },
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
   rowSpaceBetween : {
      flexDirection : "row",
      justifyContent: 'space-between',
      alignItems : "center"
   },
   columnSpaceBetween : {
      flexDirection : "column",
      justifyContent: 'space-between',
      alignItems : "center"
   },
   primaryText : {
      color : '#5D0D57',
      fontFamily:'Roboto'
   },
   primaryBoldText : {
      color : '#5D0D57',
      fontFamily:'Roboto-Bold'
   },
   SecondaryButton : {
      backgroundColor: '#D1AD67',
      width: '95%',
      borderRadius:10,
      padding: 15,
      alignSelf:'center',
      alignItems: 'center',
      justifyContent:'center'
   },
   SecondaryButtonText : {
      color: '#FFF',
      fontFamily : 'Roboto',
      fontSize : 17
   },
   blackBoldText : {
      color : '#000',
      fontFamily:'Roboto-Bold'
   },
   blackText : {
      color : '#000',
      fontFamily:'Roboto'
   }





});