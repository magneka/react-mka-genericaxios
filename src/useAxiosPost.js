import React, { useReducer } from 'react';
import axiosTokenInstance from './axiosTokenInstance'
//import axios from 'axios'

//https://jasonwatmore.com/post/2020/07/17/react-axios-http-post-request-examples

const useAxiosPost = (() => {

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

  // 'application/x-www-form-urlencoded',
  //'multipart/form-data',               
  //'application/json', 
  let axiosConfig = {
    headers: {
        'Content-Type': 'multipart/form-data', 
        "Access-Control-Allow-Origin": "*",
         
    }
  };

  const postData = (uri, data) => {  
    console.log('posting ', data);    

    // Posting
    axiosTokenInstance.post(uri, data)
    //({
      //method: 'post',
      //url: uri,
      //data: data // JSON.stringify(data)
    //})
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

export default useAxiosPost