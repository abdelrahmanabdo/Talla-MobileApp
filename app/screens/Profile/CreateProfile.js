import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, StatusBar ,FlatList,ScrollView, Image } from 'react-native';
import { Button } from 'native-base';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import PhotoUpload from 'react-native-photo-upload'
import Modal from 'react-native-modal';

//Components
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import TallaButton from '../../components/Button';
import Datepicker from '../../components/DatePicker';
import Selector from '../../components/Selector';
import Snackbar from '../../components/Snackbar';

// 
import I18n from '../../lang/I18n';
import style from '../../assets/styles/CreateProfileStyle';
import ModalStyle from '../../assets/styles/ModalStyle';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

import { updateProfile } from '../../redux/actions/user';


const CreateProfile = ({...props}) => {
   const user = useSelector(state => state.user.user);
   const dispatch = useDispatch();
   const [ activeStep, setActiveStep ] = useState(1);
   const [ showModal, setShowModal ] = useState(false);
   const [ modalText, setModalText ] = useState('');


   //Go to Next Step 
   const goToNext = () => {
      activeStep < 6 ? 
                     setActiveStep(activeStep + 1 ) 
                     : null;
      if (activeStep == 6) {
         setModalText('finishCreateAccountText');
         setShowModal(true);
      }
   }

   //Info Modal
   const ThanksModal = () => {
      return <Modal isVisible={showModal}
                     animationIn={'bounceIn'}
                     backdropOpacity={.7}>
         <View style={ModalStyle.container}>
            <Text style={[ModalStyle.text,{lineHeight: 30}]}>
               {I18n.t(modalText)}
            </Text>
            <Button onPress={() => { 
                                    setActiveStep(1);
                                    setShowModal(false);
                                    props.navigation.navigate('profile') 
                                 }}
                        style={ModalStyle.SecondaryButton}>
               <Text style={ModalStyle.SecondaryButtonText}>
                  ok
               </Text>
            </Button>
         </View>
      </Modal>
   }

   // Step One Container
   const StepOne = () => {
      const [stepOneData, setStepOneData] = useState({'user_id': parseInt(user.id)});
      const [countries , setCountries] = useState([])
      const [cities , setCities] = useState([]);


      /**
       * Get Countries
       */
      const getCountries = () => {
         api  
            .get(endpoints.countries)
            .then(res => setCountries(res.data.data))
      }

      /**
       * Validator
       */
      const validator = () => {
         if (!stepOneData.phone) return new Snackbar({text : I18n.t('phoneIsRequired') , type : 'danger'}), false;

         if (stepOneData.phone.length < 11) return new Snackbar({text : I18n.t('phoneLengthLongerThan11') , type : 'danger'}), false;

         if (!stepOneData.country_id) return new Snackbar({text : I18n.t('countryIsRequired') , type : 'danger'}), false;

         if (!stepOneData.city_id) return new Snackbar({text : I18n.t('cityIsRequired') , type : 'danger'}), false;

         if (!stepOneData.birth_date) return new Snackbar({text : I18n.t('birthdateIsRequired') , type : 'danger'}), false;
   
         return true;
      }

      /**
       * Step one submition handler
       */
      const stepOneSubmit = () => {
         //if not valid data
         if (!validator()) return
         
         if (!stepOneData.avatar) setStepOneData({...stepOneData, avatar: user.profile.avatar});

         //Submit data to api
         api  
            .post(endpoints.profile, stepOneData)
            .then(res => {
               //Update redux stored user profile
               dispatch(updateProfile({...user.profile, ...stepOneData}));
               //Navigate to next step
               goToNext();
            })
            .catch(err => {
               console.log(err.response)
               new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
            });
      }

      useEffect(() => {
         //Get all countries
         getCountries();
         
         //restore previous registered data
         if (user.profile) {
            setStepOneData({
               ...stepOneData,
               avatar: user.profile.avatar,
               phone:  user.profile.phone,
               country_id: user.profile.country_id,
               city_id: user.profile.city_id,
               birth_date: user.profile.birth_date
            })
         }

         return () => {}
      },[])

      return (
         <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={style.stepHeaderText}>
               {I18n.t('uploadYourPicture')}
            </Text>
            <PhotoUpload
               imagePickerProps={{  title: I18n.t('selectAvatar'),
                              takePhotoButtonTitle : I18n.t('takeCameraPhoto'),
                              chooseFromLibraryButtonTitle :  I18n.t("chooseFromLibrary"),
                              cancelButtonTitle :  I18n.t('cancel')
                }}
                format = 'PNG'
                photoPickerTitle = {I18n.t('selectPhoto')}
                containerStyle={{borderRadius : 10 ,marginTop : 20}}
                onPhotoSelect={ pic => {
                   console.log(pic)
                  //  pic = 
                  if (pic) setStepOneData({ ...stepOneData, avatar: 'data:image/png;base64,' + pic})
                }}
            >
               {
                  stepOneData.avatar ?
                  <Image source={{uri:stepOneData.avatar}} 
                         style={style.uploadPictureButton}
                  />
                  :
                  <RectButton style={style.uploadPictureButton}>
                     <FastImage  source={require('../../assets/icons/camera.png')}
                                 resizeMode="contain"
                                 style={{width : 30 , height:30}}/>
                     <Text style={{color : '#FFF' ,textAlign : 'center',width:'60%'}}>Upload Your Picture</Text>
                  </RectButton>
               }
            </PhotoUpload>
            <Input name={I18n.t('phone')} 
                   placeholderText={I18n.t('phone')}  
                   isNumeric={true}                
                   onChangeText={ value => setStepOneData({ ...stepOneData, phone: value}) }
                   placeholderColor={'#5D0D57'} 
                   defaultValue={stepOneData.phone}
                   color={'#5D0D57'}
            />
            <Dropdown 
               items={countries}
               name={'country'}
               onChangeValue={ value => setStepOneData({ ...stepOneData, country_id: value}) }
            />
            <Dropdown 
               items={countries}
               name={'city'}
               onChangeValue={ value => setStepOneData({ ...stepOneData, city_id: value}) }
            />
            <Datepicker 
               isCalendar = {true}
               name={'Birth Date'}
               onChangeValue={ value => setStepOneData({ ...stepOneData, birth_date: value}) }
            />
            <TallaButton 
               onPress={stepOneSubmit}
               label = {I18n.t('next')}
               bgColor = "#D1AD67"
               style={{padding: 15 , width: '91%'}}
               labelColor = "#FFF"
            />
         </ScrollView>
      )
   }

   // Step Two Container
   const StepTwo= () => {
      const [selected , setSelected] = useState();      
      const [data, setData] = useState([])


      /**
       * Get Body shape choices
       */
      const getBodyShapeChoices = async () => {
         await api  
                  .get(endpoints.registrationChoices + '?type=body_shape')
                  .then(res => setData(res.data.data));
      }

      const renderItem = (item, index) => {
         return  <Selector isRadio={true}
                           item={item}
                           isCurrentSelected={selected == item.item.id}
                           onSelect={ value => {
                              setSelected(value);
                              if(value == 6) props.navigation.navigate('bodyShapeCalculator')
                           }}/>
      }

      /**
       * Submit current step handler
       */
      const submitStep = () => {
         if (!selected) return new Snackbar({text : I18n.t('shouldSelectOneAtLeast') , type : 'danger'});  

         //Submit data to api
         api  
            .put(endpoints.profile + '/' + user.profile.id, {
               'body_shape_id' : selected
            })
            .then(res => {
               //Update redux stored user profile
               dispatch(updateProfile({...user.profile, 'body_shape_id' : selected}));
               //Navigate to next step
               goToNext();
            })
            .catch(err => {
               console.log(err.response)
               new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
            });
      }

      useEffect(()=>{
         getBodyShapeChoices();
 
         //restore previous registered data
         if (user.profile) {
            setSelected(user.profile.body_shape_id);
         }

      },[]);

      return (
         <>
          <Text style={style.stepHeaderText}>
             {I18n.t('howUniqueYourBody')}
          </Text>
          <FlatList  contentContainerStyle={{alignSelf:'center',marginVertical: 10}}
                     horizontal={false}
                     data={ data}
                     numColumns={2}
                     key={( 'h' )}
                     renderItem = {(item, index)=> renderItem(item, index)}
                     keyExtractor={(item, index) => index}
                    />
         <TallaButton 
               onPress={submitStep}
               label = {I18n.t('next')}
               bgColor = "#D1AD67"
               style={{padding: 15 , width: '91%'}}
               labelColor = "#FFF"
            />
      </>
      )
   }


   // Step Three Container
   const StepThree = () => {
      const [selected , setSelected] = useState(0);      
      const [data, setData] = useState([])

      /**
       * Get Body shape choices
       */
      const getSkinColorsChoices = () => {
         api  
            .get(endpoints.registrationChoices + '?type=skin_glow')
            .then(res => setData(res.data.data))
      }

      const renderItem = (item) => {
         return  <Selector isRadio={true}
                           item={item}
                           isCurrentSelected={selected == item.item.id}
                           onSelect={(value)=>{setSelected(value)}}/>
      }

      /**
       * Submit current step handler
       */
      const submitStep = () => {
         if (!selected) return new Snackbar({text : I18n.t('shouldSelectOneAtLeast') , type : 'danger'});  

         //Submit data to api
         api  
            .put(endpoints.profile + '/' + user.profile.id, {
               'skin_glow_id' : selected
            })
            .then(res => {
               //Update redux stored user profile
               dispatch(updateProfile({...user.profile, 'skin_glow_id' : selected}));
               //Navigate to next step
               goToNext();
            })
            .catch(err => {
               console.log(err.response)
               new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
            });
      }

      useEffect(()=>{
         getSkinColorsChoices();
         
         //restore previous registered data
         if (user.profile) {
            setSelected(user.profile.skin_glow_id)
         }

         return () => {}
      },[]);

      return (
         <>
          <Text style={style.stepHeaderText}>
             {I18n.t('whichSkinColor')}
          </Text>
          <Text style={style.note}>
             {I18n.t('whichSkinColorNote')}
          </Text>
          <FlatList  contentContainerStyle={{alignSelf:'center',marginVertical: 10}}
                     horizontal={false}
                     data={ data}
                     numColumns={2}
                     key={( 'h' )}
                     renderItem = {(item)=> renderItem(item)}
                     keyExtractor={(item, index) => index}
         />
         <TallaButton 
               onPress={submitStep}
               label = {I18n.t('next')}
               bgColor = "#D1AD67"
               style={{padding: 15 , width: '91%'}}
               labelColor = "#FFF"
            />
      </>
      )
   }

   // Step Four Container
   const StepFour = () => {
      const [selectedIds , setSelectedIds] = useState([]);      
      const [selectedData , setSelectedData] = useState([]);      
      const [data, setData] = useState([]);

      /**
       * Get Body shape choices
       */
      const getJobChoices = () => {
         api  
            .get(endpoints.registrationChoices + '?type=job')
            .then(res => setData(res.data.data))
      }

      const renderItem = (item) => {
         return  <Selector item={item}
                           isCurrentSelected={selectedIds.includes(item.item.id)}
                           onSelect={value => {
                              if (selectedIds.includes(value)) {
                                 //Remove item from selected ids
                                 setSelectedIds(selectedIds.filter(item => item !== value));
                                 //Remove item from final selected data object
                                 setSelectedData(selectedData.filter(item => item.id !== value));
                              } else {
                                 //If user selected 3 choices and reached his limit
                                 if (selectedIds.length === 3) return new Snackbar({text : I18n.t('maximun3') , type : 'danger'}); 
                                 setSelectedIds([...selectedIds, value]);
                                 setSelectedData([...selectedData, {id: value, title: item.item.title}])
                              }
                           }}
                  />
      }

      /**
       * Submit current step handler
       */
      const submitStep = () => {
         if (selectedIds.length === 0) return new Snackbar({text : I18n.t('shouldSelectOneAtLeast') , type : 'danger'});  

         //Submit data to api
         api  
            .put(endpoints.profile +'/'+ user.profile.id, {
               'job_id' : selectedData
            })
            .then(res => {
               //Update redux stored user profile
               dispatch(updateProfile({...user.profile,'job_id' : selectedData}));
               //Navigate to next step
               goToNext();
            })
            .catch(err => {
               new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
            });
      }

      useEffect(()=>{
         getJobChoices();
         
         //restore previous registered data
         if (user.profile) {
            let selected = user.profile.job_id ?
                           user.profile.job_id.map(item => item.id)
                           : [];
            setSelectedIds([...selected]);
            setSelectedData(user.profile.job_id);
         }
         
         return () => {}
      },[]);

      return (
         <>
          <Text style={style.stepHeaderText}>
             {I18n.t('youArePretty')}
          </Text>
          <FlatList  contentContainerStyle={{alignSelf:'center',marginVertical: 5}}
                     horizontal={false}
                     data={ data}
                     numColumns={2}
                     key={( 'h' )}
                     renderItem = {(item)=> renderItem(item)}
                     keyExtractor={(item, index) => index}
         />
         <TallaButton 
               onPress={submitStep}
               label = {I18n.t('next')}
               bgColor = "#D1AD67"
               style={{padding: 15 , width: '94%'}}
               labelColor = "#FFF"
            />
      </>
      )
   }

 
   // Step Five Container
   const StepFive = () => {
      const [selectedIds , setSelectedIds] = useState([]);      
      const [selectedData , setSelectedData] = useState([]);      
      const [data, setData] = useState([]);

      /**
       * Get Fashion goal choices
       */
      const getFashionGoalChoices = () => {
         api  
            .get(endpoints.registrationChoices + '?type=goal')
            .then(res => setData(res.data.data))
      }

      const renderItem = (item) => {
         return  <Selector item={item}
                           isCurrentSelected={selectedIds.includes(item.item.id)}
                           onSelect={value => {
                              if (selectedIds.includes(value)) {
                                 //Remove item from selected ids
                                 setSelectedIds(selectedIds.filter(item => item !== value));
                                 //Remove item from final selected data object
                                 setSelectedData(selectedData.filter(item => item.id !== value));
                              } else {
                                 //If user selected 3 choices and reached his limit
                                 if (selectedIds.length === 3) return new Snackbar({text : I18n.t('maximun3') , type : 'danger'}); 

                                 setSelectedIds([...selectedIds, value]);
                                 setSelectedData([...selectedData, {id: value, title: item.item.title}])
                              }
                           }}
                  />
      }

      /**
       * Submit current step handler
       */
      const submitStep = () => {
         if (selectedIds.length === 0) return new Snackbar({text : I18n.t('shouldSelectOneAtLeast') , type : 'danger'});  

         //Submit data to api
         api  
            .put(endpoints.profile + '/' + user.profile.id, {
               'goal_id' : selectedData
            })
            .then(res => {
               //Update redux stored user profile
               dispatch(updateProfile({...user.profile,'goal_id' : selectedData}));
               //Navigate to next step
               goToNext();
            })
            .catch(err => {
               new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
            });
      }

      useEffect(()=>{
         getFashionGoalChoices();

         //restore previous registered data
         if (user.profile) {
            let selected = user.profile.goal_id ? 
                           user.profile.goal_id.map(item => item.id) 
                           : [];
            setSelectedIds([...selected]);
            setSelectedData(user.profile.goal_id);
         }
         return () => {}
      },[]);

      return (
         <>
          <Text style={style.stepHeaderText}>
             {I18n.t('fashionGoal')}
          </Text>

          <FlatList  contentContainerStyle={{alignSelf:'center',marginVertical: 5}}
                        horizontal={false}
                        data={ data}
                        numColumns={2}
                        key={( 'h' )}
                        renderItem = {(item)=> renderItem(item)}
                        keyExtractor={(item, index) => index}
                    />
         <TallaButton 
               onPress={submitStep}
               label = {I18n.t('next')}
               bgColor = "#D1AD67"
               style={{padding: 15 , width: '94%'}}
               labelColor = "#FFF"
            />
      </>
      )
   }
 
   // Step Six Container
   const StepSix = () => {
      const [selectedIds , setSelectedIds] = useState([]);      
      const [selectedData , setSelectedData] = useState([]);      
      const [data, setData] = useState([]);

      /**
       * Get Fashion goal choices
       */
      const getFavouriteStyleChoices = () => {
         api  
            .get(endpoints.registrationChoices + '?type=favourite_style')
            .then(res => setData(res.data.data))
      }

      const renderItem = (item) => {
         return  <Selector isRadio={false}
                           item={item}
                           isCurrentSelected={selectedIds.includes(item.item.id)}
                           onSelect={value => {
                              if (selectedIds.includes(value)) {
                                 //Remove item from selected ids
                                 setSelectedIds(selectedIds.filter(item => item !== value));
                                 //Remove item from final selected data object
                                 setSelectedData(selectedData.filter(item => item.id !== value));
                              } else {
                                 //If user selected 3 choices and reached his limit
                                 if (selectedIds.length === 3) return new Snackbar({text : I18n.t('maximun3') , type : 'danger'});     

                                 setSelectedIds([...selectedIds, value]);
                                 setSelectedData([...selectedData, {id: value, title: item.item.title}])
                              }
                           }}
                  />
      }

      /**
       * Submit current step handler
       */
      const submitStep = () => {
         if (selectedIds.length === 0) return new Snackbar({text : I18n.t('shouldSelectOneAtLeast') , type : 'danger'});  

         //Submit data to api
         api  
            .put(endpoints.profile + '/' + user.profile.id, {
               'favourite_style_id' : selectedData
            })
            .then(res => {
               //Update redux stored user profile
               dispatch(updateProfile({...user.profile,'favourite_style_id' : selectedData}));
               //Navigate to next step
               goToNext();
            })
            .catch(err => {
               new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
            });
      }

      useEffect(()=>{
         getFavouriteStyleChoices();

         //restore previous registered data
         if (user.profile) {
            let selected = user.profile.favourite_style_id ? 
                           user.profile.favourite_style_id.map(item => item.id) 
                           : [];
            setSelectedIds([...selected]);
            setSelectedData(user.profile.favourite_style_id);
         }

         return () => {}
      },[]);

      return (
         <>
          <Text style={style.stepHeaderText}>
             {I18n.t('favouriteStyle')}
          </Text>

          <FlatList  contentContainerStyle={{alignSelf:'center',marginVertical: 5}}
                        horizontal={false}
                        data={ data}
                        numColumns={2}
                        key={( 'h' )}
                        renderItem = {(item)=> renderItem(item)}
                        keyExtractor={(item, index) => index}
                    />
         <TallaButton 
               onPress={submitStep}
               label = {I18n.t('next')}
               bgColor = "#D1AD67"
               style={{padding: 15 , width: '94%'}}
               labelColor = "#FFF"
            />
      </>
      )
   }

   return <View style={style.container}>
       <StatusBar hidden  />
       <ImageBackground source={require('../../assets/images/header-bg.png')}
                        style={style.header}>
            <Text style={style.createProfileText}>
               {I18n.t('completeYourProfile')}
            </Text>
            <View style={style.stepsContainer}>
               <View style={{flex:1}}></View>
               <Text style={style.stepsText}>Step {activeStep} of 6</Text>
               <View
                  style={style.skipButton}
               >
                  <RectButton 
                              onPress={() => props.navigation.navigate('Home')}>
                     <Text style={style.skipText}>
                        {I18n.t('skip')}
                     </Text>
                  </RectButton>
            </View>
            </View>
            <View></View>
       </ImageBackground>
       <View style={style.stepsNumberContainer}>
          <View style={{width : '90%' , alignSelf:'center' , flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <FastImage source={require('../../assets/icons/one.png')}
                          resizeMode="contain"
                          style={style.stepIcon} />
            <View style={style.activeLine}></View>
            <BorderlessButton
               onPress={() => setActiveStep(2)}
            >
               <FastImage  source={ activeStep >= 2 ? require('../../assets/icons/two-active.png') :
                                                   require('../../assets/icons/two-inactive.png')}
                           resizeMode="contain"
                           style={style.stepIcon} />
            </BorderlessButton>
            <View style={activeStep > 2 ? style.activeLine : style.inActiveLine}></View>
            <BorderlessButton
               onPress={() => setActiveStep(3)}
            >
               <FastImage  source={ activeStep >= 3 ? require('../../assets/icons/three-active.png') :
                                                   require('../../assets/icons/three-inactive.png')}
                           resizeMode="contain"
                           style={style.stepIcon} />
            </BorderlessButton>
            <View style={activeStep > 3 ? style.activeLine : style.inActiveLine}></View>
            <BorderlessButton
               onPress={() => setActiveStep(4)}
            >
               <FastImage source={ activeStep >= 4 ? require('../../assets/icons/four-active.png') :
                                                   require('../../assets/icons/four-inactive.png')}
                           resizeMode="contain"
                           style={style.stepIcon} />
            </BorderlessButton>
            <View style={activeStep > 4 ? style.activeLine : style.inActiveLine}></View>
            <BorderlessButton
               onPress={() => setActiveStep(5)}
            >
               <FastImage source={ activeStep >= 5 ? require('../../assets/icons/five-active.png') :
                                                   require('../../assets/icons/five-inactive.png')}
                           resizeMode="contain"
                           style={style.stepIcon} />
            </BorderlessButton>
            <View style={activeStep > 5 ? style.activeLine : style.inActiveLine}></View>
            <BorderlessButton
               onPress={() => setActiveStep(6)}
            >
               <FastImage source={ activeStep == 6 ? require('../../assets/icons/six-active.png') :
                                                   require('../../assets/icons/six-inactive.png')}
                           resizeMode="contain"
                           style={style.stepIcon} />
            </BorderlessButton>
                        
          </View>
       </View> 
       <View style={style.stepProcessContainer}>
          {
            activeStep == 1 ?
               <StepOne />
               :
               (
                  activeStep == 2 ?
                  <StepTwo />
                  :
                  (
                     activeStep == 3 ? 
                     <StepThree />
                     :
                     (
                        activeStep == 4 ?
                        <StepFour />
                        :
                        (
                           activeStep == 5 ?
                           <StepFive /> 
                           :
                           <StepSix />
                        )
                     )
                  )
               ) 
          }

       </View>
       <ThanksModal />
    </View>
};

export default CreateProfile;
