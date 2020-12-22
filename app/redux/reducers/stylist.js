import AsyncStorage from "@react-native-community/async-storage"

  var initialState =  {ada:'dad'}
  
  AsyncStorage.getItem('stylist').then(val => initialState = JSON.parse(val))
  
  export default function stylist(state = initialState, action) {
    switch (action.type) {
      case 'SET_STYLIST_PROFILE' : {
        return {
          ...action.stylist
        }
      }

      case 'UPDATE_STYLIST_PROFILE' : {
        return {
          ...state,
          ...action.data
        }
      }

      default:
        return state
    }
  }