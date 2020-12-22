import React , {useState} from 'react';
import { Text, View, ImageBackground , FlatList , ScrollView, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton , BaseButton } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { Button } from 'native-base';
import ImagePicker from 'react-native-image-picker';

//Styles
import style from '../../assets/styles/NewBlogStyle';
import GeneralStyle from '../../assets/styles/GeneralStyle';
import NewBlogStyle from '../../assets/styles/NewBlogStyle';
import ModalStyle from '../../assets/styles/ModalStyle';

import I18n from '../../lang/I18n';
import Input from '../../components/Input';
import Snackbar from '../../components/Snackbar';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

const NewBlog = props  => {
   const user = useSelector(state => state.user.user);
   const [showModal, setShowModal ] = useState(false);
   const [title, setTitle ] = useState('');
   const [body, setBody ] = useState('');
   const [images , setImages ] = useState([]);
   const [hashtags, setHashtags ] = useState([]);
   const [currentHashtag, setCurrentHashtag ] = useState('');
   const [isLoadig, setIsLoadig] = useState(false)

  /**
    * Remove image from list of images
    */
  const removeImage = index => {
      images.splice(index,1);
      setImages([...images]);
  }
   
   /**
    * Push new hashtag on hashtags
    */
  const pushNewHashtag = () => {
      if(currentHashtag != ''){
         setHashtags([...hashtags , currentHashtag] ,
         setCurrentHashtag(''))
      }
  }

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        images.push('data:'+ response.type +';base64,' + response.data);
        setImages([...images]);
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
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        images.push('data:'+ response.type +';base64,' + response.data);
        setImages([...images]);
      }
    });

  }

   /**
     * Validator
     */
   const validator = () => {
      if (title === '') return new Snackbar({text : I18n.t('titleIsRequired') , type : 'danger'}), false;

      if (body === '') return new Snackbar({text : I18n.t('bodyIsRequired') , type : 'danger'}), false;
   
      return true;
   }
   
   /**
    * Create New Blog handler
    */
   const createNewBlog = () => {
      //if not valid data
      if (!validator())  return ;
      //If user not logged in
      if (!user) return ;

      setIsLoadig(true);

      //Submit data to api
      api  
         .post(endpoints.blog, {
            'user_id': user.id, 
            title, hashtags, body, images
         })
         .then(() => {
            setTitle('');
            setBody('');
            setImages([]);
            setHashtags([]);
            setShowModal(true);
            setIsLoadig(false);
         })
         .catch(err => {
            console.log(err.response)
            new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
            setIsLoadig(false);
         });
   }

   //Submit Modal
   const SubmitModal = () => {
      return <Modal isVisible={showModal}
                     animationIn={'bounceIn'}
                     backdropOpacity={.7}>
         <View style={ModalStyle.container}>
            <FastImage source={require('../../assets/icons/done-modal-icon.png')}
                        resizeMode="contain"
                        style={{width : 60  , height:  60 }}
            />
            <Text style={ModalStyle.text}>
               Your post has been sent for review
            </Text>
            <Button onPress={()=>{setShowModal(false)}}
                        style={ModalStyle.SecondaryButton}>
               <Text style={ModalStyle.SecondaryButtonText}>
                  ok
               </Text>
            </Button>
         </View>
      </Modal>
   }


   /**
     * Render vertical new blogs
     */
   const renderBlogImage = ({item , index}) => {
      return <View style={[style.blogImage]} >
          <ImageBackground source={{uri: item}}
                           style={{width : '100%', height : 120, justifyContent:'flex-start',
                                   borderRadius : 15, overflow :'hidden'}}>
            <BorderlessButton onPress={() => removeImage(index)}>
               <FastImage source={require('../../assets/icons/close-bg.png')} 
                        style={{width : 22, height : 22, alignSelf:'flex-end', margin:5}} />
            </BorderlessButton>
          </ImageBackground>
      </View>
   }

   return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../../assets/images/colored-bg.png')}
                            resizeMode={'stretch'}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <BorderlessButton style={{flexDirection : 'row'}} onPress={()=>{props.navigation.goBack()}}>
                        <FastImage source={require('../../assets/icons/back-white.png')} style={{width : 25 , height : 25}} />
                        <Text style={[GeneralStyle.headerText, { marginStart : 15}]}>
                           Create
                        </Text>
                    </BorderlessButton>
                    <View style={{flexDirection : 'row'}}>
                        <BaseButton style={[NewBlogStyle.postButton]}
                                    enabled={!isLoadig}
                                    onPress={() => {createNewBlog()}}>
                            <Text style={[NewBlogStyle.postButtonText]}>
                               { isLoadig ? 'Posting' : 'Post'}
                            </Text>
                        </BaseButton>
                    </View>
                </View>
            </ImageBackground>
            <ScrollView style={[style.container]}>
               <View style={[style.userInfoContainer]}>
                  <FastImage source={require('../../assets/icons/default-avatar.png')}
                             resizeMode={'contain'}
                             style={{width : 50 , height : 50 , borderRadius : 25}} />
                  <Text style={[GeneralStyle.blackBoldText, {fontSize: 15,marginStart : 15}]}>
                     {user?.name}
                  </Text>
               </View>
               <View>
                  {
                     images.length > 0 && 
                     <FlatList 
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              data={images}
                              style={{backgroundColor: '#F8F8F8', paddingVertical : 15, marginHorizontal : 4}}
                              keyExtractor={(item,index) => index.toString()}
                              renderItem={renderBlogImage}
                     />
                  }        
               </View>
               <View>
                  <Input name={'Title'}
                        placeholderText={I18n.t('title')}  
                        onChangeText={value => setTitle(value)}
                        placeholderColor={'#C3C3C3'}  
                        title={title}
                        color={'#000000'}  
                  />
                  <View style={{flexDirection : 'row' , alignItems : 'center' , justifyContent:'center' , marginHorizontal : 20}}>
                     <Input name={I18n.t('addHashtag')}
                           placeholderText={I18n.t('addHashtag')}  
                           defaultValue={currentHashtag}
                           style={{width : '95%'}}
                           onChangeText={(value) => setCurrentHashtag(value)}
                           placeholderColor={'#C3C3C3'}  
                           color={'#000000'}  
                     />
                     <BorderlessButton style={[style.addCurrentHashtag]}
                                       onPress={pushNewHashtag}> 
                        <FastImage  source={require('../../assets/icons/plus-colored.png')}
                                    resizeMode={'contain'}
                                    style={{width : 30 , height : 30 , borderRadius : 25}} />
                     </BorderlessButton>
                  </View>
                  <View style={[style.hashtagsCcntainer]}>
                     {
                        hashtags.map((hashtag , index) => {
                           return <Text key={index} style={[style.hashtag]}> #{hashtag} </Text>
                        })
                     }
                  </View>
                  <Input name={'Body'}
                        placeholderText={I18n.t('blogBody')}  
                        onChangeText={value => setBody(value)}
                        isTextarea={true}
                        defaultValue={body}
                        placeholderColor={'#C3C3C3'} 
                        color={'#000000'}  
                  />
               </View>
            </ScrollView>
            <SafeAreaView style={[style.actionsContainer]}>
               <View style={{flexDirection : 'row'}}>
                  <BorderlessButton onPress={launchCamera}>
                     <FastImage  source={require('../../assets/icons/camera.png')}
                                 resizeMode={'contain'}
                                 style={{width : 30 , height : 30 , marginStart : 15}} />
                  </BorderlessButton>
                  {/* <BorderlessButton>
                     <FastImage  source={require('../../assets/icons/video.png')}
                                 resizeMode={'contain'}
                                 style={{width : 30 , height : 30 , marginStart : 20 }} />
                  </BorderlessButton> */}
               </View>
               <BorderlessButton onPress={launchImageLibrary}>
                  <FastImage  source={require('../../assets/icons/gallary.png')}
                              resizeMode={'contain'}
                              style={{width : 30 , height : 30 , marginEnd : 15}} />
               </BorderlessButton>
            </SafeAreaView>
            <SubmitModal />
    </View>
}
 
export default NewBlog;
