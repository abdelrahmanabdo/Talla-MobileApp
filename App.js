
import 'react-native-gesture-handler';
import { Root } from 'native-base';
import React, { useEffect ,useState} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import {I18nextProvider} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import { AppNavigator } from './app/navigation/AppNavigator';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import store from './app/redux';
import I18n from './app/lang/I18n';


const App = () => {
  useEffect(()=> {
    SplashScreen.hide();
  });

  return (
    <Provider store={store} >
      <I18nextProvider i18n={I18n}>
        <Root>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
        </Root>
      </I18nextProvider>
    </Provider>
  );
};


export default App;
