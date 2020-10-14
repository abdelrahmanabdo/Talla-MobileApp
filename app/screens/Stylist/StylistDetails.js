import React  , {useState , useEffect}from 'react';
import { Text, View, ImageBackground , FlatList} from 'react-native';

import GeneralStyle from '../../assets/styles/GeneralStyle';

import I18n from '../../lang/I18n';
import style from '../../assets/styles/StylistDetailsStyle';
import FastImage from 'react-native-fast-image';
import { RectButton, ScrollView, BorderlessButton } from 'react-native-gesture-handler';
import { Rating, AirbnbRating } from 'react-native-ratings';

//
import Button from '../../components/Button';

const StylistDetails = ({...props}) => {
   const [protfolio , setProtfolio ] = useState([
      {
          id : 1 ,
          image : '' ,
      },
      {
          id : 2 ,
          image : '' ,
      },
      {
          id : 3 ,
          image : '' ,
      },
      {
          id : 4 ,
          image : '' ,
      },
      {
         id : 5 ,
         image : '' ,
     },
     {
         id : 6 ,
         image : '' ,
     },

  ]);

  /**
   * Render Protfolio item
   */
   const renderProtfolio = () => {
      return <RectButton >
         <View style={[style.protfolioItem]}>

         </View>
      </RectButton>
   }

   /**
    * Protfolio tabs 
    */
   const ProtfolioTabs = () => {
      const [activeTab , setActiveTab ] = useState(1);
      const [tabs , setTabs ] = useState([
         {
            id : 1,
            tabName : 'Shopping Assistance',
         },
         {
            id : 2,
            tabName : 'Shopping Guide',           
         },
         {
            id : 3,
            tabName : 'Event Capsule',           
         },
         {
            id : 4,
            tabName : 'One Event',           
         }
      ])

      const changeTab = (id) => {
         setActiveTab(id)
      }

      return <View>
          <FlatList 
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={tabs}
                     keyExtractor={(item,index) => index.toString()}
                     renderItem={({item}) => {
                        return <BorderlessButton onPress={() => changeTab(item.id)}>
                           <View style={[style.tabButton, activeTab == item.id ? style.activeTab : null]}>
                              <Text style={[GeneralStyle.blackText , {color : activeTab == item.id ?  '#D1AD67' : '#000'}]}>
                              {item.tabName}
                              </Text>
                           </View>
                        </BorderlessButton>
                     }}
                  />
            <View style={[style.tabContent]}>
               <View style={[GeneralStyle.row , {marginVertical : 10}]}>
                  <Text style={{color : '#7B7B7B' , fontSize : 14 }}>
                   Specialization:
                  </Text>
                  <Text style={{flex:2 , color : '#000' , fontSize : 13,marginHorizontal : 10}}> 
                     Wardrobe closet consultation 
                  </Text>
               </View>
               <View style={[GeneralStyle.row , {marginVertical : 10}]}>
                  <Text style={{color : '#7B7B7B' , fontSize : 14 }}>
                     Description:
                  </Text>
                  <Text style={{flex:2 , color : '#000' , fontSize : 13,marginHorizontal : 10}}> 
                  Lorem ipsum dolor sit amet, ecte  elit, 
                  sed do eiusmod por incididunt
                  </Text>
               </View>
               <View style={[GeneralStyle.row , {marginVertical : 10}]}>
                  <Text style={{color : '#7B7B7B' , fontSize : 14 }}>
                     Starting price:
                  </Text>
                  <Text style={{flex:2 , color : '#000' , fontSize : 13,marginHorizontal : 10}}> 
                    Lorem ipsum
                  </Text>
               </View>
               <Button  label={'Ask for packages'}
                        labelColor={'#FFF'}
                        style={{width : '100%',padding : 13 , marginVertical : 0 ,marginTop : 10}}

                  />
            </View>
      </View>
   }



   return <View style={[GeneralStyle.container,{flex:1,backgroundColor: "#FFF"}]}>
         <ImageBackground source={require('../../assets/images/colored-bg.png')}
                        style={GeneralStyle.header}>
            <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
               <BorderlessButton onPress={() => props.navigation.goBack()}>
                  <FastImage source={require('../../assets/icons/back-white.png')}
                              resizeMode={'contain'}
                              style={{width : 25 , height : 25}} />
               </BorderlessButton>
               <Text style={GeneralStyle.headerText}>
                  Stylists
               </Text>
               <View>
               </View>
            </View>
         </ImageBackground>
         <View style={{flex:1}}>
            <ImageBackground source={require('../../assets/images/closet-item-default.png')}
                           resizeMode={'stretch'}
                           style={style.bgImage}>
               <Text style={[GeneralStyle.secondaryBoldText, { fontSize : 19}]}>
                  #Stylist name
               </Text>                           
               <View style={[GeneralStyle.rowSpaceBetween,{width :'90%' , padding : 10}]}>
                  <View style={{alignItems:'center'}}>
                     <Text style={[GeneralStyle.blackText,{marginBottom:3}]}>
                        Followers
                     </Text>
                     <Text style={{color:"#000" , fontSize : 14}}>
                        5 k
                     </Text>
                  </View>
                  <View style={{alignItems:'center'}}>
                     <Text style={[GeneralStyle.blackText,{marginBottom:3}]}>
                        Rating
                     </Text>
                     <AirbnbRating
                        count={5}
                        showRating={false}
                        defaultRating={4}
                        size={13}
                        isDisabled
                        selectedColor={'#D1AD67'}
                     />
                  </View>
               </View>
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}} >
               <View style={[style.bioContainer]}>
                  <Text style={[GeneralStyle.secondaryText , {fontWeight : '500'}]}>
                     Short Bio
                  </Text>
                  <Text style={[style.bioText]}>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
                     sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, 
                     consectetur adipisicing elit, sed do eiusmod tempor incididunt
                  </Text>
               </View>
               <View>
                  <View style={[GeneralStyle.rowSpaceBetween,{margin: 15}]}>
                     <Text style={[GeneralStyle.secondaryText,{fontWeight : '500'}]}>
                        Stylist Protfolio
                     </Text>
                     <BorderlessButton>
                        <FastImage source={require('../../assets/icons/right-colored-arrow.png')}
                                    resizeMode={'contain'}
                                    style={{width : 20 , height : 20}} />
                     </BorderlessButton>
                  </View>
                  <FlatList 
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     data={protfolio}
                     style={{ paddingVertical : 5}}
                     keyExtractor={(item,index) => index.toString()}
                     renderItem={renderProtfolio}
                  />
               </View>
               <View style={[style.grayContainer]}>
                  <ProtfolioTabs />
               </View>
               <View style={[style.grayContainer  , GeneralStyle.rowSpaceBetween]}>
                  <Text style={[GeneralStyle.secondaryText,{fontWeight : '500'}]}>
                        Stylist Info
                  </Text>
                  <BorderlessButton>
                        <FastImage source={require('../../assets/icons/right-colored-arrow.png')}
                                    resizeMode={'contain'}
                                    style={{width : 20 , height : 20}} />
                  </BorderlessButton>
               </View>
               <View style={[style.grayContainer  , GeneralStyle.rowSpaceBetween]}>
                  <Text style={[GeneralStyle.secondaryText,{fontWeight : '500'}]}>
                        Certificates
                  </Text>
                  <BorderlessButton>
                        <FastImage source={require('../../assets/icons/right-colored-arrow.png')}
                                    resizeMode={'contain'}
                                    style={{width : 20 , height : 20}} />
                  </BorderlessButton>
               </View>   
               <BorderlessButton 
                  style={[style.grayContainer  , GeneralStyle.rowSpaceBetween]}
                  onPress={() => props.navigation.navigate('projects')}
               >
                  <Text style={[GeneralStyle.secondaryText,{fontWeight : '500'}]}>
                       Portfolio 
                  </Text>
                  <FastImage  source={require('../../assets/icons/right-colored-arrow.png')}
                              resizeMode={'contain'}
                              style={{width : 20 , height : 20}} />
               </BorderlessButton>  
            </ScrollView>
         </View>
   </View>

}

export default StylistDetails ;