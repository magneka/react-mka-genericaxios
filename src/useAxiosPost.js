import React, { useReducer } from 'react';
import axiosTokenInstance from './axiosTokenInstance'

const useAxiosGet = (() => {

  const actions = {
    POSTING: 'POSTING',
    DATA: 'data',
    ERROR: 'ERROR',
  } 

  const dataReducer = (state, action) => {
    
    console.log(JSON.stringify(action))
    
    switch (action.type) {
      case actions.POSTING:
        return {
          ...state,
          loading: true,
          error: null
        };
      case actions.DATA:
        return {
          loading: false,
          data: {result: action.data},
          error: action.error
        };
      case actions.ERROR:
        return {
          ...state,
          loading: false,          
          error: action.error
        };
      
      default:
        return state;
    }
  }

  const initialState = {
    data: {},
    loading: false,
    error: false
  }  

  const [state, dispatch] = useReducer(dataReducer, initialState)

  const getData = (uri) => {      
    axiosTokenInstance.post(uri)
    .then(result => {
      console.log(result);
      dispatch({ type: actions.DATA, data: result.data });
    })
    .catch(error => {
      console.error("error: ", error);
      dispatch({ type: actions.ERROR, error: error });        
    });
  } 

  return [postData, state]
})

export default useAxiosGet