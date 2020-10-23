import React from "react";
import "./style.css";
import useAxiosGet from './useAxiosGet'
import useAxiosPost from './useAxiosPost'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const [getFakt, faktState] = useAxiosGet()
  const [postFakt, postfaktState] = useAxiosPost()
   
  const getFakturaliste = () => {
    getFakt("/api/sak/FakturalisteForSak?saksnr=1231234")
  }

  const postFeilsendt = () => {
    postFakt("/api/sak/SakErFeilsendt", {'SaksNr': 'S1234' })
  }

  const postUtsettSak = () => {
    postFakt("/api/sak/UtsettSak", {'SaksNr': 'S1234', 'Utsettelse': '30' })
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

     postFakt("/api/sak/OpprettAvdragsOrdning", avddata)
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
       
       <button disabled={isLoading()} onClick={getFakturaliste}>fakturaListe</button>
       <br/>
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
