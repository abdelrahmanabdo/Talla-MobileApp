import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({

   header : {
      width : width,
      padding : 25,
      flexDirection:'row',
      justifyContent: 'space-between',
      backgroundColor: '#FFF',
      alignItems: 'center',
      borderBottomLeftRadius : 15,
      borderBottomRightRadius : 15,
      overflow: 'hidden',
   },
   headerText : {
      color : '#FFF',
      fontSize : 19,
      marginStart : 10
   },
   moreContainer : {
      flex:1,
      padding : 20 ,
   },
   topSection : {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
   },
   avatar : {
      width  :100 ,
      height:height * 0.1,
      borderRadius : 50,
      marginBottom : 3,
      justifyContent:'flex-end'
   },
   listSection : {
      flex:2
   },
   itemContainer:{
      width : width - 40,
      flexDirection:'row',
      justifyContent:'space-between',
      alignSelf:'center',
      backgroundColor : '#F8F8F8',
      padding : 13,
      borderRadius : 20,
      marginBottom : 13
   }, 
   itemText : {
      color : '#707070',
      fontSize : 17,
      fontFamily : 'Roboto'
   },
   infoText: {
      color : '#161A28',
      fontFamily : "Roboto",
      fontSize : 14,
      marginTop :2
   } ,   
   line :{
      borderWidth : 1,
      borderColor : '#F8F8F8',
      marginVertical : 13
   },
   beStylistButton : {
      alignSelf:'center',
      marginTop : 15
   },
   beStylistButtonText :{
      color : '#D1AD67',
      fontSize : 22,
      fontFamily : 'Roboto-Bold'
   }

});