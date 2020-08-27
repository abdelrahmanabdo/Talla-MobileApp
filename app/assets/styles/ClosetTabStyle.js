import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   header : {
      width : width,
      height : height / 5.6,
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
      fontSize : 19
   },
   seasonButtons : {
      width : '90%',
      flexDirection:'row',
      marginTop : 20,
      overflow:'hidden',
      backgroundColor: 'red',
   },
   seasonButton : {
      flex:1,
      justifyContent : 'center',
      alignItems:'center',
      padding : 10,
   },
   seasonButtonText : {
      color: '#D1AD67'
   },
   giftContainer : {
      width : '90%',
      alignSelf:'center',
      marginVertical:10,
      padding : 15,
      borderRadius : 10,
      backgroundColor: '#F8F8F8',
      flexDirection : 'row',
   },
   categoriesRow :{
      width : width,
      marginBottom: 20
   }, 
   categoryContainer : {
      width : width / 4.8 ,
      alignItems:'center',
      justifyContent:'space-between'
   },
   categoryBox: {
      borderWidth : 1.3 ,
      borderColor : '#000',
      padding : 10,
      paddingHorizontal : 20,
      borderRadius : 8,
      justifyContent:'center',
      alignItems:'center'
   },
   categoryName :{
      color : '#D1AD67'
   },
   closetItemsListContainer :{
      flex:1,
      width : width - 20,
      alignSelf:'center',
   }

});