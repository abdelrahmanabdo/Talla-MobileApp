import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, StatusBar ,FlatList,ScrollView, Image } from 'react-native';
import { Button } from 'native-base';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
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


const CreateProfile = ({...props}) => {
   const user = useSelector(state => state.user );
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
            <Text style={ModalStyle.text}>
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
      const [stepOneData, setStepOneData] = useState({'user_id': user.id});
      const [countries , setCountries] = useState([])
      const [cities , setCities] = useState([
         {
            'id' : 1,
            'name' : 'القاهرة',
            'name_en' : 'Cairo'
         },
      ]);


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
         // if (!stepOneData.avatar) return new Snackbar({text : I18n.t('avatarIsRequired') , type : 'danger'}), false;
   
         if (!stepOneData.phone) return new Snackbar({text : I18n.t('phoneIsRequired') , type : 'danger'}), false;

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
         
         //Submit data to api
         api  
            .post(endpoints.profile, stepOneData)
            .then(res => {
               goToNext();
            })
            .catch(err => {
               new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
            });
      }

      useEffect(() => {
         //Get all countries
         getCountries();
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
                format = 'JPEG'
                photoPickerTitle = {I18n.t('selectPhoto')}
                containerStyle={{borderRadius : 10 ,marginTop : 20}}
                onPhotoSelect={ pic => {
                  if (pic) setStepOneData({ ...stepOneData, avatar: pic})
                }}>
               {
                  stepOneData.avatar ?
                  <Image source={{uri: `data:image/gif;base64,${stepOneData.avatar}`}} 
                         style={style.uploadPictureButton}/>
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
                   color={'#5D0D57'}
            />
            <Dropdown 
               items={countries}
               name={'country'}
               onChangeValue={ value => setStepOneData({ ...stepOneData, country_id: value}) }
            />
            <Dropdown 
               items={cities}
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
      const [selected , setSelected] = useState(0);      
      const [data] = useState([
         {
            id : 1 ,
            image : require('../../assets/images/rectengle-shape.png'),
            label : "Rectengle"
         },
         {
            id : 2 ,
            image : require('../../assets/images/triangle-shape.png'),
            label : "Triangle"
         },
         {
            id : 3 ,
            image : require('../../assets/images/inverted-triangle-shape.png'),
            label : "Inverted triangle"
         },
         {
            id : 4 ,
            image : require('../../assets/images/round-shape.png'),
            label : "Round"
         },
         {
            id : 5 ,
            image : require('../../assets/images/hourglass-shape.png'),
            label : "Hourglass"
         },
         {
            id : 6 ,
            image : require('../../assets/images/not-sure-shape.png'),
            label : "Not sure"
         },
         
      ])

      const renderItem = (item) => {
         return  <Selector isRadio={true}
                           item={item}
                           isCurrentSelected={selected == item.item.id}
                           onSelect={(value)=>{
                              setSelected(value);
                              if(value == 6) props.navigation.navigate('bodyShapeCalculator')
                           }}/>
      }

      useEffect(()=>{

      },[selected]);

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
                        renderItem = {(item)=> renderItem(item)}
                        keyExtractor={(item, index) => index}
                    />
         <TallaButton 
               onPress={goToNext}
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
      const [data] = useState([
         {
            id : 1 ,
            image : require('../../assets/images/warm-hand-color.png'),
            label : "Warm Colors"

         },
         {
            id : 2 ,
            image : require('../../assets/images/cool-hand-color.png'),
            label : "Cool Colors"
         },
         {
            id : 3 ,
            image : require('../../assets/images/nartural-hand-color.png'),
            label : "Nartural Colors"
         },
         
      ])

      const renderItem = (item) => {
         return  <Selector isRadio={true}
                           item={item}
                           isCurrentSelected={selected == item.item.id}
                           onSelect={(value)=>{setSelected(value)}}/>
      }

      useEffect(()=>{},[selected]);

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
               onPress={goToNext}
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
      const [selected , setSelected] = useState(0);      
      const [data] = useState([
         {
            id : 1 ,
            image : require('../../assets/images/mother-type.png'),
            label : "Mother"

         },
         {
            id : 2 ,
            image : require('../../assets/images/mother-to-be-type.png'),
            label : "mother to be"
         },
         {
            id : 3 ,
            image : require('../../assets/images/single-type.png'),
            label : "single"
         },
         {
            id : 4 ,
            image : require('../../assets/images/stay-at-home-type.png'),
            label : "Stay at home"
         },
         {
            id : 5 ,
            image : require('../../assets/images/employee-type.png'),
            label : "employee"
         },
         {
            id : 6 ,
            image : require('../../assets/images/veiled-type.png'),
            label : "Veiled"
         },
         {
            id : 7 ,
            image : require('../../assets/images/business-owner-type.png'),
            label : "Business Owner"
         },
     
      ])

      const renderItem = (item) => {
         return  <Selector isRadio={false}
                           item={item}
                           isCurrentSelected={selected == item.item.id}
                           onSelect={(value)=>{setSelected(value)}}/>
      }

      useEffect(()=>{},[selected]);

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
               onPress={goToNext}
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
      const [selected , setSelected] = useState(0);      
      const [data] = useState([
         {
            id : 1 ,
            image : require('../../assets/images/find-new-look-style.png'),
            label : "Find a new look"

         },
         {
            id : 2 ,
            image : require('../../assets/images/make-over-style.png'),
            label : "Total Make-over"
         },
         {
            id : 3 ,
            image : require('../../assets/images/create-unique-style.png'),
            label : "Create unique style"
         },
         {
            id : 4 ,
            image : require('../../assets/images/keep-up-trends.png'),
            label : "Keep  up with tends"
         },
     
      ]);

      const renderItem = (item) => {
         return  <Selector isRadio={false}
                           item={item}
                           isCurrentSelected={selected == item.item.id}
                           onSelect={(value)=>{setSelected(value)}}/>
      }

      useEffect(()=>{},[selected]);

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
               onPress={goToNext}
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
      const [selected , setSelected] = useState(0);      
      const [data] = useState([
         {
            id : 1 ,
            image : require('../../assets/images/classic-style.png'),
            label : "Modern / Chic"

         },
         {
            id : 2 ,
            image : require('../../assets/images/romantice-style.png'),
            label : "Romantice / Feminine"
         },
         {
            id : 3 ,
            image : require('../../assets/images/dramatic-style.png'),
            label : "Dramatic / Edgy"
         },
         {
            id : 4 ,
            image : require('../../assets/images/artistic-style.png'),
            label : "Artistic / Creative"
         },
         {
            id : 5 ,
            image : require('../../assets/images/modern-style.png'),
            label : "Classic / Traditional"

         },
         {
            id : 6 ,
            image : require('../../assets/images/natural-style.png'),
            label : "Natural / Relaxed"
         },
         {
            id : 7 ,
            image : require('../../assets/images/casual-style.png'),
            label : "Casual"
         },
         {
            id : 8 ,
            image : require('../../assets/images/preppy-style.png'),
            label : "Preppy"
         },
         {
            id : 9 ,
            image : require('../../assets/images/tomboy-style.png'),
            label : "Tomboy"

         },
         {
            id : 10 ,
            image : require('../../assets/images/boho-style.png'),
            label : "Boho"
         },
         {
            id : 11 ,
            image : require('../../assets/images/rocker-style.png'),
            label : "Rocker"
         },

      ])

      const renderItem = (item) => {
         return  <Selector isRadio={false}
                           item={item}
                           isCurrentSelected={selected == item.item.id}
                           onSelect={(value)=>{setSelected(value)}}/>
      }

      useEffect(()=>{},[selected]);

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
               onPress={goToNext}
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
