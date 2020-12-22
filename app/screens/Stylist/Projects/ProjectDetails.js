import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground , ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton , BorderlessButton  } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

//Styles
import GeneralStyle from '../../../assets/styles/GeneralStyle';

//Apis
import api from '../../../config/api';
import endpoints from '../../../config/endpoints';

const ProjectDetails = props => {
    const [project , setProject] = useState({});

   /**
    * Get current project data
    */
    const getProjectData = () => {
      
      api  
         .get(`${endpoints.stylistProject}/${props.route.params.projectId}`)
         .then(res => setProject(res.data.data));
    }

    useEffect(() => {
      getProjectData();
     }, []);
   
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
                        {project.name}
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
                <ImageBackground source={project.image ? {uri: project.image.image} : require('../../../assets/images/closet-item-default.png')}
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
                        {project.description}
                    </Text>
                </View>
           </View>
    </View>
};

export default ProjectDetails;
