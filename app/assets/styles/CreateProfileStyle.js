import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      backgroundColor: '#EAEAEA',
      flex:1,
   },
   header : {
      width : width,
      height : height / 6.2,
      flexDirection : 'column',
      justifyContent: 'center',
      backgroundColor: '#EAEAEA',
      alignItems: 'center',
      borderBottomLeftRadius : 20,
      borderBottomRightRadius : 20,
      overflow: 'hidden',
   },
   createProfileText : {
      color : '#FFF',
      fontSize : 19
   },
   stepsContainer:{
      width : width - 40,
      marginTop : 25,
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   stepsText :{
      color : "#FFF",
      fontSize : 16 , 
      textAlign:'center',
   },
   skipButton: {
   }, 
   skipText :{
      color : "#FFF",
      fontSize : 17,
      textDecorationLine : "underline"
   },
   stepsNumberContainer : {
      height : height / 9.5,
      width : width,
      backgroundColor: '#EAEAEA',
      justifyContent: 'center',
   },
   stepIcon: {
      flex:1,
      width : 30,
      height: 30
   },
   activeLine :{
      flex:1,
      height : .9 ,
      borderWidth:.4,
      borderColor : '#5D0D57',
      opacity:.5
   },
   inActiveLine:{
      flex:1,
      height : .9 ,
      borderWidth:.5,
      borderColor : '#BEBBBB',
      opacity:.5
   },
   stepProcessContainer : {
      flex:1,
      height : height ,
      width : width,
      padding: 10,
      backgroundColor: '#FFF',
   },
   //Step One
   stepHeaderText  : {
      color : "#5D0D57",
      fontSize : 18
   },
   note :{
      marginVertical : 20,
      textAlign : 'center'
   },
   uploadPictureButton:{
      alignSelf : 'center',
      backgroundColor: '#5D0D57',
      width : 140 ,
      height : 140 ,
      borderRadius : 70,
      justifyContent: 'center',
      alignItems: 'center',
   },
   //Step Two
   stepTwo : {

   }


});