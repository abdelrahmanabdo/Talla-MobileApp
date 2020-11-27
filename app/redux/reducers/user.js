import AsyncStorage from "@react-native-community/async-storage"

   var initialState =  {
      isLoggedIn : false ,
      user :  {},
      cart :  0,
      orders :  0,
   }
  
  AsyncStorage.getItem('isLoggedIn').then((val) => initialState.isLoggedIn = val)
  AsyncStorage.getItem('user').then((val) => initialState.user = val)

  
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
 
      default:
        return state
    }
  }