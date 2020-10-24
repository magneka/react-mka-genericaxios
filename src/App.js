import React from "react";
import "./style.css";
import useAxios from './useAxios'
//import useAxiosGet from './useAxiosGet'
import useAxiosPost from './useAxiosPost'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const [getFakt, faktState] = useAxios()
  const [postFakt, postfaktState] = useAxios()
   
  const getFakturaliste = () => {
    getFakt('get', "/api/sak/FakturalisteForSak?saksnr=1231234", {}, 'Fakuraliste')
  }

  const postFeilsendt = () => {
    postFakt('post', "/api/sak/SakErFeilsendt", {'SaksNr': 'S1234' }, 'Feilsendt faktura')
  }

  const postUtsettSak = () => {
    postFakt('post', "/api/sak/UtsettSak", {'SaksNr': 'S1234', 'Utsettelse': '30' }, 'Utsett sak')
  }

   const postAvdragsOrdning = () => {
     let avddata = {  
        saksnr: 'S20020',
        terminbelop: 100234.50,
        terminLengde: '1 MND', 
        skyldnerEpost: 'kåre@knall.no',
        skyldnerPnrOrgnr: '1231231233'
     }

     var formData = new FormData();  
     formData.append("saksnr", 'S20020')
     formData.append("terminbelop", 100234.50)
     formData.append("terminLengde", '1 MND') 
     formData.append("skyldnerEpost", 'kåre@knall.no')
     formData.append("skyldnerPnrOrgnr", '1231231233')

     postFakt('post', "/api/sak/OpprettAvdragsOrdning", avddata, 'Lag avrdagsordning')
  }

  const faktLastet = () => {
    return (faktState && faktState.data && faktState.data.result)
  } 

  const isLoading = () => (postfaktState.loading || postfaktState.loading)

  return (
    <div>

      <ToastContainer />

      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>

      <button disabled={isLoading()} onClick={postFeilsendt}>Post feilsendt</button><br/>
      <button disabled={isLoading()} onClick={postUtsettSak}>Post utsett</button><br/>
      <button disabled={isLoading()} onClick={postAvdragsOrdning}>Post avdragsordning</button><br/>
      
      <button disabled={isLoading()} onClick={getFakturaliste}>fakturaListe</button><br/>
      <select>
        <option key='' value=''>Velg faktura</option>
        {faktLastet() &&  faktState.data.result.map((team, i) => 
        <option key={team.fakturaNr} value={team.fakturaNr}>{team.fakturaCaption}</option>
        )}
      </select>       

  
      
       <br/>
       {JSON.stringify(faktState)}  

        <br/>
       {JSON.stringify(postfaktState)}
            

    </div>
  );
}
