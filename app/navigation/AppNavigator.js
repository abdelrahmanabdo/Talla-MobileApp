import React from 'react';
import {createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack';
import {TabNavigator} from './TabNavigator'
import OnBoarding from '../screens/Onboarding';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Auth/Login';
import Registeration from '../screens/Auth/Registeration';
import CreateProfile from '../screens/Profile/CreateProfile';
import BodyShapeCalculator from '../screens/Profile/BodyShapeCalculator';
import Profile from '../screens/Profile/Profile';
import ClosetItemView from '../screens/Closet/ClosetItemView';
import Gift from '../screens/Closet/Gift';
import Favourites from '../screens/Favourites';
import Notifications from '../screens/Notifications';
import Messages from '../screens/Messages';
import Calendars from '../screens/Calendars';
import About from '../screens/About';
import Settings from '../screens/Settings';
import TAndC from '../screens/TAndC';
import Support from '../screens/Support';
import Intro from '../screens/ChicChat/Intro';


const config = {
   animation :'spring',
   config: {
     stiffness: 50,
     damping: 10,
    //  mass: 1,
    //  restDisplacementThreshold: 0.00,
    //  restSpeedThreshold: 0.00,      
   },
 };

 const options = {
     headerShown : false,
 }
const Stack = createStackNavigator();

export function AppNavigator () {
   return (
     <Stack.Navigator
      initialRouteName = "onboarding"
      headerMode = 'none'
      screenOptions = {{
        gestureEnabled : false ,
        gestureDirection : 'horizontal' ,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec : {
        open : config , 
        close : config
        }
      }}>
         <Stack.Screen name="onboarding" 
                       component={OnBoarding}
                       options = {{options}}/>
         <Stack.Screen name="Home" 
                       component={TabNavigator}
                       options = {{options}}/>
        <Stack.Screen  name="splashScreen" 
                       component={SplashScreen}
                       options = {{options}}/>  
         <Stack.Screen name="login" 
                       component={Login}
                       options = {{options}}/> 
         <Stack.Screen name="createProfile" 
                       component={CreateProfile}
                       options = {{options}}/> 
         <Stack.Screen name="profile" 
                       component={Profile}
                       options = {{options}}/> 
         <Stack.Screen name="bodyShapeCalculator" 
                       component={BodyShapeCalculator}
                       options = {{options}}/> 
         <Stack.Screen name="registration" 
                       component={Registeration}
                       options = {{options}}/> 
         <Stack.Screen name="closetItemView" 
                       component={ClosetItemView}
                       options = {{options}}/>
         <Stack.Screen name="gift" 
                       component={Gift}
                       options = {{options}}/>                          
         <Stack.Screen name="favourites" 
                       component={Favourites}
                       options = {{options}}/>   
         <Stack.Screen name="notifications" 
                       component={Notifications}
                       options = {{options}}/>
         <Stack.Screen name="messages" 
                       component={Messages}
                       options = {{options}}/>                                               
         <Stack.Screen name="calendar" 
                       component={Calendars}
                       options = {{options}}/>
         <Stack.Screen name="settings" 
                       component={Settings}
                       options = {{options}}/>
         <Stack.Screen name="about" 
                       component={About}
                       options = {{options}}/>     
         <Stack.Screen name="TAndC" 
                       component={TAndC}
                       options = {{options}}/>     
         <Stack.Screen name="support" 
                       component={Support}
                       options = {{options}}/>   
         <Stack.Screen name="chicChatIntro" 
                       component={Intro}
                       options = {{options}}/>                                            
    </Stack.Navigator>
   );
}