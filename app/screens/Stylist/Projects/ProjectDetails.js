import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground , ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton , BorderlessButton  } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

//Styles
import style from '../../../assets/styles/NotificationsStyle';
import GeneralStyle from '../../../assets/styles/GeneralStyle';


const ProjectDetails = props => {
    const [project , setProject] = useState(props.project);

    return <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../../../assets/images/colored-bg.png')}
                            resizeMode={'stretch'}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton onPress={()=>{props.navigation.goBack()}}>
                        <FastImage source={require('../../../assets/icons/back-white.png')} 
                                   style={{width : 25 , height : 25}} 
                                   resizeMode={'contain'}
                        />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                        #Project Name
                    </Text>
                    <BorderlessButton>
                         <FastImage source={require('../../../assets/icons/delete-white.png')} 
                                    style={{width : 25 , height : 25}} 
                                    resizeMode={'contain'}
                        />
                    </BorderlessButton>
                </View>
            </ImageBackground>

            <View style={{flex:1}}>
                <ImageBackground source={require('../../../assets/images/closet-item-default.png')}
                            resizeMode={'stretch'}
                            style={{width :'100%' , height : 300}}>                         
                </ImageBackground>
                <View
                    style={{width : '100%' , backgroundColor: '#F8F8F8', 
                            padding : 20, marginTop : 15,borderRadius : 10}}
                >
                    <Text
                        style={[GeneralStyle.blackText , {lineHeight : 23}]}
                    >
                    Lorem Ipsum has been the industry's Lorem Ipsum has 
                    been the industry's Lorem Ipsum has been the industry's
                    Lorem Ipsum has been the industry'sLorem 
                    Ipsum has been the industry's
                    Lorem Ipsum has been the industry's
                    </Text>
                </View>
           </View>
    </View>
};

export default ProjectDetails;
