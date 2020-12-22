import React , {useState , useRef, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, ImageBackground , FlatList, SafeAreaView} from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import GeneralStyle from '../../../assets/styles/GeneralStyle';

import TallahButton from '../../../components/Button';
import AddProject from './AddProject';

//Apis
import api from '../../../config/api';
import endpoints from '../../../config/endpoints';

const Projects = props => {
   const stylist = useSelector(state => state.stylist);
   const [projects , setProjects] = useState([]);
   const [showAddModal , setShowAddModal ] = useState(false);
   const navigation = useNavigation();
   const projectRef = useRef(null);


   /**
   * Get current stylist data
   */
   const getStylistProjects = () => {
      const StylistId = props.route.params.stylistId ?? stylist.id ;
      api  
         .get(`${endpoints.stylistProject}/${StylistId}`)
         .then(res => setProjects(res.data.data));
   }

   /**
    * Render project item
    */
   const renderItem = ({item , index}) => {
         return <BorderlessButton 
                  key={index} 
                  style={{flexDirection:'row'  , flexWrap :'wrap' ,
                          width :'29%' , height : 120  , margin: 10 , borderRadius : 5 , overflow:'hidden'}}
                  onPress={() => navigation.navigate('projectDetails')}
               >
               {
                  item?.photos.map((item2 , key) => {
                     return <FastImage 
                        key={key}
                        resizeMode={'contain'}
                        source={{uri: `data:image/gif;base64,${item2}`}}
                        style={{flex:1,height : '100%' , width : '50%' , borderRadius : 5}}
                     />
                  })
               }
         </BorderlessButton>
   } 


   useEffect(() => {
      getStylistProjects();
   }, [])
   return <View style={[GeneralStyle.container]}>
         <ImageBackground source={require('../../../assets/images/colored-bg.png')}
                        resizeMode={'stretch'}
                        style={GeneralStyle.header}>
            <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
               <BorderlessButton style={{flexDirection : 'row'}} 
                                 onPress={()=>{props.navigation.goBack()}}
               >
                     <FastImage source={require('../../../assets/icons/back-white.png')} 
                              style={{width : 25 , height : 25}} 
                              resizeMode={'contain'}/>
                     <Text style={[GeneralStyle.headerText, { marginStart : 15}]}>
                        My Protfolio  
                     </Text>
               </BorderlessButton>
               <View>
               </View>
            </View>
         </ImageBackground>
         {
            projects.length == 0 ?
            <View style={{flex:1 , justifyContent:'center' , alignItems:'center'}}>
               <FastImage
                  source={require('../../../assets/images/wardrobe.png')}
                  style={{width : 120 , height : 120 , marginBottom : 20}}
                  resizeMode={'contain'}
               />
               <Text
                  style={{fontSize : 20 , color : '#ABAAAB'}}
               >
                  No projects added yet
               </Text>
            </View>
            :
            <FlatList 
               //  contentContainerStyle={[style.favoruitesListContainer]}
                showsVerticalScrollIndicator={false}
                horizontal = {false}
                keyExtractor={(item,index) => index.toString()}
                numColumns={3}
                data={projects}
                renderItem={renderItem}
            />
         }
         <SafeAreaView>
                <TallahButton 
                    onPress={() => setShowAddModal(true)}
                    labelColor = "#FFF"
                    label = {'Add Project'}
                    bgColor = "#D1AD67"
                    style={{ padding: 15 , width: '91%' }}
                />
         </SafeAreaView>
   
         <AddProject 
            showModal={showAddModal}
            onCloseModal={() => setShowAddModal(false)}
            onSubmitModal={(newProject) => { 
               setProjects([...projects , newProject]) ;
               setShowAddModal(false);
            }}
         />  
   </View>
};

export default Projects;
