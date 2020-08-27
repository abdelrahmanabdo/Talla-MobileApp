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

const config = {
   animation :'spring',
   config: {
     stiffness: 40,
     damping: 40,
     mass: 1,
     restDisplacementThreshold: 0.00,
     restSpeedThreshold: 0.00,      

   },
 };

 const options = {
     headerShown : false,
 }
const Stack = createStackNavigator();

export function AppNavigator () {
   return (
     <Stack.Navigator
      initialRouteName = "Home"
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
         <Stack.Screen name="Home" 
                       component={TabNavigator}
                       options = {{options}}/>
        <Stack.Screen  name="splashScreen" 
                       component={SplashScreen}
                       options = {{options}}/> 
         <Stack.Screen name="onboarding" 
                       component={OnBoarding}
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
    </Stack.Navigator>
   );
}