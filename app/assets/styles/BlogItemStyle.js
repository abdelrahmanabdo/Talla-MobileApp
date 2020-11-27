import {StyleSheet, Dimensions , Platform} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      flex:1,
      backgroundColor: '#FFF',
   },
   postButton : {
      backgroundColor: '#D1AD67',
      paddingVertical : 10 ,
      paddingHorizontal : 35,
      borderRadius : 15
   },
   postButtonText : {
      color : "#FFF",
      fontSize : 15,
      fontFamily : "Roboto"
   },
   userInfoContainer : {
      paddingVertical : 15,
      alignItems:'center',
      justifyContent : 'center',

   },
   userInfoBox :{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingHorizontal  : 20,
      borderWidth : .3,
      borderColor : '#707070',
      paddingVertical  : 10,
      borderRadius : 40,
      // shadowColor : '#707070',
      // shadowOpacity : 1,
      // shadowRadius : 1,
      // shadowOffset : {
      //    width : 1,
      //    height : 1
      // },

   },
   followButton :{
      backgroundColor: '#012647',
      paddingHorizontal : 15,
      paddingVertical : 5,
      borderRadius : 10
   },
   followButtonText :{
      color : "#FFF",
      fontSize : 13
   },
   blogContentContainer :{
      width:width ,
      height: height * .45,
      backgroundColor: '#CCC',
      justifyContent:'space-between',
      alignItems:'flex-start',
      padding:  10,
   },
   blogText :{
      alignSelf:'flex-end'
   },
   commentsContainer: {
      flex:1,  
      paddingVertical : 8,
      paddingHorizontal : 15
   },
   commentContainer :{
      width : width,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginVertical :10   
   },
   newCommentContainer :{
      width : width ,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor: '#FFF',
      paddingHorizontal  : 10,
      paddingVertical : 8,
      borderTopWidth : 1 ,
      borderTopColor : '#CCC'
   }


});