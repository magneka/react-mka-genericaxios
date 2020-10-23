import React, { useReducer } from 'react';
//import axiosTokenInstance from './axiosTokenInstance'
import axios from 'axios'

//https://jasonwatmore.com/post/2020/07/17/react-axios-http-post-request-examples

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

  let axiosConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": "*",
    }
  };

  const postData = (uri, data) => {  
    console.log('posting ', data);    
    axios({
      method: 'post',
      url: uri,
      data: data
    })
    
    //post(uri, data, headers)
    .then(result => {
      console.log(result);
      if (result.status === 200)
        dispatch({ type: actions.DATA, data: result.data });
      else
        dispatch({ type: actions.ERROR, error: {statuscode: result.status, statusText: result.statusText }});      
    })
    .catch(error => {
      console.error("error: ", error);
      dispatch({ type: actions.ERROR, error: error });        
    });
  } 

  return [postData, state]
})

export default useAxiosGet