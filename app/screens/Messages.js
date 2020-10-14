import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground , ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, TextInput } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

//Styles
import style from '../assets/styles/MessagesStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';

const Messages = props => {
    const [messages , setMessages ] = useState([
        {
            name : 'Lurim ibsum',
            online : true
        },
        {
            name : 'Jack Sparrow',
            online : false
        },
        {
            name : 'Jack Sparrow',
            online : true
        },
        {
            name : 'Julia Marvin',
            online : true
        },
        {
            name : 'Julia Marvin',
            online : false
        },

    ]);

    return <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../assets/images/colored-bg.png')}
                            resizeMode={'stretch'}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton onPress={()=>{props.navigation.goBack()}}>
                        <FastImage 
                            source={require('../assets/icons/back-white.png')} 
                            style={{width : 25 , height : 25}} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                        Messages
                    </Text>
                    <View>
                        <BorderlessButton onPress={() => props.navigation.navigate('notifications')}>
                            <FastImage source={require('../assets/icons/notification.png')}
                                        resizeMode={'contain'}
                                        style={{width : 25,height : 25}} 
                            />
                        </BorderlessButton>
                    </View>
                </View>
            </ImageBackground>
            <View
                style={[style.searchContainer]}
            >
                <FastImage 
                    source={require('../assets/icons/search-icon.png')}
                    style={{width : 20 , height:  20 , marginEnd : 15}}
                    resizeMode={'contain'}
                />
                <TextInput 
                    placeholder={'SEARCH'}
                    style={{flex:1 , padding : 4 , color : '#000'}}
                    placeholderTextColor={'#CCC'}   
                />
            </View>
            <ScrollView>
                {
                    messages.map((item,index)=>{
                        return  <Animatable.View  
                                    key={index} 
                                    animation={'slideInRight'} 
                                >
                        <RectButton  
                            onPress={() => props.navigation.navigate('chat')}
                            style={[style.chatContainer,
                                   {backgroundColor: item.isRead ? '#D1AD67' : '#FFF'}]}
                        >
                            <FastImage  source={require('../assets/images/logo.png')}
                                        resizeMode={'contain'}
                                        style={{width : 55,height:55,flex:1 ,
                                                alignSelf:'center',justifyContent:'center'}} 
                            />
                            <View style={style.chatDetailsContainer}>
                                <View style={{flexDirection :'row' , justifyContent:'space-between',alignItems:'center' , marginBottom : 4}}>
                                    <Text style={[GeneralStyle.blackBoldText,{fontSize : 16}]}>
                                        {item.name}
                                    </Text>
                                </View>
                                <Text style={{color : '#2196F3' , fontSize : 12}}>
                                    {item.online ? 'Online' : 'Offline'}
                                </Text>
                            </View>
                        </RectButton>
                        </Animatable.View>

                    })
                }
            </ScrollView>
    </View>
};

export default Messages;
