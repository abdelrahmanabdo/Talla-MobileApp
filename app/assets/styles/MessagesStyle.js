import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default  style = StyleSheet.create({
   container : {
      flex:1 , 
      width : width ,
      alignSelf: 'center',
      backgroundColor: '#FFF',
   },
   chatContainer : {
      width : width ,
      flexDirection : 'row' ,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 13 ,
      borderBottomWidth : 1,
      borderBottomColor : '#CCC'      
   },
   chatDetailsContainer :{
      flex:4,
      flexDirection : 'column',
      justifyContent: 'space-between',
   }, 
   searchContainer : {
      width : width ,
      borderBottomWidth :.5,
      flexDirection : 'row',
      alignItems: 'center',
      borderBottomColor : '#Ccc',
      padding: 20,
   },
   messageContainer : {
      paddingHorizontal: 10,
      paddingVertical : 20,
      flexDirection : 'row',
      justifyContent: 'center',
   },
   messageDetailsContainer :{
      padding: 10,
      borderRadius : 8 ,
      justifyContent: 'center',
      alignItems: 'center',
      margin : 6,
   },
   actionsContainer :{
      backgroundColor: '#012647',
      height : height * .09,
      flexDirection : 'row',
      justifyContent:'flex-start',
      alignItems:'center'
   }
})