import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container :{
      flex:1,
      alignItems : 'flex-start',
      justifyContent: 'flex-start',
   },
   bgContainer : {
      height : height,
      width : width,
      padding: 20,

   },
   headerText : {
      color : '#DCB77C',
      fontSize :29,
      alignSelf:'flex-start',
      fontFamily :"Luminari-Regular",
      marginBottom : 15
   },
   rowContainer : {
      marginStart : 20,
      flexDirection:'row' , 
      alignItems:'center' ,
      marginVertical:5
   },
   whiteMediumText :{
      color : "#FFF",
      fontSize:16 , 
      fontWeight:'700' 
   }, 
   whiteSmallText :{
      color : "#FFF" ,
      marginEnd:10 , 
      fontSize:13,
      fontWeight:'200'
   },
   termsText :{
      color : '#FFF',
      textDecorationLine :'underline'
   }
})