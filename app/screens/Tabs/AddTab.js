import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ImageBackground, FlatList, PanResponder ,
         ScrollView, Animated, Pressable, Dimensions } from 'react-native';
import { RectButton, BorderlessButton, BaseButton,  } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';

//Styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/AddTabStyle';


import Checkbox from '../../components/Checkbox';
import Color from '../../components/Color';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import Snackbar from '../../components/Snackbar';

//
import I18n from '../../lang/I18n';
import Selector from '../../components/Selector';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

const {width} = Dimensions.get('screen');

const AddTab = props => {
    const user = useSelector(state => state.user );
    const [addItemData, setAddItemData] = useState({});
    const [activeTab, setActiveTab ] = useState(1);
    const [addItemActiveTab, setAddItemActiveTab ] = useState(1);
    const [categories , setCategories ] = useState([]);
    const [brands , setBrands ] = useState([]);
    const [colors, setColors ] = useState([]);

    /**
    * Get categories
     */
    const getCategories = () => {
        api  
            .get(endpoints.categories)
            .then(res => setCategories(res.data.data))
    }

    /**
    * Get colors
     */
    const getColors = () => {
        api  
            .get(endpoints.colors)
            .then(res => setColors(res.data.data))
    }


    /**
    * Get brands
     */
    const getBrands = () => {
        api  
            .get(endpoints.brands)
            .then(res => setBrands(res.data.data))
    }

    useEffect(() => {
        getCategories();
        getBrands();
        getColors();
    }, [])

    /**
     * Active tab
     */
    const AddItemFirstTab = () => {
        const [selectedSeason , setSelectedSeason ] = useState(1);
        const [activeCategory, setActiveCategory ] = useState(1);
        const [selectedColor , setSelectedColor ] = useState(1);

        /**
         * Go to step two
         */
        const navigateToStepTwo = () => {
            setAddItemData({
                ...addItemData,
                'category_id': categories[activeCategory].id,
                'color_id': colors[selectedColor].id,
                'season': selectedSeason  
            })
            setAddItemActiveTab(2);
        }

        /**
         * Render Category list item
         * @param {} param0 
         */
        const renderCategoryBox = ({item , index}) => {
            return <View    key={index}
                            style={GeneralStyle.categoryContainer} >
                <Pressable style={[GeneralStyle.categoryBox,{backgroundColor : activeCategory == index ? '#D1AD67' : '#FFF',
                                   borderColor : activeCategoryIndex == index ? '#D1AD67' : '#000' }]}
                            android_ripple={{color:  ('#D1AD67')}}
                            onPress={() => setActiveCategory(index) }>
                    <FastImage source={activeCategoryIndex == index ? item.iconActive : item.icon}
                                resizeMode={'contain'}
                                style={{width:30,height:30}}/>
                </Pressable>
                {
                    index === activeCategory &&  
                    <Text style={[GeneralStyle.categoryName , {fontWeight:'700'}]}>
                        {item.name}
                    </Text>
                }
            </View>
        }

        return <ScrollView style={style.tabContainer}>
            {
                categories.length > 0 && colors.length > 0 ?
                <>
                    <Text style={[style.sectionHeaderText , {marginStart : 15}]}>
                        {I18n.t('category')}
                    </Text>
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
                                <Checkbox   onChange={active => setSelectedSeason(active && selectedSeason === 2 ? 3 : 1) }
                                            isRounded
                                            isModal
                                            isChecked={selectedSeason === 1 }
                                            label={'Summer'}/>
                            </View>
                            <View style={{flex:1}}>
                                <Checkbox   onChange={active => setSelectedSeason(active && selectedSeason === 1 ? 3 : 2)}
                                            isRounded
                                            isModal
                                            isChecked={selectedSeason == 2}
                                            label={'Winter'}/>
                            </View>
                        </View>
                        <Color colors={colors}
                            onChange={colorId => setSelectedColor(colorId)}/>
                        <Button label ={'Next'}
                                style={{width : '98%' , padding : 15}}
                                onPress={navigateToStepTwo}
                                labelColor={'#FFF'}/>
                    </View>
                </>
                :
                <FastImage 
                    source={require('../../assets/gifs/loader.gif')}
                    style={{width:150, height:150,alignSelf:'center'}}
                    resizeMode={'contain'}
                />
            }
            </ScrollView>
    }

    /**
     * Active tab
     */
    const AddItemSecondTab = () => {
        const [selectedBrand , setSelectedBrand ] = useState(1);
        const [price , setPrice ] = useState('');
        const [comment , setComment ] = useState('');


        /**
         * Save new item handler
         */
        const saveItemHandler = () => {
            setAddItemData({
                ...addItemData,
                'type' : 1,
                'user_id': user.id,
                'brand_id':brands[selectedBrand].id, 
                price,
                comment
            });
            //Submit data to api
            api  
                .post(endpoints.closet, addItemData)
                .then(() => {
                    new Snackbar({text : 'Item added successfully' , type : 'success'});
                })
                .catch(err => {
                    alert(JSON.stringify(err.response.data))
                    new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
                });
        }

        return <>
            <ScrollView style={[style.tabContent , {flex:1.4}]}>
                    <Dropdown items={brands}
                              onChangeValue={val => setSelectedBrand(val)}
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
