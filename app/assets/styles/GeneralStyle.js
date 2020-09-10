import {StyleSheet, Dimensions , Platform} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      flex:1,
      backgroundColor: "#FFF"
   },
   header : {
      width : width,
      ...Platform.select({
         ios: {
            paddingTop: getStatusBarHeight() + 10
         },
         android: {
            paddingTop:  15

      }}), 
      paddingBottom :24,
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
   },

   //Tabs
   tabButtons : {
      width : '90%',
      flexDirection:'row',
      marginTop : 20,
      borderRadius : 12,
      overflow:'hidden',
      borderWidth :1.5,
      borderColor : '#D1AD67'
   },
   tabButton : {
      flex:1,
      justifyContent : 'center',
      alignItems:'center',
      padding : 10,
   },
   tabButtonText : {
      color: '#D1AD67'
   },

   //Category List container
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
});