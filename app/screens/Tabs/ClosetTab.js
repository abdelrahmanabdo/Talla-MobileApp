import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground , FlatList , ScrollView, StatusBar } from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from 'native-base';
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
import Input from '../../components/Input';
import Color from '../../components/Color';



//
import I18n from '../../lang/I18n';

const ClosetTab = props => {
    const [activeSeason , setActiveSeason ] = useState(1);
    const [activeCategoryIndex , setActiveCategoryIndex ] = useState(1);
    const [showFilterModal , setShowFilterModal ] = useState(false);
    const [showMoreModal , setShowMoreModal ] = useState(false);
    const [closetItems , setClosetItems ] = useState([
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger.png'),
            name : 'test'
        },
        {
            icon : require('../../assets/icons/dress-active.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses'
        },
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger.png'),
            name : 'test'
        },
        {
            icon : require('../../assets/icons/dress-active.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses'
        },
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger.png'),
            name : 'test'
        },
        {
            icon : require('../../assets/icons/dress-active.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses'
        },
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger.png'),
            name : 'test'
        },
        {
            icon : require('../../assets/icons/dress-active.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses'
        },
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger.png'),
            name : 'test'
        },
        {
            icon : require('../../assets/icons/dress-active.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses'
        },
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger.png'),
            name : 'test'
        },
        {
            icon : require('../../assets/icons/dress-active.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses'
        },
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger.png'),
            name : 'test'
        },
        {
            icon : require('../../assets/icons/dress-active.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses'
        },
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger.png'),
            name : 'test'
        },
        {
            icon : require('../../assets/icons/dress-active.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses'
        },
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger.png'),
            name : 'test'
        },
        {
            icon : require('../../assets/icons/dress-active.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses'
        },

    ]);

    const [categories , setCategories ] = useState([
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger.png'),
            name : 'test'
        },
        {
            icon : require('../../assets/icons/dress-active.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses'
        },
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger.png'),
            name : 'test'
        },
        {
            icon : require('../../assets/icons/dress-active.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses'
        },
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger.png'),
            name : 'test'
        },
        {
            icon : require('../../assets/icons/dress-active.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses'
        },
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger.png'),
            name : 'test'
        },

    ]);

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
               <Button transparent  onPress={()=>{setShowMoreModal(false)}}>
                  <FastImage source={require('../../assets/icons/close-colored.png')}
                              style={{width:25,height:25}} />
               </Button>
            </View>
            <View style={{flexDirection:"column"}}>
                <RectButton style={ModalStyle.selectRow}
                            onPress={()=>{
                                   setShowMoreModal(false);
                                   props.navigation.navigate('favourites') }}>
                    <FastImage source={require('../../assets/icons/mix-and-match.png')}
                               resizeMode={'contain'}
                               style={{width:35,height:35,marginEnd : 20}}/>
                    <Text style={ModalStyle.textBold}>
                        Mix & match
                    </Text>
                </RectButton>
                <RectButton style={ModalStyle.selectRow}
                            onPress={()=>{
                                setShowMoreModal(false);
                                props.navigation.navigate('calendar') }}>
                    <FastImage source={require('../../assets/icons/modal-calendar.png')}
                               resizeMode={'contain'}
                               style={{width:35,height:35,marginEnd : 20}}/>
                    <Text style={ModalStyle.textBold}>
                        Calendar
                    </Text>
                </RectButton>
                <RectButton style={ModalStyle.selectRow}
                            onPress={()=>{
                                setShowMoreModal(false);
                                props.navigation.navigate('favourites') }}>
                    <FastImage source={require('../../assets/icons/modal-favourites.png')}
                               resizeMode={'contain'}
                               style={{width:35,height:35,marginEnd : 20}}/>
                    <Text style={ModalStyle.textBold}>
                        Favourites
                    </Text>
                </RectButton>

            </View>
         </View>
      </Modal>
   }

    /**
    * Filter Modal
    */
   const FilterModal = () => {
        const [season , setSeason ] = useState(0);
        const [colors , setColors ] =useState([
          {
            id : 1 ,
            color : '#358C2F'
          },
          {
            id : 2 ,
            color : '#88D7C1'
          },
          {
            id : 3 ,
            color : '#CC8EC1'
          },
          {
            id : 4 ,
            color : '#454B99'
          },
          {
            id : 5 ,
            color : '#D1AD67'
          },
          {
            id : 6 ,
            color : '#76B1D7'
          },
          {
            id : 7 ,
            color : '#F8D965'
          },
          {
            id : 8 ,
            color : '#9F82DE'
          },
          {
            id : 9 ,
            color : '#000000'
          },
        ]);
        const [selectedColor , setSelectedColor ] = useState();


        useEffect(()=>{

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
               <Button transparent  onPress={()=>{setShowFilterModal(false)}}>
                  <FastImage source={require('../../assets/icons/close-colored.png')}
                              style={{width:25,height:25}} />
               </Button>
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
                                 isChecked={season == 0 }
                                 label={'Summer'}/>
                     </View>
                     <View style={{flex:1}}>
                        <Checkbox onChange={()=>{setSeason(1)}}
                                 isRounded
                                 isChecked={season == 1}
                                 label={'Winter'}/>
                     </View>
                  </View>
                </View>
                <Dropdown items={categories} name={I18n.t('category')} />
                <Color colors={colors}
                       onChange={colorId => setSelectedColor(colorId)}/>
                <Dropdown items={categories} name={I18n.t('brand')} />
                <View style={{flexDirection:'row',marginBottom : 10}}>
 
                    <TallaButton  onPress={()=>{ setShowFilterModal(false)}}
                            label={'Done'}
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
        return <RectButton  key={index}
                            style={style.categoryContainer}
                            onPress={()=>{
                                getActiveCategory(index)
                            }}>
            <View style={[style.categoryBox,{backgroundColor : activeCategoryIndex == index ? '#D1AD67' : '#FFF',
                                             borderColor : activeCategoryIndex == index ? '#D1AD67' : '#000' }]}>
                <FastImage source={activeCategoryIndex == index ? item.iconActive : item.icon}
                            resizeMode={'contain'}
                            style={{width:30,height:30}}/>
            </View>
            {
                index == activeCategoryIndex &&  
                <Text style={[style.categoryName]}>
                 {item.name}
                </Text>
            }

        </RectButton>
    }

    /**
     * Render Category list item
     * @param {} param0 
     */
    const renderClosetItem = ({item , index}) => {
        return <ClosetItem key={index} item={item} />
    }


    useEffect(()=>{
    },[])


    return <View style={[GeneralStyle.container]}>
        <StatusBar hidden={false} />
        <ImageBackground source={require('../../assets/images/colored-bg.png')}
                         style={style.header}>
            <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                <RectButton>
                    <FastImage source={require('../../assets/logo.png')}
                               resizeMode={'contain'}
                               style={{width : 35 , height : 35}} />
                </RectButton>
                <Text style={style.headerText}>
                    Your Closet
                </Text>
                <View style={{flexDirection : 'row'}}>
                    <BorderlessButton onPress={() => {setShowFilterModal(true)}}>
                        <FastImage source={require('../../assets/icons/filter.png')}
                                   resizeMode={'contain'}
                                   style={{width : 25,height :  25}} />
                    </BorderlessButton>
                    <BorderlessButton onPress={() => {setShowMoreModal(true)}}>
                        <FastImage source={require('../../assets/icons/more-vertical.png')}
                                   resizeMode={'contain'}
                                   style={{width : 25,height :  25 , marginStart : 14}} />
                    </BorderlessButton>
                </View>
            </View>
            <View style={style.seasonButtons}>
                    <RectButton onPress={()=>{setActiveSeason(1)}}
                                style={[style.seasonButton,{backgroundColor: activeSeason == 1 ? '#D1AD67': '#FFF'}]}>
                        <Text style={[style.seasonButtonText, { color: activeSeason == 1 ? '#FFF': '#D1AD67'}]}>
                            Summer
                        </Text>
                    </RectButton>
                    <RectButton onPress={()=>{ setActiveSeason(2)}}
                                style={[style.seasonButton, {backgroundColor: activeSeason == 2 ? '#D1AD67': '#FFF'}]}>
                        <Text style={[style.seasonButtonText, { color: activeSeason == 2 ? '#FFF': '#D1AD67'}]}>
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
                <Text>
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
                renderItem={renderCategoryBox}
            />
        </View>
        <View style={[style.closetItemsListContainer]}> 
            <FlatList 
                showsVerticalScrollIndicator={false}
                horizontal = {false}
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
