import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground , FlatList  ,Pressable  } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

//Styles
import style from '../../assets/styles/ClosetTabStyle';
import GeneralStyle from '../../assets/styles/GeneralStyle';
import ModalStyle from '../../assets/styles/ModalStyle';

//components
import ClosetItem from '../../components/ClosetItem';
import TallaButton from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Checkbox from '../../components/Checkbox';
import Color from '../../components/Color';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

//
import I18n from '../../lang/I18n';

const ClosetTab = ({...props}) => {
    const [activeTab , setActiveTab ] = useState(1);
    const [activeCategoryIndex , setActiveCategoryIndex ] = useState(1);
    const [showFilterModal , setShowFilterModal ] = useState(false);
    const [showMoreModal , setShowMoreModal ] = useState(false);
    const [categories , setCategories ] = useState([]);
    const [closetItems , setClosetItems ] = useState([]);

    /**
    * Get categories
    */
    const getCategories = () => {
        api  
            .get(endpoints.categories)
            .then(res => setCategories(res.data.data));
    }

    /**
     * 
     * @param 
     * @returns blogs
     */
    const getUserCloset = () => {
        api  
           .get(endpoints.closet)
           .then(res => setClosetItems(res.data.data))
           .catch(err => alert(JSON.stringify(err)))
    }

    /**
    * More Modal
    */
   const MoreModal = () => {
      const [season , setSeason ] = useState(0);

      useEffect(()=>{

      },[season])

      return <Modal  isVisible={showMoreModal}
                     style={{margin: 0,justifyContent:'flex-end'}}
                     backdropOpacity={.7}>
         <View style={ModalStyle.actionModalContainer}>
            <View style={ModalStyle.actionModalHeader}>
               <View></View>
               <Text style={ModalStyle.headerText}>
                  Find More
               </Text>
               <Pressable android_ripple={{color:  ('#D1AD67')}}
                          onPress={()=>{setShowMoreModal(false)}}>
                  <FastImage source={require('../../assets/icons/close-colored.png')}
                              style={{width:25,height:25}} />
               </Pressable>
            </View>
            <View style={{flexDirection:"column"}}>
                <Pressable  style={ModalStyle.selectRow}
                            android_ripple={{color:  ('#D1AD67')}}
                            onPress={()=>{
                                   setShowMoreModal(false);
                                   props.navigation.navigate('favourites') }}>
                    <FastImage source={require('../../assets/icons/mix-and-match.png')}
                               resizeMode={'contain'}
                               style={{width:35,height:35,marginEnd : 20}}/>
                    <Text style={ModalStyle.textBold}>
                        Mix & match
                    </Text>
                </Pressable>
                <Pressable style={ModalStyle.selectRow}
                            android_ripple={{color:  ('#D1AD67')}}
                            onPress={()=>{
                                setShowMoreModal(false);
                                props.navigation.navigate('calendar') }}>
                    <FastImage source={require('../../assets/icons/modal-calendar.png')}
                               resizeMode={'contain'}
                               style={{width:35,height:35,marginEnd : 20}}/>
                    <Text style={ModalStyle.textBold}>
                        Calendar
                    </Text>
                </Pressable>
                <Pressable style={ModalStyle.selectRow}
                            android_ripple={{color:  ('#D1AD67')}}
                            onPress={()=>{
                                setShowMoreModal(false);
                                props.navigation.navigate('favourites') }}>
                    <FastImage source={require('../../assets/icons/modal-favourites.png')}
                               resizeMode={'contain'}
                               style={{width:35,height:35,marginEnd : 20}}/>
                    <Text style={ModalStyle.textBold}>
                        Favourites
                    </Text>
                </Pressable>

            </View>
         </View>
      </Modal>
   }

    /**
    * Filter Modal
    */
   const FilterModal = () => {
        const [season , setSeason ] = useState(0);
        const [colors , setColors ] =useState([]);
        const [brands , setBrands ] =useState([]);
        const [selectedColor , setSelectedColor ] = useState();

        /**
        * Get colors
        */
        const getColors = () => {
            api  
                .get(endpoints.colors)
                .then(res => setColors(res.data.data));
        }

        /**
        * Get brands
        */
        const getBrands = () => {
            api  
                .get(endpoints.brands)
                .then(res => setBrands(res.data.data));
        }

        useEffect(()=>{
            getColors();
            getBrands();
        },[season])

        return <Modal  isVisible={showFilterModal}
                     style={{margin: 0,justifyContent:'flex-end'}}
                     backdropOpacity={.7}>
         <View style={ModalStyle.actionModalContainer}>
            <View style={ModalStyle.actionModalHeader}>
               <View></View>
               <Text style={ModalStyle.headerText}>
                  Filter
               </Text>
               <Pressable android_ripple={{color:  ('#D1AD67')}} 
                         onPress={()=>{setShowFilterModal(false)}}>
                  <FastImage source={require('../../assets/icons/close-colored.png')}
                              style={{width:25,height:25}} />
               </Pressable>
            </View>
            <View style={{flexDirection:"column"}}>
                <View>
                  <Text style={ModalStyle.sectionHeaderText}>
                     Season
                  </Text>
                  <View style={{flexDirection:'row',justifyContent:'flex-start',marginVertical : 8}}>
                     <View style={{flex:1}}>
                        <Checkbox onChange={()=>{setSeason(0)}}
                                 isRounded
                                 isModal
                                 isChecked={season == 0 }
                                 label={'Summer'}/>
                     </View>
                     <View style={{flex:1}}>
                        <Checkbox onChange={()=>{setSeason(1)}}
                                 isRounded
                                 isModal
                                 isChecked={season == 1}
                                 label={'Winter'}/>
                     </View>
                  </View>
                </View>
                <Dropdown items={categories}
                          isModal
                          onChangeValue={()=>{}}
                          name={I18n.t('category')} />
                <Color colors={colors}
                       onChange={colorId => setSelectedColor(colorId)}/>
                <Dropdown items={brands}
                          isModal
                          onChangeValue={()=>{}}
                          name={I18n.t('brand')} />
                <View style={{flexDirection:'row',marginBottom : 10}}>
                    <TallaButton onPress={()=>{ setShowFilterModal(false)}}
                                label={'Done'}
                                isModal
                                labelColor={'#FFF'}
                                style={[ModalStyle.SecondaryButton,{flex:1}]} />
               </View>
            </View>
         </View>
      </Modal>
    }


    /**
     * Get active now category
     * @param {index} param0 
     */
    const getActiveCategory = (index) => {
        setActiveCategoryIndex(index)
    }

    /**
     * Render Category list item
     * @param {} param0 
     */
    const renderCategoryBox = ({item , index}) => {
        console.log(item)
        return <View    key={index}
                        style={GeneralStyle.categoryContainer} >
            <Pressable style={[GeneralStyle.categoryBox,{backgroundColor : activeCategoryIndex == index ? '#D1AD67' : '#FFF',
                                             borderColor : activeCategoryIndex == index ? '#D1AD67' : '#000' }]}
                        android_ripple={{color:  ('#D1AD67')}}
                        onPress={()=>{
                            getActiveCategory(index)
                        }}>
                <FastImage source={activeCategoryIndex == index ? {uri: item.colord_icon} : {uri: item.icon}}
                            resizeMode={'contain'}
                            style={{width:30,height:30}}/>
            </Pressable>
            {
                index == activeCategoryIndex &&  
                <Text style={[GeneralStyle.categoryName]}>
                 {item.name}
                </Text>
            }

        </View>
    }

    /**
     * Render Category list item
     * @param {} param0 
     */
    const renderClosetItem = ({item , index}) => {
        return <ClosetItem key={index} item={item} />
    }


    useEffect(()=>{
        getCategories();
        getUserCloset();
    },[])


    return <View style={[GeneralStyle.container]}>
        <ImageBackground source={require('../../assets/images/colored-bg.png')}
                        resizeMode={'stretch'}
                        style={GeneralStyle.header}>
            <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                <FastImage source={require('../../assets/icons/small-logo-white.png')}
                            resizeMode={'contain'}
                            style={{width : 35 , height : 35}} />
                <Text style={style.headerText}>
                    Your Closet
                </Text>
                <View style={{flexDirection : 'row'}}>
                    <BorderlessButton onPress={() => {setShowFilterModal(true)}}>
                        <FastImage source={require('../../assets/icons/filter.png')}
                                   resizeMode={'contain'}
                                   style={{width : 22 ,height :  22 ,flex:1}} />
                    </BorderlessButton>
                    <BorderlessButton onPress={() => {setShowMoreModal(true)}}>
                        <FastImage source={require('../../assets/icons/more-vertical.png')}
                                   resizeMode={'contain'}
                                   style={{width : 22,height :  22 , marginStart : 14}} />
                    </BorderlessButton>
                </View>
            </View>
            <View style={GeneralStyle.tabButtons}>
                    <RectButton onPress={()=>{setActiveTab(1)}}
                                style={[GeneralStyle.tabButton,{backgroundColor: activeTab == 1 ? '#D1AD67': '#FFF'}]}>
                        <Text style={[GeneralStyle.tabButtonText, { color: activeTab == 1 ? '#FFF': '#D1AD67'}]}>
                            Summer
                        </Text>
                    </RectButton>
                    <RectButton onPress={()=>{ setActiveTab(2)}}
                                style={[GeneralStyle.tabButton, {backgroundColor: activeTab == 2 ? '#D1AD67': '#FFF'}]}>
                        <Text style={[GeneralStyle.tabButtonText, { color: activeTab == 2 ? '#FFF': '#D1AD67'}]}>
                            Winter
                        </Text>
                    </RectButton>
            </View>
        </ImageBackground>
        <View style={style.giftContainer}>
            <FastImage source={require('../../assets/icons/gift.png')}
                        style={{width: 30 , height : 30,marginEnd : 10}} />
            <View style={{width : '90%'}}>
                <Text style={[GeneralStyle.blackBoldText,{marginBottom :2}]}>
                    We have a special gift for you!
                </Text>
                <Text style={[GeneralStyle.blackText,{marginBottom :2}]}>
                 Add up to 30 items or more to join our lovable ritzy Tallah ladies to receive your gift. 
                </Text> 
                {

                }  
                <RectButton style={{alignSelf:'flex-end'}}
                            onPress={()=>{props.navigation.navigate('gift')}}>
                    <Text style={{color : "#D1AD67",textDecorationLine:'underline'}}>
                        {I18n.t('viewGift')} 
                    </Text>
            </RectButton>
            </View>

        </View>

        <View style={[style.categoriesRow]}> 
            <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={(item,index) => index.toString()}
                renderItem={renderCategoryBox}
            />
        </View>
        <View style={[style.closetItemsListContainer]}> 
            <FlatList 
                showsVerticalScrollIndicator={false}
                horizontal = {false}
                keyExtractor={(item,index) => index.toString()}
                numColumns={3}
                data={closetItems}
                renderItem={renderClosetItem}
            />
        </View>
        <FilterModal />
        <MoreModal />
    </View>
};

export default ClosetTab;
