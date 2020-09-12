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
      const title = "";
      const message = "";
      const icon = "";

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
         .then((res) => { console.log(res) })
         .catch((err) => { err && console.log(err); });
   }

   return <View style={[style.container]}>
        <View style={[style.actionsSection]}>
            <FastImage  source={blog.user.avatar}
                        style={{height : 50 , width : 40 ,borderRadius : 20}} />
            <View style={{alignItems:'center'}}>
               <AddToFavourites />
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
        <RectButton style={[style.blogSection]}
              onPress={props.onPress}>
            <FastImage  source={require('../assets/images/blog-default.png')}
                        style={[style.blogImage]}
                        resizeMode={'stretch'}/>
            <Text style={[style.blogText]}
                  numberOfLines={3}>
               {blog.title} {blog.title}{blog.title}{blog.title}{blog.title}{blog.title}{blog.title}{blog.title} 
            </Text>
        </RectButton>
    </View>
};

export default BlogBox;
