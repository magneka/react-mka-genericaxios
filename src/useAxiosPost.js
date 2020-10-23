import { useReducer } from 'react';
import axiosTokenInstance from './axiosTokenInstance'
import { toast } from 'react-toastify';

//https://jasonwatmore.com/post/2020/07/17/react-axios-http-post-request-examples

/***********************************************************************
 * Generic hook for posting to server
 * 
 * Uses a interceptor to add token to request. Interceptor will know
 * the root url to api.
 * 
 * use like this:
 * 
 * import useAxiosPost from './useAxiosPost'
 * ..
 * const [postFakt, postfaktState] = useAxiosPost()
 * ..
 * const postUtsettSak = () => {
 *   postFakt("/api/sak/UtsettSak", {'field1': 'somevalue' })
 * }
 * 
 * 
 * note: If data object sendt is of FormData, controller method model 
 * must be annotated with [FromForm].
 * if data object is plain json, no annotation is to be used in the 
 * .net controller
 ***********************************************************************/

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

  const postData = (uri, data) => {  
    console.log('posting ', data);   
    toast.info(`Sender til server ${JSON.stringify(data)}`);
    dispatch({ type: actions.POSTING, data: data }); 

    // Posting
    axiosTokenInstance
      .post(uri, data)
      .then(result => {
        console.log(result);
        if (result.status === 200) {
          dispatch({ type: actions.DATA, data: result.data });
          toast.success(`Server svarte med ${JSON.stringify(result.data)}`);
        }
        else {
          dispatch({ type: actions.ERROR, error: {statuscode: result.status, statusText: result.statusText }});  
          toast.error(`Feil oppstod ${result.statusText}`);    
        }
      })
      .catch(error => {
        console.error("error: ", error);
        dispatch({ type: actions.ERROR, error: error });     
        toast.error(`Feil oppstod ${error}`);       
      });
  } 

  return [postData, state]
})

export default useAxiosPost