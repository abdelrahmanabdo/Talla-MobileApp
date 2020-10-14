import React  , {useState}from 'react';
import { Text, View, Image,ImageBackground ,StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton, BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import PhotoUpload from 'react-native-photo-upload';
import FastImage from 'react-native-fast-image';

//Styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/MoreStyle';


import I18n from '../../lang/I18n';

const MoreTab = props => {




    //Logged User Info component
    const UserInfo = () => {


        /**
         * Avatar
         */
        const Avatar = () => {
            const [avatar , setAvatar ] = useState('');

            //Change avatar handler
            const changeAvatar = () =>{

            }

            return  <PhotoUpload
               imagePickerProps={{  title: I18n.t('selectAvatar'),
                              takePhotoButtonTitle : I18n.t('takeCameraPhoto'),
                              chooseFromLibraryButtonTitle :  I18n.t("chooseFromLibrary"),
                              cancelButtonTitle :  I18n.t('cancel')
                }}
                format = 'PNG'
                photoPickerTitle = {I18n.t('selectPhoto')}
                containerStyle={{borderRadius : 10 ,marginTop : 20}}
                onPhotoSelect={pic => {
                  if (pic) {
                     setAvatar(pic)
                  }
                }}>
               {
                  avatar ?
                    <Image source={{uri: `data:image/gif;base64,${avatar}`}} 
                           style={style.avatar}/>
                  :
                    <BorderlessButton onPress={changeAvatar}>
                        <ImageBackground source={require('../../assets/icons/default-avatar.png')}
                                         resizeMode={'contain'}
                                                style={style.avatar}>
                                <FastImage source={require('../../assets/icons/edit-avatar.png')}
                                            style={{width : 35 , height : 35, alignSelf:'flex-end'}}/>
                        </ImageBackground>
                    </BorderlessButton>
               }
            </PhotoUpload>
            
        }


        return  <View style={style.topSection}>
            <Avatar />
            <Text style={[style.infoText,{fontSize : 19,marginTop:15}]}>
                 John Doe
            </Text>
            <Text style={style.infoText}>
                John Doe@gmail.com
            </Text>
            <Text style={style.infoText}>
                Newcairo-egypt
            </Text>
            <Text style={style.infoText}>
              01200000000
            </Text>
        </View>
    }

    //List Of More list items
    const ListItems = () => {
        const navigation = useNavigation();

        const ListItem = ({icon , label ,onPress}) => {
            return <RectButton 
                                rippleColor={'#CCC'}
                               style={style.itemContainer}
                               onPress={onPress}>
                <View style={{flexDirection : 'row',alignItems:'center'}}>
                    <FastImage  source={icon}
                                style={{width : 22 , height : 22,marginEnd : 15}}
                                resizeMode={'contain'} />
                    <Text style={style.itemText}>
                        {label}
                    </Text>
                </View>
                <FastImage source={require('../../assets/icons/more-list-arrow.png')}
                            style={{width : 25 , height : 25}}
                            resizeMode={'contain'} />
            </RectButton>
        }


        return <View style={style.listSection}>
            <ScrollView >
                <ListItem   icon={require('../../assets/icons/profile.png')} 
                            label={'Profile'} 
                            onPress={()=>{navigation.navigate('profile')}}/>
                <ListItem   icon={require('../../assets/icons/closet-value.png')} 
                            label={'Closet value'} 
                            onPress={()=>{navigation.navigate('')}}/>
                <ListItem   icon={require('../../assets/icons/outfits.png')}
                            label={'Outfits'} 
                            onPress={()=>{navigation.navigate('')}}/>
                <ListItem   icon={require('../../assets/icons/more-calendar.png')} 
                            label={'Calendar'} 
                            onPress={()=>{navigation.navigate('calendar')}}/>
                <ListItem   icon={require('../../assets/icons/favourites.png')} 
                            label={'Favourites'} 
                            onPress={()=>{navigation.navigate('favourites')}}/>
                <ListItem   icon={require('../../assets/icons/messages.png')}
                            label={'Messages'} 
                            onPress={()=>{navigation.navigate('messages')}}/>
                <ListItem   icon={require('../../assets/icons/about-app.png')} 
                            label={'About the app'} 
                            onPress={()=>{navigation.navigate('about')}}/>
                <ListItem   icon={require('../../assets/icons/settings.png')} 
                            label={'Settings'} 
                            onPress={()=>{navigation.navigate('settings')}}/>
                <ListItem   icon={require('../../assets/icons/help-support.png')} 
                            label={'Help & Support'} 
                            onPress={()=>{navigation.navigate('support')}}/>
                <ListItem   icon={require('../../assets/icons/T-&-C.png')} 
                            label={'T&C'} 
                            onPress={()=>{navigation.navigate('TAndC')}}/>
                <ListItem   icon={require('../../assets/icons/profile.png')} 
                            label={'Logout'} 
                            onPress={()=>{navigation.navigate('')}}/>
                <BorderlessButton 
                    rippleColor={'#CCC'}
                    style={style.beStylistButton}
                    onPress={() => props.navigation.navigate('stylistRequestIntro')}
                >
                    <Text style={style.beStylistButtonText}>
                        Be a Stylist
                    </Text>
                </BorderlessButton>
            </ScrollView>
        </View>
    }


    const Line = () => {
        return <View style={style.line}></View>
    }

    return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../../assets/images/colored-bg.png')}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton>
                    <FastImage source={require('../../assets/icons/small-logo-white.png')}
                                resizeMode={'contain'}
                                style={{width : 35 , height : 35}} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                        More
                    </Text>
                    <View style={{flexDirection : 'row'}}>
                        <BorderlessButton onPress={() => {props.navigation.navigate('notifications')}}>
                            <FastImage source={require('../../assets/icons/notification.png')}
                                       resizeMode={'contain'}
                                       style={{width : 25,height : 25}} />
                        </BorderlessButton>
                    </View>
                </View>
            </ImageBackground>
            <View style={style.moreContainer}>
                <UserInfo />
                <Line />
                <ListItems />

            </View>
    </View>
};

export default MoreTab;
