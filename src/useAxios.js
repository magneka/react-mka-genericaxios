import { useReducer } from 'react';
import axiosTokenInstance from './axiosTokenInstance'
import { toast } from 'react-toastify';

//https://jasonwatmore.com/post/2020/07/17/react-axios-http-post-request-examples

/***********************************************************************
 * Generic hook for requests to server
 * 
 * Uses a interceptor to add token to request. Interceptor will know
 * the root url to api.
 * 
 * use like this:
 * 
 * import useAxios from './useAxios'
 * ..
 * const [postFakt, postfaktState] = useAxio()
 * ..
 * const postUtsettSak = () => {
 *   postFakt('post', "/api/sak/UtsettSak", {'field1': 'somevalue' }, 'toastmessage')
 * }
 * 
 * 
 * note: If data object sendt is of FormData, controller method model 
 * must be annotated with [FromForm].
 * if data object is plain json, no annotation is to be used in the 
 * .net controller
 ***********************************************************************/

const useAxios = (() => {

  const actions = {
    LOADING: 'LOADING',
    DATA: 'data',
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
          error: null
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

  const postData = (method, url, data, info) => {  
    
    console.log('posting ', data);   
    toast.info(`Sender forespørsel vedr: ${info}`);
    dispatch({ type: actions.LOADING, data: data }); 

    // Posting
    axiosTokenInstance ({
      method: method,
      url: url,
      data: data
    })
      //.post(uri, data)
      .then(result => {
        console.log(result);
        if (result.status === 200) {
          dispatch({ type: actions.DATA, data: result.data });
          toast.success(`Mottat data fra sky vedr: ${info}`);
        }
        else {
          dispatch({ type: actions.ERROR, error: {statuscode: result.status, statusText: result.statusText }});  
          toast.error(`Feil oppstod ved ${info} ${result.statusText}`);    
        }
      })
      .catch(error => {
        console.error("error: ", error);
        dispatch({ type: actions.ERROR, error: error });     
        toast.error(`Feil oppstod vedr: ${info},  ${error}`);       
      });
  } 

  return [postData, state]
})

export default useAxios