import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, StatusBar, FlatList , ScrollView, Dimensions } from 'react-native';
import { RectButton, BorderlessButton, BaseButton } from 'react-native-gesture-handler';

//Styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/ChicChatTabStyle';
import FastImage from 'react-native-fast-image';
import Button from '../../components/Button';
import BlogBox from '../../components/BlogBox';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';


const width = Dimensions.get('window').width ;

const ChicChatTab = props => {
    const [activeTab , setActiveTab ] = useState(1);
    const [newBlogs , setNewBlogs ] = useState([
        {
            id : 1 ,
            title : 'title Test'
        },
        {
            id : 4 ,
            title : 'title Test'
        },
        {
            id : 3 ,
            title : 'title Test'
        },
        {
            id : 3 ,
            title : 'title Test'
        }
    ]);

    const [blogs , setBlogs ] = useState([]);


    /**
     * 
     * @param 
     * @returns blogs
     */
    const getBlogs = () => {
        api  
           .get(endpoints.blog)
           .then(res => setBlogs(res.data.data))
           .catch(err => alert(JSON.stringify(err)))
    }

    /**
     * Change Active tab 
     * @var id int
     */
    const changeAvtiveTabe = (tab) => {
        setActiveTab(tab);
    }

    /**
     * Render vertical new blogs
     */
    const renderNewBlogs = ({item}) => {
        return <BaseButton style={[style.newBlogBox]}>
            <ImageBackground source={require('../../assets/images/blog-default.png')}
                             style={{width : '100%' , height : 120 , justifyContent:'flex-end',
                                     borderRadius : 15 , overflow :'hidden'}}>
                <Text style={[style.newBolgText]} numberOfLines = {2}>
                   Lorem Ipsum has been the indus as been the indus as been the indus
                </Text>
            </ImageBackground>
        </BaseButton>
    }



    /**
     * Render vertical new blogs
     */
    const renderBlogBox = ({item}) => {
        return <BlogBox data={item} onPress={ () => {props.navigation.navigate('blogView', {blogId: item.id})}} />
    }

    useEffect(() => {
        //Get all blogs
        getBlogs();
    }, [])

    return  <View style={[GeneralStyle.container]}>
             <StatusBar hidden={false}  barStyle={'light-content'}  backgroundColor={'#012647'}/>
            <ImageBackground source={require('../../assets/images/colored-bg.png')}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton>
                        <FastImage source={require('../../assets/icons/small-logo-white.png')}
                                    resizeMode={'contain'}
                                    style={{width : 35 , height : 35}} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                        Chic Chat
                    </Text>
                    <View style={{flexDirection : 'row'}}>
                        <BorderlessButton onPress={() => {props.navigation.navigate('notifications')}}>
                            <FastImage source={require('../../assets/icons/notification.png')}  
                                       resizeMode={'contain'}
                                       style={{width : 25,height : 25}} />
                        </BorderlessButton>
                        <BorderlessButton onPress={() => {props.navigation.navigate('profile')}}>
                            <FastImage source={require('../../assets/images/girl.png')}
                                    resizeMode={'contain'}
                                    style={{width : 30,height :  30 , marginStart : 14}} />
                        </BorderlessButton>
                    </View>
                </View>
            </ImageBackground>
            <ScrollView>
                <View style={[GeneralStyle.rowSpaceBetween , style.grayContainer]}>
                    <BorderlessButton   style={[style.tabButton , {backgroundColor : activeTab == 1 ? '#D1AD67' : '#FFF'}]}
                                        onPress={() => {changeAvtiveTabe(1)}} >
                        <Text style={[style.tabButtonText , {color : activeTab == 1 ? '#FFF' : '#D1AD67'}]}>
                            All
                        </Text>
                    </BorderlessButton>
                    <BorderlessButton   style={[style.tabButton , {backgroundColor : activeTab == 2 ? '#D1AD67' : '#FFF'}]}
                                        onPress={() => {changeAvtiveTabe(2)}} >
                        <Text style={[style.tabButtonText , {color : activeTab == 2 ? '#FFF' : '#D1AD67'}]}>
                            New
                        </Text>
                    </BorderlessButton>
                    <BorderlessButton   style={[style.tabButton , {backgroundColor : activeTab == 3 ? '#D1AD67' : '#FFF'}]}
                                        onPress={() => {changeAvtiveTabe(3)}} >
                        <Text style={[style.tabButtonText , {color : activeTab == 3 ? '#FFF' : '#D1AD67'}]}>
                            Videos
                        </Text>
                    </BorderlessButton>
                    <BorderlessButton   style={[style.tabButton , {backgroundColor : activeTab == 4 ? '#D1AD67' : '#FFF'}]}
                                        onPress={() => {changeAvtiveTabe(4)}} >
                        <Text style={[style.tabButtonText , {color : activeTab == 4 ? '#FFF' : '#D1AD67'}]}>
                            Popular
                        </Text>
                    </BorderlessButton>
                </View>
                <View >
                    <Text style={[GeneralStyle.blackBoldText , {fontSize : 16 , margin:12}]}>
                            What's New ?
                    </Text>
                    <FlatList 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={newBlogs}
                        style={{backgroundColor: '#F8F8F8', paddingVertical : 15, marginHorizontal : 4}}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={renderNewBlogs}
                    />
                </View>
                <View style={{ width : width}}>
                    <FlatList 
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            data={blogs}
                            contentContainerStyle={{ paddingVertical : 5, marginHorizontal : 6}}
                            keyExtractor={(item,index) => index.toString()}
                            renderItem={renderBlogBox}
                        />
                </View>
            </ScrollView>
            <View>
                <Button 
                    label={'Write with us'}
                    labelColor={'#FFF'}
                    style={{width : '93%'}}
                    onPress={()=>{props.navigation.navigate('chicChatIntro')}}
                />
            </View>
    </View>
};

export default ChicChatTab;
