import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground , ScrollView , SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton , BorderlessButton, TextInput  } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-picker';

//Styles
import style from '../../assets/styles/MessagesStyle';
import GeneralStyle from '../../assets/styles/GeneralStyle';


const Chat = props => {
    const [messages , setMessages] = useState([
       {
          message : "Hi Joey! Have you seen new season of game of thrones?!",
          time : '2:51 pm',
          mine :true
       },
       {
         message : "Yeah! I love it",
         time : '5:00 pm',
         mine :false
      },
      {
         message : "So much cool things happens, But you know, I didn’t like it.",
         time : '12:10 am',
         mine :true
      },
      {
         message : "Hi Joey! Have you seen new season of game of thrones?!",
         time : '9:13 am',
         mine :false
      },
      {
         message : "Hi Joey! Have you seen new season of game of thrones?!",
         time : '2:51 pm',
         mine :true
      },
      {
         message : "Hi Joey! Have you seen new season of game of thrones?!",
         time : '2:57 pm',
         mine :false
      },
    ]);


  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
      }
    });

  }

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
      }
    });

  }



   return <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../../assets/images/colored-bg.png')}
                            resizeMode={'stretch'}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton onPress={()=>{props.navigation.goBack()}}>
                        <FastImage source={require('../../assets/icons/back-white.png')} 
                                   style={{width : 25 , height : 25}} 
                                   resizeMode={'contain'}
                        />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                        Stylist name
                    </Text>
                    <View>
                    </View>
                </View>
            </ImageBackground>
            <ScrollView style={{flex:1}}>
            {
               messages.map((message , key) => {
                  return <View   key={key}
                                 style={[style.messageContainer,
                                         ]}>
                           {
                              !message.mine ?
                              <>
                                    <View
                                       style={{flex:5,flexDirection : 'column'}}
                                    >
                                       <View 
                                          style={[style.messageDetailsContainer, 
                                                {backgroundColor: '#D1AD67'}]}
                                       >
                                          <View style={{flexDirection :'row' , justifyContent:'space-between',
                                                         alignItems:'center' , marginBottom : 4}}>
                                                <Text style={{color : '#FFF',fontSize : 16,lineHeight : 24}}>
                                                   {message.message}
                                                </Text>
                                          </View>
                                       </View>
                                       <View
                                          style={[GeneralStyle.row , {alignItems:'center' ,marginStart : 10}]}
                                       >
                                          <FastImage  source={require('../../assets/icons/color.png')}
                                                   resizeMode={'contain'}
                                                   style={{width : 15,height:15,marginEnd : 8}} 
                                          />
                                          <Text
                                             style={[GeneralStyle.grayText , {fontSize : 12}]}
                                          >
                                             {message.time}
                                          </Text>
                                       </View>
                                    </View>
                                    <FastImage  source={require('../../assets/images/logo.png')}
                                                resizeMode={'contain'}
                                                style={{width : 50,height:50,flex:1,
                                                         alignSelf:'flex-start',justifyContent:'center'}} 
                                    />
                              </>
                              :
                              <>
                                 <FastImage  source={require('../../assets/images/logo.png')}
                                             resizeMode={'contain'}
                                             style={{width : 50,height:50,flex:1,
                                                      alignSelf:'flex-start',justifyContent:'center'}} 
                                 />
                                 <View
                                    style={{flex:5,flexDirection : 'column'}}
                                 >
                                    <View 
                                       style={[style.messageDetailsContainer, 
                                             {backgroundColor: '#707070'}]}
                                    >
                                       <View style={{flexDirection :'row' , justifyContent:'space-between',
                                                      alignItems:'center' , marginBottom : 4}}>
                                             <Text style={{color : '#FFF',fontSize : 16,lineHeight : 24}}>
                                                {message.message}
                                             </Text>
                                       </View>
                                    </View>
                                    <View
                                       style={[GeneralStyle.row , {alignItems:'center' ,marginStart : 10}]}
                                    >
                                       <FastImage  source={require('../../assets/icons/color.png')}
                                                resizeMode={'contain'}
                                                style={{width : 15,height:15,marginEnd : 8}} 
                                       />
                                       <Text
                                          style={[GeneralStyle.grayText , {fontSize : 12}]}
                                       >
                                          {message.time}
                                       </Text>
                                    </View>
                                 </View>
                              </>
                           }
                  </View>
               })
            }
            </ScrollView>
            <SafeAreaView style={[style.actionsContainer]}>
                  <BorderlessButton onPress={launchCamera}>
                     <FastImage  source={require('../../assets/icons/camera.png')}
                                 resizeMode={'contain'}
                                 style={{lex:1,width : 30 , height : 30 , marginStart : 15}} />
                  </BorderlessButton>
                  <BorderlessButton onPress={launchImageLibrary}>
                  <FastImage  source={require('../../assets/icons/gallary.png')}
                              resizeMode={'contain'}
                              style={{flex:1,width : 30 , height : 30 , marginHorizontal : 20}} />
                  </BorderlessButton>
                  <TextInput 
                     placeholder={'Tap here to type'}
                     placeholderTextColor={'#CCC'}
                     style={{color : '#FFF', flex:4}}
                  />
                  <BorderlessButton>
                     <FastImage  source={require('../../assets/icons/send.png')}
                                 resizeMode={'contain'}
                                 style={{flex:1,width : 30 , height : 30 , marginHorizontal : 20}} />
                  </BorderlessButton>
            </SafeAreaView>
    </View>
};

export default Chat;
