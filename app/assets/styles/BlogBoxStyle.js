import {StyleSheet, Dimensions , Platform} from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({

   container : {
      height : height * .3,
      marginVertical : 10,
      flexDirection : 'row',
      marginHorizontal : 10
   },
   actionsSection :{
      flex: .6 , 
      flexDirection : 'column' ,
      justifyContent:'space-evenly',
      alignItems:'center'
   },
   likesNumber :{
      color : '#D6D6D6',
      fontSize : 12,
      marginTop : 4
   },
   blogSection : {
      flex:3,
      borderRadius : 13,
      backgroundColor:"#FFF",
      padding : 10,
      shadowColor : '#CCC',
      shadowOpacity : .5,
      elevation: .9,
      shadowOffset : {
         width : 1,
         height : 1
      },
   },
   blogImage :{ 
      flex:3,
      borderRadius : 10 ,
      overflow : 'hidden'
   },
   blogText :{
      marginVertical : 5,
      color : '#7B7B7B',
      fontSize : 15 ,
      lineHeight : 21
   }

});