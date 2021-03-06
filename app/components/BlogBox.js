import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Share from "react-native-share";


// Styles 
import style from '../assets/styles/BlogBoxStyle';

import AddToFavourites from './AddToFavourites';

const BlogBox = props => {
   const [blog , setBlog ] = useState(props.data)


      /**
    * Share Item
    */
   const share = ( ) => {
      const url = "";
      const title = blog.title;
      const message = blog.body;
      const icon = blog.image.image;

      const options = Platform.select({
         ios: {
           activityItemSources: [
             { // For using custom icon instead of default text icon at share preview when sharing with message.
               placeholderItem: {
                 type: 'url',
                 content: icon
               },
               item: {
                 default: {
                   type: 'text',
                   content: `${message} ${url}`
                 },
               },
               linkMetadata: {
                  title: message,
                  icon: icon
               }
             },
           ],
         },
         default: {
           title,
           subject: title,
           message: `${message} ${url}`,
         },
       });

      Share
         .open(options)
         .then(res => { console.log(res) })
         .catch(err => {});
   }

   return <View style={[style.container]}>
        <View style={[style.actionsSection]}>
            <FastImage  source={{uri: blog.user?.profile?.avatar}}
                        style={{height : 50 , width : 50 ,borderRadius : 25}} />
            <View style={{alignItems:'center'}}>
               <AddToFavourites item={blog} />
               <Text style={[style.likesNumber]}>
                  {blog.likes}
               </Text>
            </View>
            <BorderlessButton onPress={()=>{share()}} >
               <FastImage  source={require('../assets/icons/share-colored.png')}
                           style={{width : 25 , height:25}}
                           resizeMode={'contain'}
               />
            </BorderlessButton>
        </View>
        <RectButton rippleColor={'#F8F8F8'} style={[style.blogSection]}
              onPress={props.onPress}>
            <FastImage  source={blog.image ? {uri: blog.image.image} : require('../assets/images/blog-default.png')}
                        style={[style.blogImage]}
                        resizeMode={'stretch'}/>
            <Text style={[style.blogText]}
                  numberOfLines={3}>
               {blog.body}
            </Text>
        </RectButton>
    </View>
};

export default BlogBox;
