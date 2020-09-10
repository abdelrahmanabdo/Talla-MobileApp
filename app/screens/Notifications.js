import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';

//Styles
import style from '../assets/styles/NotificationsStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';

const Notifications = props  => {
    const [notifications , setNotifications ] = useState([
        {
            id  : 1,
            name : 'Ahmed' ,
            type : 'request',
            text  : "notification text",
            time : '5:32',
            isRead :  true
        },
        {
            id  : 3 ,
            name : 'mohaned' ,
            type : 'session',
            text  : "notification text 2 ",
            time : '9:32',
            isRead :  false
        },
        {
            id  : 4 ,
            name : 'mohaned' ,
            type : 'session',
            text  : "notification text 2 ",
            time : '9:32',
            isRead :  false
        },
        {
            id  : 5 ,
            name : 'mohaned' ,
            type : 'session',
            text  : "notification text 5 notification text 5 ",
            time : '3:05',
            isRead :  true
        },
        {
            id  : 6 ,
            name : 'Mai ' ,
            type : 'quatation',
            text  : "notification text 6 ",
            time : '9:32',
            isRead :  false
        },
        
    ]);


    /**
     * Get Notifications
     */
    const getDate  = () => {

    }


    useEffect(()=>{

    },[])
    return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../assets/images/colored-bg.png')}
                            resizeMode={'stretch'}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton onPress={()=>{props.navigation.goBack()}}>
                        <FastImage source={require('../assets/icons/back-white.png')} style={{width : 25 , height : 25}} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                        Notifications
                    </Text>
                    <View >
                    </View>
                </View>
            </ImageBackground>
            <ScrollView style={style.container}>
                {
                    notifications.map((item,index)=>{
                        return <RectButton  key={index}
                                            style={[style.notificationContainer,{backgroundColor: item.isRead ? '#D1AD67' : '#FFF'}]}>
                            <FastImage  source={require('../assets/images/girl.png')}
                                        resizeMode={'contain'}
                                        style={{width : 45,height:45,flex:1 ,alignSelf:'center',justifyContent:'center'}} />
                            <View style={style.notificationDetailsContainer}>
                                <View style={{flexDirection :'row' , justifyContent:'space-between',alignItems:'center' , marginBottom : 10}}>
                                    <Text style={[style.text,{flex:1.3}]}>
                                        {item.name}
                                    </Text>
                                    <View style={{flexDirection :'row' , justifyContent:'space-between',alignItems:'center',flex:1}}>
                                        <Text style={[style.text]}>
                                            {
                                               '#' + item.type.toUpperCase()
                                            }
                                        </Text>
                                        <Text style={[style.text]}>
                                            {item.time}
                                        </Text>
                                    </View>
                                </View>
                                <Text>
                                    {item.text}
                                </Text>
                            </View>
                        </RectButton>
                    })
                }
            </ScrollView>
    </View>
}
 
export default Notifications;
