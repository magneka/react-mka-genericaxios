import React, { useReducer } from 'react';
import axiosTokenInstance from './axiosTokenInstance'
import { toast } from 'react-toastify';

/***********************************************************************
 * Generic hook for get requests from server
 * 
 * Uses a interceptor to add token to request. Interceptor will know
 * the root url to api.
 * 
 * use like this:
 * 
 * import useAxiosGet from './useAxiosGet'
 * ..
 * const [getFakt, getFaktState] = useAxiosPost()
 * ..
 * const getSomething = () => {
 *   getSomething ("/api/sak/Faktura?saksnr=123")
 * }
 * 
 * 
 * note: If data object sendt is of FormData, controller method model 
 * must be annotated with [FromForm].
 * if data object is plain json, no annotation is to be used in the 
 * .net controller
 ***********************************************************************/

const useAxiosGet = (() => {

  const actions = {
    LOADING: 'LOADING',
    DATA: 'DATA',
    ERROR: 'ERROR',
  } 

  const dataReducer = (state, action) => {
    
    console.log(JSON.stringify(action))
    
    switch (action.type) {
      case actions.LOADING:
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
    toast.info(`Sender forespørsel til server`);

    axiosTokenInstance.get(uri)
    .then(result => {
      console.log(result);
      if (result.status === 200) {
        dispatch({ type: actions.DATA, data: result.data })          
        toast.success(`Data mottat fra server`);
      }
      else {
        dispatch({ type: actions.ERROR, error: {statuscode: result.status, statusText: result.statusText }});  
        toast.error(`Feil oppstod ${result.statusText}`);    
      }
    })
    .catch(error => {
      console.error("error: ", error);
      toast.error(`Feil oppstod ${error}`);      
      dispatch({ type: actions.ERROR, error: error });        
    });
  } 

  return [getData, state]
})

export default useAxiosGet