import React from 'react';
import { Dimensions } from 'react-native';

import {  createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from 'native-base';

import I18n from "../lang/I18n";

//Tabs
import ChicChatTab from '../screens/Tabs/ChicChatTab';
import ClosetTab from '../screens/Tabs/ClosetTab';
import StylistsTab from '../screens/Tabs/StylistsTab';
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
               tabStyle : {
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
                  <FastImage source={require('../assets/icons/chic-chat.png')} 
                             resizeMode={'contain'}
                             style={{width : 20 , height:20}} />
               ),
            }}
         />
         <Tab.Screen name="closetTab" 
            component={ClosetTab}
            options={{
               tabBarLabel: setTabLabel("closetTab"),
               tabBarIcon: ({ focused }) => (
                  <FastImage source={require('../assets/icons/closet-icon.png')} 
                             resizeMode={'contain'}
                             style={{width : 20 , height:20}} />
               ),
            }}
            />         
         <Tab.Screen name="add" 
            component={AddTab}
            options={{
               tabBarLabel: setTabLabel("addTab"),
               tabBarIcon: ({ focused }) => (
                  <FastImage source={require('../assets/icons/add-icon.png')} 
                             resizeMode={'contain'}
                             style={{width : 20 , height:20}} />
               ),
            }}
            />
         <Tab.Screen name="stylistsTab" 
            component={StylistsTab}
            options={{
               tabBarLabel: setTabLabel("stylistsTab"),
               tabBarIcon: ({ focused }) => (
                  <FastImage source={require('../assets/icons/stylist-icon.png')} 
                             resizeMode={'contain'}
                             style={{width : 30 , height:30}} />
               ),
            }}
            />

         <Tab.Screen name="More" 
            component={MoreTab}
            options={{
               tabBarLabel: setTabLabel("moreTab"),
               tabBarIcon: ({ focused }) => (
                   <FastImage source={require('../assets/icons/more-icon.png')} 
                             resizeMode={'contain'}
                             style={{width : 30 , height:30}} />

               ),
            }}
            />
         </Tab.Navigator>

);

export default TabNavigator;
