import AsyncStorage from "@react-native-community/async-storage"
import { stat } from "react-native-fs"

   var initialState =  {
      isLoggedIn : false ,
      user :  {},
   }
  
  AsyncStorage.getItem('isLoggedIn').then(val => initialState.isLoggedIn = val)
  AsyncStorage.getItem('user').then(val => initialState.user = JSON.parse(val))

  
  export default function user(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN': {
        return {
          ...state,
          isLoggedIn : true,
          user : action.user ,
          user_token : action.token
        }
      }
      case 'LOGOUT': {
        return {
           isLoggedIn : false,
        }
      }
 
      case 'GET_USER' : {
        return {
          ...state
        }
      }

      case 'UPDATE_USER_PROFILE' : {
        return {
          ...state,
          user: {
            ...state.user,
            profile: action.profile
          }
        }
      }

      default:
        return state
    }
  }