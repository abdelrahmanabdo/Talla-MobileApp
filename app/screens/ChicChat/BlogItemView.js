import React , {useState , useEffect} from 'react';
import { Text, View, ImageBackground , FlatList , TextInput, SafeAreaView ,TouchableNativeFeedback, KeyboardAvoidingView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, BaseButton   } from 'react-native-gesture-handler';
import EmojiPicker from 'react-native-emoji-picker-staltz';
import Modal from 'react-native-modal';
import moment from 'moment';
import { useSelector } from 'react-redux';

//Styles
import I18n from '../../lang/I18n';
import style from '../../assets/styles/BlogItemStyle';
import GeneralStyle from '../../assets/styles/GeneralStyle';
import Snackbar from '../../components/Snackbar';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

const BlogItemView = props  => {
   const user = useSelector(state => state.user );
   const [blog, setBlog] = useState({});
   const [showEmojis , setShowEmojis] = useState(false);
   const [comment , setComment ] = useState('');
 
   /**
   * Get current blog data
   */
   const getBlogData = () => {
      if (!props.route.params.blogId) return;

      api  
         .get(endpoints.blog + '/' + props.route.params.blogId)
         .then(res => setBlog(res.data.data))
   }

   /**
    * Render Comment
    */
   const renderComment =({item}) => {
      return <View style={[style.commentContainer]}>
            <FastImage source={require('../../assets/icons/default-avatar.png')}
                        resizeMode={'contain'}
                        style={{width : 40 , height : 40 , borderRadius : 20 , flex:.4}} />
            <View style={{marginHorizontal:10 , flex:1.5}}>
              <Text style={[GeneralStyle.secondaryText, {fontSize: 15}]}>
                  Mohamed Ahmed Ali
               </Text>
               <Text style={[GeneralStyle.primaryBoldText , {fontSize : 13}]}>
                  {item.comment}
               </Text>
            </View>
            <Text style={[GeneralStyle.blackText , {fontSize : 13 , flex : .5}]}>
                  {moment(item.created_at).fromNow()}
            </Text>
      </View>
   }



   /**
    * Create New Blog handler
    */
   const submitComment = () => {      
      if (!comment || !user) return; 

      const data = {
            'blog_id': blog.id,
            comment, 
            'commenter_id': user.id, 
            'created_at' : Date()
      }

      api  
         .post(endpoints.blogComment, data)
         .then(() => {
            blog.comments.push(data);
            setBlog({...blog});
            setComment('');
            new Snackbar({text : 'Comment added successfully' , type : 'success'});
         })
         .catch(err => {
            alert(JSON.stringify(err.response.data))
            new Snackbar({text : err.response.data, type : 'danger'});
         });
   }

   useEffect(() => {
      //Get current blog data
      getBlogData();
   }, [])

   return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../../assets/images/colored-bg.png')}
                            resizeMode={'stretch'}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <BorderlessButton style={{flexDirection : 'row'}} onPress={()=>{props.navigation.goBack()}}>
                        <FastImage source={require('../../assets/icons/back-white.png')} style={{width : 25 , height : 25}} />
                        <Text style={[GeneralStyle.headerText, { marginStart : 15}]}>
                           Chic Chat
                        </Text>
                    </BorderlessButton>
                    <View style={{flexDirection : 'row'}}>
                    </View>
                </View>
            </ImageBackground>
            <View style={[style.container]}>
               <View style={[style.userInfoContainer]}>
                  <View style={[style.userInfoBox]}>
                     <FastImage source={require('../../assets/icons/default-avatar.png')}
                              resizeMode={'contain'}
                              style={{width : 40 , height : 40 , borderRadius : 20}} />
                     <View style={{marginHorizontal:15}}>
                        <Text style={[GeneralStyle.secondaryText, {fontSize: 15}]}>
                           {blog.user?.name}
                        </Text>
                        <Text style={[GeneralStyle.blackText]}>
                           {moment(blog.created_at).fromNow()}
                        </Text>
                     </View>
                     <BorderlessButton style={[style.followButton]}>
                        <Text style={[style.followButtonText]}>
                          + Follow
                        </Text>
                     </BorderlessButton>
                  </View>
               </View>
               <View style={[style.blogContentContainer]}>
                     <View style={[GeneralStyle.row]}>
                  {
                     blog.hashtags &&
                           blog.hashtags.map(item => {
                              return <Text style={[GeneralStyle.badge]}>
                                       {item}   
                                    </Text>
                           })
                  }
                  </View>
                  <Text style={[style.blogText]}>
                   {blog?.body}
                  </Text>
               </View>
               <View style={[style.commentsContainer]}>
                  <Text style={[GeneralStyle.blackText, {fontSize : 20}]}>
                     Comments
                  </Text>
                  {
                     blog.comments?.length > 0 ?
                     <FlatList 
                           horizontal={false}
                           showsVerticalScrollIndicator={false}
                           data={blog.comments}
                           keyExtractor={(item,index) => index.toString()}
                           renderItem={renderComment}
                     />
                     :
                     <Text>No comments till now</Text>
                  }
               </View>
            </View>
            <KeyboardAvoidingView style={[style.newCommentContainer]}>
               <TextInput value={comment}
                          onChangeText={(value) => setComment(value)}
                          style={{padding: 10 , flex: 4 , color : '#012647'}}
                          placeholder={'Write Your comment here'}
                          placeholderTextColor={'#CCC'}
                          />
               <View style={{flex:1,flexDirection:'row'}}>
                  <BorderlessButton onPress={()=>setShowEmojis(true)}>
                        <FastImage source={require('../../assets/icons/emoji.png')} 
                                   style={{width : 25 , height : 25 ,marginEnd:10}} />
                  </BorderlessButton>
                  <BorderlessButton onPress={()=>submitComment()}>
                        <FastImage source={require('../../assets/icons/submit-comment.png')} 
                                   style={{width : 25 , height : 25}} />
                  </BorderlessButton>
               </View>
            </KeyboardAvoidingView>
            <Modal visible={showEmojis} 
                  avoidKeyboard={true}
                  animationInTiming={150}
                  animationOutTiming={150}>
               <TouchableNativeFeedback onPress={()=>{setShowEmojis(false)}}
                                        style={{backgroundColor:'#FFF',padding:16 , }}>
                  <Text style={{color : "#012647",fontSize : 17,fontWeight : '700',}}>
                     close
                  </Text>
               </TouchableNativeFeedback>        
               <EmojiPicker
                  onEmojiSelected={(emoji) => setComment(comment + emoji )}
                  rows={7}
                  hideClearButton={true}
                  modalStyle={{zIndex: 1000,}}
                  headerStyle={{color : "#FFF"}}
                  containerStyle={{backgroundColor:'#012647'}}
                  onPressOutside={()=>setShowEmojis(false)}
                  localizedCategories={[ // Always in this order:
                  'Smileys and emotion',
                  'People and body',
                  'Animals and nature',
                  'Food and drink',
                  'Activities',
                  'Travel and places',
                  'Objects',
                  'Symbols',
                  ]}
                  />

            </Modal>
    </View>
}
 
export default BlogItemView;
