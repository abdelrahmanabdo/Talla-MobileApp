import {StyleSheet, Dimensions} from 'react-native';


const {width , height} = Dimensions.get('screen');
export default  StyleSheet.create({
   container : {
      width : width - 30  ,
      justifyContent:'space-between',
      alignItems:'center',
      alignSelf :'center',
      backgroundColor: '#FFF',
      borderRadius : 15,
      padding: 20,
      paddingTop : 30,

   },
   actionModalContainer : {
      width : '100%',
      maxHeight : height - 100,
      backgroundColor: '#FFF',
      padding: 20,
      borderTopRightRadius : 15,
      borderTopLeftRadius : 15
   },
   actionModalHeader : {
      flexDirection : 'row',
      justifyContent: 'space-between',
      alignItems:'center'
   },
   headerText :{
      fontSize : 18,
      fontFamily : 'Roboto-Bold',
      color :'#000'
   },
   sectionHeaderText : {
      fontSize : 18,
      fontFamily : 'Roboto',
      color :'#000'
   },
   text : {
      color : '#000',
      fontFamily : "Roboto",
      fontSize: 16,
      width : '80%',
      lineHeight : 20,
      textAlign : 'center',
      marginVertical : 10
   },
   textBold :{
      color:'#000000',
      fontFamily: "Roboto",
      fontSize : 17,
   },
   subText :{
      color:'#000000',
      fontFamily: "Roboto-Bold",
      fontSize : 17,
      marginBottom:10
   },
   SecondaryButton : {
      backgroundColor: '#D1AD67',
      width: '95%',
      marginTop : 15,
      borderRadius:10,
      padding: 15,
      alignSelf:'center',
      alignItems:'center',
      justifyContent:'center'
   },
   SecondaryButtonText : {
      color: '#FFF',
      fontFamily : 'Roboto',
      fontSize : 20
   },
   selectRow :{
      width : width - 30,
      alignSelf:'center',
      flexDirection : 'row',
      backgroundColor: '#F8F8F8',
      padding:15,
      borderRadius : 10,
      alignItems:'center',
      marginVertical : 10
   }
});