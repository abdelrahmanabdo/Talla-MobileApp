import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ImageBackground, FlatList, PanResponder , ScrollView, Animated, Pressable, Dimensions } from 'react-native';
import { RectButton, BorderlessButton, BaseButton,  } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

//Styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/AddTabStyle';


import Checkbox from '../../components/Checkbox';
import Color from '../../components/Color';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';

//
import I18n from '../../lang/I18n';
import Selector from '../../components/Selector';
const {width} = Dimensions.get('screen');

const AddTab = props => {
    const [activeTab , setActiveTab ] = useState(1);
    const [addItemActiveTab , setAddItemActiveTab ] = useState(1);
    const [activeCategoryIndex , setActiveCategoryIndex ] = useState(1);

    const [categories , setCategories ] = useState([
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger-active.png'),
            name : 'test',
            name_en : 'test',
            
        },
        {
            icon : require('../../assets/icons/dress.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses',
            name_en : 'Dresses',
        },
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger-active.png'),
            name : 'test',
            name_en : 'test',

        },
        {
            icon : require('../../assets/icons/dress.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses',
            name_en : 'Dresses',

        },
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger-active.png'),
            name : 'test',
            name_en : 'test',

        },
        {
            icon : require('../../assets/icons/dress.png'),
            iconActive : require('../../assets/icons/dress-active.png'),
            name : 'Dresses',
            name_en : 'Dresses',

        },
        {
            icon : require('../../assets/icons/hanger.png'),
            iconActive : require('../../assets/icons/hanger-active.png'),
            name : 'test',
            name_en : 'test',
        },
    ]);




    /**
     * Active tab
     */
    const AddItemFirstTab = () => {
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
            return <View    key={index}
                            style={GeneralStyle.categoryContainer} >
                <Pressable style={[GeneralStyle.categoryBox,{backgroundColor : activeCategoryIndex == index ? '#D1AD67' : '#FFF',
                                                borderColor : activeCategoryIndex == index ? '#D1AD67' : '#000' }]}
                            android_ripple={{color:  ('#D1AD67')}}
                            onPress={()=>{
                                getActiveCategory(index)
                            }}>
                    <FastImage source={activeCategoryIndex == index ? item.iconActive : item.icon}
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

        return <View style={style.tabContainer}>
                <FlatList 
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={categories}
                                keyExtractor={(item,index) => index.toString()}
                                renderItem={renderCategoryBox}
                            />
                <View style={style.tabContent}>
                    <Text style={style.sectionHeaderText}>
                        Season
                    </Text>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',marginVertical : 8}}>
                        <View style={{flex:1}}>
                            <Checkbox   onChange={()=>{setSeason(0)}}
                                        isRounded
                                        isModal
                                        isChecked={season == 0 }
                                        label={'Summer'}/>
                        </View>
                        <View style={{flex:1}}>
                            <Checkbox   onChange={()=>{setSeason(1)}}
                                        isRounded
                                        isModal
                                        isChecked={season == 1}
                                        label={'Winter'}/>
                        </View>
                    </View>
                    <Color colors={colors}
                        onChange={colorId => setSelectedColor(colorId)}/>
                    <Button label ={'Next'}
                            style={{width : '98%' , padding : 15}}
                            onPress={()=>{setAddItemActiveTab(2)}}
                            labelColor={'#FFF'}/>
                </View>
            </View>
    }

    /**
     * Active tab
     */
    const AddItemSecondTab = () => {
        const [selectedBrand , setSelectedBrand ] = useState();
        const [price , setPrice ] = useState('');
        const [comment , setComment ] = useState('');


        /**
         * Save new item handler
         */
        const saveItemHandler = () => {
            alert('New item Added')
        }

        return <>
            <ScrollView style={[style.tabContent , {flex:1.4}]}>
                    <Dropdown items={categories}
                            onChangeValue={()=>{}}
                              name={I18n.t('brand')} />
                    <Input  name={I18n.t('price')}
                            color={'#000'}
                            onPress={(value)=>{setPrice(value)}} />
                    <Input  name={I18n.t('comment')} 
                            onChange={(value)=>{setComment(value)}}
                            isTextarea 
                            color={'#000'}
                            rowsCount={3} />             

            </ScrollView>
            <Button label ={'Save'}
                            style={{width : '90%',padding : 15}}
                            onPress={saveItemHandler}
                            labelColor={'#FFF'}/>
            </>
    }


    /**
     * Add out fit tab
     * */    
    const AddOutfitTab = () => {
        const [seasons] = useState([
            {
                id : 1 ,
                name : 'Summer',
                name_en : 'Summer',
            },
            {
                id : 2 ,
                name : 'Winter',
                name_en : 'Winter',
            }
        ]);
        const [items , setItems] = useState([        
        {
            id : 1,
            image : require('../../assets/icons/closet-item-default.png'),
            name : 'test',
            name_en : 'Summer',
        },
        {
            id : 2,
            image : require('../../assets/icons/closet-item-default.png'),
            name : 'Dresses',
            name_en : 'Summer',
        },
        {
            id : 3,
            image : require('../../assets/icons/closet-item-default.png'),
            name : 'test',
            name_en : 'Summer',
        },
        {
            id : 4,
            image : require('../../assets/icons/closet-item-default.png'),
            name : 'Dresses',
            name_en : 'Summer',
        },

        ,]);
        const [selectedItem , setSelectedItem] = useState();
        const [selectedItems , setSelectedItems] = useState([]);
        const pan = selectedItems.map(() => new Animated.ValueXY() );

        function getPanResponder(index) {
                return PanResponder.create({
                    onMoveShouldSetPanResponder: () => true,
                    onStartShouldSetPanResponder: () => true,
                    onPanResponderGrant: () => {
                      pan[index].setOffset({
                        x: pan[index].x._value,
                        y: pan[index].y._value
                      });
                    },
                    onPanResponderMove              : Animated.event([null,{
                        dx  : pan[index].x,
                        dy  :  pan[index].y
                    }]),
                    onPanResponderRelease: () => {
                      pan[index].flattenOffset();
                    }
                });    
        }
    
        

        const renderItem = ({item}) => {
            return <Selector item={{item}}
                             style={{width : width  / 3 - 20}}
                             hideText
                             isCurrentSelected={selectedItem == item.id}
                             onSelect={(value)=>{
                                setSelectedItem(value);
                                selectedItems.push(item);
                                setSelectedItems([...selectedItems])
                             }}/>
        }


        useEffect(()=>{
        },[selectedItems])

        return <View style={style.outfitContainer}>
            <View style={style.geastureContainer}>
                {selectedItems.map((item,index)=> {
                    return <Animated.View  style={{transform: [{ translateX: pan[index].x }, { translateY: pan[index].y }] }}
                                           {...getPanResponder(index).panHandlers}>
                        <ImageBackground style={style.selectedItemContainer}
                                                resizeMode={'contain'}
                                                source={ item.image ?? require('../../assets/images/closet-item-default.png')}>
                            <BaseButton onPress={() => {alert('faa')}}
                                        style={{alignSelf : 'flex-end',marginEnd : 5 , marginTop : 5}}>
                                <FastImage source={require('../../assets/icons/close-bg.png')}
                                           resizeMode={'contain'}
                                           style={{width : 20 , height : 20}} />
                            </BaseButton>
     
                        </ImageBackground>
                    </Animated.View> 
                })}
            </View>
            <View style={style.whiteBox}>
                <View style={{flexDirection : 'row'}}>
                    <Dropdown   items={seasons}
                                isConfirmable
                                style={{width : '49%'}}
                                onChangeValue={()=>{}}
                                name={I18n.t('Season')} />
                    <Dropdown   items={categories}
                                style={{width : '49%',marginStart:5}}
                                isConfirmable
                                onChangeValue={()=>{}}
                                name={I18n.t('category')} />
                </View>
                <FlatList 
                    contentContainerStyle={[style.favoruitesListContainer]}
                    showsVerticalScrollIndicator={false}
                    horizontal = {false}
                    keyExtractor={(item,index) => index.toString()}
                    numColumns={3}
                    data={items}
                    renderItem={renderItem}
                />
                <Button label={'Save'} 
                        labelColor={'#FFF'}
                        style={{position: 'absolute', bottom : 5 ,width : '98%',padding :15}} />
            </View>
        </View>
    }



    return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../../assets/images/colored-bg.png')}
                            style={GeneralStyle.header}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton>
                         <FastImage source={require('../../assets/icons/small-logo-white.png')}
                                    resizeMode={'contain'}
                                    style={{width : 35 , height : 35}} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                        Add
                    </Text>
                    <View>
                    </View>
                </View>
                <View style={GeneralStyle.tabButtons}>
                    <RectButton onPress={()=>{setActiveTab(1);setAddItemActiveTab(1)}}
                                style={[GeneralStyle.tabButton,{backgroundColor: activeTab == 1 ? '#D1AD67': '#FFF'}]}>
                        <Text style={[GeneralStyle.tabButtonText, { color: activeTab == 1 ? '#FFF': '#D1AD67'}]}>
                            Add item
                        </Text>
                    </RectButton>
                    <RectButton onPress={()=>{ setActiveTab(2)}}
                                style={[GeneralStyle.tabButton, {backgroundColor: activeTab == 2 ? '#D1AD67': '#FFF'}]}>
                        <Text style={[GeneralStyle.tabButtonText, { color: activeTab == 2 ? '#FFF': '#D1AD67'}]}>
                            Add outfit
                        </Text>
                    </RectButton>
                </View>
            </ImageBackground>
            <View style={style.container}>
                {
                    activeTab  == 1 ?
                    <>
                    <View style={style.imageContainer}>
                        <ImageBackground source={require('../../assets/images/add-tab-bg.png')}
                                        style={style.imageBackground}
                                        resizeMode={'stretch'}>
                            {
                                addItemActiveTab == 1 &&  <BorderlessButton style={style.editIcon}>
                                    <FastImage  source={require('../../assets/icons/edit.png')}
                                                style={{width : 30 , height : 30}}
                                                resizeMode={'contain'}/>
                                </BorderlessButton>
                            }
                        </ImageBackground>
                    </View>
                    {
                    addItemActiveTab == 1 ?
                        <AddItemFirstTab />
                        :
                        <AddItemSecondTab />
                    }

                    </>
                    :
                    <AddOutfitTab />
                }
            </View>
    </View>
};

export default AddTab;
