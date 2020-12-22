import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ImageBackground, FlatList, PanResponder ,
         ScrollView, Animated, Pressable, Dimensions } from 'react-native';
import { RectButton, BorderlessButton, BaseButton,  } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

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
import NotFound from '../../components/NotFound';

const {width} = Dimensions.get('screen');

const AddTab = props => {
    const user = useSelector(state => state.user.user);
    const [addItemData, setAddItemData] = useState({});
    const [activeTab, setActiveTab ] = useState(1);
    const [addItemActiveTab, setAddItemActiveTab ] = useState(1);
    const [image , setImage ] = useState(null);
    const [categories , setCategories ] = useState([]);
    const [brands , setBrands ] = useState([]);
    const [colors, setColors ] = useState([]);

    /**
    * Get categories
    */
    const getCategories = () => {
        api  
            .get(endpoints.categories)
            .then(res => setCategories(res.data.data));
    }

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

    useEffect(() => {
        getCategories();
        getBrands();
        getColors();
    }, []);


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
        setImage('data:'+ response.type +';base64,' + response.data);
        setAddItemData({...addItemData, image: 'data:'+ response.type +';base64,' + response.data});
      }
    });
   }

    /**
     * Active tab
     */
    const AddItemFirstTab = () => {
        const [selectedSeason , setSelectedSeason ] = useState(1);
        const [activeCategoryIndex, setActiveCategoryIndex ] = useState(0);
        const [selectedColor , setSelectedColor ] = useState(1);

        /**
         * Go to step two
         */
        const navigateToStepTwo = () => {
            if (!addItemData.image) return new Snackbar({type: 'danger', text: 'You have to select image for your item'});
            
            setAddItemData({
                ...addItemData,
                'category_id': categories[activeCategoryIndex].id,
                'color_id': selectedColor,
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
                <Pressable style={[GeneralStyle.categoryBox,{backgroundColor : activeCategoryIndex == index ? '#D1AD67' : '#FFF',
                                   borderColor : activeCategoryIndex == index ? '#D1AD67' : '#000' }]}
                            android_ripple={{color:  ('#D1AD67')}}
                            onPress={() => setActiveCategoryIndex(index)}>
                    <FastImage source={activeCategoryIndex == index ? item.icon_colored : item.icon}
                               resizeMode={'contain'}
                               style={{width:30,height:30}}/>
                </Pressable>
                {
                    index === activeCategoryIndex &&  
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
    const AddItemSecondTab = (props) => {
        const [selectedBrand , setSelectedBrand ] = useState(1);
        const [price , setPrice ] = useState('');
        const [comment , setComment ] = useState('');


        /**
         * Save new item handler
         */
        const saveItemHandler = () => {
            // Submit data to api
            api  
                .post(endpoints.closet, 
                {   
                    ...props.firstStepData,
                    'type' : 1,
                    'user_id': user.id,
                    'brand_id':selectedBrand, 
                    price,
                    comment
                })
                .then(() => {
                    setAddItemData({});
                    setAddItemActiveTab(1);
                    new Snackbar({text : 'Item added successfully' , type : 'success'});
                })
                .catch(err => {
                    console.log(JSON.stringify(err.response))
                    new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
                });
        }

        useEffect(() => {
        }, []);

        return <>
            <ScrollView style={[style.tabContent , {flex:1.4}]}>
                    <Dropdown items={brands}
                              onChangeValue={val => setSelectedBrand(val)}
                              name={I18n.t('brand')} />
                    <Input  name={I18n.t('price')}
                            color={'#000'}
                            onChangeText={value => setPrice(value) } />
                    <Input  name={I18n.t('comment')} 
                            onChangeText={value => setComment(value)}
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
            },
        ]);
        const [items , setItems] = useState([]);
        const [selectedItem , setSelectedItem] = useState();
        const [selectedItems , setSelectedItems] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const pan = selectedItems.map(() => new Animated.ValueXY() );
        
        /**
         * Get current user already added items to can add new outfit
         * @param {*} seasonId // Default the index 0 of seasons
         * @param {*} categoryId // Default the index 0 of categories
         */
        const getUserClosetItems = (seasonId = seasons[0]?.id ?? null,
                                    categoryId = categories[0]?.id ?? null) => {
            setIsLoading(true);

            api  
                .get(`${endpoints.closet}?type=1&season=${seasonId}&category_id=${categoryId}`)
                .then(res => {
                    setItems(res.data.data);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false)
                });
        } 

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
                    onPanResponderMove  : Animated.event([null,{
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

        /**
         * Submit outfit 
         */
        const submitNewOutfit = () => {
            if (selectedItems.length < 2) return new Snackbar({'type' : 'danger' , 'text' : 'You should select at least 2 items'});

            // Submit outfit data to api
            api  
                .post(endpoints.closet, 
                {   
                    'type' : 2,
                    'user_id': user.id,
                    'outfit_items' : [selectedItems.map(item => item.id)]
                })
                .then(() => {
                    setSelectedItems({});
                    setIsLoading(false);
                    new Snackbar({text : 'Outfit added successfully' , type : 'success'});
                })
                .catch(err => {
                    console.log(JSON.stringify(err.response))
                    new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
                });
        }


        useEffect(()=>{
            getUserClosetItems();
        },[])

        return <View style={style.outfitContainer}>
            <View style={style.geastureContainer}>
                {selectedItems.map((item,index)=> {
                    return <Animated.View  style={{transform: [{ translateX: pan[index].x }, { translateY: pan[index].y }] }}
                                           {...getPanResponder(index).panHandlers}>
                        <ImageBackground    style={[style.selectedItemContainer,{borderRadius: 9}]}
                                            resizeMode={'contain'}
                                            source={ item.image ? {uri: item.image} : 
                                                                  require('../../assets/images/closet-item-default.png')}
                        >
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
                                style={{width : '49%'}}
                                onChangeValue={val => getUserClosetItems(val)}
                                name={I18n.t('Season')} />
                    <Dropdown   items={categories}
                                style={{width : '49%',marginStart:5}}
                                onChangeValue={val => getUserClosetItems(seasons[0].id, val)}
                                name={I18n.t('category')} />
                </View>
                {
                    !isLoading && items.length === 0 ?
                    <NotFound 
                        text="OOH! You’re Missing A lot Start add items Now"
                    />
                    :
                    <FlatList 
                        contentContainerStyle={[style.favoruitesListContainer]}
                        showsVerticalScrollIndicator={false}
                        horizontal = {false}
                        keyExtractor={(item,index) => index.toString()}
                        numColumns={3}
                        data={items}
                        renderItem={renderItem}
                    />
                }

                {
                    ( items.length !== 0 || selectedItems.length !== 0 ) 
                    &&
                    <Button 
                        label={'Save'} 
                        labelColor={'#FFF'}
                        style={{position: 'absolute', bottom : 5 ,width : '98%',padding :15}} 
                        onPress={submitNewOutfit}
                    />
                }
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
                        <ImageBackground 
                                source={image ? {uri: image} : require('../../assets/images/add-tab-bg.png')}
                                style={style.imageBackground}
                                resizeMode={'stretch'}
                        >
                            {
                                addItemActiveTab == 1 &&  
                                <BorderlessButton 
                                    style={style.editIcon}
                                    onPress={launchImageLibrary}
                                >
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
                        <AddItemSecondTab firstStepData={addItemData} />
                    }
                    </>
                    :
                    <AddOutfitTab />
                }
            </View>
    </View>
};

export default AddTab;
