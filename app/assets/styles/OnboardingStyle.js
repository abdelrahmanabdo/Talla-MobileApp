import {StyleSheet, Dimensions, I18nManager } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default  style = StyleSheet.create({
   container :{
      flex:1,

   },
   bgContainer : {
      flex:1,
      height : height,
      width : width,
   },
   logo : {
       height:220 ,
       height:220,
       bottom:0
   },
   secondImage : {
      flex:.65,
      marginTop:-80,
      marginRight : I18nManager.isRTL ? 0 : -160,
      marginLeft : I18nManager.isRTL ? -160 : 0
   },
   textContainer : {
      flex:.3,
      alignItems:'center',
      padding:15, 
      justifyContent:'space-between'
   },
   largText :{
       flex:1,
       fontFamily :"Luminari-Regular", 
       color : '#D1AD67' , 
       fontSize:27 ,
       textAlign:'center'
   },
   mediumText :{
      flex:1,
      color : '#D1AD67' , 
      fontSize:19 ,
      textAlign:'center'
   },
   smallText: {
      flex:1,
      color : '#D1AD67' , 
      fontSize:17 ,
      textAlign:'center'
   },
   dotsContainer : {
       flex:1 ,
       flexDirection:'row',

   },
   dot : {
      width:10,
      height:10,
      borderRadius : 5,
      backgroundColor: '#FFF',
      marginHorizontal:10
   },
   active :{
      width:10,
      height:10,
      borderRadius : 5,
      backgroundColor: '#2699FB',
   },
   skipButton :{
      alignSelf:I18nManager.isRTL ? 'flex-start' : 'flex-end' ,
      marginHorizontal:30
   },
   skipButtonText :{
      textDecorationLine:'underline' ,
      color : '#D1AD67' , 
      fontSize:20
   }
})