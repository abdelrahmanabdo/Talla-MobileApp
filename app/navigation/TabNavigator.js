import React from 'react';
import { Dimensions } from 'react-native';

import {  createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from 'native-base';

import I18n from "../lang/I18n";

//Tabs
import ChicChatTab from '../screens/Tabs/ChicChatTab';
import ClosetTab from '../screens/Tabs/ClosetTab';
import StylistTab from '../screens/Tabs/StylistTab';
import MoreTab from '../screens/Tabs/MoreTab';
import FastImage from 'react-native-fast-image';
import AddTab from '../screens/Tabs/AddTab';


const Tab = createMaterialTopTabNavigator()

const setTabLabel = (title) => {
   return I18n.t(title)
}


export const TabNavigator = ({params}) => (
   <Tab.Navigator 
            initialRouteName = "chicChatTab"
            tabBarPosition={'bottom'}
            lazy={true}
            swipeEnabled={false}
            initialLayout={{ width: Dimensions.get('window').width }}
            tabBarOptions={{
               activeTintColor: '#D1AD67',
               inactiveTintColor: '#012647',
               showIcon:true,
               indicatorStyle:{
                  display:'none',
                  width : 0
               },
               labelStyle:{
                  fontSize:9 ,
                  fontFamily:'roboto'
               },
            
               style: {
                       borderTopRightRadius : 20,
                       borderTopLeftRadius : 20,
                       borderWidth:.2,
                       borderColor:'#EFEFEF',
                     },
            }}>
         <Tab.Screen name="chicChatTab" 
            component={ChicChatTab}
            options={{
               tabBarLabel: setTabLabel("chicChatTab"),
               tabBarIcon: ({ focused }) => (
                  <FastImage source={focused ? require('../assets/icons/chic-chat-active.png') : 
                                               require('../assets/icons/chic-chat.png')} 
                             resizeMode={'contain'}
                             style={{width : 21 , height:21,alignSelf:'center'}}  />
               ),
            }}
         />
         <Tab.Screen name="closetTab" 
            component={ClosetTab}
            options={{
               tabBarLabel: setTabLabel("closetTab"),
               tabBarIcon: ({ focused }) => (
                  <FastImage source={focused ? require('../assets/icons/closet-active.png') :   
                                               require('../assets/icons/closet-icon.png')} 
                             resizeMode={'contain'}
                             style={{width : 21 , height:21,alignSelf:'center'}}  />
               ),
            }}
            />         
         <Tab.Screen name="add" 
            component={AddTab}
            options={{
               tabBarLabel: setTabLabel("addTab"),
               tabBarIcon: ({ focused }) => (
                  <FastImage source={focused ? require('../assets/icons/add-active.png') : 
                                               require('../assets/icons/add-icon.png')} 
                             resizeMode={'contain'}
                             style={{width : 21 , height:21,alignSelf:'center'}} />
               ),
            }}
            />
         <Tab.Screen name="stylistsTab" 
            component={StylistTab}
            options={{
               tabBarLabel: setTabLabel("stylistsTab"),
               tabBarIcon: ({ focused }) => (
                  <FastImage source={focused ? require('../assets/icons/stylist-active.png') : 
                                               require('../assets/icons/stylist-icon.png')} 
                             resizeMode={'contain'}
                             style={{width : 31 , height:31,alignSelf:'center'}} />
               ),
            }}
            />

         <Tab.Screen name="More" 
            component={MoreTab}
            options={{
               tabBarLabel: setTabLabel("moreTab"),
               tabBarIcon: ({ focused }) => (
                   <FastImage source={focused ? require('../assets/icons/more-active.png') : 
                                               require('../assets/icons/more-icon.png')} 
                             resizeMode={'contain'}
                             style={{width : 30 , height:30}} />

               ),
            }}
            />
         </Tab.Navigator>

);

export default TabNavigator;
