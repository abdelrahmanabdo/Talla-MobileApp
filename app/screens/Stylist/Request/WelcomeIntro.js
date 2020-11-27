import React, { useState } from 'react';
import { SafeAreaView, Text, View} from 'react-native';
import { RectButton, BorderlessButton, BaseButton } from 'react-native-gesture-handler';

//Styles
import GeneralStyle from '../../../assets/styles/GeneralStyle';
import style from '../../../assets/styles/StylistRequestStyle';
import TAndC from '../../../modals/TAndC';

const WelcomeIntro = props => {
   const [activeScreen , setActiveScreen ] = useState(1);
   const [showTAndCModal , setShowTAndCModal] = useState(false);

   
   /**
    * First Intro Screen
    */
   const FirstWelcomeScreen = () => {
      return <View style={[GeneralStyle.columnSpaceBetween , 
                          {flex:1 , padding :30  }]} >
         <View></View>
         <View>
            <Text style={[GeneralStyle.blackBoldText , {alignSelf:'center' , fontSize:19}]}>
               Why Tallah?
            </Text>
            <Text style={[GeneralStyle.blackText , {marginTop: 20 , fontSize:17}]}>
               Tallah will help its team of stylists to:
            </Text>
            <Text style={[GeneralStyle.blackText , {marginTop: 10 , fontSize:17}]}>
               1 - Widen the scope of clients. 

            </Text>
            <Text style={[GeneralStyle.blackText , {marginTop: 20 , fontSize:16}]}>
            2 - Flexible working hours based on agreement with your client.

            </Text>
            <Text style={[GeneralStyle.blackText , {marginTop: 20 , fontSize:16}]}>
            3 - Marketing our "Top Stylists" on our social
            media platforms and other marketing related 
            platforms.
            </Text>
            <Text style={[GeneralStyle.blackText , {marginTop: 20 , fontSize:16}]}>
            4- guaranteed payments. 
            </Text>
            <Text style={[GeneralStyle.blackText , {marginTop: 20 , fontSize:16}]}>
               You can always reach us on smile@tallah.co
               for any questions or inquiries.
            </Text>
         </View>
         <RectButton
            onPress={() => props.navigation.navigate('phoneConfirmation')}
            style={[style.createProfileButton]}
         >
               <Text 
                  style={[GeneralStyle.grayBoldText , {fontSize : 17, textAlign:'center' , lineHeight : 26}]}
               >
                  Read and agree on our T & C 
                  And Confidentiality agreement 
               </Text>
         </RectButton>
      </View>
   }


   /**
    * Second Intro Screen
    */
   const SecondWelcomeScreen = () => {
      return <View>
         
      </View>
   }

   return (
      <SafeAreaView style={[style.container]}>
      {
         activeScreen ==1 ? 
         <FirstWelcomeScreen />
         :
         <SecondWelcomeScreen />
      }
      <TAndC 
         showModal={showTAndCModal}
         onAgree = { () => {
            setShowTAndCModal(false);
            
         }}
         onCloseModal= {() => setShowTAndCModal(false)}
      />
      </SafeAreaView>
   )

}


export default WelcomeIntro ;