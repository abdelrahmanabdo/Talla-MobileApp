import React, { useState } from 'react';
import { Text, View, ImageBackground, SafeAreaView , Switch } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

//Styles
import style from '../assets/styles/SettingsStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';

const Settings = props  => {
    const [showWorkingHours , setShowWorkingHours] = useState(true);
    const [showStylistList , setShowStylistList] = useState(true);
    const [newReservationNotifications , setNewReservationNotifications] = useState(false);
    const [notificationBeforeSession , setNotificationBeforeSession] = useState(true);



    return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../assets/images/colored-bg.png')}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton onPress={()=>{props.navigation.goBack()}}>
                        <FastImage source={require('../assets/icons/back-white.png')} style={{width : 25 , height : 25}} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                     Settings
                    </Text>
                    <View style={{flexDirection : 'row'}}>
                        <BorderlessButton onPress={() => {props.navigation.navigate('notifications')}}>
                            <FastImage source={require('../assets/icons/notification.png')}
                                    resizeMode={'contain'}
                                    style={{width : 25,height : 25}} />
                        </BorderlessButton>
                    </View>
                </View>
            </ImageBackground>
            <ScrollView style={style.container}>
                <View style={style.itemContainer}>
                    <Text style={style.headerText}>
                        Reservations
                    </Text>
                </View>
                <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
                    <Text style={style.title}>
                        Show my working hours
                    </Text>
                    <Switch value = {showWorkingHours}
                            ios_backgroundColor={'#D1AD67'}
                            trackColor={{ false: "#012647", true: "#012647" }}
                            thumbColor={showWorkingHours ? "#f4f3f4" : "#f5dd4b"}
                            onValueChange ={(isOn) =>{ setShowWorkingHours(isOn)}}
                            />
                </Animatable.View>
                <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
                    <Text style={style.title}>
                        Show me in stylist list
                    </Text>
                    <Switch value = {showStylistList}
                            ios_backgroundColor={'#D1AD67'}
                            trackColor={{ false: "#012647", true: "#012647" }}
                            thumbColor={'#FFF'}
                            thumbColor={showStylistList ? "#f4f3f4" : "#f5dd4b"}
                            onValueChange ={(isOn) =>{ setShowStylistList(isOn)}}
                            />
                </Animatable.View>


                <View style={style.itemContainer}>
                    <Text style={style.headerText}>
                        Notifications
                    </Text>
                </View>
                <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
                    <Text style={style.title}>
                         Send notifications for new reservations
                    </Text>
                    <Switch value = {newReservationNotifications}
                            ios_backgroundColor={'#D1AD67'}
                            trackColor={{ false: "#012647", true: "#012647" }}
                            thumbColor={newReservationNotifications ? "#f4f3f4" : "#f5dd4b"}
                            onValueChange ={(isOn) =>{ setNewReservationNotifications(isOn)}}
                            />
                </Animatable.View>
                <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
                    <Text style={style.title}>
                        Send notifications before sessions
                    </Text>
                    <Switch value = {notificationBeforeSession}
                            ios_backgroundColor={'#D1AD67'}
                            trackColor={{ false: "#012647", true: "#012647" }}
                            thumbColor={notificationBeforeSession ? "#f4f3f4" : "#f5dd4b"}
                            onValueChange ={(isOn) =>{ setNotificationBeforeSession(isOn)}}
                            />
                </Animatable.View>
            </ScrollView>
    </View>
}
 
export default Settings;
